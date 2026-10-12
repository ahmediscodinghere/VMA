import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import ServiceFAQs from '../components/ServiceFAQs'
import './MedicalCoderPage.css'

export const CODER_TITLE = 'Virtual Medical Coder Services | VAM'
export const CODER_DESCRIPTION = 'VAM virtual medical coder services support documentation review, ICD-10, CPT and HCPCS workflows, coding queries and billing handoffs for your practice.'
const origin = 'https://virtual-assistant-medical.ahmed-raza276082.chatgpt.site'
const url = origin + '/services/virtual-medical-coder/'
const codeSets = [
  ['ICD-10-CM', 'Diagnoses, conditions, and symptoms', 'Diagnosis coding supported by the clinical record'],
  ['ICD-10-PCS', 'Inpatient hospital procedures', 'Facility assignments requiring the appropriate experience'],
  ['CPT', 'Procedures and professional services', 'Office encounters, procedures, and diagnostic services'],
  ['HCPCS Level II', 'Supplies, drugs, equipment, and other services', 'Applicable supplies and non-physician service categories'],
  ['Modifiers', 'Additional context for a reported service', 'Review documentation and applicable payer or edit requirements'],
]
const challenges = [
  ['Documentation gaps', 'Unclear notes and missing details leave records waiting for clarification.', 'file'],
  ['Coding changes', 'Current code sets and approved references need to stay part of the workflow.', 'code'],
  ['Review and compliance', 'Questions, corrections, and access decisions need a clear owner.', 'shield'],
  ['Staffing capacity', 'Growing queues, leave, and changing volumes can stretch your internal team.', 'people'],
]
const codingSteps = [
  ['Receive Documentation', 'Work from assigned records in your EHR or approved secure channel.'],
  ['Review the Record', 'Identify missing or unclear information and prepare queries for clarification.'],
  ['Support Code Assignment', 'Use current references within the agreed credentials and specialty scope.'],
  ['Apply the Review Process', 'Follow your coding lead’s checks, correction rules, and approval requirements.'],
  ['Hand Off to Billing', 'Share reviewed coding information, query status, and approved corrections.'],
]
const benefits = [
  ['Less avoidable rework', 'Make missing information and review requests visible before the next handoff.', 'file'],
  ['Clearer billing handoffs', 'Give your billing team reviewed coding information and unresolved query status.', 'link'],
  ['Planned staffing costs', 'Discuss the hours, responsibilities, and full terms before onboarding.', 'clock'],
  ['Capacity for your workload', 'Review coverage needs when volumes, backlogs, or priorities change.', 'chart'],
  ['Connected revenue-cycle work', 'Keep coding queries, corrections, and billing-team communication organized.', 'code'],
  ['More focused internal teams', 'Delegate the agreed coding workflow while your team retains oversight.', 'people'],
]
const specialties = [
  ['Cardiology', 'Review cardiovascular encounter types, procedure complexity, and specialty experience.'],
  ['Orthopedics', 'Discuss procedure documentation, anatomical detail, and the review of modifiers.'],
  ['Mental Health', 'Define documentation needs and the relevant behavioral-health encounter scope.'],
  ['Radiology', 'Review diagnostic service workflows and professional or facility requirements.'],
  ['Primary Care', 'Agree the diagnosis and office-encounter coding responsibilities your practice needs.'],
]
const models = [
  ['01', 'Dedicated Full-Time', 'Discuss a steady schedule for an ongoing coding queue.', 'Custom proposal'],
  ['02', 'Dedicated Part-Time', 'Plan regular support around a smaller or changing workload.', 'Confirm hours and scope'],
  ['03', 'Per Chart or Claim', 'Discuss whether an output-based arrangement suits the assignment.', 'Confirm availability and terms'],
  ['04', 'Temporary or Project', 'Review a defined backlog, leave period, or project need.', 'Confirm duration and fit'],
]
const hiring = [
  ['Free Consultation', 'Share your specialty, monthly chart volume, systems, and goals.'],
  ['Custom Proposal', 'Review required qualifications, scope, schedule, pricing, and timeline.'],
  ['Onboarding and Setup', 'Arrange approved access, coding references, query routing, and review rules.'],
  ['Start and Review', 'Begin the agreed queue and review work, feedback, and outstanding questions.'],
]
const faqs = [
  { q: 'What does a virtual medical coder do?', a: 'A virtual medical coder works remotely with assigned medical records. Responsibilities may include documentation review, diagnosis and procedure coding, clarification queries, coding audits, correction tracking, and billing handoffs. The scope depends on verified qualifications and your practice’s review procedures.' },
  { q: 'How much does a virtual medical coder cost?', a: 'VAM support starts at $9.50 per hour. Required credentials, specialty experience, workload, and the engagement arrangement are reviewed in your proposal. Confirm the rate, included responsibilities, and full terms for the coding role before onboarding.' },
  { q: 'Are your medical coders certified?', a: 'Tell VAM which credentials your assignment requires. Relevant qualifications, specialty experience, and the proposed responsibilities are reviewed before placement. Credentials such as CPC, CCS, or CPMA should be verified where relevant to the requested work.' },
  { q: 'Is virtual medical coding HIPAA compliant?', a: 'Compliance depends on the arrangement, safeguards, access controls, and procedures in place. Review applicable Business Associate Agreement requirements, approved systems, secure communication channels, and role-based permissions before patient information is shared.' },
  { q: 'Can your coders work inside my EHR?', a: 'Share your EHR, coding tools, and billing software during consultation. We review platform experience, access permissions, and training needs before onboarding so the proposed professional can follow your approved workflow.' },
  { q: 'What is the difference between medical coding and billing?', a: 'Coding translates documented care into standardized diagnosis and procedure codes. Billing uses reviewed coding information to prepare claims, track payments, and manage payer follow-ups. If you need both, agree the responsibilities and required experience for each workflow.' },
  { q: 'Can I hire a virtual medical coder for a short period?', a: 'Discuss temporary, part-time, or project requirements with VAM. The available arrangement depends on the proposed professional, specialty experience, workload, and duration. Confirm availability and the working terms in your proposal.' },
  { q: 'Can you support our specialty and coding review requirements?', a: 'Share your specialty, encounter types, required credentials, references, and approval process. We review these needs before assignment. Your qualified coding lead defines review expectations, and clinicians remain responsible for their clinical documentation.' },
]

function CodeIcon({ name }: { name: string }) {
  const paths: Record<string, string> = {
    file: 'M5 3h10l4 4v14H5z M15 3v5h4 M8 12h8 M8 16h6',
    code: 'm8 7-5 5 5 5 M16 7l5 5-5 5 M14 4l-4 16',
    shield: 'M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6z M8 12l3 3 5-6',
    people: 'M16 21v-3a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v3 M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8 M18 4a4 4 0 0 1 0 8 M19 15a4 4 0 0 1 3 4v2',
    clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18 M12 7v5l4 2',
    chart: 'M4 20V10 M10 20V4 M16 20v-7 M2 20h20',
    link: 'M9 15l6-6 M7 14H6a4 4 0 0 1 0-8h4 M14 6h4a4 4 0 0 1 0 8h-1',
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.file} /></svg>
}

export default function MedicalCoderPage() {
  const [draftOpened, setDraftOpened] = useState(false)
  function prepareInquiry(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const body = ['VAM — Medical Coding Inquiry', 'Full name: ' + data.get('name'), 'Work email: ' + data.get('email'), 'Specialty: ' + (data.get('specialty') || 'Not specified'), 'Estimated monthly charts: ' + (data.get('charts') || 'Not specified')].join('\n')
    window.location.href = 'mailto:info@virtualassistantmedical.com?subject=' + encodeURIComponent('VAM — Virtual Medical Coder Consultation') + '&body=' + encodeURIComponent(body)
    setDraftOpened(true)
  }
  const schema = { '@context': 'https://schema.org', '@type': 'Service', name: 'Virtual Medical Coder Services', description: CODER_DESCRIPTION, url, serviceType: 'Remote medical coding workflow support', provider: { '@type': 'Organization', name: 'Virtual Assistant Medical', url: origin }, areaServed: { '@type': 'Country', name: 'United States' } }
  const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: origin + '/' }, { '@type': 'ListItem', position: 2, name: 'Services', item: origin + '/services/' }, { '@type': 'ListItem', position: 3, name: 'Virtual Medical Coder', item: url }] }
  return <main className="vam-coding"><title>{CODER_TITLE}</title><meta name="description" content={CODER_DESCRIPTION} /><link rel="canonical" href={url} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

    <section className="mc-hero"><div className="mc-wrap mc-hero-grid"><div><nav className="mc-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/services/">Services</Link><span>/ Virtual Medical Coder</span></nav><span className="mc-eyebrow">Virtual Assistant Medical · Coding services</span><h1>Virtual Medical Coder.<br /><em>Clear Records.<br />Confident Handoffs.</em></h1><p>Bring focused remote support to documentation review, coding queries, and billing handoffs. Build the role around your specialty, required qualifications, EHR, and approval process.</p><div className="mc-actions"><a className="mc-button" href="#coder-inquiry">Book a Free Consultation</a><a className="mc-secondary" href="#coder-code-sets">Explore Coding Support →</a></div><ul className="mc-trust"><li>Qualifications reviewed</li><li>Practice-approved access</li><li>Defined review responsibilities</li></ul></div><div className="mc-hero-visual"><img src="/images/coder-vam-hero.webp" alt="VAM-branded medical coding professional reviewing work at a dual-monitor workstation" width="1536" height="1024" fetchPriority="high" /><div className="mc-workflow-card"><div><span className="mc-icon"><CodeIcon name="file" /></span><span><strong>From documentation to handoff</strong><small>Illustrative coding workflow</small></span></div><ol><li>Record assigned<span>Review</span></li><li>Questions documented<span>Clarify</span></li><li>Approved work passed to billing<span>Handoff</span></li></ol></div></div></div></section>
    <nav className="mc-page-nav" aria-label="Medical coding page sections"><div className="mc-wrap">{[['Code Sets', 'coder-code-sets'], ['Process', 'coder-process'], ['Specialties', 'coder-specialties'], ['Credentials', 'coder-credentials'], ['Pricing', 'coder-pricing'], ['FAQs', 'coder-faqs']].map(([label, id]) => <a key={id} href={'#' + id}>{label}</a>)}</div></nav>

    <section className="mc-section"><div className="mc-wrap mc-split"><div className="mc-photo"><img src="/images/coder-documentation.webp" alt="Healthcare coding professional reviewing medical documentation at a computer" width="1200" height="800" loading="lazy" /></div><div><span className="mc-eyebrow">01 / The basics</span><h2>What Is a Virtual Medical Coder?</h2><p>A virtual medical coder is a coding professional who works remotely with your medical records. Their assigned workflow can include diagnosis and procedure coding, documentation checks, clarification queries, and corrections.</p><p>Medical coding services focus on translating documented care into the appropriate code sets. Your providers remain responsible for clinical documentation, while coding decisions follow the review process set by your qualified team.</p><div className="mc-summary"><strong>A clear role from the start</strong><span>Who: a professional with the qualifications your assignment requires.</span><span>What: coding, documentation review, and approved billing handoffs.</span><span>How: your systems, references, and review procedures.</span></div></div></div></section>

    <section className="mc-section mc-light"><div className="mc-wrap"><div className="mc-heading"><span className="mc-eyebrow">02 / The everyday challenges</span><h2>Why Practices Struggle With Medical Coding</h2><p>When documentation, questions, or review queues get stuck, the same records can return to your team again and again.</p></div><div className="mc-challenges">{challenges.map(([title, text, icon], i) => <article key={title}><div className="mc-card-top"><span className={'mc-icon mc-tone-' + i}><CodeIcon name={icon} /></span><span className="mc-card-number">0{i + 1}</span></div><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="mc-section" id="coder-code-sets"><div className="mc-wrap"><div className="mc-heading"><span className="mc-eyebrow">03 / Code-set coverage</span><h2>Medical Code Sets for Your Coding Workflow</h2><p>Discuss the code sets, encounter types, and qualifications your practice needs. Coverage is agreed to match the proposed professional’s experience.</p></div><div className="mc-table-scroll" tabIndex={0} aria-label="Medical code-set overview"><table className="mc-table"><caption>Code sets and their role in medical documentation</caption><thead><tr><th scope="col">Code set</th><th scope="col">What it covers</th><th scope="col">Where it matters</th></tr></thead><tbody>{codeSets.map(([name, covers, context]) => <tr key={name}><th scope="row">{name}</th><td>{covers}</td><td>{context}</td></tr>)}</tbody></table></div><p className="mc-section-note">Use current code sets and applicable guidance. <a href="https://www.cms.gov/medicare/coding-billing/icd-10-codes" target="_blank" rel="noopener noreferrer">Explore CMS ICD-10 resources ↗</a></p></div></section>

    <section className="mc-section mc-navy" id="coder-process"><div className="mc-wrap"><div className="mc-heading"><span className="mc-eyebrow">04 / From review to billing</span><h2>Our Virtual Medical Coding Process</h2><p>Make the next action clear at every stage of the assigned queue.</p></div><ol className="mc-process">{codingSteps.map(([title, text], i) => <li key={title}><span className="mc-step-number">0{i + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></div></section>

    <section className="mc-section"><div className="mc-wrap"><div className="mc-heading"><span className="mc-eyebrow">05 / Quality and oversight</span><h2>Coding Audits and Compliance</h2><p>Agree how work is checked, how documentation gaps are reported, and who approves corrections.</p></div><div className="mc-audit-grid"><article><span className="mc-icon"><CodeIcon name="chart" /></span><h3>A Defined Audit Routine</h3><p>Set the review scope, cadence, and reporting format with your coding lead. Record identified issues and the approved corrective action.</p></article><article><span className="mc-icon"><CodeIcon name="shield" /></span><h3>HIPAA-Aware Workflows</h3><p>Review applicable BAAs, approved secure channels, and role-based permissions before sharing patient information.</p><Link className="mc-text-link" to="/hipaa-compliant-virtual-assistant/">Explore Privacy Workflows →</Link></article><article><span className="mc-icon"><CodeIcon name="file" /></span><h3>Documentation for Review</h3><p>Keep queries, responses, reference requirements, and correction history accessible to the responsible reviewers.</p></article></div></div></section>

    <section className="mc-section mc-light"><div className="mc-wrap"><div className="mc-heading"><span className="mc-eyebrow">06 / Practical benefits</span><h2>Benefits of Hiring a Virtual Medical Coder</h2><p>Organized remote support can help your team spend less time chasing the status of individual records.</p></div><div className="mc-benefits">{benefits.map(([title, text, icon], i) => <article key={title}><span className={'mc-icon mc-tone-' + i % 3}><CodeIcon name={icon} /></span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>

    <section className="mc-section" id="coder-specialties"><div className="mc-wrap"><div className="mc-heading"><span className="mc-eyebrow">07 / Specialty fit</span><h2>Specialty-Specific Medical Coding</h2><p>Review your encounter types, required experience, and coding complexity before agreeing to an assignment.</p></div><div className="mc-specialties">{specialties.map(([title, text], i) => <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div><p className="mc-section-note">These are discussion areas. Specialty suitability and role availability are confirmed during consultation.</p></div></section>

    <section className="mc-section mc-light" id="coder-credentials"><div className="mc-wrap"><div className="mc-split"><div><span className="mc-eyebrow">08 / Your systems and requirements</span><h2>Works Where Your Team Works</h2><p>Tell us your EHR, coding work queues, approved references, and billing software. We review platform experience and training needs before arranging access.</p><p>Onboarding establishes how records are assigned, where queries go, and who checks completed work. Your practice retains control of accounts and permissions.</p><div className="mc-system-tags"><span>EHR / EMR</span><span>Coding references</span><span>Billing work queues</span><span>Secure communication</span></div></div><div className="mc-photo"><img src="/images/coder-team-review.webp" alt="Healthcare professionals discussing documentation and coding review requirements" width="1200" height="800" loading="lazy" /></div></div><div className="mc-credentials"><div><span className="mc-eyebrow">Credentials you can verify</span><h3>Start With the Qualifications the Role Needs</h3><p>Discuss required credentials, relevant experience, and ongoing reference requirements. Confirm the proposed professional’s fit before placement.</p></div><div className="mc-credential-links"><a href="https://www.aapc.com/certifications/cpc" target="_blank" rel="noopener noreferrer"><strong>CPC</strong><span>AAPC · Professional coding</span></a><a href="https://www.ahima.org/certification-careers/certifications-overview/ccs/" target="_blank" rel="noopener noreferrer"><strong>CCS</strong><span>AHIMA · Coding specialist</span></a><a href="https://www.aapc.com/certifications/cpma" target="_blank" rel="noopener noreferrer"><strong>CPMA</strong><span>AAPC · Medical auditing</span></a></div></div></div></section>

    <section className="mc-section" id="coder-pricing"><div className="mc-wrap"><div className="mc-heading"><span className="mc-eyebrow">09 / Engagement and pricing</span><h2>Choose the Arrangement That Fits Your Workload</h2><p>Discuss these engagement models with VAM. Availability, required qualifications, and included responsibilities are confirmed in the proposal.</p></div><div className="mc-models">{models.map(([number, title, text, quote]) => <article key={title}><span className="mc-model-number">{number}</span><h3>{title}</h3><p>{text}</p><strong>{quote}</strong><a href="#coder-inquiry" className="mc-text-link">Discuss This Option →</a></article>)}</div><div className="mc-rate"><span>VAM support starts at <strong>$9.50/hour</strong>. Confirm coding-role requirements and full terms before starting.</span><Link className="mc-text-link" to="/pricing/">View VAM Pricing →</Link></div></div></section>

    <section className="mc-section mc-light"><div className="mc-wrap"><div className="mc-heading"><span className="mc-eyebrow">10 / Getting started</span><h2>How to Hire a Virtual Medical Coder in Four Steps</h2></div><ol className="mc-hiring">{hiring.map(([title, text], i) => <li key={title}><span>{i + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></div></section>

    <section className="mc-section"><div className="mc-wrap"><div className="mc-heading"><span className="mc-eyebrow">11 / Measure the work</span><h2>Results and Quality Reporting</h2><p>Agree a baseline and reporting routine using your practice’s actual records. Assess progress with the team responsible for coding and billing.</p></div><div className="mc-report-grid">{[['Coding review quality', 'Record identified issues, approved corrections, and feedback from your coding lead.', 'chart'], ['Query turnaround', 'Track clarification requests, provider responses, and records awaiting review.', 'clock'], ['Billing handoff status', 'See which reviewed records are ready and which questions remain unresolved.', 'link']].map(([title, text, icon]) => <article key={title}><span className="mc-icon"><CodeIcon name={icon} /></span><h3>{title}</h3><p>{text}</p></article>)}</div><div className="mc-case-note"><CodeIcon name="file" /><p><strong>A useful case-review format:</strong> practice context, original workflow issue, responsibilities assigned, and measured outcome. Use verified practice data when reviewing the effect on denials or clean claims.</p></div></div></section>

    <section className="mc-section mc-inquiry" id="coder-inquiry"><div className="mc-wrap mc-inquiry-grid"><div><span className="mc-eyebrow">12 / Your next step</span><h2>Hire a Virtual Medical Coder<br /><em>With a Clear Plan.</em></h2><p>Share your specialty, chart volume, systems, and required credentials. We’ll help you define the scope and review responsibilities for a proposed coding role.</p><ul><li>Discuss the work you need handled</li><li>Review qualifications and specialty fit</li><li>Confirm pricing, schedule, and onboarding</li></ul><Link className="mc-secondary" to="/services/medical-billing-assistant/">Also Need Medical Billing Support? →</Link></div><form className="mc-form" onSubmit={prepareInquiry} aria-labelledby="coder-form-title"><h3 id="coder-form-title">Tell Us About Your Coding Needs</h3><div className="mc-form-fields"><label htmlFor="coder-name">Full name *<input id="coder-name" name="name" autoComplete="name" required maxLength={120} /></label><label htmlFor="coder-email">Work email *<input id="coder-email" name="email" type="email" autoComplete="email" required maxLength={254} /></label><label htmlFor="coder-specialty">Specialty <span>(optional)</span><input id="coder-specialty" name="specialty" maxLength={150} placeholder="e.g. Primary care" /></label><label htmlFor="coder-charts">Estimated monthly charts <span>(optional)</span><input id="coder-charts" name="charts" type="number" min="1" max="999999" placeholder="e.g. 250" /></label></div><p className="mc-form-note">Leave out patient information. This form opens an email draft for you to review and send.</p><button className="mc-button" type="submit">Prepare Coding Inquiry</button>{draftOpened && <p className="mc-form-status" role="status">Review and send the draft from your email app to complete your inquiry. If it did not open, email <a href="mailto:info@virtualassistantmedical.com">info@virtualassistantmedical.com</a>.</p>}</form></div></section>
    <ServiceFAQs id="coder-faqs" title="Virtual Medical Coder FAQs" items={faqs} schema />
  </main>
}
