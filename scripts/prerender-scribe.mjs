import { createServer } from 'vite'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter, Routes, Route } from 'react-router'
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises'
const server = await createServer({server:{middlewareMode:true},appType:'custom'})
try {
 for(const [module,slug,prefix] of [['VirtualMedicalScribePage','virtual-medical-scribe','SCRIBE'],['VirtualMedicalReceptionistPage','virtual-medical-receptionist','RECEPTION'],['AboutPage','about-us','ABOUT'],['ContactPage','contact-us','CONTACT'],['ServicesPage','services','SERVICES'],['FAQsPage','faqs','FAQS'],['PricingPage','pricing','PRICING'],['MedicalAdminPage','services/medical-admin-assistant','ADMIN'],['MedicalBillingPage','services/medical-billing-assistant','BILLING'],['MedicalCoderPage','services/virtual-medical-coder','CODER'],['HiringYourVAPage','hiring-your-va','HIRING'],['HipaaPage','hipaa-compliant-virtual-assistant','HIPAA'],['RemotePatientMonitoringPage','services/remote-patient-monitoring-support','RPM'],['PrivacyPolicyPage','privacy-policy','PRIVACY'],['TermsPage','terms-and-conditions','TERMS'],['ReturnPolicyPage','return-policy','RETURN']]) {
 const loaded=await server.ssrLoadModule('/src/pages/'+module+'.tsx'); const Page=loaded.default, SCRIBE_TITLE=loaded[prefix+'_TITLE'], SCRIBE_DESCRIPTION=loaded[prefix+'_DESCRIPTION']
 let pageElement=React.createElement(Page)
 if (['privacy-policy','terms-and-conditions','return-policy'].includes(slug)) {
   const {default:Layout}=await server.ssrLoadModule('/src/components/Layout.tsx')
   pageElement=React.createElement(Routes,null,React.createElement(Route,{element:React.createElement(Layout)},React.createElement(Route,{path:'/'+slug+'/',element:pageElement})))
 }
 let markup=renderToString(React.createElement(MemoryRouter,{initialEntries:['/'+slug+'/']},pageElement))
 const assets=await readdir('dist/assets')
 markup=markup.replace(/\/src\/assets\/([^"?)\s]+)(?:\?[^" )]*)?/g,(_,name)=>{const stem=name.replace(/\.[^.]+$/,'');const hit=assets.find(x=>x.startsWith(stem+'-'));if(!hit)throw new Error('Missing asset '+name);return '/assets/'+hit})
 markup=markup.replace(/<title>.*?<\/title>|<meta\b[^>]*>|<link\b[^>]*rel="canonical"[^>]*>/g,'')
 let html=await readFile('dist/index.html','utf8')
 html=html.replace(/<title>.*?<\/title>/s,`<title>${SCRIBE_TITLE}</title>`).replace(/<meta\b[^>]*(?:name="(?:description|robots)"|property="og:[^"]+")[^>]*>/g,'')
 html=html.replace('</head>',`<meta name="description" content="${SCRIBE_DESCRIPTION}"><meta name="robots" content="index, follow"><link rel="canonical" href="https://virtual-assistant-medical.ahmed-raza276082.chatgpt.site/${slug}/"><meta property="og:title" content="${SCRIBE_TITLE}"><meta property="og:description" content="${SCRIBE_DESCRIPTION}"><meta property="og:url" content="https://virtual-assistant-medical.ahmed-raza276082.chatgpt.site/${slug}/"><meta property="og:type" content="website"></head>`).replace('<div id="root"></div>',`<div id="root">${markup}</div>`)
 await mkdir('dist/'+slug,{recursive:true});await writeFile('dist/'+slug+'/index.html',html)
 }

 const {BLOG_POSTS}=await server.ssrLoadModule('/src/data/blogPosts.ts')
 const {default:BlogPage,BLOG_TITLE,BLOG_DESCRIPTION}=await server.ssrLoadModule('/src/pages/BlogPage.tsx')
 const {default:BlogArticlePage}=await server.ssrLoadModule('/src/pages/BlogArticlePage.tsx')
 const {default:BlogLayout}=await server.ssrLoadModule('/src/components/Layout.tsx')
 const blogOrigin='https://virtualassistantmedical.us'
 const escapeHTML=value=>String(value).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
 for (const entry of [{path:'blog',Page:BlogPage,route:'/blog/',title:BLOG_TITLE,description:BLOG_DESCRIPTION},...BLOG_POSTS.map(post=>({path:'blog/'+post.slug,Page:BlogArticlePage,route:'/blog/:slug/',title:post.metaTitle,description:post.metaDescription,post}))]) {
   const route=React.createElement(Routes,null,React.createElement(Route,{element:React.createElement(BlogLayout)},React.createElement(Route,{path:entry.route,element:React.createElement(entry.Page)})))
   let markup=renderToString(React.createElement(MemoryRouter,{initialEntries:['/'+entry.path+'/']},route))
   const assets=await readdir('dist/assets')
   markup=markup.replace(/\/src\/assets\/([^"?)\s]+)(?:\?[^" )]*)?/g,(_,name)=>{const stem=name.replace(/\.[^.]+$/,'');const hit=assets.find(x=>x.startsWith(stem+'-'));if(!hit)throw new Error('Missing asset '+name);return '/assets/'+hit})
   markup=markup.replace(/<title>.*?<\/title>|<meta\b[^>]*>|<link\b[^>]*rel="canonical"[^>]*>/g,'')
   let html=await readFile('dist/index.html','utf8')
   html=html.replace(/<title>.*?<\/title>/s,`<title>${escapeHTML(entry.title)}</title>`).replace(/<meta\b[^>]*(?:name="(?:description|robots)"|property="(?:og:|article:)[^"]+")[^>]*>/g,'')
   const pageURL=blogOrigin+'/'+entry.path+'/'
   const imageURL=blogOrigin+(entry.post?.image||'/images/blog-practice-insights.webp')
   html=html.replace('</head>',`<meta name="description" content="${escapeHTML(entry.description)}"><meta name="robots" content="index, follow"><link rel="canonical" href="${pageURL}"><meta property="og:title" content="${escapeHTML(entry.title)}"><meta property="og:description" content="${escapeHTML(entry.description)}"><meta property="og:url" content="${pageURL}"><meta property="og:image" content="${imageURL}"><meta property="og:type" content="${entry.post?'article':'website'}">${entry.post?`<meta property="article:published_time" content="${entry.post.published}">`:''}</head>`).replace('<div id="root"></div>',`<div id="root">${markup}</div>`)
   await mkdir('dist/'+entry.path,{recursive:true});await writeFile('dist/'+entry.path+'/index.html',html)
 }
 const base='https://virtualassistantmedical.us';
 const slugs=['virtual-medical-scribe','virtual-medical-receptionist','about-us','contact-us','services','faqs','pricing','services/medical-admin-assistant','services/medical-billing-assistant','blog','services/virtual-medical-coder','hiring-your-va','hipaa-compliant-virtual-assistant','services/remote-patient-monitoring-support','privacy-policy','terms-and-conditions','return-policy',...BLOG_POSTS.map(post=>'blog/'+post.slug)];
 await writeFile('dist/robots.txt','User-agent: *\n'+slugs.map(s=>'Allow: /'+s+'/\n').join('')+'Allow: /assets/\nDisallow: /\nSitemap: '+base+'/sitemap.xml\n')
 await writeFile('dist/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+slugs.map(s=>'<url><loc>'+base+'/'+s+'/</loc></url>').join('')+'</urlset>')
 console.log('Service pages, policies, blog index and '+BLOG_POSTS.length+' articles prerendered with metadata, structured data and sitemap.')
} finally {await server.close()}
