import { useState } from 'react'
import ReviewSlider from '../components/ReviewSlider'
import { TESTIMONIALS } from '../data/testimonials'
import { Link } from 'react-router'
import { SERVICES } from '../data/services'
import { FEATURED_ROLES } from '../data/roles'
import heroImage from '../assets/hero-medical-va.png'
import practiceSupportAssistant from '../assets/practice-support-assistant.png'
import specialtiesAssistant from '../assets/specialties-medical-va-v2.png'
import whyAssistant from '../assets/why-choose-assistant.png'
import trainedAssistant from '../assets/trained-medical-assistant.png'
import optionsAssistant from '../assets/options-assistant.png'

const ASSISTANT_OPTIONS = [
  {
    title: 'Bilingual Medical Assistants',
    paragraphs: [
      'Virtual Assistant Medical provides Bilingual Medical Assistants who help healthcare practices communicate more effectively with patients in multiple languages. Our medical virtual assistants can support patient calls, appointment scheduling, follow-ups, reminders, and routine administrative communication, helping patients feel understood and supported throughout their care journey.',
    ],
    href: '/services/patient-communication',
    linkLabel: 'Explore patient communication',
  },
  {
    title: 'Certified Medical Assistants',
    paragraphs: [
      'Virtual Assistant Medical connects practices with Certified Medical Assistants who bring healthcare knowledge and professional administrative support to your daily operations. They can assist with scheduling, patient coordination, documentation, EHR-related tasks, insurance verification, and other non-clinical workflows while helping your team maintain an organized and efficient practice.',
    ],
    href: '/services/medical-virtual-assistant',
    linkLabel: 'Explore medical virtual assistant support',
  },
  {
    title: 'Experienced Medical Assistants',
    paragraphs: [
      'Virtual Assistant Medical offers Experienced Medical Assistants who understand the demands of busy healthcare environments. With experience supporting medical workflows, patient communication, scheduling, billing coordination, documentation, and administrative tasks, our virtual medical assistants help reduce staff workload and keep your practice running smoothly.',
    ],
    href: '/services/documentation-data-entry',
    linkLabel: 'Explore documentation support',
  },
]

const SPECIALTIES = [
  { label: 'Medical Clinics & Practices', icon: 'medical' },
  { label: 'Dental Clinics & Practices', icon: 'dental' },
  { label: 'Behavioral Health', icon: 'behavioral' },
  { label: 'Allied Health', icon: 'allied' },
  { label: 'Telehealth Providers', icon: 'telehealth' },
  { label: 'Specialty Clinics', icon: 'specialty' },
  { label: 'Hospitals & Health Systems', icon: 'hospital' },
]

function SpecialtyIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    medical: <><path d="M6 3v5a6 6 0 0 0 12 0V3M6 4H4v3h2m12-3h2v3h-2M12 14v3a4 4 0 0 0 8 0v-2" /><circle cx="20" cy="13" r="2" /></>,
    dental: <path d="M5 7c-.5-2.6 1-4 3.4-4 1.6 0 2.5 1 3.6 1s2-1 3.6-1C18 3 19.5 4.4 19 7c-.7 4.3-2.8 13-5.1 13-1.3 0-.8-6-1.9-6s-.6 6-1.9 6C7.8 20 5.7 11.3 5 7Z" />,
    behavioral: <><path d="M12 4a4 4 0 0 0-7 2 4 4 0 0 0-1 6 4 4 0 0 0 3 6 4 4 0 0 0 5 2V4Zm0 0a4 4 0 0 1 7 2 4 4 0 0 1 1 6 4 4 0 0 1-3 6 4 4 0 0 1-5 2V4Z" /><path d="M7 8l2 2-2 2m10-4-2 2 2 2M9 15l3 2 3-2" /></>,
    allied: <><path d="M20.5 8.5c0 4.3-8.5 10.8-8.5 10.8S3.5 12.8 3.5 8.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8.5 1.5Z" /><path d="M5.5 11h3l1.4-2 2 4 1.5-2h4.6" /></>,
    telehealth: <><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M8 21h8m-4-3v3M12 7v7m-3.5-3.5h7" /></>,
    specialty: <><circle cx="12" cy="12" r="9" /><path d="M12 7v10M7 12h10" /></>,
    hospital: <><path d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16M2 21h20M9 21v-4h6v4M12 6v6M9 9h6" /></>,
  }
  return <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function AppointmentCalendar() {
  const today = new Date()
  const monday = new Date(today)
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7))
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday)
    date.setDate(monday.getDate() + index)
    return date
  })

  return (
    <div className="relative z-20 w-full max-w-xs mx-auto mt-4 sm:mt-0 sm:absolute sm:left-0 sm:top-[36%] sm:w-52 rounded-2xl bg-white/95 border border-[#D6E8E7] shadow-xl p-4" aria-label="Appointment calendar for this week">
      <div className="flex items-center gap-2 text-sm font-bold text-[#1B3A7A]">
        <svg className="w-5 h-5 text-[#178F91]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4m10-4v4M3 10h18" /></svg>
        Appointment calendar
      </div>
      <p className="text-xs text-slate-500 mt-1">{new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(today)}</p>
      <div className="grid grid-cols-7 gap-1 text-center mt-3" aria-hidden="true">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => <span key={index} className="text-[11px] font-semibold text-slate-400">{day}</span>)}
        {days.map((day, index) => <span key={index} className={`h-6 grid place-items-center rounded-md text-xs ${day.toDateString() === today.toDateString() ? 'bg-[#2DC5B0] text-[#0F2456] font-bold' : 'text-slate-600'}`}>{day.getDate()}</span>)}
      </div>
      <p className="border-t border-slate-100 pt-2 mt-3 text-xs text-[#178F91] font-semibold">Scheduling &amp; reminders</p>
    </div>
  )
}

const WHY = [
  { icon: '🏥', title: 'Healthcare-Only Focus', desc: 'Support is designed around healthcare administration, patient coordination, and your practice workflows.' },
  { icon: '🔒', title: 'HIPAA-Aware Processes', desc: 'Discuss access controls and documented handling procedures before any patient information is shared.' },
  { icon: '🕐', title: 'Flexible Support', desc: 'Discuss the coverage hours that fit your practice and patient communication needs.' },
  { icon: '⚡', title: 'Thoughtful Onboarding', desc: 'Define responsibilities, approved systems, and escalation rules before support begins.' },
  { icon: '💰', title: 'Transparent Pricing', desc: 'Discuss a support plan and pricing that match your practice’s needs.' },
  { icon: '🔄', title: 'Consistent Processes', desc: 'Document your workflows so the support stays organized as your needs change.' },
]

const WHY_CHOOSE = [
  { title: 'Healthcare-Focused Only', icon: '/favicon.svg' },
  { title: 'HIPAA-Compliant', icon: '/benefit-hipaa.svg' },
  { title: 'Available 24/7', icon: '/benefit-availability.svg' },
  { title: 'Ready To Scale', icon: '/benefit-scale.svg' },
  { title: 'Transparent Pricing', icon: '/benefit-pricing.svg' },
  { title: '40 Hours Free Trial', icon: '/benefit-trial.svg' },
]

const PRACTICE_BENEFITS = [
  { title: 'Support without another desk', copy: 'Add remote administrative capacity without expanding your office. Choose the support your workload needs and keep your team focused on the work that matters.', path: 'M3 21h18M5 21V5h14v16M9 9h6M9 13h6M10 21v-4h4v4' },
  { title: 'A workflow that feels like yours', copy: 'Your assistant follows your scheduling rules, approved systems, and communication preferences, with clear responsibilities and handoffs from the start.', path: 'M4 7h16M4 17h16M8 4v6M16 14v6' },
  { title: 'A warmer patient experience', copy: 'Give patients a helpful point of contact for appointments, reminders, and routine requests, with attentive communication at each step.', path: 'M20.5 8.5c0 4.3-8.5 11-8.5 11S3.5 12.8 3.5 8.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8.5 1.5Z' },
  { title: 'Fewer loose ends', copy: 'Keep referrals, records requests, and insurance paperwork moving. Organized task tracking helps your team see what is complete and what needs attention.', path: 'M9 6h11M9 12h11M9 18h11M3 6l1 1 2-3M3 12l1 1 2-3M3 18l1 1 2-3' },
  { title: 'More space for patient care', copy: 'Delegate repeatable administrative tasks so your in-house team can spend more time supporting patients. Clinical decisions stay with your licensed providers.', path: 'M6 3v5a6 6 0 0 0 12 0V3M4 3h3M17 3h3M12 14v3a4 4 0 0 0 8 0v-4M18 13h4' },
  { title: 'Clear updates. Connected teams.', copy: 'Bring patient messages, daily priorities, and follow-ups into an agreed communication routine, so the right information reaches the right person.', path: 'M4 14V11a8 8 0 0 1 16 0v3M4 11H2v7h4v-7H4Zm16 0h2v7h-4v-7h2ZM20 18v1a2 2 0 0 1-2 2h-5' },
]

const COMPARISON = [
  { feature: 'Cost', inHouse: 'High salary + benefits + taxes', vam: 'Flat $9.50/hr — all inclusive' },
  { feature: 'HIPAA Training', inHouse: 'Not always guaranteed', vam: 'Documented training & protocols' },
  { feature: 'Availability', inHouse: '9–5 weekdays only', vam: '24/7/365 coverage' },
  { feature: 'Office Space', inHouse: 'Required', vam: 'Fully remote, zero overhead' },
  { feature: 'Onboarding Time', inHouse: '2–4 weeks', vam: 'Ready in 24–48 hours' },
  { feature: 'Scalability', inHouse: 'Difficult and slow', vam: 'Scale up or down instantly' },
  { feature: 'Risk-Free Trial', inHouse: '❌', vam: '✅ Up to 40 Hours Free' },
]



const FAQS = [
  { q: 'What is a Medical Virtual Assistant (VMA)?', a: 'A Medical Virtual Assistant is a trained remote healthcare professional who handles administrative, documentation, and coordination tasks for your practice — working within your approved systems without requiring on-site presence.' },
  { q: 'How quickly can you assign a VA to my practice?', a: 'The timing depends on your tasks, systems, and onboarding requirements. Contact us to discuss a realistic start date.' },
  { q: 'Is my patient data safe with a remote VA?', a: 'All assistants work within your practice\'s established security protocols using role-based access to approved systems only. Practices are responsible for granting appropriate access and setting data handling policies.' },
  { q: 'What EHR/EMR systems do your VAs work in?', a: 'Tell us which EHR or practice management system you use so we can discuss the access and experience your workflow requires.' },
  { q: 'Can I request a bilingual assistant?', a: 'Let us know which languages your practice needs, and we can discuss available support.' },
  { q: 'What happens if I need to replace my assigned VA?', a: 'Talk to us about your coverage and continuity needs so we can agree on a suitable process.' },
]

const EHRS = ['Athena Health', 'eClinicalWorks', 'Kareo / Tebra', 'DrChrono', 'TherapyNotes', 'Practice Fusion', 'NextGen', 'Office Ally', 'Charm Health', 'AdvancedMD', 'Elation Health', 'Greenway Health', 'Allscripts', 'Cerner', 'Epic', 'ModMed', 'Jane App', 'SimplePractice', 'Luminare Health', 'Netsmart']

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left hover:bg-blue-50 transition-colors">
        <span className="font-semibold text-gray-900 pr-4" style={{ fontFamily: 'Outfit, sans-serif' }}>{q}</span>
        <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold transition-transform" style={{ background: open ? '#2DC5B0' : '#1B3A7A', transform: open ? 'rotate(45deg)' : 'none' }}>+</span>
      </button>
      {open && (
        <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100">
          <p className="pt-4">{a}</p>
        </div>
      )}
    </div>
  )
}

export default function HomePage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', zip: '', service: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Virtual Assistant Medical inquiry${formData.service ? `: ${formData.service}` : ''}`)
    const body = encodeURIComponent(`Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nPractice ZIP: ${formData.zip}\nService: ${formData.service}\n\n${formData.message}`)
    window.location.href = `mailto:info@virtualassistantmedical.com?subject=${subject}&body=${body}`
  }

  return (
    <div>
      {/* Hero */}
      <section id="home" className="relative min-h-[720px] flex items-center overflow-hidden" style={{ background: '#0A1A3E' }}>

        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <img
            src={heroImage}
            alt=""
            className="w-full h-full object-cover object-[66%_center] lg:object-center"
          />
          <div className="absolute inset-0 hero-photo-overlay" />
          <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(to top, rgba(10,26,62,0.95), transparent)' }} />
        </div>

        {/* Teal accent stripe on far right edge */}
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-1.5" style={{ background: 'linear-gradient(to bottom, #2DC5B0, #1B3A7A)' }} />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 lg:px-8 py-20 lg:py-24">
          <div className="max-w-[39rem]">

            <div className="flex items-center gap-3 mb-7 text-sm text-blue-100">
              <span className="flex -space-x-2" aria-hidden="true">
                <span className="w-7 h-7 rounded-full border-2 border-[#0A1A3E] bg-teal-300 text-[#0A1A3E] grid place-items-center text-xs font-bold">VA</span>
                <span className="w-7 h-7 rounded-full border-2 border-[#0A1A3E] bg-blue-200 text-[#0A1A3E] grid place-items-center text-xs font-bold">M</span>
                <span className="w-7 h-7 rounded-full border-2 border-[#0A1A3E] bg-white text-[#0A1A3E] grid place-items-center text-xs font-bold">+</span>
              </span>
              <span className="text-yellow-400" aria-hidden="true">★★★★★</span>
              <span>Trusted by <strong className="text-white">500+</strong> practices nationwide</span>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-7" style={{ background: 'rgba(45,197,176,0.18)', color: '#4DD9C6', border: '1px solid rgba(45,197,176,0.3)' }}>
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse inline-block"></span>
              Healthcare-Only Virtual Assistants &bull; Available Now
            </div>

            <h1
              className="font-extrabold text-white mb-6 leading-none"
              style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2.4rem, 5vw, 4rem)', lineHeight: '1.08' }}
            >
              Give Your Practice <span style={{ color: '#2DC5B0' }}>More Time</span> With Virtual Assistant Medical
            </h1>

            <p className="text-lg leading-relaxed mb-10 max-w-lg" style={{ color: 'rgba(200,220,255,0.85)' }}>
              <strong>Virtual Assistant Medical</strong> provides healthcare-trained, <strong>HIPAA-compliant medical virtual assistants</strong> who support scheduling, billing coordination, documentation, patient communication, and daily administrative tasks—helping your team reduce workload and focus more on quality patient care.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white transition-all"
                style={{ background: '#2DC5B0', boxShadow: '0 8px 32px rgba(45,197,176,0.4)' }}
                onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#1FA898' }}
                onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#2DC5B0' }}
              >
                Start Your Free 40-Hour Trial →
              </a>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold border transition-all"
                style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}
                onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.7)' }}
                onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.3)' }}
              >
                Explore All 18 Services
              </Link>
            </div>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-3">
              {['✓ No Setup Fees', '✓ Cancel Anytime', '✓ 40 Hrs Free Trial', '✓ Onboard in 48 hrs'].map(t => (
                <span key={t} className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(190,220,255,0.9)', border: '1px solid rgba(255,255,255,0.12)' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Assistant options */}
      <section className="relative overflow-hidden bg-[#F5FAFC] px-4 py-20 lg:py-24" aria-labelledby="assistant-options-heading">
        <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[#D9F6F2] blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#168F91]">Support matched to your practice</p>
            <h2 id="assistant-options-heading" className="mb-5 text-3xl font-extrabold leading-tight text-[#0F2456] sm:text-4xl lg:text-5xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
              What You Get with<br /><span className="text-[#20B9AD]">Virtual Assistant Medical</span>
            </h2>
            <p className="mb-8 max-w-2xl text-base leading-relaxed text-[#49647A] sm:text-lg">Choose the support profile that fits your patients, team, and workflow. Open each option to see how VAM can help you define the right match.</p>
            <div className="space-y-3">
              {ASSISTANT_OPTIONS.map((option, index) => (
                <details key={option.title} className="group rounded-2xl border border-[#D9E9ED] bg-white shadow-[0_8px_28px_rgba(17,50,81,0.06)] open:border-[#8ADBD3] open:shadow-[0_12px_34px_rgba(17,50,81,0.10)]" open={index === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left text-lg font-bold text-[#0F315A] marker:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#168F91] sm:px-6 [&::-webkit-details-marker]:hidden" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    <span>{option.title}</span>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#DDF7F3] text-[#137F87] transition-colors group-open:bg-[#1BB9B0] group-open:text-white" aria-hidden="true">
                      <svg className="h-5 w-5 transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                    </span>
                  </summary>
                  <div className="border-t border-[#E6F0F2] px-5 pb-6 pt-5 sm:px-6">
                    {option.paragraphs.map(paragraph => <p key={paragraph} className="mb-4 text-base leading-relaxed text-[#36536A]">{paragraph}</p>)}
                    <Link to={option.href} className="inline-flex items-center rounded-lg font-bold text-[#137F87] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#137F87]">{option.linkLabel} <span className="ml-2" aria-hidden="true">→</span></Link>
                  </div>
                </details>
              ))}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[440px] lg:mx-0" aria-label="Medical virtual assistant illustration">
            <div className="absolute bottom-[7%] left-[9%] h-[70%] w-[82%] rounded-t-[220px] bg-[#DDF7F4]" aria-hidden="true" />
            <div className="absolute bottom-[7%] left-[21%] h-[57%] w-[58%] rounded-t-[170px] border-[18px] border-white/65" aria-hidden="true" />
            <img src={optionsAssistant} alt="Illustrative healthcare virtual assistant in navy and teal scrubs" loading="lazy" className="relative z-10 block h-auto w-full object-contain" />
            <div className="absolute bottom-[28%] right-0 z-20 flex items-center gap-2 rounded-2xl border-2 border-[#2DC5B0] bg-[#0F315A] px-3 py-2 text-white shadow-[0_16px_35px_rgba(15,49,90,0.22)] sm:right-[-1.25rem] sm:gap-3 sm:px-4 sm:py-3" aria-label="HIPAA compliant">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#2DC5B0] text-[#0F315A] sm:h-12 sm:w-12" aria-hidden="true">
                <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 20 5v6c0 5-3.2 8.4-8 11-4.8-2.6-8-6-8-11V5l8-3Z" /><path d="M12 7v9m-4.5-4.5h9" /></svg>
              </span>
              <span className="text-left font-extrabold leading-none tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}><span className="block text-lg sm:text-2xl">HIPAA</span><span className="mt-0.5 block text-xs uppercase tracking-[0.12em] text-[#9CEBE2] sm:text-sm">Compliant</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4" style={{ background: '#E6FFF8', color: '#1FA898' }}>Our Services</div>
            <h2 className="text-3xl lg:text-5xl font-extrabold mb-4" style={{ fontFamily: 'Outfit, sans-serif', color: '#1B3A7A' }}>
              Everything Your Practice Needs,<br /><span style={{ color: '#2DC5B0' }}>Handled Remotely</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">From front desk to back office — our trained VMAs integrate with your workflow around your needs.</p>
          </div>
          <div className="vam-role-grid">
            {FEATURED_ROLES.map(role => (
              <Link key={role.slug} to={['virtual-medical-scribe','virtual-medical-receptionist'].includes(role.slug) ? `/${role.slug}/` : `/services/${role.slug}`} className={`vam-role-card vam-role-${role.theme}`}>
                <div className="vam-role-copy">
                  <span className="vam-role-brand">VAM / SPECIALIZED SUPPORT</span>
                  <h3>{role.title}</h3>
                  <p>{role.tagline}</p>
                  <span className="vam-role-button">View service</span>
                </div>
                <div className={`vam-role-portrait ${['virtual-medical-coder', 'remote-patient-monitoring-support'].includes(role.slug) ? 'vam-role-portrait-wide' : ''}`}><img src={role.heroImage} alt={role.portraitAlt} loading="lazy" /></div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/services" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white transition-all" style={{ background: '#1B3A7A' }} onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#0F2456' }} onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#1B3A7A' }}>
              View All 18 Services →
            </Link>
          </div>
        </div>
      </section>

      {/* Healthcare-trained support */}
      <section className="overflow-hidden px-4 py-20 lg:py-24" style={{ background: 'linear-gradient(160deg, #EAF4FD 0%, #F8FBFD 70%, #FFFFFF 100%)' }} aria-labelledby="trained-assistant-heading">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16">
          <div className="relative mx-auto w-full max-w-[560px] lg:mx-0" aria-label="Virtual Assistant Medical team member working at a laptop">
            <div className="absolute bottom-[5%] left-[4%] h-[74%] w-[76%] rounded-t-[140px] bg-[#0F315A]" />
            <div className="absolute right-[8%] top-[10%] h-[72%] w-[46%] rounded-t-[96px] bg-[#27C4BB]" />
            <div className="absolute bottom-[5%] right-[8%] h-[28%] w-[20%] bg-[#B8E9E1]" />
            <img src={trainedAssistant} alt="A medical virtual assistant with a headset and laptop" loading="lazy" className="relative z-10 block h-auto w-full object-contain" />
            <div className="absolute bottom-[6%] left-[7%] z-20 rounded-2xl border border-white/60 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm">
              <span className="block text-sm font-extrabold tracking-widest text-[#1B3A7A]">VAM</span>
              <span className="block text-xs font-medium text-[#148F95]">Virtual Assistant Medical</span>
            </div>
          </div>
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#178F91]">The VAM Approach</p>
            <h2 id="trained-assistant-heading" className="mb-6 text-4xl font-extrabold leading-tight text-[#0B2C48] sm:text-5xl" style={{ fontFamily: 'Outfit, sans-serif' }}>Trained for Healthcare.<br /><span className="text-[#20B9B0]">Ready for Your Practice.</span></h2>
            <p className="mb-8 text-lg leading-relaxed text-[#35536B]">Great support starts with understanding your practice. Virtual Assistant Medical focuses on the tools, communication style, and daily priorities your team uses, so your assistant can help keep administration organized and patient interactions clear.</p>
            <p className="mb-4 font-bold text-[#0B2C48]">We focus on the details that matter:</p>
            <ul className="space-y-3.5">
              {['Patient privacy and access approved by your practice', 'Medical terminology and accurate documentation', 'Scheduling and your EHR or practice systems', 'Warm, professional patient communication', 'Clear escalation for time-sensitive requests'].map(item => (
                <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-[#173C59] sm:text-lg">
                  <svg className="mt-1 h-5 w-5 shrink-0 rounded-full bg-[#13B6B0] p-0.5 text-white" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Healthcare specialties */}
      <section id="specialties" className="relative px-4 pt-20 pb-12 lg:pt-24 lg:pb-16" style={{ background: 'linear-gradient(160deg, #ECF7F7 0%, #F6FAF8 75%)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-12 lg:mb-8">
            <p className="text-sm font-bold tracking-[0.16em] uppercase mb-3" style={{ color: '#178F91' }}>Virtual Medical Assistant Services</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-5" style={{ color: '#0F2456' }}>
              Healthcare Virtual Assistants<br className="hidden sm:block" /> for Every Specialty
            </h2>
            <p className="text-base lg:text-lg leading-relaxed text-slate-600">
              From independent practices to larger care teams, administrative support can be shaped around your specialty, systems, and patient communication workflow.
            </p>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] items-center gap-8 lg:gap-16">
            <div className="max-w-lg w-full mx-auto lg:ml-auto lg:mr-0 pb-2 lg:pb-0">
              <ul className="divide-y divide-[#D4E5E4] border-y border-[#D4E5E4]">
                {SPECIALTIES.map(specialty => (
                  <li key={specialty.label} className="flex items-center gap-4 py-3.5 sm:py-4 text-[#0F3452] font-semibold text-base">
                    <span className="w-9 h-9 text-[#71999B] grid place-items-center shrink-0" aria-hidden="true"><SpecialtyIcon name={specialty.icon} /></span>
                    <span>{specialty.label}</span>
                  </li>
                ))}
              </ul>
              <Link to="/#contact" className="inline-flex items-center justify-center mt-8 px-7 py-3.5 rounded-xl bg-[#1B3A7A] hover:bg-[#0F2456] text-white font-bold shadow-lg transition-colors">
                Find the Right Support for Your Practice →
              </Link>
            </div>

            <div className="relative w-full max-w-[720px] min-w-0 mx-auto" aria-label="Medical virtual assistant supporting a healthcare practice">
              <div className="absolute w-[76%] aspect-square rounded-full bg-[#DCEBEA] bottom-[4%] left-[12%]" />
              <div className="absolute w-[62%] aspect-square rounded-full border-[24px] border-white/50 bottom-[10%] left-[19%]" />
              <img src={specialtiesAssistant} alt="Medical virtual assistant wearing a headset and working at a complete laptop" loading="lazy" className="relative z-10 block w-full h-auto" />

              <AppointmentCalendar />
              <div className="relative z-20 w-full max-w-xs mx-auto mt-3 sm:mt-0 sm:absolute sm:right-0 sm:top-[48%] sm:w-[164px] rounded-2xl bg-white/95 border border-[#D6E8E7] shadow-xl px-4 py-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1B3A7A]"><span className="w-2.5 h-2.5 rounded-full bg-[#2DC5B0]" /> Patient coordination</div>
                <p className="text-xs text-slate-600 mt-1">Organized follow-up</p>
              </div>
              <div className="relative z-20 w-full max-w-xs mx-auto mt-3 sm:mt-0 sm:absolute sm:right-0 sm:top-[8%] sm:w-[190px] rounded-2xl bg-white/95 border border-[#D6E8E7] shadow-xl p-2.5">
                <div className="flex items-center gap-2 px-1 pb-2 text-xs font-bold text-[#1B3A7A]">
                  <span className="w-7 h-7 rounded-lg bg-[#DFF6F3] text-[#168F8A] grid place-items-center" aria-hidden="true">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4 4L19 6" /><rect x="2" y="2" width="20" height="20" rx="4" /></svg>
                  </span>
                  Administrative Coverage
                </div>
                <div className="rounded-xl px-4 py-3 text-white" style={{ background: 'linear-gradient(135deg, #1B3A7A, #149F9D)' }}>
                  <p className="text-xs font-semibold text-white/85">Tasks Handled</p>
                  <div className="flex items-end justify-between gap-2 mt-1">
                    <strong className="text-3xl font-extrabold leading-none" style={{ fontFamily: 'Outfit, sans-serif' }}>100%</strong>
                    <svg className="w-6 h-6 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 16l6-6 4 4 6-7M16 7h4v4" /></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-20 px-4" style={{ background: '#F0F4FF' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4" style={{ background: 'rgba(45,197,176,0.15)', color: '#1FA898' }}>Why Virtual Assistant Medical</div>
              <h2 className="text-3xl lg:text-4xl font-extrabold mb-6" style={{ fontFamily: 'Outfit, sans-serif', color: '#1B3A7A' }}>
                We Don't Just Fill a Seat.<br /><span style={{ color: '#2DC5B0' }}>We Transform Your Practice.</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">Unlike generic staffing agencies, every VAM assistant is trained exclusively in healthcare. They arrive knowing your EHR, your specialty terminology, and your patients' expectations.</p>

              {/* Inline photo — doctor consulting */}
              <div className="rounded-2xl overflow-hidden mb-8 relative" style={{ height: '220px', boxShadow: '0 12px 40px rgba(27,58,122,0.15)' }}>
                <img
                  src="https://images.unsplash.com/photo-1758691463620-188ca7c1a04f?w=700&h=440&fit=crop&auto=format&q=85"
                  alt="Doctor consulting patient via video call"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(27,58,122,0.6) 0%, transparent 50%)' }} />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-xs font-semibold opacity-80">Real-time remote support</div>
                  <div className="text-sm font-bold">Just like having an in-office team member</div>
                </div>
              </div>

              <Link to="/#contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-bold text-sm transition-all" style={{ background: '#1B3A7A' }} onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#0F2456' }} onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#1B3A7A' }}>
                Book a Free Consultation →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {WHY.map(w => (
                <div key={w.title} className="bg-white p-5 rounded-2xl" style={{ boxShadow: '0 2px 16px rgba(27,58,122,0.08)' }}>
                  <div className="text-2xl mb-3">{w.icon}</div>
                  <h4 className="font-bold text-sm mb-1.5" style={{ fontFamily: 'Outfit, sans-serif', color: '#1B3A7A' }}>{w.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EHR platforms */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">Our VAs are proficient in 20+ EHR / EMR platforms</p>
          <div className="flex flex-wrap justify-center gap-3">
            {EHRS.map(ehr => (
              <span key={ehr} className="px-4 py-2 rounded-full text-xs font-semibold border border-gray-200 text-gray-600 hover:border-teal-300 hover:text-teal-700 transition-colors cursor-default">{ehr}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Combined practice support and consultation banner */}
      <section id="practice-support" className="bg-white px-4 py-16 lg:py-20" aria-labelledby="practice-support-heading">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[28px] border border-[#9CDED6] bg-gradient-to-br from-[#E8F8F5] to-[#C4EEEA] lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative order-2 mx-auto flex w-full max-w-[480px] items-end justify-center px-6 pt-6 lg:order-1 lg:pt-10">
            <div aria-hidden="true" className="absolute bottom-0 left-[15%] h-[80%] w-[70%] rotate-[-8deg] rounded-t-[140px] bg-[#12AAA7]" />
            <div aria-hidden="true" className="absolute bottom-[10%] right-[8%] h-40 w-40 rounded-full border-[14px] border-[#F3D78B]/80" />
            <img src={practiceSupportAssistant} alt="A VAM virtual assistant wearing a headset and welcoming new practices" loading="lazy" className="relative z-10 block h-[360px] w-full object-contain object-bottom sm:h-[420px] lg:h-[490px]" />
          </div>
          <div className="order-1 px-6 py-10 sm:px-10 lg:order-2 lg:px-12 lg:py-14">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#087E80]">Virtual Assistant Medical · Support that fits</p>
            <h2 id="practice-support-heading" className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-[#0D2C4E] sm:text-4xl lg:text-5xl" style={{ fontFamily: 'Outfit, sans-serif' }}>Your Practice. Your Priorities.<br /><span className="text-[#087E80]">The Right Remote Support.</span></h2>
            <p className="mb-4 text-base leading-relaxed text-[#315268] sm:text-lg">From independent clinics to growing healthcare teams across the United States, Virtual Assistant Medical helps make busy days more manageable. Our medical virtual assistants support scheduling, patient communication, documentation, and billing coordination within your practice’s workflow.</p>
            <p className="mb-7 text-base leading-relaxed text-[#315268]">Tell us about your specialty, coverage hours, and administrative workload. We’ll help you explore the right support plan, discuss the 40-hour free trial, and review any further discounts available for your needs.</p>
            <a href="#contact" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#087E80] px-7 py-4 text-center font-bold text-white transition-colors hover:bg-[#0D2C4E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0D2C4E]">Contact Us for Further Discounts</a>
            <p className="mt-4 text-sm text-[#315268]">Let’s find a support plan that works for your practice.</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4" style={{ background: '#E6FFF8', color: '#1FA898' }}>Transparent Pricing</div>
            <h2 className="text-3xl lg:text-5xl font-extrabold mb-4" style={{ fontFamily: 'Outfit, sans-serif', color: '#1B3A7A' }}>One Flat Rate. <span style={{ color: '#2DC5B0' }}>No Surprises.</span></h2>
            <p className="text-gray-500 text-lg">No setup fees. No training fees. No contracts. Cancel anytime.</p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
            <div className="p-10 text-center text-white" style={{ background: 'linear-gradient(135deg, #1B3A7A, #2A4E9C)' }}>
              <div className="text-lg font-semibold text-blue-200 mb-2">Starting at</div>
              <div className="flex items-end justify-center gap-2">
                <span className="text-7xl font-extrabold" style={{ fontFamily: 'Outfit, sans-serif', color: '#2DC5B0' }}>$9.50</span>
                <span className="text-xl text-blue-200 mb-4">/hour</span>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 p-8 bg-white">
              {['✅ Trained, healthcare-experienced VA', '✅ Dedicated account manager', '✅ Access to approved tools & systems', '✅ Free standby VA included', '✅ Flexible hours & instant scaling', '✅ No setup or training fees', '✅ Access agreement included', '✅ 40-hour free trial to start'].map(item => (
                <div key={item} className="flex items-center gap-3 text-sm font-medium text-gray-700">{item}</div>
              ))}
            </div>
            <div className="px-8 pb-8 text-center">
              <a href="#contact" className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-lg text-white transition-all" style={{ background: '#2DC5B0' }} onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#1FA898' }} onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#2DC5B0' }}>
                Get Started — 40 Hours Free →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 px-4" style={{ background: '#F0F4FF' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-4" style={{ fontFamily: 'Outfit, sans-serif', color: '#1B3A7A' }}>
              In-House Staff vs. <span style={{ color: '#2DC5B0' }}>Virtual Assistant Medical</span>
            </h2>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100">
            <div className="grid grid-cols-3 text-sm font-bold uppercase tracking-wider text-center">
              <div className="p-4 bg-gray-100 text-gray-500">Feature</div>
              <div className="p-4 bg-gray-200 text-gray-600">In-House Staff</div>
              <div className="p-4 text-white" style={{ background: '#1B3A7A' }}>Virtual Assistant Medical</div>
            </div>
            {COMPARISON.map((row, i) => (
              <div key={row.feature} className={`grid grid-cols-3 text-sm text-center ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <div className="p-4 font-semibold text-gray-700 border-r border-gray-100">{row.feature}</div>
                <div className="p-4 text-gray-500 border-r border-gray-100">{row.inHouse}</div>
                <div className="p-4 font-semibold" style={{ color: '#1B3A7A' }}>{row.vam}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose Virtual Assistant Medical */}
      <section className="relative isolate overflow-hidden bg-[#0BAEAA] px-4 py-20 lg:py-24" aria-labelledby="why-choose-heading">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <svg className="absolute left-[3%] top-[12%] h-28 w-28 text-white/55" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3"><path d="M38 4h24v34h34v24H62v34H38V62H4V38h34V4Z" /></svg>
          <svg className="absolute right-[18%] top-[8%] h-36 w-36 rotate-[-16deg] text-white/25" viewBox="0 0 100 100" fill="currentColor"><path d="M38 4h24v34h34v24H62v34H38V62H4V38h34V4Z" /></svg>
          <svg className="absolute bottom-[12%] left-[1%] h-10 w-10 text-white/80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinejoin="round"><path d="M38 4h24v34h34v24H62v34H38V62H4V38h34V4Z" /></svg>
          <img src={whyAssistant} alt="" className="hidden lg:block absolute bottom-[-5%] right-[-2%] h-[96%] max-w-none object-contain object-bottom opacity-90" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1680px]">
          <h2 id="why-choose-heading" className="mb-12 text-center text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:mb-16 lg:text-6xl" style={{ fontFamily: 'Outfit, sans-serif' }}>Why Choose Medical Virtual Assistant?</h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-6 xl:gap-6">
            {WHY_CHOOSE.map(({ title, icon }) => (
              <div key={title} className="flex min-h-48 flex-col items-center justify-center gap-5 rounded-[26px] border border-white/80 bg-white px-4 py-8 text-center shadow-[0_16px_35px_rgba(6,71,91,0.12)] sm:min-h-56 sm:px-6">
                <img src={icon} alt="" className="h-20 w-20 object-contain" />
                <h3 className="text-lg font-semibold leading-snug text-[#0B2945] sm:text-xl" style={{ fontFamily: 'Outfit, sans-serif' }}>{title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How VAM supports your practice */}
      <section id="practice-benefits" aria-labelledby="practice-benefits-heading" className="relative overflow-hidden bg-[#0D254B] px-5 py-20 text-white lg:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-48 h-[480px] w-[480px] rounded-full border border-[#2DC5B0]/15" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-64 -left-44 h-[480px] w-[480px] rounded-full border border-[#2DC5B0]/10" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
            <div className="mb-5 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-[#60DECA]">
              <span className="h-px w-8 bg-[#2DC5B0]" aria-hidden="true" />The VAM advantage<span className="h-px w-8 bg-[#2DC5B0]" aria-hidden="true" />
            </div>
            <h2 id="practice-benefits-heading" className="mb-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl" style={{ fontFamily: 'Outfit, sans-serif' }}>Less Admin. <span className="text-[#2DC5B0]">More Room for Care.</span></h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#C2D3E7] sm:text-lg">A busy practice needs more than an extra pair of hands. Virtual Assistant Medical brings structure, follow-through, and personal support to the work behind every patient visit.</p>
          </div>
          <div className="grid gap-x-12 md:grid-cols-2 lg:gap-x-16">
            {PRACTICE_BENEFITS.map(benefit => (
              <div key={benefit.title} className="flex gap-5 border-b border-white/15 py-7 first:pt-0 md:[&:nth-child(2)]:pt-0 lg:py-8">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#4DD9C6]/25 bg-[#2DC5B0]/15 text-[#60DECA]">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={benefit.path} /></svg>
                </span>
                <div><h3 className="mb-3 text-xl font-bold leading-snug" style={{ fontFamily: 'Outfit, sans-serif' }}>{benefit.title}</h3><p className="text-sm leading-7 text-[#C2D3E7] sm:text-base">{benefit.copy}</p></div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/#contact" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#2DC5B0] px-8 py-4 font-bold text-[#0D254B] transition-colors hover:bg-[#60DECA] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#60DECA]">Find the Right Support for Your Practice</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4" style={{ background: '#E6FFF8', color: '#1FA898' }}>Testimonials</div>
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-3" style={{ fontFamily: 'Outfit, sans-serif', color: '#1B3A7A' }}>
              Loved by Healthcare Professionals <span style={{ color: '#2DC5B0' }}>Nationwide</span>
            </h2>
          </div>
          <ReviewSlider reviews={TESTIMONIALS}/>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4" style={{ background: '#F0F4FF' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-3" style={{ fontFamily: 'Outfit, sans-serif', color: '#1B3A7A' }}>
              Frequently Asked <span style={{ color: '#2DC5B0' }}>Questions</span>
            </h2>
          </div>
          <div className="space-y-3">{FAQS.map(faq => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)}</div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4" style={{ background: '#E6FFF8', color: '#1FA898' }}>Get Started Today</div>
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-6" style={{ fontFamily: 'Outfit, sans-serif', color: '#1B3A7A' }}>
              Let's Make Healthcare<br /><span style={{ color: '#2DC5B0' }}>Administration Easier</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">Tell us about your practice and the support you need. The form opens an email draft for you to review and send.</p>
            <div className="space-y-4">
              {[{ icon: '📧', label: 'Email', value: 'info@virtualassistantmedical.com' }, { icon: '🏥', label: 'Focus', value: 'Remote administrative support for medical practices' }].map(c => (
                <div key={c.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: '#E6FFF8' }}>{c.icon}</div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">{c.label}</div>
                    <div className="font-semibold text-gray-800">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&h=280&fit=crop&auto=format" alt="Healthcare team collaboration" className="rounded-2xl w-full object-cover" style={{ height: '220px' }} />
            </div>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-gray-100" style={{ boxShadow: '0 8px 40px rgba(27,58,122,0.10)' }}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-extrabold mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#1B3A7A' }}>Tell Us About Your Practice</h3>
                <p className="text-sm text-gray-500 mb-4">Share your needs and we can discuss the right support.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">Full Name *</label>
                    <input required id="contact-name" autoComplete="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:border-teal-400 transition-all" placeholder="Dr. Jane Smith" />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">Phone *</label>
                    <input required id="contact-phone" type="tel" autoComplete="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:border-teal-400 transition-all" placeholder="(555) 000-0000" />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-email" className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">Email Address *</label>
                  <input required id="contact-email" type="email" autoComplete="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:border-teal-400 transition-all" placeholder="doctor@practice.com" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-zip" className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">Practice Zip Code</label>
                    <input id="contact-zip" autoComplete="postal-code" value={formData.zip} onChange={e => setFormData({ ...formData, zip: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:border-teal-400 transition-all" placeholder="90210" />
                  </div>
                  <div>
                    <label htmlFor="contact-service" className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">Service Needed</label>
                    <select id="contact-service" value={formData.service} onChange={e => setFormData({ ...formData, service: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:border-teal-400 transition-all bg-white">
                      <option value="">Select...</option>
                      {SERVICES.map(s => <option key={s.slug} value={s.slug}>{s.shortTitle}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-message" className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">Tell Us About Your Practice</label>
                  <textarea id="contact-message" rows={3} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:border-teal-400 transition-all resize-none" placeholder="Specialty, current challenges, number of providers..." />
                </div>
                <button type="submit" className="w-full py-3.5 rounded-xl text-white font-bold text-base transition-all" style={{ background: '#2DC5B0' }} onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.background = '#1FA898' }} onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.background = '#2DC5B0' }}>
                  Open Email to Send Inquiry →
                </button>
                <p className="text-xs text-gray-400 text-center">This opens your email app. Your inquiry is sent only when you send the email. Please do not include patient information.</p>
              </form>
          </div>
        </div>
      </section>
    </div>
  )
}
