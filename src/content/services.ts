export type ServiceDetail = { heading: string; accent: string; overview: string; support: string; deliverables: string[][]; capabilities: string[] };
export const serviceDetails: Record<string, ServiceDetail> = {
  "web-design-technical-seo": {
    "heading": "Good design.",
    "accent": "Built to perform.",
    "overview": "A strong website connects clear messaging, intuitive navigation and a technical foundation that helps people find you.",
    "support": "We shape the interface, build responsive layouts and refine the structure, metadata and performance behind the experience.",
    "deliverables": [
      [
        "UI & UX",
        "Visual direction",
        "Page layouts"
      ],
      [
        "Site structure",
        "Metadata",
        "Technical audits"
      ],
      [
        "Mobile-first",
        "Performance",
        "Responsive tuning"
      ]
    ],
    "capabilities": [
      "Clean interface design, clear messaging, and intuitive flows built to guide users with confidence.",
      "Technical SEO, metadata refinement, and structure tuning to strengthen visibility and rankings.",
      "Mobile-first builds and performance refinement to keep every experience polished and fast."
    ]
  },
  "video-production-editing": {
    "heading": "Your story.",
    "accent": "Every frame matters.",
    "overview": "From long-form storytelling to short, attention-led edits, we shape footage around the audience and the platform.",
    "support": "Pacing, sound design and color work together to create a polished final piece, with organized edits and platform-ready exports.",
    "deliverables": [
      [
        "Narrative pacing",
        "Seamless cuts",
        "Storytelling"
      ],
      [
        "Strong hooks",
        "Platform formats",
        "Short-form edits"
      ],
      [
        "Audio finishing",
        "Color balance",
        "Final exports"
      ]
    ],
    "capabilities": [
      "Narrative pacing, seamless cuts, and polished storytelling designed for deeper audience engagement.",
      "Fast-paced edits, strong hooks, and platform-ready cuts built for higher reach and retention.",
      "Immersive audio, balanced color, and cinematic finishing that elevate the overall impact."
    ]
  },
  "creator-growth-youtube-strategy": {
    "heading": "More than views.",
    "accent": "A channel with direction.",
    "overview": "Build a content system around your niche, audience and creative strengths, with a clearer path from discovery to returning viewers.",
    "support": "We connect YouTube SEO, channel positioning and thumbnail direction so every new upload supports the bigger picture.",
    "deliverables": [
      [
        "Keywords",
        "Metadata",
        "Discoverability"
      ],
      [
        "Channel positioning",
        "Content planning",
        "Audience strategy"
      ],
      [
        "Visual concepts",
        "Thumbnail systems",
        "Creative refinement"
      ]
    ],
    "capabilities": [
      "Keyword-rich optimization, metadata shaping, and discoverability improvements tailored to your niche.",
      "Growth-focused planning, channel positioning, and content systems built for sustained expansion.",
      "High-contrast thumbnails and click-worthy visuals crafted to boost curiosity and CTR."
    ]
  },
  "illustration-creative-artwork": {
    "heading": "Distinctive by design.",
    "accent": "Unmistakably yours.",
    "overview": "Bring your stories, characters and creative ideas into a consistent visual world with original artwork shaped around your brief.",
    "support": "From early concepts and mood to finished covers and expressive character work, each piece keeps your creative goal in focus.",
    "deliverables": [
      [
        "Cover concepts",
        "Visual mood",
        "Presentation"
      ],
      [
        "Character concepts",
        "Expression",
        "Style consistency"
      ],
      [
        "Original illustration",
        "Art direction",
        "Final artwork"
      ]
    ],
    "capabilities": [
      "Story-led cover concepts, visual mood, and premium presentation designed to stand out instantly.",
      "Memorable character concepts, style consistency, and expressive visuals made for lasting impact.",
      "Original illustrations and artistic direction shaped around your concept and creative goal."
    ]
  },
  "2d-3d-modeling-animation": {
    "heading": "Ideas with dimension.",
    "accent": "Made to move.",
    "overview": "We turn concepts into clean 2D assets, detailed 3D forms and motion that brings the work to life.",
    "support": "Modeling, lighting and animation follow one visual direction, with thoughtful timing and organized assets ready for your digital platforms.",
    "deliverables": [
      [
        "2D assets",
        "Motion sequences",
        "Visual clarity"
      ],
      [
        "3D forms",
        "Lighting",
        "Animation"
      ],
      [
        "Branded loops",
        "Custom GIFs",
        "Motion graphics"
      ]
    ],
    "capabilities": [
      "Clean 2D assets and motion-ready sequences built to bring ideas to life with clarity.",
      "Detailed 3D forms, lighting, and motion crafted for immersive digital presentation.",
      "Short-form animated visuals and branded motion loops designed for scroll-stopping impact."
    ]
  },
  "ai-search-optimization": {
    "heading": "Beyond traditional SEO.",
    "accent": "Built for the AI era.",
    "overview": "As search behavior shifts from traditional search engine results pages to generative AI answers, relying on keyword-dense SEO alone is no longer enough. Modern users ask conversational questions and expect direct, cited answers.",
    "support": "Generative Engine Optimization connects your entities, references and natural-language content so AI systems can understand your business and its expertise.",
    "deliverables": [
      [
        "Entity mapping",
        "Structured data",
        "Knowledge graphs"
      ],
      [
        "References",
        "Digital authority",
        "Trust signals"
      ],
      [
        "Natural language",
        "Search intent",
        "Content structure"
      ]
    ],
    "capabilities": [
      "Structured authority signals and knowledge mapping that help AI systems understand your brand clearly.",
      "Credibility-building references and trust signals that strengthen your presence across AI platforms.",
      "Natural-language content designed to match user questions and improve AI visibility."
    ]
  },
  "digital-marketing-paid-acquisition": {
    "heading": "One connected strategy.",
    "accent": "Across every channel.",
    "overview": "Content, social and paid acquisition work better when they share a clear audience, a consistent message and a common direction.",
    "support": "Campaign learning informs creative decisions, and content supports a stronger customer journey from first impression to the next action.",
    "deliverables": [
      [
        "Social strategy",
        "Campaign planning",
        "Engagement"
      ],
      [
        "Paid campaigns",
        "Audience targeting",
        "Spend planning"
      ],
      [
        "Brand messaging",
        "Strategic content",
        "Copywriting"
      ]
    ],
    "capabilities": [
      "Audience-focused campaigns and social strategies crafted to build awareness and steady engagement.",
      "Targeted ad campaigns and conversion-driven spend planning designed to maximize return.",
      "Clear messaging, persuasive copy, and strategic content built to support growth and trust."
    ]
  }
};
export const serviceAudience = ["Startups launching a new idea","Creators building a stronger content system","Businesses refreshing their digital presence","Agencies needing reliable production support","Authors, publishers and individuals developing visual assets"];
export const deliverySteps = [{"title":"Brief","text":"Clear briefing and goal setting to define the creative direction."},{"title":"Direction","text":"Developing concepts, moodboards and style frames for approval."},{"title":"Production","text":"Executing the design, animation, edits or development assets."},{"title":"Review","text":"Iterating and refining the assets through focused review rounds."},{"title":"Delivery","text":"Delivering clean, organized final files optimized for launch."}];
