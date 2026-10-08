import { createServer } from 'vite'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router'
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises'
const server = await createServer({server:{middlewareMode:true},appType:'custom'})
try {
 for(const [module,slug,prefix] of [['VirtualMedicalScribePage','virtual-medical-scribe','SCRIBE'],['VirtualMedicalReceptionistPage','virtual-medical-receptionist','RECEPTION'],['AboutPage','about-us','ABOUT'],['ContactPage','contact-us','CONTACT'],['ServicesPage','services','SERVICES'],['FAQsPage','faqs','FAQS'],['PricingPage','pricing','PRICING']]) {
 const loaded=await server.ssrLoadModule('/src/pages/'+module+'.tsx'); const Page=loaded.default, SCRIBE_TITLE=loaded[prefix+'_TITLE'], SCRIBE_DESCRIPTION=loaded[prefix+'_DESCRIPTION']
 let markup=renderToString(React.createElement(MemoryRouter,{initialEntries:['/'+slug+'/']},React.createElement(Page)))
 const assets=await readdir('dist/assets')
 markup=markup.replace(/\/src\/assets\/([^"?)\s]+)(?:\?[^" )]*)?/g,(_,name)=>{const stem=name.replace(/\.[^.]+$/,'');const hit=assets.find(x=>x.startsWith(stem+'-'));if(!hit)throw new Error('Missing asset '+name);return '/assets/'+hit})
 markup=markup.replace(/<title>.*?<\/title>|<meta\b[^>]*>|<link\b[^>]*rel="canonical"[^>]*>/g,'')
 let html=await readFile('dist/index.html','utf8')
 html=html.replace(/<title>.*?<\/title>/s,`<title>${SCRIBE_TITLE}</title>`).replace(/<meta\b[^>]*(?:name="(?:description|robots)"|property="og:[^"]+")[^>]*>/g,'')
 html=html.replace('</head>',`<meta name="description" content="${SCRIBE_DESCRIPTION}"><meta name="robots" content="index, follow"><link rel="canonical" href="https://virtual-assistant-medical.ahmed-raza276082.chatgpt.site/${slug}/"><meta property="og:title" content="${SCRIBE_TITLE}"><meta property="og:description" content="${SCRIBE_DESCRIPTION}"><meta property="og:url" content="https://virtual-assistant-medical.ahmed-raza276082.chatgpt.site/${slug}/"><meta property="og:type" content="website"></head>`).replace('<div id="root"></div>',`<div id="root">${markup}</div>`)
 await mkdir('dist/'+slug,{recursive:true});await writeFile('dist/'+slug+'/index.html',html)
 }
 const base='https://virtual-assistant-medical.ahmed-raza276082.chatgpt.site';
 const slugs=['virtual-medical-scribe','virtual-medical-receptionist','about-us','contact-us','services','faqs','pricing'];
 await writeFile('dist/robots.txt','User-agent: *\n'+slugs.map(s=>'Allow: /'+s+'/\n').join('')+'Allow: /assets/\nDisallow: /\nSitemap: '+base+'/sitemap.xml\n')
 await writeFile('dist/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+slugs.map(s=>'<url><loc>'+base+'/'+s+'/</loc></url>').join('')+'</urlset>')
 console.log('Scribe page prerendered with metadata, structured data, and sitemap.')
} finally {await server.close()}
