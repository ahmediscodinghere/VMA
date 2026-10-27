# Adding a VAM blog article

Articles live in `src/data/blogPosts.ts`. Append an entry to `BLOG_POSTS`; the listing, article route, related articles, sitemap, and static HTML build use this same collection.

Each entry needs:

- A unique lowercase `slug`, category, title, short excerpt, and focus keyword.
- A `metaTitle` under 60 characters and a `metaDescription` under 160 characters.
- An existing image path from `public/` and descriptive image alt text.
- An actual publication date in `YYYY-MM-DD` format and an accurate reading time.
- Introductory paragraphs, distinct H2 sections, and optional bullet points.
- A relevant CTA title and paragraph. The template places this immediately before the conclusion.
- A conclusion and exactly six unique FAQs with useful answers.
- A working internal service link and service label.
- Relevant authoritative sources, with labels and complete URLs. Verify healthcare, privacy, billing, and legal statements before publication.

Keep clinical decisions and final documentation approval with qualified professionals. Avoid unsupported savings, reimbursement, compliance, or staffing guarantees. Use the VAM organization as the author unless an actual individual author is provided.

The article template supplies the shared site header/footer, table of contents, FAQ disclosures, source list, CTA, and related links. Keep these in the template rather than duplicating them in the content.

Before publication, run `npm run build`, type checks, and browser checks. Confirm the new article loads directly and from its Read More link, the image works, all six FAQs open, and metadata and sitemap use `https://virtualassistantmedical.us/blog/<slug>/`.
