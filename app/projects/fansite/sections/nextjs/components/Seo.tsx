'use client'
import React from 'react'
import PlainContainer from '@/projects/components/PlainContainer'

export default function Seo() {
  return (
    <PlainContainer id="seo-ai" title="SEO Future‑Proofed for AI">
      <div>
        <p>
          The site is engineered not just for traditional search engine optimization, but for long-term machine readability in the age of AI-powered discovery and retrieval.
          <br /><br />
          Under the hood, the site makes extensive use of <strong>semantic HTML5 structure</strong> and <strong>ARIA roles</strong> to ensure content is accessible, meaningful, and ranked appropriately by search engines. These choices support better crawling, improved page indexing, and higher placement for relevant queries.
          <br /><br />
          Beyond accessibility, the platform is <strong>deeply annotated with JSON-LD structured data</strong>, the same schema used by modern AI systems for retrieval-augmented generation (RAG), rich results, and contextual understanding. Every major content type, including articles, media, and events, is marked up in a machine-consumable format, giving both search engines and large language models a reliable source of context.
          <br /><br />
          Paired with the Bot Parity Layer, AI assistants such as ChatGPT, Perplexity, and Claude are deliberately routed to the fully rendered bot experience, where they ingest deterministic markup, canonical links, and structured data without any hydration lag. That means the same adaptive system that delights fans also feeds high-signal data to the models and aggregators shaping modern discovery.
          <br /><br />
          By aligning the frontend experience with backend data clarity, the site maintains strong visibility today while remaining compatible with emerging AI-driven discovery patterns.
        </p>
      </div>
    </PlainContainer>
  )
}
