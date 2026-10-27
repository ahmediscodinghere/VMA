import { useEffect } from 'react'
import { Link } from 'react-router'
import { BLOG_POSTS } from '../data/blogPosts'
import './BlogPage.css'

export const BLOG_TITLE = 'Medical Virtual Assistant Blog | VAM Insights'
export const BLOG_DESCRIPTION = 'Explore six healthcare guides on medical receptionists, scribes, billing, dental support, bilingual assistants, and practice administration.'

export default function BlogPage() {
  useEffect(() => {
    const tags=Array.from(document.querySelectorAll<HTMLMetaElement>('meta[name="robots"]'))
    const old=tags.map(t=>t.content);tags.forEach(t=>t.content='index, follow')
    return()=>tags.forEach((t,i)=>t.content=old[i])
  }, [])
  const url='https://virtualassistantmedical.us/blog/'
  const schema={'@context':'https://schema.org','@type':'CollectionPage',name:BLOG_TITLE,url,description:BLOG_DESCRIPTION,mainEntity:{'@type':'ItemList',itemListElement:BLOG_POSTS.map((post,i)=>({'@type':'ListItem',position:i+1,name:post.title,url:url+post.slug+'/'}))}}
  return <div className="vam-blog">
    <title>{BLOG_TITLE}</title>
    <meta name="description" content={BLOG_DESCRIPTION}/>
    <link rel="canonical" href={url}/>
    <meta property="og:title" content={BLOG_TITLE}/><meta property="og:description" content={BLOG_DESCRIPTION}/><meta property="og:url" content={url}/><meta property="og:type" content="website"/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/>
    <header className="blog-list-hero">
      <div className="blog-wrap">
        <nav aria-label="Breadcrumb"><Link to="/">Home</Link><span> / Blog</span></nav>
        <span className="blog-label">Virtual Assistant Medical • Resources</span>
        <h1>Medical Virtual Assistant <em>Blog &amp; Insights</em></h1>
        <p>Practical guides for healthcare teams managing patient calls, documentation, billing, scheduling, and day-to-day practice operations.</p>
      </div>
    </header>
    <section className="blog-section" aria-labelledby="blog-guides-heading">
      <div className="blog-wrap">
        <div className="blog-section-heading"><div><span className="blog-label">Healthcare insights</span><h2 id="blog-guides-heading">Latest Articles</h2></div><p>Explore practical administrative guides and clear workflows for your team.</p></div>
        <div className="blog-grid">
          {BLOG_POSTS.map(post=><article className="blog-card" key={post.slug}>
            <Link to={`/blog/${post.slug}/`} className="blog-card-photo" aria-label={`Read ${post.title}`}>
              <img src={post.image} alt={post.imageAlt} loading="lazy" width="800" height="480"/>
            </Link>
            <div className="blog-card-body">
              <span className="blog-photo-tag">{post.category}</span>
              <h3><Link to={`/blog/${post.slug}/`}>{post.title}</Link></h3>
              <div className="blog-post-meta"><time dateTime={post.published}>{new Date(post.published+'T12:00:00').toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})}</time><span>• {post.readTime}</span></div>
              <p>{post.excerpt}</p>
              <Link className="blog-read-more" to={`/blog/${post.slug}/`}>Read More <span aria-hidden="true">→</span></Link>
            </div>
          </article>)}
        </div>
      </div>
    </section>
    <section className="blog-list-cta">
      <div className="blog-wrap blog-cta-inner">
        <div><h2>Ready to Stop Guessing About Missed Calls?</h2><p>Get dependable remote support for the everyday work that keeps your practice running.</p><Link to="/contact-us/" className="blog-cta-button">Talk to Our Team</Link></div>
        <img src="/images/contact-vam-assistant.webp" alt="Virtual medical assistant speaking to a patient using a headset" loading="lazy"/>
      </div>
    </section>
  </div>
}
