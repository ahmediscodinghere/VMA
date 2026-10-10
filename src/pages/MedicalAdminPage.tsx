import { useEffect, useState, type FormEvent } from "react"
import ServiceFAQs from "../components/ServiceFAQs"
import { ADMIN_SECTIONS, ADMIN_FAQS } from "../data/adminProvided"
import "./MedicalAdminPage.css"
export const ADMIN_TITLE =
  "Virtual Medical Administrative Assistant Services | VAM"
export const ADMIN_DESCRIPTION =
  "VAM virtual medical administrative assistant services for scheduling, insurance verification, referrals, records, and patient follow-up. Explore support at $9.50/hour."
const url =
  "https://virtual-assistant-medical.ahmed-raza276082.chatgpt.site/services/medical-admin-assistant/"
const money = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
export default function MedicalAdminPage() {
  const [hours, setHours] = useState(30),
    [wage, setWage] = useState(20),
    [overhead, setOverhead] = useState(30),
    [turnover, setTurnover] = useState(3000),
    [rate, setRate] = useState(9.5),
    [draft, setDraft] = useState(false)
  useEffect(() => {
    const tags = Array.from(
      document.querySelectorAll<HTMLMetaElement>('meta[name="robots"]'),
    )
    const old = tags.map((t) => t.content)
    tags.forEach((t) => (t.content = "index, follow"))
    return () => tags.forEach((t, i) => (t.content = old[i]))
  }, [])
  const inHouse =
      ((hours * 52) / 12) * wage * (1 + overhead / 100) + turnover / 12,
    virtual = ((hours * 52) / 12) * rate,
    difference = inHouse - virtual
  function send(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const body = [
      "Medical administrative assistant workflow assessment",
      "",
      ...Array.from(data.entries()).map(([k, v]) => k + ": " + v),
    ].join("\n")
    window.location.href =
      "mailto:info@virtualassistantmedical.us?subject=" +
      encodeURIComponent("VAM Medical Admin Assessment") +
      "&body=" +
      encodeURIComponent(body)
    setDraft(true)
  }
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: ADMIN_TITLE,
    url,
    serviceType: "Remote medical administrative support",
    provider: { "@type": "Organization", name: "Virtual Assistant Medical" },
  }
  return (
    <div className="vam-admin">
      <title>{ADMIN_TITLE}</title>
      <meta name="description" content={ADMIN_DESCRIPTION} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={ADMIN_TITLE} />
      <meta property="og:description" content={ADMIN_DESCRIPTION} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="admin-hero">
        <div className="w admin-hero-grid">
          <div>
            <span className="admin-eyebrow">Virtual Assistant Medical</span>
            <h1>
              Virtual Medical Administrative Assistant Services{" "}
              <span>for Clinics and Practices</span>
            </h1>
            <p>
              Your front desk is answering phones, checking in patients, and
              chasing prior authorizations all at once. Something slips every
              day. Our trained remote assistants take over scheduling, insurance
              verification, referrals, and patient follow-up, working inside
              your EHR under a signed BAA.
            </p>
            <ul className="checks">
              <li>
                HIPAA-compliant workflows, with a Business Associate Agreement
                reviewed before access
              </li>
              <li>Support in your approved EHR and practice systems</li>
              <li>
                Onboarding around your procedures and an agreed start date
              </li>
            </ul>
            <a className="btn" href="#admin-contact">
              Book Your Free Workflow Assessment
            </a>
          </div>
          <div className="admin-hero-photo">
            <img
              src="/images/admin-vam-assistant.webp"
              alt="Medical administrative assistant wearing a headset and organizing practice work at a laptop"
              width="1536"
              height="1024"
              fetchPriority="high"
            />
            <div>
              <strong>Your workflow. A connected support team.</strong>
              <span>Scheduling · Verification · Records · Follow-up</span>
            </div>
          </div>
        </div>
      </section>
      {ADMIN_SECTIONS.map((section, i) => (
        <section
          className={"admin-section " + (i % 2 === 0 ? "alt" : "")}
          id={"admin-" + section.id}
          key={section.id}
        >
          <div className="w">
            <div
              className="admin-provided"
              dangerouslySetInnerHTML={{
                __html: section.html.replaceAll(
                  'href="#contact"',
                  'href="#admin-contact"',
                ),
              }}
            />
            {section.id === "pricing" && (
              <div className="card admin-calculator">
                <h2>Cost Comparison Calculator</h2>
                <p className="mut">
                  Estimate your monthly cost difference using your own staffing
                  expenses. VAM’s advertised $9.50 hourly rate is prefilled;
                  adjust it if your proposal uses a different rate.
                </p>
                <div className="calc">
                  <div>
                    <label htmlFor="admin-hours">
                      Hours of admin support needed per week: <b>{hours}</b>
                    </label>
                    <input
                      id="admin-hours"
                      type="range"
                      min="5"
                      max="80"
                      value={hours}
                      onChange={(e) => setHours(Number(e.target.value))}
                    />
                    {[
                      ["admin-wage", "In-house hourly wage ($)", wage, setWage],
                      [
                        "admin-overhead",
                        "Overhead on wage: taxes, benefits, equipment, training (%)",
                        overhead,
                        setOverhead,
                      ],
                      [
                        "admin-turnover",
                        "Annual turnover cost per front-desk hire ($)",
                        turnover,
                        setTurnover,
                      ],
                      [
                        "admin-rate",
                        "Virtual assistant hourly rate ($)",
                        rate,
                        setRate,
                      ],
                    ].map(([id, label, value, update]) => (
                      <div key={String(id)}>
                        <label htmlFor={String(id)}>{String(label)}</label>
                        <input
                          id={String(id)}
                          type="number"
                          min="0"
                          step="0.5"
                          value={Number(value)}
                          onChange={(e) => {
                            const setters: Record<string, (n: number) => void> = { 'admin-wage': setWage, 'admin-overhead': setOverhead, 'admin-turnover': setTurnover, 'admin-rate': setRate }
                            setters[String(id)](Math.max(0, Number(e.target.value) || 0))
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="res" aria-live="polite">
                    <span>
                      Estimated monthly{" "}
                      {difference >= 0 ? "savings" : "additional cost"}
                    </span>
                    <strong className="big">
                      {money(Math.abs(difference))}
                    </strong>
                    <div className="r">
                      <span>In-house monthly cost</span>
                      <b>{money(inHouse)}</b>
                    </div>
                    <div className="r">
                      <span>Virtual monthly cost</span>
                      <b>{money(virtual)}</b>
                    </div>
                    <div className="r">
                      <span>
                        Estimated annual{" "}
                        {difference >= 0 ? "savings" : "additional cost"}
                      </span>
                      <b>{money(Math.abs(difference) * 12)}</b>
                    </div>
                    <p>
                      Illustrative estimate, not a quote. Monthly hours use 52
                      weeks ÷ 12; actual billing and costs depend on your plan.
                    </p>
                    <a className="btn" href="#admin-contact">
                      Request a Custom Quote
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      ))}
      <section className="admin-section admin-contact" id="admin-contact">
        <div className="w two">
          <div>
            <span className="admin-eyebrow">Put your practice first</span>
            <h2>
              Get a Virtual Medical Administrative Assistant for Your Practice
            </h2>
            <p>
              Every week your front desk spends on avoidable admin work is
              revenue and patient goodwill you don’t get back. In one 30-minute
              call, we’ll review your workflows, show you where an assistant
              saves the most time, and give you a clear scope and quote. No
              obligation, no pressure.
            </p>
            <p>
              Or email{" "}
              <a href="mailto:info@virtualassistantmedical.us">
                info@virtualassistantmedical.us
              </a>
              .
            </p>
          </div>
          <form className="admin-form card" onSubmit={send}>
            <h3>Book your free workflow assessment</h3>
            <div className="f2">
              <label>
                Name
                <input name="Name" autoComplete="name" required />
              </label>
              <label>
                Practice
                <input name="Practice" autoComplete="organization" required />
              </label>
              <label>
                Specialty
                <select name="Specialty">
                  {[
                    "Primary care",
                    "Cardiology",
                    "Orthopedics",
                    "Behavioral health",
                    "Dermatology / Peds / OB-GYN",
                    "Urgent care / ASC",
                    "Multi-location group",
                    "Other",
                  ].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
              <label>
                EHR
                <input name="EHR" placeholder="e.g. Epic" />
              </label>
            </div>
            <label>
              Weekly hours needed
              <input
                name="Weekly hours"
                type="number"
                min="1"
                placeholder="e.g. 20"
                required
              />
            </label>
            <label>
              Work email
              <input name="Email" type="email" autoComplete="email" required />
            </label>
            <p className="admin-form-note">
              Please leave out patient details. This opens an email draft for
              you to review and send.
            </p>
            <button className="btn" type="submit">
              Open Assessment Email Draft
            </button>
            {draft && (
              <p role="status" className="admin-draft">
                Send the draft in your email app to complete your enquiry. If it
                didn’t open, email VAM directly.
              </p>
            )}
          </form>
        </div>
      </section>
      <ServiceFAQs
        id="admin-faq"
        title="Virtual Medical Administrative Assistant FAQs"
        items={ADMIN_FAQS}
        schema
      />
    </div>
  )
}
