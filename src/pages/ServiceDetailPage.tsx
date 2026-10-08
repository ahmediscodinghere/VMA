import ServiceFAQs, { sixServiceFAQs } from '../components/ServiceFAQs'
import { useParams, Link, Navigate } from 'react-router'

import { getServiceBySlug, SERVICES } from '../data/services'

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const service = getServiceBySlug(slug ?? '')

  if (!service) return <Navigate to="/services" replace />

  const related = service.relatedSlugs.map(s => SERVICES.find(sv => sv.slug === s)).filter(Boolean)

  return (
    <div>
      {/* Hero */}
      <section className="hero-bg text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10" style={{ background: '#2DC5B0', transform: 'translate(30%, -30%)' }}></div>
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-blue-300 mb-8">
            <Link to="/" className="hover:text-teal-400 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-teal-400 transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white">{service.shortTitle}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6"
                style={{ background: 'rgba(45,197,176,0.2)', color: '#4DD9C6' }}
              >
                {service.icon} {service.shortTitle}
              </div>
              <h1
                className="text-3xl lg:text-5xl font-extrabold mb-6 leading-tight"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                {service.title}
              </h1>
              <p className="text-blue-200 text-lg mb-6 italic">{service.tagline}</p>
              {service.heroDescription.map((p, i) => (
                <p key={i} className="text-blue-200 leading-relaxed mb-4 text-sm">{p}</p>
              ))}
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Link
                  to="/#contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white transition-all"
                  style={{ background: '#2DC5B0' }}
                  onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#1FA898' }}
                  onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#2DC5B0' }}
                >
                  Book a Free Consultation
                </Link>
                <Link
                  to="/#contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold border-2 border-white border-opacity-30 hover:border-opacity-60 transition-all"
                >
                  Talk to Our Team
                </Link>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="rounded-2xl overflow-hidden" style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.3)' }}>
                <img
                  src={service.heroImage}
                  alt={service.title}
                  className={`w-full h-80 ${'portraitAlt' in service ? 'object-contain object-bottom' : 'object-cover'}`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl lg:text-3xl font-extrabold mb-6" style={{ fontFamily: 'Outfit, sans-serif', color: '#1B3A7A' }}>
            {service.overviewHeading}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">{service.overviewBody}</p>
        </div>
      </section>

      {/* What we help with */}
      <section className="py-16 px-4" style={{ background: '#F0F4FF' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-extrabold mb-10 text-center" style={{ fontFamily: 'Outfit, sans-serif', color: '#1B3A7A' }}>
            What We Can Help With
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.tasks.map(task => (
              <div
                key={task}
                className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 hover:border-teal-200 transition-colors group"
                style={{ boxShadow: '0 2px 8px rgba(27,58,122,0.05)' }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: '#E6FFF8' }}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="#2DC5B0" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700 leading-snug">{task}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-extrabold mb-10 text-center" style={{ fontFamily: 'Outfit, sans-serif', color: '#1B3A7A' }}>
            Why Practices Delegate {service.shortTitle}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.benefits.map(b => (
              <div
                key={b.title}
                className="p-6 rounded-2xl border border-gray-100 hover:border-teal-200 transition-all service-card"
                style={{ boxShadow: '0 2px 12px rgba(27,58,122,0.06)' }}
              >
                <div className="text-3xl mb-4">{b.icon}</div>
                <h3 className="font-bold text-base mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#1B3A7A' }}>{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4" style={{ background: '#F0F4FF' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-extrabold mb-12 text-center" style={{ fontFamily: 'Outfit, sans-serif', color: '#1B3A7A' }}>
            How the Service Works
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div
              className="hidden lg:block absolute top-6 left-0 right-0 h-0.5"
              style={{ background: 'linear-gradient(to right, #2DC5B0, #1B3A7A)', zIndex: 0 }}
            ></div>
            <div className="grid lg:grid-cols-5 gap-6 relative z-10">
              {service.steps.map((step, i) => (
                <div key={step.title} className="flex flex-col items-center text-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-extrabold text-lg mb-4 flex-shrink-0"
                    style={{ background: i === 0 ? '#2DC5B0' : '#1B3A7A', fontFamily: 'Outfit, sans-serif' }}
                  >
                    {i + 1}
                  </div>
                  <h4 className="font-bold text-sm mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#1B3A7A' }}>{step.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-extrabold mb-8 text-center" style={{ fontFamily: 'Outfit, sans-serif', color: '#1B3A7A' }}>
            Who This Service Is For
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {service.audiences.map(a => (
              <span
                key={a}
                className="px-5 py-2.5 rounded-full text-sm font-semibold border-2"
                style={{ borderColor: '#1B3A7A', color: '#1B3A7A' }}
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Compatibility */}
      <section className="py-16 px-4" style={{ background: '#F0F4FF' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-extrabold mb-4 text-center" style={{ fontFamily: 'Outfit, sans-serif', color: '#1B3A7A' }}>
            Tools & Workflow Compatibility
          </h2>
          <p className="text-gray-600 text-center mb-8 text-sm">
            Our virtual assistants work within your practice's approved systems and workflows — adapting to your environment rather than requiring you to change.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '🏥', label: 'EHR / EMR Platforms' },
              { icon: '📅', label: 'Practice Management Systems' },
              { icon: '💬', label: 'Secure Communication Tools' },
              { icon: '📧', label: 'Email & Productivity Platforms' },
              { icon: '📋', label: 'Scheduling Platforms' },
              { icon: '🗂️', label: 'Document Management Systems' },
              { icon: '🖥️', label: 'CRM Systems' },
              { icon: '☁️', label: 'Cloud-Based Admin Tools' },
            ].map(t => (
              <div
                key={t.label}
                className="bg-white p-4 rounded-xl text-center border border-gray-100"
                style={{ boxShadow: '0 2px 8px rgba(27,58,122,0.05)' }}
              >
                <div className="text-2xl mb-2">{t.icon}</div>
                <div className="text-xs font-semibold text-gray-600">{t.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-2xl p-7 border-l-4"
            style={{ background: '#F0F4FF', borderColor: '#2DC5B0' }}
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl flex-shrink-0">🔒</div>
              <div>
                <h3 className="font-bold text-base mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#1B3A7A' }}>
                  Privacy, Access & Responsibility
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  All system access is role-based and authorized by your healthcare organization. Our virtual assistants perform only the administrative responsibilities explicitly approved by your practice — no more, no less.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {slug === 'prescription-refill-coordination'
                    ? 'Important: Our virtual assistants do not prescribe medications, approve refills, provide medical advice, or make any clinical decisions. All clinical review and authorization remains exclusively with your licensed providers.'
                    : 'Clinical decisions, medical advice, and regulated clinical activities remain the exclusive responsibility of your licensed providers. Our VAs provide administrative support only.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceFAQs items={sixServiceFAQs(service.faqs,service.title)} schema/>

      {/* Related services */}
      {related.length > 0 && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-extrabold mb-8 text-center" style={{ fontFamily: 'Outfit, sans-serif', color: '#1B3A7A' }}>
              You May Also Need
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map(rel => rel && (
                <Link
                  key={rel.slug}
                  to={`/services/${rel.slug}`}
                  className="group p-5 rounded-2xl border border-gray-100 bg-white hover:border-teal-200 transition-all service-card block"
                  style={{ boxShadow: '0 2px 12px rgba(27,58,122,0.06)' }}
                >
                  <div className="text-2xl mb-3 w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: '#E6FFF8' }}>
                    {rel.icon}
                  </div>
                  <h3 className="font-bold text-sm mb-2 group-hover:text-teal-600 transition-colors" style={{ fontFamily: 'Outfit, sans-serif', color: '#1B3A7A' }}>
                    {rel.shortTitle}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{rel.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-20 px-4 hero-bg text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Ready to Simplify Your Practice's<br />
            <span style={{ color: '#2DC5B0' }}>Administrative Workflow?</span>
          </h2>
          <p className="text-blue-200 text-lg mb-8">
            Tell us where your team needs support and discover how Virtual Assistant Medical can help organize your day-to-day administrative workload.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-lg text-white transition-all"
              style={{ background: '#2DC5B0' }}
              onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#1FA898' }}
              onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#2DC5B0' }}
            >
              Book a Free Consultation →
            </Link>
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-semibold border-2 border-white border-opacity-30 hover:border-opacity-60 transition-all"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

