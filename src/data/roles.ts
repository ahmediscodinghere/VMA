import type { ServiceData } from './services'
import receptionist from '../assets/role-receptionist-scrubs.png'
import scribe from '../assets/role-scribe-scrubs.png'
import admin from '../assets/role-admin-scrubs.png'
import coder from '../assets/role-coder-scrubs.png'
import coordinator from '../assets/role-coordinator-scrubs.png'
import billing from '../assets/role-billing-scrubs.png'

const roles = [
  { slug: 'virtual-medical-receptionist', title: 'Virtual Medical Receptionist', theme: 'teal', heroImage: receptionist, portraitAlt: 'Virtual receptionist in deep teal medical scrubs and a headset', tagline: 'A welcoming first point of contact. Keep calls, appointments, and patient requests moving.', tasks: ['Answer calls using your practice scripts', 'Schedule and confirm appointments', 'Collect intake details and route patient messages', 'Coordinate reminders and follow-up requests'], scope: 'Your receptionist follows your scheduling rules and sends clinical questions to the appropriate member of your team.', relatedSlugs: ['phone-answering', 'appointment-scheduling'] },
  { slug: 'virtual-medical-scribe', title: 'Virtual Medical Scribe', theme: 'aqua', heroImage: scribe, portraitAlt: 'Medical scribe in light blue medical scrubs and a headset', tagline: 'Stay present with your patients while documentation support keeps pace with your day.', tasks: ['Prepare encounter templates', 'Draft notes from clinician-provided information', 'Organize visit documentation in your EHR', 'Flag incomplete records for provider review'], scope: 'Documentation is prepared within your approved workflow. Your licensed provider reviews and signs all clinical notes.', relatedSlugs: ['documentation-data-entry', 'ehr-administrative-support'] },
  { slug: 'medical-admin-assistant', title: 'Medical Admin Assistant', theme: 'peach', heroImage: admin, portraitAlt: 'Medical admin assistant in periwinkle blue scrubs and a headset', tagline: 'Bring order to the everyday details, from records and referrals to a well-managed inbox.', tasks: ['Organize medical records requests', 'Coordinate referral paperwork', 'Manage administrative inboxes', 'Track outstanding tasks and follow-ups'], scope: 'We align responsibilities with your systems, permissions, and escalation process so your assistant can support a consistent daily routine.', relatedSlugs: ['back-office-administrative-support', 'referral-coordination'] },
  { slug: 'virtual-medical-coder', title: 'Virtual Medical Coder', theme: 'navy', heroImage: coder, portraitAlt: 'Medical coding assistant in dark teal scrubs holding a tablet', tagline: 'Support accurate coding workflows with organized documentation and careful follow-through.', tasks: ['Review documentation for missing information', 'Support diagnosis and procedure coding workflows', 'Prepare coding queries for provider clarification', 'Track corrections and coding review requests'], scope: 'Required credentials, specialty experience, and coding responsibilities are confirmed before assignment. Coding decisions follow your review and compliance procedures.', relatedSlugs: ['medical-billing-support', 'documentation-data-entry'] },
  { slug: 'remote-patient-monitoring-support', title: 'Remote Patient Monitoring Support', theme: 'aqua', heroImage: coordinator, portraitAlt: 'Patient coordinator in powder blue scrubs and a headset', tagline: 'Keep patients connected with enrollment help, reminders, and timely care-team coordination.', tasks: ['Coordinate patient enrollment paperwork', 'Help patients follow device setup instructions', 'Send approved check-in and usage reminders', 'Route patient concerns to the clinical team'], scope: 'This role provides administrative coordination. Clinical interpretation, alert assessment, and treatment decisions remain with your licensed care team.', relatedSlugs: ['patient-communication', 'patient-intake-support'] },
  { slug: 'medical-billing-assistant', title: 'Medical Billing Assistant', theme: 'teal', heroImage: billing, portraitAlt: 'Medical billing assistant in royal blue scrubs and a headset', tagline: 'Keep the revenue cycle moving with claim tracking, organized follow-ups, and billing support.', tasks: ['Prepare billing information for review', 'Check claim status and track responses', 'Follow up on missing payer information', 'Organize payment and denial work queues'], scope: 'Your assistant works within your billing platform and approved processes, escalating discrepancies to your billing lead.', relatedSlugs: ['medical-billing-support', 'claims-follow-up'] },
]

export const FEATURED_ROLES: (ServiceData & { theme: string; portraitAlt: string })[] = roles.map(role => ({
  ...role, shortTitle: role.title, icon: '✚',
  heroDescription: [role.tagline, role.scope],
  overviewHeading: `Support built around your practice`,
  overviewBody: `VAM ${role.title.toLowerCase()} services help your team stay organized without adding another desk to your office. We agree on the tasks, systems, and communication routines your practice needs before support begins.`,
  benefits: [
    { icon: '✓', title: 'Clear responsibilities', desc: 'Define the tasks and handoffs that fit your team.' },
    { icon: '✓', title: 'Your existing workflow', desc: 'Work within your approved tools and access permissions.' },
    { icon: '✓', title: 'Consistent communication', desc: 'Agree on updates, reporting, and escalation steps.' },
  ],
  steps: [
    { title: 'Discuss your needs', desc: 'Tell us about your specialty, workload, and coverage requirements.' },
    { title: 'Confirm the right fit', desc: 'Review role requirements and the proposed assistant’s experience.' },
    { title: 'Build your workflow', desc: 'Set up approved access, task priorities, and regular check-ins.' },
  ],
  audiences: ['Independent practices', 'Specialty clinics', 'Multi-provider groups'],
  faqs: [
    { q: 'Can the role be tailored to our practice?', a: 'Yes. We discuss your specialty, tools, task volume, and coverage needs, then confirm a practical scope before assignment.' },
    { q: 'How are responsibilities and access managed?', a: role.scope },
  ],
  seoTitle: `${role.title} | Virtual Assistant Medical`, metaDescription: role.tagline,
}))
