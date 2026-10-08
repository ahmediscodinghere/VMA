import { useEffect } from "react"
import { Link } from "react-router"
import ServiceFAQs from "../components/ServiceFAQs"
import "./PricingPage.css"
export const PRICING_TITLE = "Medical Virtual Assistant Pricing — $9.50/Hour | VAM"
export const PRICING_DESCRIPTION =
  "Explore VAM virtual assistant pricing at $9.50 per hour. Compare in-house staffing costs, review sample coverage budgets, and discuss your practice’s support needs."
const url =
  "https://virtual-assistant-medical.ahmed-raza276082.chatgpt.site/pricing/"
const money = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(n)
const rate = 9.5,
  house = 25,
  hours = 40,
  weeks = 52
const comparison = [
  ["Hourly rate", money(house) + " (example)", money(rate)],
  ["Weekly cost · 40 hours", money(house * hours), money(rate * hours)],
  [
    "Average monthly cost",
    money((house * hours * weeks) / 12),
    money((rate * hours * weeks) / 12),
  ],
  [
    "Annual cost · 2,080 hours",
    money(house * hours * weeks),
    money(rate * hours * weeks),
  ],
  [
    "Working arrangement",
    "In your practice’s office",
    "Remote support in your approved workflow",
  ],
  [
    "Workspace & equipment",
    "Office space and employee equipment",
    "Plan the approved system access needed for the role",
  ],
  [
    "Payroll & employee benefits",
    "Employer payroll and benefit responsibilities",
    "Service billing through VAM",
  ],
  [
    "Recruitment & orientation",
    "Your practice manages the hire and orientation",
    "Discuss role matching with VAM; share your practice procedures",
  ],
  [
    "Provider oversight",
    "Your team directs the work",
    "Your team directs the work and reviews clinical documentation",
  ],
]
const faqs = [
  {
    q: "What is the VAM hourly rate?",
    a: "VAM virtual assistant support is advertised at $9.50 per hour. Discuss your required role, scheduled hours, and task scope with our team, and confirm the full service terms in your written proposal.",
  },
  {
    q: "How are the monthly examples calculated?",
    a: "We multiply $9.50 by your weekly hours, then by 52 weeks, and divide by 12. This gives an average monthly budget. Actual billing depends on the hours and billing schedule agreed for your service.",
  },
  {
    q: "Is the in-house comparison a market average?",
    a: "No. The table uses an illustrative in-house wage of $25 per hour and the same 40-hour week for both options. It compares wages with the VAM service rate. It excludes in-house benefits, taxes, recruitment, and office expenses, as well as any additional practice costs for virtual support.",
  },
  {
    q: "Can we discuss a different coverage schedule?",
    a: "Yes. Share the hours, time zone, responsibilities, and language requirements you need. VAM will discuss availability and confirm the schedule that can be arranged. The sample budgets on this page are examples rather than minimum-hour plans.",
  },
]
export default function PricingPage() {
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
    "@type": "Service",
    name: "Medical virtual assistant support",
    url,
    provider: { "@type": "Organization", name: "Virtual Assistant Medical" },
    offers: {
      "@type": "Offer",
      price: 9.5,
      priceCurrency: "USD",
      url,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: 9.5,
        priceCurrency: "USD",
        unitText: "hour",
      },
    },
  }
  return (
    <div className="vam-pricing">
      <title>{PRICING_TITLE}</title>
      <meta name="description" content={PRICING_DESCRIPTION} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={PRICING_TITLE} />
      <meta property="og:description" content={PRICING_DESCRIPTION} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="vp-hero">
        <div className="vp-wrap vp-hero-grid">
          <div>
            <span className="vp-eyebrow">
              Virtual Assistant Medical pricing
            </span>
            <h1>
              More support.
              <br />
              <span>A clearer budget.</span>
            </h1>
            <p>
              Give everyday administrative work a dedicated place in your
              practice’s budget. VAM virtual assistant support is $9.50 per hour,
              with a scope and schedule agreed around your needs.
            </p>
            <div className="vp-actions">
              <Link className="vp-button" to="/contact-us/">
                Discuss Your Plan
              </Link>
              <a className="vp-text-link" href="#pricing-comparison">
                Compare the Costs
              </a>
            </div>
          </div>
          <div className="vp-rate-card">
            <span className="vp-rate-label">VAM virtual assistant</span>
            <div className="vp-rate">
              <strong>$9.50</strong>
              <span>USD / hour</span>
            </div>
            <p>Choose the support your practice needs.</p>
            <div className="vp-rate-breakdown">
              <div>
                <span>40 hours per week</span>
                <strong>$380 / week</strong>
              </div>
              <div>
                <span>Average monthly budget</span>
                <strong>$1,646.67 / month</strong>
              </div>
            </div>
            <small>
              Example at 40 hours/week across 52 weeks. Actual billing follows
              your agreed hours and terms.
            </small>
          </div>
        </div>
      </section>
      <section className="vp-section" id="pricing-comparison">
        <div className="vp-wrap">
          <div className="vp-heading">
            <span className="vp-eyebrow">A side-by-side cost view</span>
            <h2>
              In-house staffing vs.
              <br />
              <span>your VAM virtual assistant.</span>
            </h2>
            <p>
              Compare the same 40-hour week. The in-house rate below is an
              example, so you can judge it against your practice’s own staffing
              costs.
            </p>
          </div>
          <div
            className="vp-table-scroll"
            tabIndex={0}
            role="region"
            aria-label="In-house and VAM staffing comparison"
          >
            <table className="vp-table">
              <caption>
                Illustrative comparison in USD: $25/hour in-house wage vs.
                $9.50/hour VAM service rate.
              </caption>
              <thead>
                <tr>
                  <th scope="col">Cost or responsibility</th>
                  <th scope="col">
                    In-house assistant<span>Illustrative wage</span>
                  </th>
                  <th scope="col">
                    VAM virtual assistant<span>$9.50 per hour</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map(([label, inHouse, vam]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    <td>{inHouse}</td>
                    <td>{vam}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="vp-savings">
            <div>
              <span>Illustrative annual difference</span>
              <strong>{money((house - rate) * hours * weeks)}</strong>
            </div>
            <p>
              62% lower in this rate comparison, before additional costs. Your
              actual difference depends on your in-house wage, hours, and
              expenses.
            </p>
          </div>
          <p className="vp-note">
            Calculation: 40 hours/week × 52 weeks = 2,080 hours/year. Average
            monthly costs use annual cost ÷ 12. Figures exclude in-house taxes,
            benefits, recruitment, and workspace costs, and any additional
            practice expenses or charges for virtual support.
          </p>
        </div>
      </section>
      <section className="vp-section vp-tint">
        <div className="vp-wrap">
          <div className="vp-heading">
            <span className="vp-eyebrow">Plan your coverage</span>
            <h2>
              See what your hours
              <br />
              <span>could look like.</span>
            </h2>
            <p>
              Three sample budgets at the same $9.50 hourly rate. Confirm the
              schedule and coverage available for your role with VAM.
            </p>
          </div>
          <div className="vp-budgets">
            {[20, 30, 40].map((h) => (
              <article key={h} className={h === 40 ? "vp-budget-featured" : ""}>
                <span>{h} hours / week</span>
                <h3>
                  {money(rate * h)}
                  <small>per week</small>
                </h3>
                <p>
                  <strong>{money((rate * h * weeks) / 12)}</strong> average per
                  month
                </p>
                <div>{money(rate * h * weeks)} per year</div>
              </article>
            ))}
          </div>
          <p className="vp-note vp-centered">
            Illustrative budgets based on 52 weeks. These examples do not
            establish a minimum commitment or billing frequency.
          </p>
        </div>
      </section>
      <section className="vp-section">
        <div className="vp-wrap">
          <div className="vp-heading">
            <span className="vp-eyebrow">Match the role to the work</span>
            <h2>
              Support where your
              <br />
              <span>practice needs it most.</span>
            </h2>
            <p>
              Use your consultation to define responsibilities, coverage, and
              the experience needed for your assignment.
            </p>
          </div>
          <div className="vp-service-grid">
            {[
              [
                "Patient-facing support",
                "Calls, scheduling, intake coordination, and approved patient reminders.",
                "/virtual-medical-receptionist/",
                "Explore Reception Support",
              ],
              [
                "Documentation support",
                "Encounter note preparation and EHR documentation for provider review.",
                "/virtual-medical-scribe/",
                "Explore Scribe Support",
              ],
              [
                "Practice administration",
                "Records, inboxes, insurance coordination, billing tasks, and routine follow-ups.",
                "/services/",
                "Explore All Services",
              ],
            ].map(([title, copy, path, label], i) => (
              <article key={title}>
                <span className={"vp-icon vp-icon-" + i} aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <path
                      d={
                        [
                          "M4 4h16v12H9l-5 4z M8 8h8 M8 12h5",
                          "M5 3h14v18H5z M9 7h6 M9 11h6 M9 15h4",
                          "M3 7h18v14H3z M8 7V3h8v4 M3 12h18 M10 12v3h4v-3",
                        ][i]
                      }
                    />
                  </svg>
                </span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <Link to={path}>{label}</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ServiceFAQs id="pricing-faqs" items={faqs} schema />
      <section className="vp-cta">
        <div className="vp-wrap">
          <span className="vp-eyebrow">Your next step</span>
          <h2>
            Build a support plan
            <br />
            for your practice.
          </h2>
          <p>
            Tell us your priority tasks and coverage hours. We’ll discuss the
            scope, schedule, and next steps with you.
          </p>
          <Link className="vp-button" to="/contact-us/">
            Talk to VAM
          </Link>
        </div>
      </section>
    </div>
  )
}
