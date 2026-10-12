import { useEffect, useRef, useState } from 'react'
import './HomeEHRCarousel.css'

export const HOME_EHR_PLATFORMS = [
  ['Epic', 'epic', '/ehr/home/epic.png'],
  ['eClinicalWorks', 'eclinicalworks', '/ehr/home/eclinicalworks.webp'],
  ['Elation', 'elation', '/ehr/home/elation.webp'],
  ['eMedicalPractice', 'emedicalpractice', '/ehr/home/emedicalpractice.webp'],
  ['Office Ally', 'office-ally', '/ehr/home/office-ally.webp'],
  ['talkEHR', 'talkehr', '/ehr/home/talkehr.webp'],
  ['NextPatient', 'nextpatient', '/ehr/home/nextpatient.webp'],
  ['Practice Fusion', 'practice-fusion', '/ehr/scribe/practice-fusion.svg'],
  ['DrChrono', 'drchrono', '/ehr/home/drchrono.webp'],
  ['TherapyNotes', 'therapynotes', '/ehr/home/therapynotes.webp'],
  ['AdvancedMD', 'advancedmd', '/ehr/home/advancedmd.webp'],
  ['PracticeQ', 'practiceq', '/ehr/scribe/practiceq.svg'],
  ['Plexia', 'plexia', '/ehr/home/plexia.webp'],
  ['Jane', 'jane', '/ehr/home/jane.webp'],
  ['CharmHealth', 'charmhealth', '/ehr/home/charmhealth.webp'],
  ['Azalea Health', 'azalea-health', '/ehr/home/azalea-health.webp'],
  ['athenahealth', 'athenahealth', '/ehr/scribe/athenahealth.svg'],
  ['Sessions Health', 'sessions-health', '/ehr/home/sessions-health.webp'],
  ['Atlas MD', 'atlas-md', '/ehr/home/atlas-md.webp'],
  ['Tebra', 'tebra', '/ehr/home/tebra.webp'],
  ['Qualifacts', 'qualifacts', '/ehr/home/qualifacts.webp'],
  ['NextGen Healthcare', 'nextgen', '/ehr/scribe/nextgen.svg'],
]
const count = HOME_EHR_PLATFORMS.length

export default function HomeEHRCarousel() {
  const track = useRef<HTMLUListElement>(null)
  const [index, setIndex] = useState(count)
  const [step, setStep] = useState(0)
  const [animate, setAnimate] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [pausedByInteraction, setPausedByInteraction] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const pointerStart = useRef<number | null>(null)
  const active = ((index % count) + count) % count

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(preference.matches)
    setPlaying(!preference.matches)
    const updatePreference = () => { setReducedMotion(preference.matches); if (preference.matches) { setPlaying(false); setAnimate(false) } }
    preference.addEventListener('change', updatePreference)
    const el = track.current
    const resize = () => {
      if (!el?.firstElementChild) return
      setAnimate(false)
      setStep(el.firstElementChild.getBoundingClientRect().width + parseFloat(getComputedStyle(el).columnGap || '18'))
    }
    resize()
    const observer = new ResizeObserver(resize)
    if (el) observer.observe(el)
    return () => { observer.disconnect(); preference.removeEventListener('change', updatePreference) }
  }, [])

  useEffect(() => {
    if (!playing || pausedByInteraction || step === 0) return
    const timer = window.setInterval(() => { setAnimate(!reducedMotion); setIndex(i => i + 1) }, 3500)
    return () => window.clearInterval(timer)
  }, [playing, pausedByInteraction, reducedMotion, step])

  useEffect(() => {
    if (index >= count && index < count * 2) return
    const timer = window.setTimeout(() => { setAnimate(false); setIndex(i => i < count ? i + count : i - count) }, animate ? 900 : 0)
    return () => window.clearTimeout(timer)
  }, [index, animate])

  function move(direction: number) {
    setPlaying(false)
    if (index < count || index >= count * 2) return
    setAnimate(!reducedMotion)
    setIndex(i => i + direction)
  }

  return <section className="home-ehr-section" id="ehr-platforms" aria-labelledby="home-ehr-heading">
    <div className="home-ehr-wrap">
      <div className="home-ehr-heading"><span>YOUR SYSTEMS. YOUR WORKFLOW.<svg viewBox="0 0 108 12" aria-hidden="true"><path d="M1 6c7-10 11 10 18 0s11 10 18 0 11 10 18 0 11 10 18 0 11 10 18 0 11 10 16 0" /></svg></span><h2 id="home-ehr-heading">Supporting Leading EHR and EMR Platforms</h2><p>Keep your existing setup. We review platform experience, approved access, and onboarding needs around the systems your practice uses.</p></div>
      <div className="home-ehr-carousel" role="region" aria-roledescription="carousel" aria-label="EHR and EMR platform logos" onMouseEnter={() => setPausedByInteraction(true)} onMouseLeave={() => setPausedByInteraction(false)} onFocusCapture={() => setPausedByInteraction(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setPausedByInteraction(false) }}>
        <div className="home-ehr-viewport" tabIndex={0} aria-label="Browse EHR logos. Use left and right arrow keys or swipe." onKeyDown={e => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); move(e.key === 'ArrowRight' ? 1 : -1) } }} onPointerDown={e => { pointerStart.current = e.clientX; setPlaying(false) }} onPointerUp={e => { if (pointerStart.current === null) return; const distance = e.clientX - pointerStart.current; pointerStart.current = null; if (Math.abs(distance) > 35) move(distance < 0 ? 1 : -1) }} onPointerCancel={() => { pointerStart.current = null }}>
          <ul ref={track} className="home-ehr-track" style={{ transform: 'translateX(-' + index * step + 'px)', transition: animate ? 'transform 900ms ease' : 'none' }}>
            {[0, 1, 2].flatMap(copy => HOME_EHR_PLATFORMS.map(([name, slug, image]) => <li className="home-ehr-card" key={slug + '-' + copy} aria-hidden={copy !== 1 ? true : undefined}><img src={image} alt={copy === 1 ? name + ' logo' : ''} width="300" height="160" loading="lazy" decoding="async" draggable={false} /></li>))}
          </ul>
        </div>
        <div className="home-ehr-controls"><div className="home-ehr-position"><strong>{String(active + 1).padStart(2, '0')} <span>/ {count} platforms</span></strong><div className="home-ehr-progress" aria-hidden="true"><span style={{ width: ((active + 1) / count * 100) + '%' }} /></div></div><div className="home-ehr-buttons"><button type="button" onClick={() => move(-1)} aria-label="Previous EHR platform" disabled={index < count || index >= count * 2}>←</button><button type="button" className="home-ehr-play" aria-pressed={playing} aria-label={playing ? 'Pause automatic logo sliding' : 'Start automatic logo sliding'} onClick={() => setPlaying(p => !p)}>{playing ? 'Pause' : 'Play'}</button><button type="button" onClick={() => move(1)} aria-label="Next EHR platform" disabled={index < count || index >= count * 2}>→</button></div></div>
      </div>
      <p className="home-ehr-contact">Your platform isn’t listed? <a href="#contact">Let’s review your workflow.</a></p>
    </div>
  </section>
}
