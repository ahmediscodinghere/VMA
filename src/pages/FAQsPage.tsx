import { useEffect } from "react"
import { Link } from "react-router"
import "./FAQsPage.css"
export const FAQS_TITLE = "Medical Virtual Assistant FAQs | VAM"
export const FAQS_DESCRIPTION =
  "Find answers about VAM medical virtual assistant services, onboarding, EHR workflows, patient confidentiality, coverage, and pricing."
const url =
  "https://virtual-assistant-medical.ahmed-raza276082.chatgpt.site/faqs/"
const topics = [
  {
    id: "services",
    label: "Services & roles",
    intro: "Find the right kind of support for the work on your desk.",
    questions: [
      {
        q: "What does a medical virtual assistant help with?",
        a: "A medical virtual assistant supports the administrative work behind patient care, including appointment scheduling, routine patient communication, records organization, and follow-up tracking. VAM helps you identify tasks to delegate and define how they connect with your on-site team.",
        link: "/services/",
        linkLabel: "Explore VAM services",
      },
      {
        q: "How do I choose between a receptionist, scribe, and admin assistant?",
        a: "Choose a receptionist when calls and appointments need attention, a scribe when encounter documentation takes too much of the provider’s time, or an admin assistant when inboxes, records, and coordination need support. Tell VAM where work builds up, and we can discuss a suitable role.",
      },
      {
        q: "Can VAM support billing and insurance tasks?",
        a: "VAM lists support for insurance verification, authorization coordination, billing administration, and claims follow-up. The exact responsibilities depend on your platform, task volume, and review process. Your billing lead keeps oversight of exceptions and decisions outside the agreed role.",
        link: "/services/medical-billing-support",
        linkLabel: "View billing support",
      },
      {
        q: "Can a virtual assistant provide medical advice?",
        a: "The roles described on our website focus on administrative and documentation support. Assistants route clinical questions, refill requests, and patient concerns to the appropriate licensed member of your team. Diagnosis, prescribing, and care decisions stay with your clinical staff.",
      },
    ],
  },
  {
    id: "getting-started",
    label: "Getting started",
    intro: "Know what to prepare before your first conversation.",
    questions: [
      {
        q: "How do I get started with VAM?",
        a: "Contact us with your main workload challenges, preferred coverage hours, and current systems. We’ll discuss the support you need, clarify responsibilities, and outline the next steps. You can begin with a focused task list rather than trying to delegate everything at once.",
        link: "/contact-us/",
        linkLabel: "Contact VAM",
      },
      {
        q: "What information should I share during a consultation?",
        a: "Bring a short list of tasks, approximate call or appointment volume, the software you use, and the hours you want covered. Mention specialty-specific procedures, language preferences, and who will review the assistant’s work. Please leave patient details out of your initial enquiry.",
      },
      {
        q: "How long does onboarding take?",
        a: "The timeline depends on the role, system access, and how ready your procedures are. VAM will discuss a realistic start date after reviewing your needs. Clear task instructions and a designated contact in your practice help make the setup smoother.",
      },
      {
        q: "Will we need to explain our practice’s procedures?",
        a: "Yes. Even familiar administrative tasks vary between practices. Share your scheduling rules, approved message templates, documentation preferences, and escalation process. A short orientation helps the assistant understand how your team handles everyday requests and exceptions.",
      },
    ],
  },
  {
    id: "workflow",
    label: "Workflow & coverage",
    intro: "Keep your existing tools and make responsibilities clear.",
    questions: [
      {
        q: "Can a scribe work inside our existing EHR?",
        a: "VAM’s scribe page includes platforms such as Epic, athenaOne, NextGen, eClinicalWorks, Oracle Health, and others. We review your specific system and access requirements before onboarding. Your provider remains responsible for reviewing and signing encounter documentation.",
        link: "/virtual-medical-scribe/#scribe-section-9",
        linkLabel: "See the EHR platforms",
      },
      {
        q: "How will a virtual receptionist handle our calls?",
        a: "We review your phone setup and agree how calls will reach the assistant. Your practice supplies call scripts, scheduling instructions, and routing rules. Routine requests can be handled within that scope, while urgent or clinical concerns follow your team’s escalation process.",
        link: "/virtual-medical-receptionist/",
        linkLabel: "Explore reception support",
      },
      {
        q: "Can I request particular hours or bilingual support?",
        a: "Share your time zone, required hours, and language needs with VAM. We’ll discuss availability and confirm the coverage that can be arranged for your role. Make sure evenings, weekends, holidays, or Spanish-language support are included in the agreed plan if your practice needs them.",
      },
      {
        q: "How do we track work and handle changes or absences?",
        a: "Agree on a task queue, communication channel, and update schedule before starting. Use regular check-ins to review completed work and adjust priorities. Discuss planned absences, backup arrangements, and any coverage limitations with VAM so your practice knows what to expect.",
      },
    ],
  },
  {
    id: "privacy",
    label: "Privacy & access",
    intro: "Discuss information handling before access is arranged.",
    questions: [
      {
        q: "How is patient confidentiality considered?",
        a: "Patient confidentiality is part of planning the workflow. Before access begins, review approved communication tools, the information needed for each task, confidentiality expectations, and your practice’s privacy procedures with VAM. Keep patient information out of general contact forms and introductory emails.",
      },
      {
        q: "What should we discuss about HIPAA and agreements?",
        a: "Raise your HIPAA requirements during the consultation, including your Business Associate Agreement review, security questions, and internal approval process. Ask VAM to confirm the arrangements for your specific service before sharing patient information or granting system access.",
      },
      {
        q: "Does an assistant need access to every part of our system?",
        a: "The access needed depends on the assigned responsibilities. Scheduling support and encounter documentation may require different permissions. Your practice defines and approves the account access for the role, including any areas reserved for providers or other staff.",
      },
      {
        q: "What happens when a sensitive request or concern comes up?",
        a: "Establish a named contact and escalation channel during onboarding. The assistant should route requests outside their agreed scope to that person and document the handoff in your approved workflow. Discuss how access concerns, errors, and urgent issues will be reported and reviewed.",
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing & expectations",
    intro: "Agree on the details before support begins.",
    questions: [
      {
        q: "How much do VAM services cost?",
        a: "VAM virtual assistant support is $9.50 per hour. Your scheduled hours determine the service budget. Discuss the role and task scope with VAM, and confirm the included responsibilities, billing schedule, and full terms in your written proposal.",
        link: "/pricing/",
        linkLabel: "View VAM pricing",
      },
      {
        q: "Are there setup fees, minimum hours, or contract commitments?",
        a: "Ask VAM to confirm those details for the plan you’re considering. Review minimum coverage, setup or training charges, notice periods, and cancellation terms before agreeing to the service. Your proposal should make the scope and commercial terms clear.",
      },
      {
        q: "Can we start with one task and expand later?",
        a: "A focused starting scope can help your team establish a workable routine. Discuss your first priority with VAM, such as call handling or scheduling, and confirm whether additional responsibilities or hours can be added as your workload changes.",
      },
      {
        q: "How can we tell whether the support is working well?",
        a: "Set practical expectations for the role, such as keeping follow-ups current, completing assigned work, or routing messages consistently. Review those expectations alongside staff feedback and agreed updates. If something needs improvement, discuss examples and the changes required with VAM.",
      },
    ],
  },
]
export default function FAQsPage() {
  useEffect(() => {
    const tags = Array.from(
      document.querySelectorAll<HTMLMetaElement>('meta[name="robots"]'),
    )
    const old = tags.map((t) => t.content)
    tags.forEach((t) => (t.content = "index, follow"))
    return () => tags.forEach((t, i) => (t.content = old[i]))
  }, [])
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url,
    name: FAQS_TITLE,
    mainEntity: topics.flatMap((t) =>
      t.questions.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    ),
  }
  return (
    <div className="vam-faqs">
      <title>{FAQS_TITLE}</title>
      <meta name="description" content={FAQS_DESCRIPTION} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={FAQS_TITLE} />
      <meta property="og:description" content={FAQS_DESCRIPTION} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="vf-hero">
        <div className="vf-wrap vf-hero-grid">
          <div>
            <span className="vf-eyebrow">The VAM answer center</span>
            <h1>
              Good questions.
              <br />
              <span>Clear answers.</span>
            </h1>
            <p>
              Explore frequently asked questions about medical virtual
              assistants, working with VAM, and finding the right support for
              your practice.
            </p>
            <a className="vf-button" href="#faq-topics">
              Browse the FAQs
            </a>
          </div>
          <div className="vf-hero-panel">
            <img
              className="vf-panel-photo"
              src="/images/faq-vam-conversation.webp"
              alt=""
              width="1536"
              height="1024"
              fetchPriority="high"
            />
            <div className="vf-panel-content">
              <span className="vf-panel-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M4 4h16v12H9l-5 4z" />
                  <path d="M9 8a3 3 0 0 1 6 0c0 2-3 2-3 4M12 14v.1" />
                </svg>
              </span>
              <h2>Start with what matters to you.</h2>
              <p>Choosing a role? Planning access? Comparing costs?</p>
              <div className="vf-hero-topics">
                {topics.map((t) => (
                  <a key={t.id} href={"#faq-" + t.id}>
                    {t.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="vf-body" id="faq-topics">
        <div className="vf-wrap vf-grid">
          <aside className="vf-sidebar">
            <span className="vf-eyebrow">Find your topic</span>
            <nav aria-label="FAQ topics">
              {topics.map((t) => (
                <a key={t.id} href={"#faq-" + t.id}>
                  {t.label}
                  <span>4 questions</span>
                </a>
              ))}
            </nav>
            <div className="vf-help">
              <h2>A question about your practice?</h2>
              <p>
                Tell us about your workload and systems for a more specific
                conversation.
              </p>
              <Link to="/contact-us/">Contact VAM</Link>
            </div>
          </aside>
          <div className="vf-questions">
            {topics.map((topic, i) => (
              <section
                id={"faq-" + topic.id}
                className="vf-topic"
                key={topic.id}
                aria-labelledby={"faq-title-" + topic.id}
              >
                <div className="vf-topic-heading">
                  <span
                    className={"vf-topic-icon vf-tone-" + i}
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    >
                      <path
                        d={
                          [
                            "M4 5h16v16H4z M8 3v4 M16 3v4 M4 10h16 M8 15l3 3 5-5",
                            "M5 3h14v18H5z M9 7h6 M9 11h6 M9 15h3",
                            "M3 5h18v14H3z M3 10h18 M7 15h3",
                            "M12 3 21 7v5c0 5-9 10-9 10S3 17 3 12V7z M8 12l3 3 5-6",
                            "M3 5h18v14H3z M3 10h18 M7 15h3",
                          ][i]
                        }
                      />
                    </svg>
                  </span>
                  <div>
                    <h2 id={"faq-title-" + topic.id}>{topic.label}</h2>
                    <p>{topic.intro}</p>
                  </div>
                </div>
                <div className="vf-accordions">
                  {topic.questions.map((item, j) => (
                    <details
                      key={item.q}
                      open={i === 0 && j === 0 ? true : undefined}
                    >
                      <summary>
                        <span>{item.q}</span>
                        <span className="vf-toggle" aria-hidden="true">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M5 12h14M12 5v14" />
                          </svg>
                        </span>
                      </summary>
                      <div className="vf-answer">
                        <p>{item.a}</p>
                        {"link" in item && (
                          <Link to={item.link!}>{item.linkLabel}</Link>
                        )}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
      <section className="vf-cta">
        <div className="vf-wrap">
          <span className="vf-eyebrow">Let’s make it specific</span>
          <h2>Still have a question?</h2>
          <p>
            Share what your practice needs. We’ll help you explore the next
            step.
          </p>
          <Link className="vf-button" to="/contact-us/">
            Talk to VAM
          </Link>
        </div>
      </section>
    </div>
  )
}
