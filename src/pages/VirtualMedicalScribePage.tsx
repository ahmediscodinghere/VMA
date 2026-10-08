import ServiceFAQs from '../components/ServiceFAQs'
import ScribeEHRSlider from '../components/ScribeEHRSlider'
import { useEffect, useState } from 'react'
import portrait from '../assets/role-scribe-scrubs.png'
import './VirtualMedicalScribePage.css'
import './ScribeReference.css'
import { EXACT_SECTIONS, EXACT_FAQS } from '../data/scribeExact'
import doctorVisit from '../assets/scribe-doctor-visit.png'
import doctorReview from '../assets/scribe-doctor-review.png'
import vamLogo from '../assets/logo1.png'

export const SCRIBE_TITLE = 'Virtual Medical Scribe Services | Virtual Assistant Medical'
export const SCRIBE_DESCRIPTION = 'Virtual medical scribe services for physicians and clinics. Get EHR documentation support, keep provider control, and book a free VAM consultation.'
const url = 'https://virtual-assistant-medical.ahmed-raza276082.chatgpt.site/virtual-medical-scribe/'
export const SCRIBE_FAQS = EXACT_FAQS.slice(0,6)
const schema = {'@context':'https://schema.org','@graph':[
 {'@type':'Service',name:'Virtual Medical Scribe Services',serviceType:'Remote medical documentation support',url,provider:{'@type':'Organization',name:'Virtual Assistant Medical'}},
 {'@type':'FAQPage',mainEntity:SCRIBE_FAQS.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))},
 {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:'https://virtual-assistant-medical.ahmed-raza276082.chatgpt.site/'},{'@type':'ListItem',position:2,name:'Services',item:'https://virtual-assistant-medical.ahmed-raza276082.chatgpt.site/services'},{'@type':'ListItem',position:3,name:'Virtual Medical Scribe',item:url}]}
]}
export default function VirtualMedicalScribePage(){
 const [notice,setNotice]=useState('')
 useEffect(()=>{const tags=Array.from(document.querySelectorAll<HTMLMetaElement>('meta[name="robots"]'));const prior=tags.map(t=>t.content);tags.forEach(t=>{t.content='index, follow'});return ()=>tags.forEach((t,i)=>{t.content=prior[i]})},[])
 function updateSavings(e:React.FormEvent<HTMLElement>){const scope=e.currentTarget;const num=(id:string)=>{const value=Number(scope.querySelector<HTMLInputElement>('#'+id)?.value);return Number.isFinite(value)?Math.max(0,value):0};const annual=num('c-prov')*num('c-hrs')*52*(num('c-in')-num('c-virt'));const fmt=new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0});for(const [id,value] of [['r-month',annual/12],['r-year',annual]] as const){const node=scope.querySelector('#'+id);if(node)node.textContent=fmt.format(value)}}
 function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();const data=new FormData(e.currentTarget);const body=Array.from(data.entries()).map(([k,v])=>`${k}: ${v}`).join('\n');window.location.href=`mailto:info@virtualassistantmedical.us?subject=${encodeURIComponent('Virtual medical scribe consultation')}&body=${encodeURIComponent(body)}`;setNotice('Your email app will open with your enquiry. Review it and press Send to contact VAM.')}
 return <main className="scribe-page scribe-reference">
 <title>{SCRIBE_TITLE}</title><meta name="description" content={SCRIBE_DESCRIPTION}/><link rel="canonical" href={url}/><meta property="og:title" content={SCRIBE_TITLE}/><meta property="og:description" content={SCRIBE_DESCRIPTION}/><meta property="og:url" content={url}/><meta property="og:type" content="website"/>
 <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
 <section className="scribe-hero"><div className="scribe-wrap"><div className="scribe-hero-grid"><div>
 <h1>Virtual Medical Scribe Services for <em>Physicians and Clinics</em></h1>
 <p className="scribe-lead">Finish your charts before the patient leaves the room. Our trained virtual medical scribes join your visits by secure video or audio, document in your EHR in real time, and give you your evenings back.</p>
 <p className="scribe-hero-line">You see the patient. We handle the note. You review and sign.</p>
 <div className="scribe-actions"><a className="scribe-button" href="#scribe-consultation">Book a free consultation</a><a className="scribe-button secondary" href="#scribe-pricing">See pricing</a></div>
 <ul className="scribe-trust"><li>HIPAA-compliant workflows</li><li>Works with any EHR you can access</li></ul>
 </div><div className="scribe-hero-visual"><div className="scribe-portrait-backdrop"/><img src={portrait} alt="Medical scribe wearing blue scrubs and a headset" width="1024" height="1536" fetchPriority="high"/><div className="scribe-vam-mark"><span className="brand-logo-crop"><img src={vamLogo} alt="Virtual Assistant Medical"/></span></div></div></div></div></section>
 {EXACT_SECTIONS.map(section=>section.number===9?<ScribeEHRSlider key={section.number}/>:<section onInput={updateSavings} onSubmit={e=>e.preventDefault()} key={section.number} id={section.number===12?'scribe-pricing':`scribe-section-${section.number}`} className={`scribe-section exact-scribe-section ${[3,7,9,11,13].includes(section.number)?'scribe-tint':''} `}><div className="scribe-wrap">
 <h2>{section.title}</h2>
 {[2,11].includes(section.number)?<div className="scribe-editorial"><img className="scribe-doctor-image" src={section.number===2?doctorVisit:doctorReview} alt={section.number===2?'Physician listening to a patient during a consultation':'Physician reviewing documentation on a laptop'} loading="lazy" width="1536" height="1024"/><div className="scribe-exact-copy" dangerouslySetInnerHTML={{__html:section.html}}/></div>:<div className="scribe-exact-copy" dangerouslySetInnerHTML={{__html:section.html}}/>}
 {section.number===10&&<div className="scribe-security-art" aria-hidden="true"><svg viewBox="0 0 120 120" width="100" height="100" fill="none" stroke="currentColor" strokeWidth="4"><path d="M60 8 100 24v32c0 27-40 54-40 54S20 83 20 56V24Z"/><path d="m39 58 15 15 29-32"/></svg><span className="brand-logo-crop"><img src={vamLogo} alt=""/></span></div>}
 </div></section>)}
 <ServiceFAQs id="scribe-faqs" items={SCRIBE_FAQS.map(([q,a])=>({q,a}))}/>
 <section id="scribe-consultation" className="scribe-section scribe-tint"><div className="scribe-wrap scribe-two"><div><h2>Ready to Finish Charts Before the Patient Leaves?</h2><p>Tell us about your practice, and we'll recommend the right scribe model and show you what it would cost.</p><img className="scribe-doctor-image" src={doctorReview} alt="Physician reviewing patient encounter documentation" loading="lazy"/></div><form className="scribe-form" onSubmit={submit}><h3>Book a free consultation</h3><div className="scribe-form-grid">{[['Name','text',true],['Practice name','text',true],['Specialty','text',false],['EHR','text',false],['Number of providers','number',false],['Email','email',true],['Phone','tel',false]].map(([label,type,required])=><label key={String(label)}>{label}{required?' *':''}<input name={String(label)} type={String(type)} required={Boolean(required)} min={type==='number'?1:undefined}/></label>)}</div><button className="scribe-button" type="submit">Book a free consultation</button><p className="scribe-form-note">Opens your email app with your details. Send the email there to submit your enquiry.</p>{notice&&<p role="status">{notice}</p>}</form></div></section>
 </main>
}
