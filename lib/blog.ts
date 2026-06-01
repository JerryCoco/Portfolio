// lib/blog.ts
// Single source of truth for all blog posts.
// Both homepage and /blog page import from here — dates and slugs stay in sync.
// ─────────────────────────────────────────────────────────────────────────────

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags?: string[];
  excerpt?: string;
  content: string;
};

export const posts: Post[] = [
  {
    slug: 'dele-alli',
    title: "The Kid From Tottenham: The Dele Alli Story",
    date: 'May 2026',
    category: 'sports',
    tags: ['Football', 'Premier League', 'Tottenham', 'Players', 'Mental Health', 'Resilience'],
    excerpt: 'From the streets of Milton Keynes to the bright lights of the Premier League — the rise, the fall, and the fight back of Dele Alli.',
    content: `**April 11, 1996.** Bamidele Jermaine Alli enters the world. Thirteen years later, he escapes it. Now? Just DELE.

## Origins

Born in **Milton Keynes**, Buckinghamshire to an English mother (Denise) and a Nigerian Yoruba father (Kehinde). Two worlds. One dream.

His father moved to the United States one week after his birth, leaving Dele with his mother — who struggled with alcohol addiction.

**At age 6**, Dele Alli was being sexually abused.

**At age 7**, he began smoking cannabis.

**At age 8**, he was dealing drugs.

At age 9, Dele moved to Nigeria to live with his father, attending an international school there for 2 years to learn discipline.

Experiences like these built his resilience. And would later impact his mental health.

## The Football Awakening

Joined **Milton Keynes Dons'** academy at age 11. The sport gave him focus. Structure. A reason to wake up.

By age 13, Dele Alli was living with **Alan and Sally Hickford** — his 'adoptive parents'. Stability, finally.

**At 16**, Dele Alli made his professional debut for MK Dons. Scored his first goal shortly after. The rise had begun.

**2013–14.** Broke into MK Dons' first team. Scored his first league goal.

**2014–15.** Transformative. Starred in a **4–0 League Cup upset vs Manchester United**. The football world took notice.

Helped MK Dons earn promotion to the Championship. **18 goals in 62 appearances.**

## The Tottenham Era

**February 2015.** **Tottenham** signed Dele Alli. Loaned him back to MK Dons for the remainder of the season. Named **Football League Young Player of the Year**.

**2015–16.** The peak began. **10 Premier League goals.** Including a **25-yard volley** that won **Goal of the Season**.

Won the **PFA Young Player of the Year** award. Earned a spot in the **PFA Team of the Year**.

**2016–17.** Elevated further. **18 league goals.** Named **Premier League Player of the Month** (January 2017).

Won **another PFA Young Player of the Year** award. Made his **Champions League debut**.

At White Hart Lane, he was untouchable. Flicks. Goals. Swagger. The complete midfielder.

## England Glory

Earned **37 England caps** between 2015 and 2019.

Scored in the **2018 World Cup quarter-final** against Sweden. Featured at **Euro 2016**.

**2018.** Named the **world's most valuable midfielder** by CIES Football Observatory. Valued at **€171 million**.

At 22, he had the world at his feet.

## The Fall

After 2018, something shifted.

Injuries mounted. Tactical changes under **José Mourinho** saw Dele become a fringe player at Tottenham. The magic faded.

**2021–22.** Moved to **Everton**. A low point. **13 goalless appearances.** Hampered by injury.

**2022.** Loan to **Beşiktaş**. **3 goals.** Ended early.

**2023–24.** No appearances. Recovering. Rebuilding. Alone again — but different this time.

**2025.** Joined **Como**. One appearance. Mutually terminated his contract.

Free agent.

## The Truth

Dele Alli sat down with **Gary Neville** on *The Overlap*. Spoke openly. Honestly.

"The football was my escape. When that stopped, I didn't know who I was."

He revealed the childhood abuse. The drugs. The smoking. The pain.

For the first time, the world saw **Dele** — not the footballer. Just Dele.

## The Lesson

Dele Alli's story reminds everyone that **talent alone isn't enough**.

Mental health matters. Resilience matters. Support systems matter.

From being sexually abused as a child. Dealing drugs at 8. Smoking at 7. To becoming one of the world's most valuable players. Then losing it all.

His story is a testament to both **human fragility** and **human strength**.

## What's Next?

Dele Alli is 30 years old.

Not old for football. But old enough to know who he is now.

"I'm still here. I'm still fighting."

His story isn't over.

Neither is his fight.

**The kid from Tottenham taught us something important:**

You can fall. You can break. You can lose everything.

But you can also come back.

**End**`,
  },
  {
    slug: 'vincent-kompany',
    title: "The Wall of Manchester: Vincent Kompany's Journey",
    date: 'May 2026',
    category: 'sports',
    tags: ['Football', 'Premier League', 'Manchester City', 'Players', 'Captain', 'Legend'],
    excerpt: 'A captain, a leader, a wall. How Vincent Kompany became the heartbeat of Manchester City\'s greatest era.',
    content: `**Vincent Jean Mpoy Kompany.** A name too heavy for one man to carry alone.

Born April 10th, 1986 in Uccle, Brussels, Belgium. Two worlds collided and Kompany was the child caught in between.

Pierre, Kompany's father, survived 13 months in Mobutu's Congolese prison, fled to Belgium in 1975, and drove a taxi to stay alive.

At 14, Kompany was expelled for missing school to play football, fought back against racial abusers, watched his parents divorce, and lost his place in the Belgium youth team.

Anderlecht's academy took Kompany in as a child and began building a leader out of a boy who had nowhere else to put his fire.

Kompany's mother Jocelyne lost her battle with cancer in 2006. Kompany was 20. The journey had just started.

On July 30, 2003, Kompany debuted for Anderlecht at 17 in a Champions League qualifier and refused to look like a teenager.

At 18, he won the Belgian Golden Shoe, the 3rd youngest in its history, and the Ebony Shoe too. One year into a career that had barely started.

€10 million to Hamburg in June 2006. 6 starts. 1 Achilles injury. His sister Christel was fighting cancer at the same time.

On August 22, 2008, City paid £6 million for Kompany. 10 days later Sheikh Mansour bought the entire club. Those two arrivals would define the era.

In 2011, Kompany was handed the captain's armband permanently. 8 years of leading City through glory, grief, and everything in between.

In 2011, Kompany lifted the FA Cup, City's 1st major trophy in 35 years, and wept like the boy Jocelyne never got to see grow up.

In 2012, Kompany captained City to the PL title, ending a 44-year drought, and was named Premier League Player of the Season. The best defender on earth.

Across 294 top 5 European league games for Anderlecht, Hamburg, and City, Kompany kept 102 clean sheets. In 51 UCL games, 8 more. The numbers speak for themselves.

2011. 2012. 2014. Three times the Premier League named Kompany in its Team of the Year. Three times the world agreed.

The trophies read beautifully. 4 league titles, 4 League Cups, 2 FA Cups. The injury list reads worse. Over 100 games missed, more than 2 full seasons gone.

Between 2004 and 2019, Kompany earned 89 caps for Belgium, captained the nation for 7 years, and led the golden generation to 3rd at the 2018 World Cup, their closest to a trophy.

In 2018, Pierre (his father) was elected mayor of Ganshoren, becoming the 1st Congolese and 1st black mayor in Belgian history.

May 6, 2019. 30 yards out. Teammates screaming no. Kompany shot anyway. Top corner. And City won the title that week by just 1 point ahead of Liverpool.

Kompany speaks four languages: French, Dutch, English, German. And holds a Master's in Business Administration.

Such was Kompany's influence at City that the club erected a statue of Kompany in August 2021. A year later they inducted Kompany into the PL Hall of Fame in 2022.

Kompany returned to Anderlecht in 2019, the club that built him. Then the hamstring snapped again.

Kompany took Burnley in 2022, won the Championship title with 101 points, then watched the PL swallow Burnley whole. Then Bayern Munich took Kompany and Burnley were left to rebuild alone.

In 2024, Burnley relegated. Bayern Munich called anyway. Kompany won the Bundesliga in his 1st season. 82 points, 99 goals, only 2 losses. From Burnley's relegation to Germany's summit in 12 months. The refugee's son never stopped running.`,
  },
  {
    slug: 'victor-moses',
    title: "From Lagos to the World: The Victor Moses Story",
    date: 'May 2026',
    category: 'sports',
    tags: ['Football', 'Premier League', 'Chelsea', 'Nigeria', 'Players', 'Resilience'],
    excerpt: 'Orphaned at 11, shipped to England at 14 — Victor Moses turned every setback into a stepping stone.',
    content: `On 12 December 1990, in Kaduna, Nigeria, Victor Moses was born into a quiet Christian home — unaware that tragedy was already waiting.

At just 11 years old, tragedy struck when his parents were killed during religious unrest in Kaduna, leaving him orphaned overnight.

He was sent to the United Kingdom to live with relatives in South London, carrying grief no child should bear.

Moses attended Stanley Technical High School in Croydon, where football became both therapy and escape.

Playing for Cosmos 90 FC, his explosive pace stunned scouts, and he famously scored 50 goals in a single season at youth level.

Crystal Palace F.C. signed him into their academy, and he debuted for the senior team at 16 in 2007.

Between 2007 and 2010, he made over 60 appearances for Palace, scoring 11 goals and announcing himself as a rising winger.

In 2010, Wigan Athletic F.C. signed him, giving him a Premier League stage.

Scoring crucial goals for Wigan, including a brace against Newcastle United F.C. in 2012 that kept their survival hopes alive.

In 2012, Chelsea F.C. secured his signature, placing him among Europe's elite.

He scored on his Champions League debut against Shakhtar Donetsk in October 2012, marking his European arrival.

Though he won the UEFA Europa League in 2013 with Chelsea, he struggled for consistent starts amid fierce competition.

Loan spells followed at Liverpool F.C. (2013–14), Stoke City F.C. (2014–15), and West Ham United F.C. (2015–16).

His career turning point came in 2016 under Antonio Conte, who reinvented him as a right wing-back.

Moses thrived in Chelsea's 3-4-3 system, starting 30 games as they won the 2016–17 Premier League.

In the 2017 FA Cup Final against Arsenal F.C., he became the first player sent off in an FA Cup Final for simulation — an emotional low in a grand arena.

Internationally, he chose to represent Nigeria national football team despite eligibility for England, honoring his roots.

At the 2013 Africa Cup of Nations, he scored twice in the semifinal as Nigeria claimed the title, and later scored in the 2014 World Cup before their Round of 16 exit.

Moses retired from international football in 2018 at just 27, citing family focus after earning 38 caps and 12 goals.

Post-Conte, he drifted through loans at Fenerbahçe S.K. (2019) and Inter Milan (2020), reuniting briefly with Conte.

After Spartak Moscow, Moses returned to Luton Town in 2024 before signing with Kazakhstan's Kaisar Kyzylorda in January 2026.

From an orphaned boy fleeing violence in Kaduna to lifting trophies at Stamford Bridge — his life is proof that grief can be turned into glory.`,
  },
  {
    slug: 'mohamed-salah',
    title: "The Egyptian King: Mohamed Salah's Rise to Glory",
    date: 'May 2026',
    category: 'sports',
    tags: ['Football', 'Premier League', 'Liverpool', 'Egypt', 'Players', 'Legacy'],
    excerpt: 'From being written off at Chelsea to becoming Liverpool\'s greatest ever — the unstoppable Mohamed Salah.',
    content: `According to a Stanford University study, since Salah joined Liverpool, hate crimes in the area decreased by 18.9% and anti-Muslim comments online dropped by 50%. Meet **Mohamed Salah Hamed Mahrous Ghaly**.

On 15th June 1992, Nagrig's dust met destiny. Raised by his father's belief and a mother who shared warmth with 3 siblings, he traded Nagrig's schoolbooks for football.

At age 14, a scout visited Ittihad Basyoun to watch another child but left with his name etched in his mind. That meant Salah joining Al Mokawloon, forcing him into a commute of 5 buses and 3-5 hours from Nagrig to Cairo.

At the age of 15, he was fast-tracked to the 1st team, using a special diet to build his frame. By 2010, aged 18, he debuted for Al Mokawloon. No longer just a passenger on 5 buses, he was now a pro on a real pitch.

In 2012, Al Mokawloon sold Salah to FC Basel for €2.5m. He swept the league and led a historic Europa League semi-final run, scoring against Spurs and Chelsea. By 2013, Switzerland had handed him every honour it could: Golden Player, League Player of the Year, Fans' Favourite.

After marrying his Nagrig sweetheart, Magi, in 2013, Salah made history. In January 2014, he became the 1st Egyptian at Chelsea in an £11m move.

At Chelsea, Salah made just 19 appearances. Mourinho looked through him as if he were glass, not gold. Yet, 2014 brought a greater joy: the birth of his daughter, Makka, named after Islam's holiest city.

In 2014, a revoked student status threatened Salah with 3 years of military service, nearly ending his career. Only a Prime Minister's intervention saved him. Loaned to Fiorentina in 2015 as a Chelsea outcast, he landed in Italy with a point to prove.

On the 6-month loan at Fiorentina, Salah erased the "Chelsea flop" tag with 9 goals and 4 assists in 26 games. He famously ended Juventus' 47-game home unbeaten run with a stunning solo goal and knocked Spurs out of Europe.

After a loan to Fiorentina while still a Chelsea player, Salah joined AS Roma on loan in August 2015. He set Rome on fire in his loan spell, tallying 14 goals and 6 assists in 34 games.

Roma moved quickly to sign him permanently from Chelsea in 2016 for a €15m bargain. He repaid them with 34 goals and 22 assists in 83 appearances, won back-to-back Player of the Year awards and a record 87-point season. In November 2016, he became the 1st Egyptian to score a hat-trick in Serie A. The "reject" was dead.

Making his senior debut at 19, Salah became the heartbeat of a nation during a "Dark Age" marked by 3 missed AFCONs. He finished as Africa's joint-top 2014 WC qualifying scorer and ended Egypt's 7-year absence by dragging the squad to the 2017 AFCON Final.

In July 2017, Liverpool paid £36.9m and handed him a stage worthy of his ambition. He repaid them in full: 32 PL goals shattered the 38-game season record, 25 left-footed strikes set a world benchmark and 44 across all competitions made him the greatest debut scorer in Liverpool's history.

What followed was a sweep of everything: Golden Boot, PFA Player of the Year, PL Player of the Season, FIFA Puskás Award. The BBC named him African Footballer of the Year. CAF agreed. But Kiev had the last word, a shoulder injury. A final lost.

Prior to the 2018 World Cup, over a million Egyptians rejected Abdel Fattah Al-Sisi and Moussa Mustafa Moussa by writing in Salah's name. With 1.7m spoiled ballots, Salah doubled the runner-up's total. Amid a 41% turnout drop, he became the leader people trusted over politics.

As the starman, Salah's 95th-minute penalty ended Egypt's 28-year World Cup drought. Despite a dislocated shoulder and a nation's fury, he scored twice in Russia before a group stage exit.

In his 2nd season, Salah won a 2nd consecutive Golden Boot and his 1st Liverpool trophy. After his goal vs Napoli saved their run and his "Never Give Up" shirt defined the semi-final he missed, he returned for the final. Scored a 2nd-minute penalty to beat Spurs 2–0. It was the club's 1st UCL title since 2005.

In 2021, though Liverpool went trophyless, Salah redefined greatness. Becoming the fastest Liverpool player to reach 100 league goals, the highest-scoring African player in PL history and the 1st away player to score a hat-trick at Old Trafford in the PL era.

Salah then collected trophies like pebbles in 2022, winning the League Cup, FA Cup and Community Shield. Along with a 3rd Golden Boot and 2nd PFA Player of the Year award.

Forgiving the thief who robbed him (2017), Salah helped him find work and then built a school and hospital in Nagrig (2018) while funding hundreds of families. He donated $300,000 to Egypt's economy (2019) and 3m Egyptian pounds to rebuild the Abu Sefein Church (2022). His mercy knows no borders.

Following the highs of 2022, 2023 was a rare trophyless season for Salah as Liverpool, though he still made history by becoming the club's all-time PL top scorer. He bounced back in 2024 by securing his 2nd Carabao Cup at Wembley.

In 2025, Salah led Liverpool to a historic 20th league title and became the 1st player ever to sweep the Golden Boot, Playmaker and Player of the Season awards in a single year. By late 2025, he captained Egypt to 2026 WC qualification and reached his 250th Liverpool goal in November.

In March 2026, Salah hit the elite 50 UCL goals milestone and surpassed 400 total career goals before announcing his departure. He leaves Anfield as the club's all-time PL scorer and an immortal icon of the game.

Across 16 years, the Egyptian King has amassed 365+ goals and 165+ assists in 691+ games. With 65+ goals for Egypt (all-time top scorer), Liverpool's 3rd all-time scoring king (256+ goals) and the Premier League's 4th greatest marksman.

**12 Major Trophies:** 2 EPLs (20, 25), 1 UCL (19), 1 FA Cup (22), 3 League Cups (15, 22, 24), 1 Club World Cup (19), 1 UEFA Super Cup (19), 1 Community Shield (22) and 2 Swiss titles (13, 14), 2 World Cup appearances (18, 26) and 2 AFCON final appearances (17, 22).

**Individual Honours:** 3 PFA Player of the Year (18, 22, 25), 3 FWA Footballer of the Year (18, 22, 25), 2 African Player of the Year (17, 18), 2 Playmaker awards (22, 25), a joint-record 4-time PL Golden Boot winner (18, 19, 22, 25).

A Golden Foot winner and proud father of 2, with over 50 major records broken and rewritten, Africa's all-time top scorer in the PL, holder of the most goal involvements in a single season (47). And still, Mohamed Salah's achievements don't end. They simply keep writing themselves.`,
  },
  {
    slug: 'wayne-rooney',
    title: "The Boy From Croxteth: Wayne Rooney's Football Life",
    date: 'May 2026',
    category: 'sports',
    tags: ['Football', 'Premier League', 'Manchester United', 'Everton', 'Players', 'Legend'],
    excerpt: 'England\'s greatest ever — the raw, brilliant, complicated football life of Wayne Rooney.',
    content: `**Wayne Mark Rooney.** "White Pelé". The greatest English footballer of the 21st century.

On 24th October 1985 in Croxteth, Liverpool, Wayne Rooney was born, named after his dad, and the streets called him Wazza.

His father Thomas, a labourer and amateur footballer, gave him his 1st ball. His mother Jeanette stood on every touchline.

Aged 9, he scored 99 goals in 1 season for Copplehouse Boys. Everton came calling, and 2 streets away he met a girl named Coleen McLoughlin. The club and the girl became the shape of everything.

On 19 October 2002, aged 16, he shattered Arsenal's 30-game unbeaten run and became the youngest PL scorer at the time. By 2004, he scored 17 goals in 77 apps for Everton.

On 12th February 2003, Rooney made his England debut. 6 months later, aged 17 years and 317 days, he scored against Macedonia and became England's youngest ever scorer.

At Euro 2004, aged 17, Rooney scored 4 goals and became the youngest scorer in European Championship history at the time. England thought, finally, this is the one.

On 28th September 2004, he scored a hat-trick on his United debut against Fenerbahce. £25.6m that already looked like theft. Domestically at United: 5 PL titles, 4 League Cups, and the FA Cup in 2016.

3 World Cups (2006, 2010, 2014). 11 games. 1 goal. 1 red card. For England's greatest ever scorer, the World Cup was the one stage that never loved him back.

May 2008, Rooney won the UCL. In June he married Coleen. In December he scored in the CWC final and won the trophy. A year where everything peaked at once.

In 2008 and 2010, twice while Coleen was pregnant, Rooney faced prostitution scandals, apologised twice, battled gambling and drinking, and she still stayed.

In 2009/10 Rooney lit up the season with 34 goals, lifted the League Cup, and claimed both PFA and FWA Player of the Year. Then in October 2010 he asked to leave, signed a £250k deal days later, leaving a mystery that still lingers.

On 12th February 2011, Rooney scored a bicycle kick against Manchester City that was so impossible the stadium forgot to breathe before it roared. No PL goal has ever come close since.

Same year on 28th May at Wembley. He equalised against Barcelona and for a fleeting moment hope soared. Then Messi happened, and United fell 3-1 — his 2nd UCL final loss.

In the UCL, 34 goals (the 2nd most any Englishman ever gave), a winner's medal in Moscow and 2 UCL finals lost.

In 2011, Rooney finished 5th in the Ballon d'Or and made the FIFA FIFPro World XI. He backed it up the following season with 27 league goals.

At Euro 2012, he served a 2-game ban, scored vs Ukraine, but England lost to Italy. Across 3 Euros he played 10 games, scored 6 goals, never got past the quarter-finals, and left fans wanting more.

4 sons. Kai Wayne (2009), Klay Anthony (2013), Kit Joseph (2016), and Cass Mac (2018).

Named England captain in August 2014, he won his 100th cap in November 2014 aged 29, the youngest of England's 9 centurions.

At Wembley on 8th September 2015, Rooney scored a penalty vs Switzerland to reach 50 goals for England, breaking Bobby Charlton's 45-year record. A moment of pure triumph.

On 21st January 2017, Rooney scored his 250th goal, breaking Bobby Charlton's United record. He was then reduced to a sub by Mourinho and in May he won the Europa League trophy. And that was that.

For 13 years Goodison booed him, but in July 2017 Rooney returned on a free transfer, scored 11 goals in 40 games, and the fans gave him a standing ovation.

In August 2017, he retired from England quietly. Then joined DC United in July 2018, scored 25 goals in 52 appearances. He still had it.

He retired from playing on 15th January 2021 at Derby, the same club he had managed since 2020. Resigned in June 2022. Tried again at DC United, Birmingham City, Plymouth Argyle. By December 2024 the game had said no 4 times. A 25% win rate.

**313 club goals, 53 international goals (120 caps), 366 goals in total, 168 assists for club, 764 games for club and 19 trophies.** A boy from Croxteth who gave the game everything.`,
  },
];

// Get a single post by its slug — used in /blog/[blog]/page.tsx
export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}