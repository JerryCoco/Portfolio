// Pulls real contribution data from GitHub's authenticated GraphQL API using
// a server-only Personal Access Token (GITHUB_TOKEN in .env.local, never
// exposed to the client). This sees the account's true activity — public
// and private — unlike the old public-page scrape, which could only see
// public contributions.

const GITHUB_USERNAME = 'JerryCoco';

export const revalidate = 3600; // re-fetch at most once an hour

export interface ContributionDay {
  date: string;
  level: number;
  count: number;
}

const QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

function levelFor(count: number): number {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error('[github-activity] GITHUB_TOKEN is not set in the running server process — restart npm run dev after editing .env.local.');
    return Response.json({ error: 'GITHUB_TOKEN is not configured' }, { status: 500 });
  }

  let res: Response;
  try {
    res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: QUERY, variables: { login: GITHUB_USERNAME } }),
      next: { revalidate: 3600 },
    });
  } catch (err) {
    console.error('[github-activity] network error calling GitHub GraphQL API:', err);
    return Response.json({ error: 'Network error reaching GitHub' }, { status: 502 });
  }

  if (!res.ok) {
    const bodyText = await res.text().catch(() => '');
    console.error(`[github-activity] GitHub API responded ${res.status} ${res.statusText}:`, bodyText.slice(0, 500));
    return Response.json({ error: `GitHub API returned ${res.status}` }, { status: 502 });
  }

  const json = await res.json();
  const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) {
    console.error('[github-activity] Unexpected GraphQL response shape:', JSON.stringify(json).slice(0, 500));
    return Response.json({ error: json?.errors ?? 'Unexpected GraphQL response' }, { status: 502 });
  }

  const days: ContributionDay[] = calendar.weeks.flatMap(
    (week: { contributionDays: { date: string; contributionCount: number }[] }) =>
      week.contributionDays.map((d) => ({
        date: d.date,
        count: d.contributionCount,
        level: levelFor(d.contributionCount),
      })),
  );

  return Response.json(
    { days, total: calendar.totalContributions, username: GITHUB_USERNAME },
    { headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' } },
  );
}
