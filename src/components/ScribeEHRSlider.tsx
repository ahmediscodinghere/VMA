import { useEffect, useRef, useState } from "react"
import "./ScribeEHRSlider.css"
const systems = [
  ["Epic", "epic"],
  ["athenaOne", "athenahealth"],
  ["NextGen", "nextgen"],
  ["eClinicalWorks", "eclinicalworks"],
  ["Oracle Health (Cerner PowerChart)", "oracle-health"],
  ["ModMed", "modmed"],
  ["Practice Fusion", "practice-fusion"],
  ["PatientKeeper", "patientkeeper"],
  ["PointClickCare", "pointclickcare"],
  ["MatrixCare", "matrixcare"],
  ["SimplePractice", "simplepractice"],
  ["TherapyNotes", "therapynotes"],
  ["ezDerm", "ezderm"],
  ["Compulink", "compulink"],
  ["Nextech", "nextech"],
  ["EyeMD EMR", "eyemd"],
  ["PracticeQ", "practiceq"],
  ["iClaim", "iclaim"],
]
const svgLogos = new Set(["nextgen", "modmed", "practice-fusion", "practiceq"])
export default function ScribeEHRSlider() {
  const track = useRef<HTMLUListElement>(null)
  const current = useRef(0)
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [hovered, setHovered] = useState(false)
  function move(index: number) {
    const el = track.current
    if (!el) return
    const cards = Array.from(el.children) as HTMLElement[]
    const target = Math.max(0, Math.min(cards.length - 1, index))
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    el.scrollTo({
      left: cards[target].offsetLeft - cards[0].offsetLeft,
      behavior: reduced ? "instant" : "smooth",
    })
  }
  useEffect(() => {
    setPlaying(!window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])
  useEffect(() => {
    if (!playing || hovered) return
    const timer = window.setInterval(
      () => move((current.current + 1) % systems.length),
      3500,
    )
    return () => window.clearInterval(timer)
  }, [playing, hovered])
  function sync() {
    const el = track.current
    if (!el) return
    const cards = Array.from(el.children) as HTMLElement[]
    const index = cards.reduce(
      (best, card, i) =>
        Math.abs(card.offsetLeft - cards[0].offsetLeft - el.scrollLeft) <
        Math.abs(cards[best].offsetLeft - cards[0].offsetLeft - el.scrollLeft)
          ? i
          : best,
      0,
    )
    current.current = index
    setActive(index)
  }
  return (
    <section
      className="scribe-section scribe-ehr-section"
      id="scribe-section-9"
      aria-labelledby="scribe-ehr-heading"
    >
      <div className="scribe-wrap">
        <div className="scribe-ehr-heading">
          <span>YOUR SYSTEMS. YOUR WORKFLOW.</span>
          <h2 id="scribe-ehr-heading">Works Inside Your EHR</h2>
          <p>
            Our scribes are trained on the major EHR and EMR systems and work
            directly in your existing setup, so you don’t change your workflow.
          </p>
        </div>
        <div
          className="scribe-ehr-carousel"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setHovered(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setHovered(false)
          }}
          role="region"
          aria-roledescription="carousel"
          aria-label="EHR and EMR systems"
        >
          <ul
            ref={track}
            className="scribe-ehr-track"
            onScroll={sync}
            onPointerDown={() => setPlaying(false)}
            onKeyDown={() => setPlaying(false)}
            tabIndex={0}
            aria-label="Browse all 18 EHR platforms"
          >
            {systems.map(([name, file], i) => (
              <li
                key={file}
                className="scribe-ehr-card"
                aria-label={`${i + 1} of ${systems.length}: ${name}`}
              >
                <div className={"scribe-ehr-logo" + (["modmed", "therapynotes"].includes(file) ? " scribe-ehr-logo-dark" : "")}>
                  <img
                    src={`/ehr/scribe/${file}.${svgLogos.has(file) ? "svg" : "webp"}`}
                    alt={name + " logo"}
                    width="220"
                    height="90"
                    loading="lazy"
                  />
                </div>
                <h3>{name}</h3>
              </li>
            ))}
          </ul>
          <div className="scribe-ehr-controls">
            <div className="scribe-ehr-pagination">
              <span>
                {String(active + 1).padStart(2, "0")}{" "}
                <span>/ 18 platforms</span>
              </span>
              <div className="scribe-ehr-progress" aria-hidden="true">
                <span
                  style={{ width: `${((active + 1) / systems.length) * 100}%` }}
                />
              </div>
            </div>
            <div className="scribe-ehr-buttons">
              <button
                type="button"
                onClick={() => {
                  setPlaying(false)
                  move((current.current + systems.length - 1) % systems.length)
                }}
                aria-label="Previous EHR platform"
              >
                Previous
              </button>
              <button
                type="button"
                aria-pressed={playing}
                onClick={() => setPlaying((p) => !p)}
              >
                {playing ? "Pause" : "Play"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPlaying(false)
                  move((current.current + 1) % systems.length)
                }}
                aria-label="Next EHR platform"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <p className="scribe-ehr-contact">
          Your system isn’t listed?{" "}
          <a href="#scribe-consultation">Contact us.</a> We’ll review your EHR
          and workflow before onboarding begins.
        </p>
      </div>
    </section>
  )
}
