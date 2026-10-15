import { useEffect } from 'react'
import { Link } from 'react-router'
import { policies, POLICY_EMAIL, type Policy } from '../data/legalPolicies'
import './PolicyPage.css'

function PolicyIcon({ kind }: { kind: Policy['icon'] }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === 'privacy' ? <><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z" /><rect x="8.5" y="10" width="7" height="6" rx="1.5" /><path d="M10 10V8a2 2 0 0 1 4 0v2" /></> : kind === 'terms' ? <><path d="M6 3h9l4 4v14H6Z" /><path d="M15 3v5h4M9 12h7M9 16h5" /></> : <><path d="M4 10h11a6 6 0 0 1 0 12M8 6l-4 4 4 4" /><path d="M14 3h6v11M11 5h5" /></>}
  </svg>
}

export default function PolicyPage({ policy }: { policy: Policy }) {
  const title = policy.title + ' | Virtual Assistant Medical'
  const url = 'https://virtual-assistant-medical.ahmed-raza276082.chatgpt.site/' + policy.slug + '/'
  useEffect(() => {
    const tags = Array.from(document.querySelectorAll<HTMLMetaElement>('meta[name="robots"]'))
    const previous = tags.map(t => t.content)
    tags.forEach(t => { t.content = 'index, follow' })
    return () => tags.forEach((t, i) => { t.content = previous[i] })
  }, [])
  return <div className="vam-policy">
    <title>{title}</title><meta name="description" content={policy.description} /><link rel="canonical" href={url} />
    <meta property="og:title" content={title} /><meta property="og:description" content={policy.description} /><meta property="og:url" content={url} /><meta property="og:type" content="website" />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebPage', name: policy.title, description: policy.description, url, dateModified: '2026-10-15', publisher: { '@type': 'Organization', name: 'Virtual Assistant Medical' } }) }} />
    <section className="policy-hero"><div className="policy-wrap">
      <nav className="policy-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">/</span><span>{policy.title}</span></nav>
      <div className="policy-hero-grid"><div><span className="policy-eyebrow">Virtual Assistant Medical · Policies</span><h1>{policy.title}</h1><p>{policy.intro}</p><div className="policy-updated"><span aria-hidden="true" /><span>Last updated <time dateTime="2026-10-15">October 15, 2026</time></span></div></div><div className="policy-hero-art" aria-hidden="true"><div className="policy-art-orbit" /><div className="policy-art-icon"><PolicyIcon kind={policy.icon} /></div><span>Clarity. Care. Confidence.</span></div></div>
    </div></section>
    <nav className="policy-switcher" aria-label="Policy pages"><div className="policy-wrap">{policies.map(p => <Link key={p.slug} to={'/' + p.slug + '/'} aria-current={p.slug === policy.slug ? 'page' : undefined}><PolicyIcon kind={p.icon} />{p.title}</Link>)}</div></nav>
    <div className="policy-wrap policy-layout">
      <aside className="policy-sidebar"><nav aria-label="On this page"><h2>On this page</h2><ol>{policy.sections.map((s, i) => <li key={s.id}><a href={'#' + s.id}><span>{String(i + 1).padStart(2, '0')}</span>{s.title}</a></li>)}</ol></nav><div className="policy-sidebar-help"><strong>A question about this policy?</strong><Link to="/contact-us/">Contact our team <span aria-hidden="true">↗</span></Link></div></aside>
      <div className="policy-document"><div className="policy-summary"><span className="policy-summary-icon"><PolicyIcon kind={policy.icon} /></span><div><strong>At a glance</strong><p>{policy.summary}</p></div></div>
        {policy.sections.map((s, i) => <section className="policy-section" id={s.id} key={s.id} aria-labelledby={s.id + '-heading'}><h2 id={s.id + '-heading'}><span>{String(i + 1).padStart(2, '0')}</span>{s.title}</h2>{s.content}</section>)}
        <div className="policy-contact"><div><span className="policy-eyebrow">We’re here to help</span><h2>Let’s clear things up.</h2><p>For privacy, service, or billing questions, include your practice name and the policy you’re asking about. Please leave out patient details.</p></div><a href={'mailto:' + POLICY_EMAIL}>{POLICY_EMAIL} <span aria-hidden="true">↗</span></a></div>
      </div>
    </div>
  </div>
}
