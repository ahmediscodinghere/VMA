import { useState, useEffect } from 'react'
import { Link, useLocation, Outlet } from 'react-router'
import logoImg from '../assets/logo1.png'
import { SERVICES } from '../data/services'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About Us', to: '/about-us/' },
  { label: 'Why Choose Us', to: '/#why-us' },
  { label: 'Specialties', to: '/#specialties' },
  { label: 'Contact', to: '/contact-us/' },
]

const FOOTER_COMPANY = ['Home', 'About Us', 'Services', 'Why Choose Us', 'Contact', "FAQ’s", 'Pricing']
const FOOTER_SERVICES_1 = SERVICES.slice(0, 8)

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const location = useLocation()

  const isActive = (to: string) => location.pathname === to || (to !== '/' && location.pathname.startsWith(to + '/'))

  useEffect(() => {
    if (location.hash) {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)))
      if (target) requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth' }))
    } else {
      window.scrollTo(0, 0)
    }
  }, [location.pathname, location.hash])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top bar */}
      <div className="hidden md:block text-xs py-2 px-6 text-white" style={{ background: '#0F2456' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span>Medical practice support</span>
            <span>Remote healthcare administration</span>
          </div>
          <span className="text-blue-300">Scheduling &bull; Patient coordination &bull; Documentation</span>
        </div>
      </div>

      {/* Nav */}
      <nav
        className="sticky top-0 z-50 bg-white border-b border-gray-100"
        style={{ boxShadow: '0 2px 16px rgba(27,58,122,0.08)' }}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-6 h-20 flex items-center justify-between">
          {/* Logo — enlarged */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="brand-logo-crop"><img src={logoImg} alt="Virtual Assistant Medical" /></span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden xl:flex items-center gap-1 text-sm font-medium text-gray-700">
            {NAV_LINKS.map(link =>
              link.label === 'Services' ? (
                <div
                  key="services"
                  className="relative"
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}
                >
                  <button
                    className={`px-3 py-2 rounded-lg flex items-center gap-1 transition-colors ${isActive('/services') ? 'text-teal-600 bg-teal-50' : 'hover:text-teal-600 hover:bg-gray-50'}`}
                    style={{ color: isActive('/services') ? '#2DC5B0' : undefined }}
                  >
                    Services
                    <svg className="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>

                  {/* Mega menu */}
                  {megaOpen && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 w-[720px]"
                      style={{ boxShadow: '0 20px 60px rgba(27,58,122,0.15)' }}
                    >
                      <div className="mb-4 pb-3 border-b border-gray-100">
                        <Link
                          to="/services"
                          className="inline-flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-lg transition-colors"
                          style={{ color: '#1B3A7A' }}
                          onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#F0F4FF' }}
                          onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent' }}
                        >
                          View All Services →
                        </Link>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        {SERVICES.map(s => (
                          <Link
                            key={s.slug}
                            to={`/services/${s.slug}`}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-gray-700 hover:bg-teal-50 transition-colors group"
                            onClick={() => setMegaOpen(false)}
                          >
                            <span className="text-base flex-shrink-0">{s.icon}</span>
                            <span className="group-hover:text-teal-700 font-medium leading-tight">{s.shortTitle}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`px-3 py-2 rounded-lg transition-colors ${isActive(link.to) ? 'text-teal-600 bg-teal-50' : 'hover:text-teal-600 hover:bg-gray-50'}`}
                  style={{ color: isActive(link.to) ? '#2DC5B0' : undefined }}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          <div className="hidden xl:flex items-center gap-3">
            <Link
              to="/services"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all"
              style={{ borderColor: '#1B3A7A', color: '#1B3A7A' }}
              onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#1B3A7A'; (e.currentTarget as HTMLAnchorElement).style.color = 'white' }}
              onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = '#1B3A7A' }}
            >
              Explore Services
            </Link>
            <Link
              to="/contact-us/"
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all whitespace-nowrap"
              style={{ background: '#2DC5B0' }}
              onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#1FA898' }}
              onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#2DC5B0' }}
            >
              Book a Free Consultation
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="xl:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu" aria-expanded={mobileOpen} aria-controls="mobile-menu"
          >
            <div className={`w-6 h-0.5 bg-gray-700 transition-all mb-1.5 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-gray-700 transition-all mb-1.5 ${mobileOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-gray-700 transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div id="mobile-menu" className="xl:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1 text-sm font-medium">
            <Link to="/" className="block px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700" onClick={() => setMobileOpen(false)}>Home</Link>

            {/* Mobile services accordion */}
            <div>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                aria-expanded={mobileServicesOpen}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700"
              >
                <span>Services</span>
                <svg className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {mobileServicesOpen && (
                <div className="pl-4 mt-1 space-y-0.5">
                  <Link to="/services" className="block px-3 py-2 rounded-lg text-teal-600 font-semibold hover:bg-teal-50 text-xs" onClick={() => setMobileOpen(false)}>
                    → View All Services
                  </Link>
                  {SERVICES.map(s => (
                    <Link
                      key={s.slug}
                      to={`/services/${s.slug}`}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-600 text-xs"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span>{s.icon}</span>
                      <span>{s.shortTitle}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/about-us/" className="block px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700" onClick={() => setMobileOpen(false)}>About Us</Link>
            {['Why Choose Us', 'Contact'].map(label => (
              <Link key={label} to={label === 'Contact' ? '/contact-us/' : label === 'FAQ’s' ? '/faqs/' : `/#${label.toLowerCase().replace(/\s+/g, '-')}`} className="block px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700" onClick={() => setMobileOpen(false)}>{label}</Link>
            ))}

            <div className="pt-3 flex flex-col gap-2">
              <Link
                to="/contact-us/"
                className="block text-center py-3 rounded-xl font-bold text-white text-sm"
                style={{ background: '#2DC5B0' }}
                onClick={() => setMobileOpen(false)}
              >
                Book a Free Consultation
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="text-white pt-16 pb-8 px-4" style={{ background: '#0F2456' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            {/* Brand col */}
            <div className="lg:col-span-2">
              <Link to="/" className="mb-5 inline-flex rounded-xl bg-white p-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300" aria-label="Virtual Assistant Medical home">
                <span className="brand-logo-crop"><img src={logoImg} alt="Virtual Assistant Medical logo" loading="lazy" /></span>
              </Link>
              <p className="text-blue-300 text-sm leading-relaxed mb-6">
                Virtual Assistant Medical supports healthcare teams with remote scheduling, patient coordination, and documentation, improving practice efficiency while easing administrative workloads.
              </p>
                  <a href="mailto:info@virtualassistantmedical.us" className="flex items-start gap-3 transition-colors hover:text-teal-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></svg>
                    <span className="break-all">info@virtualassistantmedical.us</span>
                  </a>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest text-white mb-5">Company</h4>
              <ul className="space-y-2.5 text-sm text-blue-300">
                {FOOTER_COMPANY.map(label => (
                  <li key={label}>
                    <Link
                      to={label === 'Home' ? '/' : label === 'Services' ? '/services' : label === 'About Us' ? '/about-us/' : label === 'Contact' ? '/contact-us/' : label === 'FAQ’s' ? '/faqs/' : label === 'Pricing' ? '/pricing/' : `/#${label.toLowerCase().replace(/\s+/g, '-')}`} 
                      className="hover:text-teal-400 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services col 1 */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest text-white mb-5">Services</h4>
              <ul className="space-y-2 text-sm text-blue-300">
                {FOOTER_SERVICES_1.map(s => (
                  <li key={s.slug}>
                    <Link to={`/services/${s.slug}`} className="hover:text-teal-400 transition-colors leading-snug block">
                      {s.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
                <h4 className="font-bold text-xs uppercase tracking-widest text-white mb-5">Support</h4>
                <address className="space-y-4 text-sm not-italic text-blue-100">
                  <a href="mailto:info@virtualassistantmedical.us" className="flex items-start gap-3 transition-colors hover:text-teal-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></svg>
                    <span className="break-all">info@virtualassistantmedical.us</span>
                  </a>
                  <p className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>
                    <span>Miami, Florida, USA</span>
                  </p>
                </address>
                <div className="mt-6 flex items-center gap-3" aria-label="Social media">
                  <span role="img" aria-label="Facebook" title="Facebook" className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white">
                    <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 22v-9h3l.5-4H14V7c0-1.2.4-2 2-2h2V1.4C17.1 1.1 16.1 1 15 1c-3 0-5 1.8-5 5v3H7v4h3v9h4Z"/></svg>
                  </span>
                  <span role="img" aria-label="Instagram" title="Instagram" className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white">
                    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
                  </span>
                  <span role="img" aria-label="LinkedIn" title="LinkedIn" className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white">
                    <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM2 9h4v13H2V9Zm7 0h4v2c.7-1.3 2-2.3 4-2.3 4 0 5 2.5 5 6V22h-4v-6.5c0-2-.3-3.2-2.2-3.2S13 13.7 13 15.5V22H9V9Z"/></svg>
                  </span>
                </div>

              </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-blue-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-400">
            <p>© {new Date().getFullYear()} Virtual Assistant Medical. All Rights Reserved.</p>

          </div>
        </div>
      </footer>

    </div>
  )
}
