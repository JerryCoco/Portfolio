'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

const projectData: Record<string, {
  name: string;
  year: string;
  role: string;
  desc: string;
  tldr: string;
  sections: { title: string; body: string; image?: string; imageAlt?: string }[];
  heroImage: string;
}> = {
  'remedycare-hars': {
    name: 'RemedyCare HARS UI',
    year: '2025',
    role: 'UI/UX Designer',
    desc: 'Health Administration & Records System',
    tldr: 'RemedyCare HARS is a full health administration and records system built for clinical teams. I designed the end-to-end interface covering five user roles: Doctor, Nurse, Patient, Administrator, and Lab, each with their own dashboard, data views, and workflows. The goal was to make a complex clinical system feel organised, fast, and human.',
    heroImage: '/images/hars/hero.webp',
    sections: [
      {
        title: 'The Problem',
        body: 'Hospital administration in many institutions still runs on paper records, verbal handoffs, and disconnected spreadsheets. Information gets lost between departments. Doctors do not know a patient\'s history before walking into a room. Nurses spend time hunting for records instead of caring for patients. RemedyCare needed a system that unified all of this into one interface without overwhelming the people using it every day.',
      },
      {
        title: 'Doctor Dashboard & Patient Records',
        body: 'The doctor-facing interface was the most critical to get right. At a glance, a doctor needs to see their appointments for the day, active patient alerts, and quick access to records. The dashboard surfaces today\'s appointment count, system status indicators, and a live patient list with status tags showing whether each patient is In Progress, Waiting, or Done. The patient records table is sortable and searchable, with inline status badges so doctors can triage at a glance without opening individual records.',
        image: '/images/hars/Dashboard_doctor.webp',
        imageAlt: 'RemedyCare doctor dashboard showing appointments and patient list',
      },
      {
        title: 'Patient List & Appointments',
        body: 'The patients view gives doctors a full directory of their assigned patients with key details visible without drilling in. Each row shows the patient name, ID, condition, assigned nurse, and current status. Colour coded status tags make it immediately clear who needs attention. The appointments panel runs alongside this, showing scheduled times, room numbers, and appointment types so a doctor can plan their entire shift from one screen.',
        image: '/images/hars/patients_doctor.webp',
        imageAlt: 'RemedyCare patient list and appointment management screen',
      },
      {
        title: 'Doctor Reports',
        body: 'The reports screen gives doctors a data view of their activity over time. Consultation counts, average appointment durations, and patient outcomes are visualised with clean bar charts and summary stat cards. This screen was designed for end-of-week reviews and department audits, giving clinical staff the numbers they need without exporting to a spreadsheet.',
        image: '/images/hars/reports_doctor.webp',
        imageAlt: 'RemedyCare doctor reports screen with charts and stat cards',
      },
      {
        title: 'Administrator Dashboard',
        body: 'The admin dashboard sits above all other roles, giving hospital administrators a bird\'s eye view of the entire system. Total patients, active appointments, system uptime, and staff counts are all visible on the home screen. From here, admins can drill into any department, flag system issues, or pull cross-department reports without touching individual patient records.',
        image: '/images/hars/dashboard_admin.webp',
        imageAlt: 'RemedyCare administrator dashboard with system overview stats',
      },
      {
        title: 'User Management & Admin Reports',
        body: 'The user management screen lets administrators control access across all five roles. Staff accounts can be created, edited, or deactivated from a single table view. Role assignment is handled with dropdown selectors and status tags that make active, inactive, and pending accounts immediately distinguishable. The admin reports screen mirrors the doctor reports view but aggregates data across all departments, giving leadership the full picture.',
        image: '/images/hars/users_admin.webp',
        imageAlt: 'RemedyCare user management screen showing staff accounts and roles',
      },
      {
        title: 'Report Admin View',
        body: 'The report admin view pulls together cross-system metrics into one consolidated screen. Appointment volumes, patient throughput, and system usage are presented as stat cards at the top with detailed breakdowns below. This screen was designed specifically for monthly reporting and board-level presentations, where clarity and credibility matter more than density.',
        image: '/images/hars/report_admin.webp',
        imageAlt: 'RemedyCare admin report screen with consolidated system metrics',
      },
      {
        title: 'Nurse & Patient Dashboards',
        body: 'The nurse dashboard focuses on ward-level tasks: patient assignments, medication schedules, and handoff notes. Every piece of information a nurse needs for their shift is surfaced without them having to navigate between screens. The patient-facing dashboard takes a completely different tone, showing appointment history, upcoming visits, and personal health summaries in a calm, accessible layout that avoids clinical language wherever possible.',
        image: '/images/hars/dashboard_nurse.webp',
        imageAlt: 'RemedyCare nurse dashboard showing patient assignments and ward tasks',
      },
      {
        title: 'Patient Appointments',
        body: 'The patient appointments screen gives patients a clear view of their upcoming and past visits. Each appointment card shows the date, time, assigned doctor, department, and status. Patients can see at a glance whether their next visit is confirmed, pending, or completed, without needing to call the hospital to confirm.',
        image: '/images/hars/appointments_patient.webp',
        imageAlt: 'RemedyCare patient appointments screen showing visit history and upcoming bookings',
      },
      {
        title: 'What I Learned',
        body: 'Designing for five distinct user roles in one system taught me that clarity is not a visual preference, it is a functional requirement. Every role has different priorities, different stress levels, and different time pressures. A nurse scanning a ward list needs instant recognition. A patient checking an appointment needs reassurance, not data density. The biggest design challenge was keeping the system visually consistent while making each role feel like it was built specifically for them.',
      },
    ],
  },
  'attendance-app': {
    name: 'RollCall',
    year: '2025',
    role: 'UI/UX Designer',
    desc: 'Smart attendance tracking system design',
    tldr: 'RollCall is a smart attendance management app designed for university students and lecturers. I led the full UI design from onboarding to check-in to reporting, with a focus on speed, clarity, and three flexible check-in modes: GPS, QR Code, and Smart Entry Code.',
    heroImage: '/images/rollcall/hero.webp',
    sections: [
      {
        title: 'The Problem',
        body: 'Manual attendance in universities is slow, error-prone, and easy to game. Lecturers waste the first 10 minutes of every class calling names. Students sign for absent friends. Records get lost or miscounted. RollCall was designed to fix all of that, making attendance something that just happens, accurately and instantly, without disrupting the flow of a class. The goal was simple: a student opens the app, clocks in, and sits down. No paper. No waiting.',
      },
      {
        title: 'Onboarding & Authentication',
        body: 'The onboarding flow was designed to be fast and reassuring. Students sign up with their university email, verify with a one-time code, and add a phone number as a backup. Three steps, no friction, no confusion. Each screen uses clear labels, large touch targets, and inline validation so students never hit a wall mid-signup. The visual language stays warm and approachable throughout, using the blue-to-violet gradient to signal trust and forward momentum from the very first screen.',
        image: '/images/rollcall/onboarding.webp',
        imageAlt: 'RollCall onboarding screens showing Sign Up, Login and Email Verification',
      },
      {
        title: 'Dashboard & Core Experience',
        body: 'The home screen is the heart of RollCall. At a glance, students see their overall attendance percentage as a circular progress ring, a calendar strip showing the current week, a card for their next upcoming class with a live countdown, and the CLOCK IN button as the dominant action. Everything on this screen was prioritised by how often a student would need it. The percentage ring answers "am I at risk?" in one second. The next class card answers "where do I need to be?" without any navigation. The CLOCK IN button is large, centred, and impossible to miss.',
        image: '/images/rollcall/hero.webp',
        imageAlt: 'RollCall dashboard showing attendance ring, next class card and CLOCK IN button',
      },
      {
        title: 'Schedule View',
        body: 'The schedule screen gives students a full view of their weekly timetable. Course names, times, venues, and lecturers are all visible without extra taps. The calendar strip at the top lets users swipe between days quickly, and each class card shows the check-in status directly so students always know where they stand. Colour coding was used deliberately: green for attended, amber for upcoming, red for missed. No legend needed, the meaning is immediate.',
        image: '/images/rollcall/schedule.webp',
        imageAlt: 'RollCall schedule screen showing weekly timetable and class status cards',
      },
      {
        title: 'Attendance History & 3 Check-in Modes',
        body: 'The history screen shows a full log of every class with the date, lecturer, check-in time, and the method used. This is where RollCall\'s biggest design decision lives: three check-in modes built for real-world flexibility. GPS-Based check-in auto-detects when a student enters the classroom zone, requiring zero interaction. QR Code check-in lets the lecturer display a scannable code on a projector. Smart Entry Code gives the lecturer a rotating alphanumeric code to share verbally, no projector needed. This three-mode approach came directly from the reality of university classrooms in Ghana, where WiFi can be unstable, projectors are not always available, and no single method works everywhere. The history log also includes a streak system. When a student hits a strong attendance run, the app celebrates it with a full-screen animation, turning consistency into something worth showing off.',
        image: '/images/rollcall/data-delight.webp',
        imageAlt: 'RollCall attendance history log and streak celebration screen',
      },
      {
        title: 'What I Learned',
        body: 'RollCall taught me that the best mobile interfaces are the ones that respect the user\'s time. Every screen had to earn its place. If it did not help a student clock in faster, understand their standing quicker, or feel more in control of their academic record, it did not belong. The three check-in modes were the hardest decision. It would have been easier to pick one. But designing for the average user would have failed the majority. Designing for the real environment, unstable WiFi, mixed classroom setups, lecturers with different preferences, meant building flexibility in from the start.',
      },
    ],
  },
  'hostel-app': {
    name: 'Hostel App UI',
    year: '2024',
    role: 'UI/UX Designer',
    desc: 'Hostel management & booking experience',
    tldr: 'Hostel App is a hostel booking app designed for university students in Ghana. I designed the full mobile experience from browsing available hostels to selecting a room type, entering student details, and completing payment checkout, with a focus on simplicity, transparency, and trust at every step.',
    heroImage: '/images/hostel/hero.webp',
    sections: [
      {
        title: 'The Problem',
        body: 'Finding and booking student accommodation in Ghana is a frustrating process. Most hostels are discovered through word of mouth, confirmed over WhatsApp, and paid for in cash with no receipt. There is no way to compare options, see room availability, or track a booking after payment. Students often arrive at a hostel to find their room already taken. Hostel App was designed to bring the entire process online, from discovery to booking confirmation, in a way that felt trustworthy and easy to use for a first-time user.',
      },
      {
        title: 'Discovery & Hostel Listings',
        body: 'The home screen surfaces nearby hostels with key details visible at a glance: name, distance from campus, price per semester, and availability status. Each hostel card uses a photo, a rating, and a short location tag so students can quickly scan their options without opening every listing. The search and filter system lets students narrow by price range, room type, and distance, cutting down the time it takes to find something suitable.',
        image: '/images/hostel/card_1.webp',
        imageAlt: 'Hostel App home screen and hostel discovery listing cards',
      },
      {
        title: 'Hostel Detail & Room Selection',
        body: 'The hostel detail screen gives students everything they need to make a confident decision. Photos, room types, available beds, included amenities, and pricing are all organised in a single scrollable view. The room selection step uses a visual grid of room categories, with occupancy counts and per-semester pricing shown clearly so students are never surprised by hidden costs. Selecting a room immediately shows availability, so students only commit to options that are actually open.',
        image: '/images/hostel/card_2.webp',
        imageAlt: 'Hostel App hostel detail page and room type selection screen',
      },
      {
        title: 'Booking & Checkout',
        body: 'The booking flow collects student details, confirms the room selection, and walks the user through payment in three steps. The checkout screen shows a full reservation summary before any payment is taken, giving students a chance to review everything. Payment is handled with a clean card input screen that supports Visa and Mastercard, and a confirmation screen gives the student their booking reference number immediately after payment. The entire flow was designed to feel as trustworthy as booking a flight, not as risky as paying a stranger on WhatsApp.',
        image: '/images/hostel/card_3.webp',
        imageAlt: 'Hostel App booking flow showing student details, checkout and payment confirmation',
      },
      {
        title: 'What I Learned',
        body: 'Hostel App taught me that trust is a design problem. When students hand over money for accommodation, the interface has to communicate safety, clarity, and confidence at every step. A confusing checkout screen does not just frustrate users, it makes them abandon the booking entirely. Every label, every confirmation message, and every piece of pricing information had to be deliberate. The biggest lesson was that simplicity is not about removing features. It is about making every feature feel effortless.',
      },
    ],
  },
};

export default function ProjectPage() {
  const params = useParams();
  const project = params?.project as string;
  const data = projectData[project];

  if (!data) {
    return (
      <div style={{ minHeight: '100vh', background: '#0d0d0d', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Geist, Inter, sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '1rem' }}>Project not found</p>
          <Link href="/projects" style={{ color: 'white', fontSize: 14 }}>← Back to projects</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');
      `}</style>

      <div style={{ minHeight: '100vh', background: '#0d0d0d', color: 'white' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 2.5rem)' }}>

          {/* Back link */}
          <Link href="/projects" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            color: 'rgba(255,255,255,0.4)', textDecoration: 'none',
            fontSize: 13, fontFamily: 'Geist, Inter, sans-serif',
            marginBottom: '3rem', transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = 'white'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
          >
            ← Projects
          </Link>

          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: 500, lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: 'rgba(255,255,255,0.92)',
            fontFamily: 'Instrument Serif, serif',
            marginBottom: '0.5rem',
          }}>
            {data.name}
          </h1>

          <p style={{
            fontSize: 16, color: 'rgba(255,255,255,0.45)',
            fontFamily: 'Geist, Inter, sans-serif',
            marginBottom: '2.5rem',
          }}>
            {data.desc}
          </p>

          {/* Meta row */}
          <div style={{
            display: 'flex', gap: '2.5rem', flexWrap: 'wrap',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            padding: '1.25rem 0', marginBottom: '3rem',
          }}>
            {[{ label: 'Year', value: data.year }, { label: 'Role', value: data.role }].map(({ label, value }) => (
              <div key={label}>
                <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontFamily: 'Geist, Inter, sans-serif', marginBottom: '0.25rem' }}>{label}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', fontFamily: 'Geist, Inter, sans-serif' }}>{value}</div>
              </div>
            ))}
          </div>

          {/* TL;DR */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            marginBottom: '3rem',
          }}>
            <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontFamily: 'Geist, Inter, sans-serif', marginBottom: '0.75rem' }}>The TL;DR</div>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, fontFamily: 'Geist, Inter, sans-serif', margin: 0 }}>
              {data.tldr}
            </p>
          </div>

          {/* Hero image */}
          <div style={{
            width: '100%',
            borderRadius: '1rem',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
            marginBottom: '4rem',
          }}>
            <img
              src={data.heroImage}
              alt={data.name}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Case study sections */}
          {data.sections.map((section, i) => (
            <div key={i} style={{ marginBottom: '4rem' }}>
              <h2 style={{
                fontSize: 'clamp(18px, 3vw, 24px)',
                fontWeight: 500,
                letterSpacing: '-0.01em',
                color: 'rgba(255,255,255,0.92)',
                fontFamily: 'Instrument Serif, serif',
                marginBottom: '1rem',
              }}>
                {section.title}
              </h2>
              <p style={{
                fontSize: 15,
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.8,
                fontFamily: 'Geist, Inter, sans-serif',
                marginBottom: section.image ? '2rem' : 0,
              }}>
                {section.body}
              </p>
              {section.image && (
                <div style={{
                  width: '100%',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}>
                  <img
                    src={section.image}
                    alt={section.imageAlt || section.title}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              )}
            </div>
          ))}

          {/* Thank you */}
          {data.sections.length > 0 && (
            <div style={{
              borderTop: '1px solid rgba(255,255,255,0.08)',
              paddingTop: '3rem',
              marginTop: '2rem',
              textAlign: 'center',
            }}>
              <p style={{
                fontSize: 13,
                color: 'rgba(255,255,255,0.25)',
                fontFamily: 'Geist, Inter, sans-serif',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}>
                Thank you for reading
              </p>
            </div>
          )}

        </div>
      </div>
    </>
  );
}