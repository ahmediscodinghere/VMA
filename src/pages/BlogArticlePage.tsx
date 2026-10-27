import { useEffect } from 'react'
import { Link, useParams } from 'react-router'
import { BLOG_POSTS } from '../data/blogPosts'
import type { BlogPost } from '../data/blogPosts'
import './BlogPage.css'

function Article({post}:{post:BlogPost}) {
  useEffect(() => {
    const tags=Array.from(document.querySelectorAll<HTMLMetaElement>('meta[name="robots"]'))
    const old=tags.map(t=>t.content);tags.forEach(t=>t.content='index, follow')
    return()=>tags.forEach((t,i)=>t.content=old[i])
  }, [])
  const url=`https://virtualassistantmedical.us/blog/${post.slug}/`
  const schema={
    '@context':'https://schema.org',
    '@graph':[
      {'@type':'BlogPosting',headline:post.title,description:post.metaDescription,image:`https://virtualassistantmedical.us${post.image}`,datePublished:post.published,dateModified:post.published,mainEntityOfPage:url,author:{'@type':'Organization',name:'Virtual Assistant Medical'},publisher:{'@type':'Organization',name:'Virtual Assistant Medical',url:'https://virtualassistantmedical.us/'}},
      {'@type':'FAQPage',mainEntity:post.faqs.map(f=>({'@type':'Question',name:f.question,acceptedAnswer:{'@type':'Answer',text:f.answer}}))},
      {'@type':'BreadcrumbList',itemListElement:[{ '@type':'ListItem',position:1,name:'Home',item:'https://virtualassistantmedical.us/'},{'@type':'ListItem',position:2,name:'Blog',item:'https://virtualassistantmedical.us/blog/'},{'@type':'ListItem',position:3,name:post.title,item:url}]}
    ]
  }
  return <div className="vam-blog blog-article">
    <title>{post.metaTitle}</title>
    <meta name="description" content={post.metaDescription}/>
    <link rel="canonical" href={url}/>
    <meta property="og:title" content={post.metaTitle}/><meta property="og:description" content={post.metaDescription}/><meta property="og:url" content={url}/><meta property="og:type" content="article"/><meta property="og:image" content={'https://virtualassistantmedical.us'+post.image}/>
    <meta property="article:published_time" content={post.published}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/>
    <header className="blog-article-hero"><div className="blog-wrap">
      <nav aria-label="Breadcrumb"><Link to="/">Home</Link> / <Link to="/blog/">Blog</Link> / <span aria-current="page">{post.category}</span></nav>
      <span className="blog-label">{post.category}</span>
      <h1>{post.title}</h1>
      <p>{post.excerpt}</p>
      <div className="blog-post-meta"><span>By Virtual Assistant Medical</span><span>•</span><time dateTime={post.published}>{new Date(post.published+'T12:00:00').toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})}</time><span>• {post.readTime}</span></div>
    </div></header>
    <div className="blog-wrap blog-article-layout">
      <article className="blog-article-main">
        <img className="blog-article-cover" src={post.image} alt={post.imageAlt} width="1200" height="720"/>
        <div className="blog-article-copy">
          {post.intro.map((p,i)=><p key={i}>{p}</p>)}
          <nav aria-label="In this article" className="blog-table-contents"><strong>In this article</strong><ol>{post.sections.map((s,i)=><li key={i}><a href={`#section-${i+1}`}>{s.heading}</a></li>)}<li><a href="#conclusion">Conclusion</a></li><li><a href="#article-faq-heading">Frequently Asked Questions</a></li></ol></nav>
          {post.sections.map((s,i)=><section key={s.heading} id={`section-${i+1}`} className="blog-content-section">
            <h2>{s.heading}</h2>{s.paragraphs.map((p,j)=><p key={j}>{p}</p>)}
            {s.points&&<ul>{s.points.map(point=><li key={point}>{point}</li>)}</ul>}
          </section>)}
          <section className="blog-sources" aria-labelledby="blog-sources-heading"><h2 id="blog-sources-heading">Further reading</h2><ul>{post.sources.map(source=><li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label} <span aria-hidden="true">↗</span></a></li>)}</ul></section>
          <aside className="blog-inline-cta"><div><span>Virtual Assistant Medical</span><h2>{post.ctaTitle}</h2><p>{post.ctaText}</p><Link to="/contact-us/" className="blog-cta-button">Talk to Our Team</Link></div><img src="/images/contact-vam-assistant.webp" alt="Virtual medical assistant available to discuss practice support" loading="lazy"/></aside>
          <section className="blog-content-section" id="conclusion"><h2>Conclusion</h2>{post.conclusion.map((p,i)=><p key={i}>{p}</p>)}<p><Link to={post.serviceLink}>{post.serviceLabel}</Link> or <Link to="/contact-us/">contact Virtual Assistant Medical</Link> to discuss your needs.</p></section>
          <section className="blog-faqs" aria-labelledby="article-faq-heading"><h2 id="article-faq-heading">Frequently Asked Questions</h2>{post.faqs.map((f,i)=><details key={f.question}><summary>{i+1}. {f.question}</summary><p>{f.answer}</p></details>)}</section>
          <div className="blog-return"><Link to="/blog/">← Back to All Articles</Link></div>
        </div>
      </article>
      <aside className="blog-article-sidebar"><div className="blog-sidebar-panel"><span className="blog-label">Practice support</span><h2>Need help with day-to-day administration?</h2><p>Explore secure, task-focused remote assistance tailored to your medical office.</p><Link to={post.serviceLink}>{post.serviceLabel} →</Link></div><div className="blog-sidebar-panel"><h2>Other Articles</h2>{BLOG_POSTS.filter(p=>p.slug!==post.slug).slice(0,3).map(p=><Link key={p.slug} to={`/blog/${p.slug}/`} className="blog-sidebar-link">{p.title}</Link>)}</div></aside>
    </div>
  </div>
}
export default function BlogArticlePage(){
  const {slug}=useParams()
  const post=BLOG_POSTS.find(p=>p.slug===slug)
  if(!post)return <div className="vam-blog blog-missing"><h1>Article Not Found</h1><p>This article is not available.</p><Link to="/blog/">Return to the blog</Link></div>
  return <Article post={post}/>
}
