import { useEffect, useRef, useState } from 'react'
import './ReviewSlider.css'
type Review={name:string;role:string;quote:string;stars:number;image?:string}
export default function ReviewSlider({reviews}:{reviews:Review[]}){
 const viewport=useRef<HTMLDivElement>(null),pointerStart=useRef<number|null>(null)
 const [index,setIndex]=useState(0),[step,setStep]=useState(0),[animate,setAnimate]=useState(true)
 const [playing,setPlaying]=useState(false),[hover,setHover]=useState(false)
 const count=reviews.length
 useEffect(()=>{setPlaying(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);const el=viewport.current;if(!el)return;const observer=new ResizeObserver(()=>{const card=el.querySelector('article');if(card)setStep(card.getBoundingClientRect().width+16)});observer.observe(el);return()=>observer.disconnect()},[])
 useEffect(()=>{if(!playing||hover)return;const timer=window.setInterval(()=>{setAnimate(true);setIndex(i=>i+1)},4000);return()=>window.clearInterval(timer)},[playing,hover])
 useEffect(()=>{if(index<count)return;const timer=window.setTimeout(()=>{setAnimate(false);setIndex(0)},1000);return()=>window.clearTimeout(timer)},[index,count])
 function choose(i:number){setPlaying(false);setAnimate(true);setIndex(i)}
 return <div className="vam-review-slider" role="region" aria-roledescription="carousel" aria-label="Healthcare practice reviews" onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} onFocusCapture={()=>setHover(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget))setHover(false)}}>
 <div className="vr-viewport" ref={viewport} tabIndex={0} onPointerDown={e=>{pointerStart.current=e.clientX}} onPointerUp={e=>{if(pointerStart.current===null)return;const distance=e.clientX-pointerStart.current;pointerStart.current=null;if(Math.abs(distance)>40)choose((index+(distance<0?1:count-1))%count)}} onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();choose((index+1)%count)}if(e.key==='ArrowLeft'){e.preventDefault();choose((index+count-1)%count)}}} aria-label="Reviews. Use left and right arrow keys to navigate.">
 <div className="vr-track" style={{transform:`translateX(-${index*step}px)`,transition:animate?'transform 1s ease':'none'}}>{[...reviews,...reviews].map((r,i)=><article className="vr-card" key={`${r.name}-${i}`} aria-hidden={i>=count?true:undefined}>
 <div className="vr-person"><img src={r.image||`/images/review-portrait-${[1,3,2,4][i%count]}.webp`} alt="Illustrative physician portrait" width="88" height="88" loading="lazy"/><strong>{r.name}</strong><span>{r.role}</span></div>
 <blockquote>“{r.quote}”</blockquote><div className="vr-stars" aria-label={`${r.stars} out of 5 stars`}>{'★'.repeat(r.stars)}</div>
 </article>)}</div></div>
 <div className="vr-controls"><div className="vr-dots" aria-label="Choose a review">{reviews.map((r,i)=><button key={r.name} type="button" className={index%count===i?'active':''} aria-label={`Show review from ${r.name}`} aria-current={index%count===i?'true':undefined} onClick={()=>choose(i)}/>)}</div><button className="vr-play" type="button" aria-label={playing?'Pause automatic sliding':'Resume automatic sliding'} aria-pressed={playing} onClick={()=>setPlaying(p=>!p)}>{playing?'Ⅱ':'▶'}</button></div>
 <p className="vr-photo-note">Portrait photos are illustrative.</p></div>
}
