import { useState } from 'react'
import { Link } from 'react-router'
import ServiceFAQs from '../components/ServiceFAQs'
import './HipaaPage.css'

export const HIPAA_TITLE = 'HIPAA Compliant Virtual Assistant | VAM'
export const HIPAA_DESCRIPTION = 'Plan HIPAA compliant virtual assistant support with VAM. Explore patient privacy, approved access, BAA requirements and healthcare roles for your practice.'
const origin = 'https://virtual-assistant-medical.ahmed-raza276082.chatgpt.site'
const url = origin + '/hipaa-compliant-virtual-assistant/'
const guidance = {
  security: 'https://www.hhs.gov/hipaa/for-professionals/security/laws-regulations/index.html',
  baa: 'https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/business-associates/index.html',
  access: 'https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/minimum-necessary-requirement/index.html',
}
const roles = [
  ['Medical Receptionist', 'Appointment scheduling, approved reminders, and patient enquiries through your chosen channels.', '/virtual-medical-receptionist/', 'phone'],
  ['Medical Admin Assistant', 'Organize records, coordinate referrals, and maintain administrative queues within the assigned scope.', '/services/medical-admin-assistant/', 'file'],
  ['Medical Scribe', 'Support documentation under provider direction, with review and sign-off by the responsible clinician.', '/virtual-medical-scribe/', 'pen'],
  ['Medical Billing Assistant', 'Track claims, verify insurance details, and follow up on payments using approved billing procedures.', '/services/medical-billing-assistant/', 'wallet'],
  ['Medical Coder', 'Discuss coding credentials, specialty experience, and review requirements before assigning coding work.', '/services/virtual-medical-coder/', 'code'],
  ['Patient Coordination', 'Help organize follow-ups and route patient messages to the right team member for review.', '/services/', 'people'],
]
const safeguards = [
  ['Define access', 'Use individual accounts and permissions appropriate to the assigned responsibilities. Review access when duties change.', 'lock'],
  ['Prepare the workspace', 'Review approved devices, screen privacy, workstation security, and how information is stored or transmitted.', 'screen'],
  ['Choose communication channels', 'Agree which systems may carry patient information and how identity checks, messages, and handoffs are handled.', 'chat'],
  ['Document the response', 'Set a named escalation contact and procedures for reporting suspected incidents and reviewing access or workflow issues.', 'shield'],
]
const readiness = [
  'A defined task list and escalation contact',
  'Applicable Business Associate Agreement requirements',
  'Approved devices, systems, and access permissions',
  'Role-specific privacy and security instructions',
  'Patient communication and identity-check procedures',
  'A review routine and incident-reporting process',
]
const faqs = [
  { q: 'What is a HIPAA compliant virtual assistant?', a: 'The phrase describes remote support performed within applicable HIPAA obligations, agreements, safeguards, and documented procedures. It does not describe a single credential that makes every task compliant. Assess the actual role, information access, systems, and oversight before work begins.' },
  { q: 'Can a HIPAA virtual assistant access our EHR?', a: 'Access should be approved for the assigned role, using individual accounts and appropriate permissions. Your practice should review the platform, access procedures, and applicable agreements before patient information is shared.' },
  { q: 'Do we need a Business Associate Agreement?', a: 'A BAA is generally required when a business associate performs services involving protected health information for a covered entity. The arrangement and role determine the requirements; confirm them before access begins. HHS provides guidance on business associates and applicable exceptions.' },
  { q: 'How do I make a virtual assistant HIPAA compliant in my practice?', a: 'Start with the responsibilities and data the role needs. Review applicable agreements, provide privacy and security instructions, approve systems and permissions, and establish reporting and review procedures. Your compliance lead should evaluate the actual arrangement.' },
  { q: 'Are HIPAA compliant virtual assistants automatically certified by HHS?', a: 'HIPAA compliance should be evaluated through the actual arrangements, policies, and safeguards, rather than a general certification label. Ask what training, agreements, access controls, and review procedures apply to your proposed support role.' },
  { q: 'What tasks can an assistant handle?', a: 'Depending on the agreed scope and experience, support can include scheduling, patient coordination, administrative records, documentation assistance, billing follow-ups, or coding. Clinical decisions and final approvals remain with the appropriately authorized professionals.' },
  { q: 'What happens if we suspect a privacy or security incident?', a: 'Use the agreed reporting channel promptly and involve the responsible privacy or security contact. Follow documented procedures to assess the issue, manage access, and determine the appropriate response and any applicable obligations.' },
  { q: 'How do we start with VAM?', a: 'Share your tasks, systems, preferred hours, and privacy requirements without sending patient details in the initial enquiry. VAM can discuss the support role, onboarding needs, and responsibilities to confirm before work begins. Support starts at $9.50 per hour; confirm full terms in your proposal.' },
]

function PrivacyIcon({ name }: { name: string }) {
  const paths: Record<string, string> = {
    shield: 'M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6z M8 12l3 3 5-6',
    lock: 'M8 11V7a4 4 0 0 1 8 0v4 M5 11h14v10H5z M12 15v3',
    screen: 'M3 4h18v13H3z M8 21h8 M12 17v4',
    chat: 'M4 4h16v12H9l-5 4z M8 8h8 M8 12h5',
    file: 'M5 3h10l4 4v14H5z M15 3v5h4 M8 12h8 M8 16h6',
    pen: 'm4 16 12-12 4 4L8 20H4z M14 6l4 4',
    phone: 'M7 3H4a1 1 0 0 0-1 1c0 9 8 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a15 15 0 0 1-7-7l2-2z',
    wallet: 'M3 5h17v15H3z M3 9h17 M15 12h6v5h-6z',
    code: 'm8 7-5 5 5 5 M16 7l5 5-5 5 M14 4l-4 16',
    people: 'M16 21v-3a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v3 M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8 M18 4a4 4 0 0 1 0 8 M19 15a4 4 0 0 1 3 4v2',
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.shield} /></svg>
}

export default function HipaaPage() {
  const [checked, setChecked] = useState<string[]>([])
  const toggle = (item: string) => setChecked(items => items.includes(item) ? items.filter(x => x !== item) : [...items, item])
  const pageSchema = { '@context': 'https://schema.org', '@type': 'WebPage', name: HIPAA_TITLE, description: HIPAA_DESCRIPTION, url, about: { '@type': 'Thing', name: 'HIPAA and remote healthcare administrative support' }, publisher: { '@type': 'Organization', name: 'Virtual Assistant Medical', url: origin } }
  const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: origin + '/' }, { '@type': 'ListItem', position: 2, name: 'HIPAA Compliant Virtual Assistant', item: url }] }
  return <main className="vam-hipaa">
    <title>{HIPAA_TITLE}</title><meta name="description" content={HIPAA_DESCRIPTION} /><link rel="canonical" href={url} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

    <section className="vh-hero"><div className="vh-wrap vh-hero-grid">
      <div className="vh-hero-copy"><nav className="vh-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/ Resources / HIPAA</span></nav><span className="vh-eyebrow">Patient privacy. Practical support.</span><h1>HIPAA Compliant<br />Virtual Assistant<br /><em>Support for Your Practice</em></h1><p>More help for your team starts with thoughtful handling of patient information. Build a remote support role around approved systems, clear responsibilities, and your practice’s privacy procedures.</p><div className="vh-actions"><Link className="vh-button" to="/contact-us/">Discuss Secure VA Support<PrivacyIcon name="chat" /></Link><a className="vh-link" href="#privacy-foundation">Explore the Safeguards →</a></div><div className="vh-hero-points"><span><PrivacyIcon name="lock" />Approved access</span><span><PrivacyIcon name="file" />Defined responsibilities</span><span><PrivacyIcon name="shield" />Clear escalation</span></div></div>
      <div className="vh-hero-visual"><div className="vh-photo-frame"><img src="/images/hipaa-vam-assistant.webp" alt="VAM-branded healthcare virtual assistant in navy scrubs working at a laptop" width="1536" height="1024" fetchPriority="high" /></div><div className="vh-photo-note"><span className="vh-icon"><PrivacyIcon name="shield" /></span><div><strong>Patient privacy belongs in every handoff.</strong><span>People · Systems · Procedures</span></div></div></div>
    </div></section>

    <section className="vh-section" id="privacy-foundation"><div className="vh-wrap"><div className="vh-intro vh-privacy-intro"><figure className="vh-section-photo vh-privacy-photo"><img src="/images/hipaa-privacy.webp" alt="Physician and VAM-branded coordinator reviewing a healthcare workflow together" width="1536" height="1024" loading="lazy"/><figcaption><span className="vh-icon"><PrivacyIcon name="shield"/></span><span><strong>Clear roles. Careful handoffs.</strong><span>Patient privacy starts with the workflow.</span></span></figcaption></figure><div><span className="vh-eyebrow">Start with the whole workflow</span><h2>What Makes a Virtual Assistant HIPAA Compliant?</h2><p>A HIPAA compliant virtual assistant works within applicable obligations, agreements, and safeguards for the tasks they perform. Compliance depends on how information is accessed, used, and protected throughout the arrangement.</p><p>VAM helps you define the support role and onboarding needs. Your practice’s compliance lead should review the actual workflow before protected health information (PHI) is shared.</p></div></div><div className="vh-foundations">{[['01', 'People', 'Clear roles, privacy instructions, and a named contact for questions.', 'people'], ['02', 'Systems', 'Approved tools and access matched to the work being delegated.', 'screen'], ['03', 'Procedures', 'Documented handoffs, review routines, and incident reporting.', 'file']].map(([number, title, text, icon]) => <article key={title}><span className="vh-foundation-number">{number}</span><span className="vh-icon"><PrivacyIcon name={icon} /></span><h3>{title}</h3><p>{text}</p></article>)}</div><p className="vh-source">Learn more: <a href={guidance.security} target="_blank" rel="noopener noreferrer">HHS overview of the HIPAA Security Rule</a></p></div></section>

    <section className="vh-section vh-mint"><div className="vh-wrap"><div className="vh-heading"><span className="vh-eyebrow">Front desk to back office</span><h2>HIPAA Virtual Assistant Roles<br />Built Around Your Practice</h2><p>Start with the tasks taking your team’s time. Review experience, responsibilities, and information access for each proposed role.</p></div><div className="vh-role-grid">{roles.map(([title, text, to, icon], i) => <Link className={'vh-role vh-tone-' + i} to={to} key={title}><span className="vh-icon"><PrivacyIcon name={icon} /></span><h3>{title}</h3><p>{text}</p><span className="vh-role-link">Explore this support <span aria-hidden="true">↗</span></span></Link>)}</div><p className="vh-section-note">Clinical decisions and final approvals stay with the appropriately authorized professionals.</p></div></section>

    <section className="vh-section vh-navy"><div className="vh-wrap vh-split"><div><span className="vh-eyebrow">Boundaries before access</span><h2>Agree the Responsibilities.<br /><em>Then Connect the Systems.</em></h2><p>A Business Associate Agreement (BAA) generally sets out responsibilities when a business associate handles PHI for a covered entity. Confirm the applicable arrangement before remote access begins.</p><p>Pair those agreements with permissions and procedures appropriate to the role. A HIPAA compliant virtual assistant workflow needs practical safeguards alongside the paperwork.</p><a className="vh-link" href={guidance.baa} target="_blank" rel="noopener noreferrer">Read HHS business associate guidance ↗</a></div><div className="vh-access-panel"><span className="vh-panel-label">A clear starting point</span><h3>The right access for the assigned task</h3><ul><li><PrivacyIcon name="file" />Define what work is permitted</li><li><PrivacyIcon name="lock" />Limit information access appropriately</li><li><PrivacyIcon name="people" />Name the person who reviews exceptions</li><li><PrivacyIcon name="shield" />Agree how concerns are reported</li></ul><a className="vh-link" href={guidance.access} target="_blank" rel="noopener noreferrer">HHS minimum necessary guidance ↗</a></div></div></section>

    <section className="vh-section"><div className="vh-wrap"><div className="vh-safeguard-intro"><div><span className="vh-eyebrow">Make the everyday details clear</span><h2>Safeguards for Remote Healthcare Work</h2><p>Discuss these areas when planning your HIPAA virtual assistant role. Choose procedures that fit your systems and the information involved.</p></div><figure className="vh-section-photo vh-workspace-photo"><img src="/images/hipaa-workspace.webp" alt="VAM medical virtual assistant working at an organized private workstation" width="1536" height="1024" loading="lazy"/></figure></div><div className="vh-safeguards">{safeguards.map(([title, text, icon], i) => <article key={title}><span className="vh-step-number">0{i + 1}</span><span className="vh-icon"><PrivacyIcon name={icon} /></span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="vh-section vh-ready"><div className="vh-wrap vh-split"><div><span className="vh-eyebrow">Prepare for a useful conversation</span><h2>Your VA Onboarding<br />Discussion Checklist</h2><p>Use this list to organize the topics you want to discuss with VAM and your practice’s compliance lead. Bring your workflow requirements; leave patient details out of your initial enquiry.</p><p>Checking an item helps prepare the conversation. Compliance still depends on the arrangements and safeguards actually put in place.</p><Link className="vh-link" to="/hiring-your-va/">Explore the VAM Hiring Process →</Link><figure className="vh-section-photo vh-onboarding-photo"><img src="/images/hipaa-onboarding.webp" alt="Clinic manager and VAM-branded assistant reviewing onboarding instructions at a laptop" width="1536" height="1024" loading="lazy"/></figure></div><div className="vh-checklist"><div className="vh-checklist-top"><span className="vh-panel-label">Topics prepared</span><strong aria-live="polite">{checked.length} / {readiness.length}</strong></div><div className="vh-progress" role="progressbar" aria-label="Onboarding topics prepared" aria-valuemin={0} aria-valuemax={readiness.length} aria-valuenow={checked.length}><span style={{ width: (checked.length / readiness.length * 100) + '%' }} /></div>{readiness.map(item => <label key={item}><input type="checkbox" checked={checked.includes(item)} onChange={() => toggle(item)} /><span>{item}</span></label>)}<span className="vh-checklist-note">Your selections stay on this page and are not submitted.</span></div></div></section>

    <section className="vh-section"><div className="vh-wrap"><div className="vh-heading"><span className="vh-eyebrow">Why choose VAM?</span><h2>Practical Support With<br />Clear Expectations</h2><p>When comparing HIPAA compliant virtual assistants, look at how the role will work inside your practice. With VAM, start by defining the tasks, systems, schedule, and review responsibilities together.</p></div><div className="vh-benefits"><article><span className="vh-icon"><PrivacyIcon name="file" /></span><h3>A focused support role</h3><p>Delegate recurring administrative work with a clear scope and escalation path.</p></article><article><span className="vh-icon"><PrivacyIcon name="screen" /></span><h3>Your established systems</h3><p>Discuss platform experience and training needs before arranging approved access.</p></article><article><span className="vh-icon"><PrivacyIcon name="chat" /></span><h3>Useful communication</h3><p>Agree how progress, questions, and unresolved items reach your responsible team.</p></article></div><div className="vh-price-line"><span>Remote support starts at <strong>$9.50/hour</strong>. Confirm the role and full terms in your proposal.</span><Link className="vh-link" to="/pricing/">View VAM Pricing →</Link></div></div></section>

    <section className="vh-section vh-resources"><div className="vh-wrap"><div><span className="vh-eyebrow">Go to the source</span><h2>Official HIPAA Resources</h2><p>Use HHS guidance alongside your practice’s policies when reviewing a remote support arrangement.</p></div><div className="vh-resource-grid">{[['Security Rule', 'Administrative, physical, and technical safeguards', guidance.security], ['Business Associates', 'Responsibilities, agreements, and applicable exceptions', guidance.baa], ['Minimum Necessary', 'Information access appropriate to the purpose', guidance.access]].map(([title, text, href]) => <a key={title} href={href} target="_blank" rel="noopener noreferrer"><span>HHS.gov <span aria-hidden="true">↗</span></span><strong>{title}</strong><p>{text}</p></a>)}</div></div></section>

    <section className="vh-section vh-cta"><div className="vh-wrap"><div><span className="vh-eyebrow">Build the role thoughtfully</span><h2>More Support for Your Team.<br />A Clear Plan for Patient Privacy.</h2><p>Tell us your tasks, systems, and privacy requirements. Let’s discuss a HIPAA compliant virtual assistant workflow that fits your practice’s responsibilities.</p></div><div><Link className="vh-button" to="/contact-us/">Book a Free Consultation<PrivacyIcon name="chat" /></Link><Link className="vh-link" to="/services/">Explore VAM Services →</Link></div></div></section>
    <ServiceFAQs id="hipaa-faqs" title="HIPAA Compliant Virtual Assistant FAQs" items={faqs} schema />
  </main>
}
