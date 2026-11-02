export type PortfolioItem = { id: string; title: string; src: string; width: number; height: number; kind: "web" | "logo" | "illustration" | "thumbnail" | "model" | "motion"; medium: "image" | "video" | "gif"; poster?: string };
export type PortfolioGroup = { id: string; label: string; items: PortfolioItem[] };
export type PortfolioSection = { id: string; number: string; title: string; accent: string; description: string; tone: "light" | "dark"; groups: PortfolioGroup[] };

export const portfolioSections: PortfolioSection[] = [
  {
    "id": "web-design",
    "number": "01",
    "title": "Digital experiences.",
    "accent": "Designed to explore.",
    "description": "Website concepts, interfaces and considered page layouts. Explore each full-page design inside a fixed browser frame.",
    "tone": "light",
    "groups": [
      {
        "id": "web",
        "label": "Web UI",
        "items": [
          {
            "id": "web-1",
            "title": "Website design 01",
            "src": "/images/portfolio/webui/web1.webp",
            "width": 214,
            "height": 1600,
            "kind": "web",
            "medium": "image"
          },
          {
            "id": "web-2",
            "title": "Website design 02",
            "src": "/images/portfolio/webui/web2.webp",
            "width": 254,
            "height": 1600,
            "kind": "web",
            "medium": "image"
          },
          {
            "id": "web-3",
            "title": "Website design 03",
            "src": "/images/portfolio/webui/web3.webp",
            "width": 226,
            "height": 1600,
            "kind": "web",
            "medium": "image"
          },
          {
            "id": "web-4",
            "title": "Website design 04",
            "src": "/images/portfolio/webui/web4.webp",
            "width": 352,
            "height": 1600,
            "kind": "web",
            "medium": "image"
          },
          {
            "id": "web-5",
            "title": "Website design 05",
            "src": "/images/portfolio/webui/web5.webp",
            "width": 294,
            "height": 1600,
            "kind": "web",
            "medium": "image"
          },
          {
            "id": "web-6",
            "title": "Website design 06",
            "src": "/images/portfolio/webui/web6.webp",
            "width": 401,
            "height": 1600,
            "kind": "web",
            "medium": "image"
          }
        ]
      }
    ]
  },
  {
    "id": "brand-design",
    "number": "02",
    "title": "Small marks.",
    "accent": "Distinct identities.",
    "description": "Wordmarks, monograms, character marks and identity studies, organised into brand and creator collections.",
    "tone": "dark",
    "groups": [
      {
        "id": "logos",
        "label": "Brand identities",
        "items": [
          {
            "id": "logos-1",
            "title": "Typographic identity",
            "src": "/images/portfolio/Logo and designs/Logo and designs/logo1.webp",
            "width": 1000,
            "height": 1000,
            "kind": "logo",
            "medium": "image"
          },
          {
            "id": "logos-2",
            "title": "Monogram identity",
            "src": "/images/portfolio/Logo and designs/Logo and designs/logo2.webp",
            "width": 1000,
            "height": 1000,
            "kind": "logo",
            "medium": "image"
          },
          {
            "id": "logos-3",
            "title": "Black West identity",
            "src": "/images/portfolio/Logo and designs/Logo and designs/logo3.webp",
            "width": 1000,
            "height": 1000,
            "kind": "logo",
            "medium": "image"
          },
          {
            "id": "logos-4",
            "title": "Anchor Candle identity",
            "src": "/images/portfolio/Logo and designs/Logo and designs/logo4.webp",
            "width": 1200,
            "height": 1200,
            "kind": "logo",
            "medium": "image"
          },
          {
            "id": "logos-5",
            "title": "Shopvana identity",
            "src": "/images/portfolio/Logo and designs/Logo and designs/logo5.jpg",
            "width": 590,
            "height": 590,
            "kind": "logo",
            "medium": "image"
          },
          {
            "id": "logos-6",
            "title": "Right Brain identity",
            "src": "/images/portfolio/Logo and designs/Logo and designs/logo5.webp",
            "width": 1000,
            "height": 1000,
            "kind": "logo",
            "medium": "image"
          }
        ]
      },
      {
        "id": "creator-logos",
        "label": "Creator & mascot marks",
        "items": [
          {
            "id": "creator-logos-1",
            "title": "BroToons character mark",
            "src": "/images/portfolio/YouTube/Logo and designs/brotoons_logo-01.webp",
            "width": 614,
            "height": 614,
            "kind": "logo",
            "medium": "image"
          },
          {
            "id": "creator-logos-2",
            "title": "BroToons apparel concept",
            "src": "/images/portfolio/YouTube/Logo and designs/brotoons_t-shirt-01.webp",
            "width": 614,
            "height": 614,
            "kind": "logo",
            "medium": "image"
          },
          {
            "id": "creator-logos-3",
            "title": "Canine line art I",
            "src": "/images/portfolio/YouTube/Logo and designs/IMG_1252.webp",
            "width": 491,
            "height": 614,
            "kind": "logo",
            "medium": "image"
          },
          {
            "id": "creator-logos-4",
            "title": "Canine line art II",
            "src": "/images/portfolio/YouTube/Logo and designs/IMG_1253.webp",
            "width": 491,
            "height": 614,
            "kind": "logo",
            "medium": "image"
          },
          {
            "id": "creator-logos-5",
            "title": "ISO creator identity",
            "src": "/images/portfolio/YouTube/Logo and designs/IMG_1254.webp",
            "width": 614,
            "height": 614,
            "kind": "logo",
            "medium": "image"
          },
          {
            "id": "creator-logos-6",
            "title": "Rye character mark",
            "src": "/images/portfolio/YouTube/Logo and designs/IMG_1266.webp",
            "width": 491,
            "height": 614,
            "kind": "logo",
            "medium": "image"
          }
        ]
      }
    ]
  },
  {
    "id": "illustration",
    "number": "03",
    "title": "An idea becomes",
    "accent": "a world of its own.",
    "description": "Characters, storybook scenes, fantasy worlds and creative concepts. Choose a collection and explore the details.",
    "tone": "light",
    "groups": [
      {
        "id": "characters",
        "label": "Characters",
        "items": [
          {
            "id": "characters-1",
            "title": "Flamekeeper character",
            "src": "/images/portfolio/Illustration/Character Designing/IMG_0754.webp",
            "width": 525,
            "height": 614,
            "kind": "illustration",
            "medium": "image"
          },
          {
            "id": "characters-2",
            "title": "Midnight character study",
            "src": "/images/portfolio/Illustration/Character Designing/IMG_1265.webp",
            "width": 491,
            "height": 614,
            "kind": "illustration",
            "medium": "image"
          },
          {
            "id": "characters-3",
            "title": "Retro-future robot",
            "src": "/images/portfolio/Illustration/Character Designing/IMG_1275.webp",
            "width": 491,
            "height": 614,
            "kind": "illustration",
            "medium": "image"
          },
          {
            "id": "characters-4",
            "title": "The library keeper",
            "src": "/images/portfolio/Illustration/Character Designing/IMG_1371.webp",
            "width": 491,
            "height": 614,
            "kind": "illustration",
            "medium": "image"
          },
          {
            "id": "characters-5",
            "title": "Character expression sheet",
            "src": "/images/portfolio/Illustration/Character Designing/IMG_1463.webp",
            "width": 1080,
            "height": 1350,
            "kind": "illustration",
            "medium": "image"
          },
          {
            "id": "characters-6",
            "title": "Armoured explorer",
            "src": "/images/portfolio/Illustration/Character Designing/IMG_7642.jpeg",
            "width": 1920,
            "height": 1920,
            "kind": "illustration",
            "medium": "image"
          }
        ]
      },
      {
        "id": "children",
        "label": "Children's books",
        "items": [
          {
            "id": "children-1",
            "title": "A family story",
            "src": "/images/portfolio/Illustration/Children Book Style/43754dc2-784f-499e-8232-f8d33797433b.webp",
            "width": 570,
            "height": 614,
            "kind": "illustration",
            "medium": "image"
          },
          {
            "id": "children-2",
            "title": "A little world of books",
            "src": "/images/portfolio/Illustration/Children Book Style/6273fa95-6792-4e05-a009-74d35fba1035.jpeg",
            "width": 1236,
            "height": 1600,
            "kind": "illustration",
            "medium": "image"
          },
          {
            "id": "children-3",
            "title": "Learning together",
            "src": "/images/portfolio/Illustration/Children Book Style/a0cd3d52-4d22-4843-b55d-39be1c83e5c1.jpeg",
            "width": 1170,
            "height": 1501,
            "kind": "illustration",
            "medium": "image"
          },
          {
            "id": "children-4",
            "title": "A festive adventure",
            "src": "/images/portfolio/Illustration/Children Book Style/f15a900f-981f-4a23-bfd1-9e96cabe46cd.jpeg",
            "width": 1163,
            "height": 1600,
            "kind": "illustration",
            "medium": "image"
          },
          {
            "id": "children-5",
            "title": "Woodland storyteller",
            "src": "/images/portfolio/Illustration/Children Book Style/IMG_1456.webp",
            "width": 1080,
            "height": 1350,
            "kind": "illustration",
            "medium": "image"
          },
          {
            "id": "children-6",
            "title": "Playful character collection",
            "src": "/images/portfolio/Illustration/Children Book Style/IMG_1465.webp",
            "width": 1208,
            "height": 1208,
            "kind": "illustration",
            "medium": "image"
          }
        ]
      },
      {
        "id": "fantasy",
        "label": "Fantasy",
        "items": [
          {
            "id": "fantasy-1",
            "title": "The wandering spellcaster",
            "src": "/images/portfolio/Illustration/Fantasy illustrations/IMG_1259.webp",
            "width": 617,
            "height": 614,
            "kind": "illustration",
            "medium": "image"
          },
          {
            "id": "fantasy-2",
            "title": "Crimson character study",
            "src": "/images/portfolio/Illustration/Fantasy illustrations/IMG_1375.webp",
            "width": 491,
            "height": 614,
            "kind": "illustration",
            "medium": "image"
          },
          {
            "id": "fantasy-3",
            "title": "The hooded traveller",
            "src": "/images/portfolio/Illustration/Fantasy illustrations/IMG_1450.jpeg",
            "width": 1080,
            "height": 1350,
            "kind": "illustration",
            "medium": "image"
          },
          {
            "id": "fantasy-4",
            "title": "A western character",
            "src": "/images/portfolio/Illustration/Fantasy illustrations/IMG_1469.webp",
            "width": 1207,
            "height": 1600,
            "kind": "illustration",
            "medium": "image"
          },
          {
            "id": "fantasy-5",
            "title": "Crimson bloom",
            "src": "/images/portfolio/Illustration/Fantasy illustrations/IMG_7648.webp",
            "width": 1080,
            "height": 1350,
            "kind": "illustration",
            "medium": "image"
          },
          {
            "id": "fantasy-6",
            "title": "A world of witchcraft",
            "src": "/images/portfolio/Illustration/Fantasy illustrations/IMG_9711.webp",
            "width": 491,
            "height": 614,
            "kind": "illustration",
            "medium": "image"
          }
        ]
      },
      {
        "id": "scenes",
        "label": "Scenes",
        "items": [
          {
            "id": "scenes-1",
            "title": "A pixel landscape",
            "src": "/images/portfolio/Illustration/Scene illustration/3fabea5e-c5e5-4989-88bc-5837f0e19aa0.webp",
            "width": 926,
            "height": 614,
            "kind": "illustration",
            "medium": "image"
          },
          {
            "id": "scenes-2",
            "title": "A creator's room",
            "src": "/images/portfolio/Illustration/Scene illustration/9cbb12c5-035e-414d-9e46-b4bc36962cec.webp",
            "width": 1091,
            "height": 614,
            "kind": "illustration",
            "medium": "image"
          },
          {
            "id": "scenes-3",
            "title": "The Longroom scene",
            "src": "/images/portfolio/Illustration/Scene illustration/CHEERSSS.webp",
            "width": 770,
            "height": 770,
            "kind": "illustration",
            "medium": "image"
          },
          {
            "id": "scenes-4",
            "title": "Moonlit creator artwork",
            "src": "/images/portfolio/Illustration/Scene illustration/fa0d80eb-7353-4c58-a670-b844eb0e1884.webp",
            "width": 1535,
            "height": 614,
            "kind": "illustration",
            "medium": "image"
          },
          {
            "id": "scenes-5",
            "title": "Arzenic banner",
            "src": "/images/portfolio/Illustration/Scene illustration/IMG_7643.jpeg",
            "width": 1920,
            "height": 768,
            "kind": "illustration",
            "medium": "image"
          },
          {
            "id": "scenes-6",
            "title": "Chaotic Order artwork",
            "src": "/images/portfolio/Illustration/Scene illustration/IMG_7644.webp",
            "width": 5000,
            "height": 2000,
            "kind": "illustration",
            "medium": "image"
          }
        ]
      },
      {
        "id": "creator-art",
        "label": "Concept & creator art",
        "items": [
          {
            "id": "creator-art-1",
            "title": "Character linework",
            "src": "/images/portfolio/YouTube/Illustration/b8c87c41-c933-4213-8948-c223a3b28f02.webp",
            "width": 545,
            "height": 614,
            "kind": "illustration",
            "medium": "image"
          },
          {
            "id": "creator-art-2",
            "title": "Armour concept sheet",
            "src": "/images/portfolio/YouTube/Illustration/cb066d02-af48-407f-9e5d-a8f6e0354e26.webp",
            "width": 921,
            "height": 614,
            "kind": "illustration",
            "medium": "image"
          },
          {
            "id": "creator-art-3",
            "title": "Character expressions",
            "src": "/images/portfolio/YouTube/Illustration/cenimatic_20260218021319.webp",
            "width": 767,
            "height": 614,
            "kind": "illustration",
            "medium": "image"
          },
          {
            "id": "creator-art-4",
            "title": "Creature turnaround",
            "src": "/images/portfolio/YouTube/Illustration/df3f5270-2f76-4093-a8b5-c96208738257.webp",
            "width": 921,
            "height": 614,
            "kind": "illustration",
            "medium": "image"
          },
          {
            "id": "creator-art-5",
            "title": "Character storytelling",
            "src": "/images/portfolio/YouTube/Illustration/IMG_1264.webp",
            "width": 491,
            "height": 614,
            "kind": "illustration",
            "medium": "image"
          },
          {
            "id": "creator-art-6",
            "title": "A cosmic character",
            "src": "/images/portfolio/YouTube/Illustration/IMG_1269.webp",
            "width": 491,
            "height": 614,
            "kind": "illustration",
            "medium": "image"
          }
        ]
      }
    ]
  },
  {
    "id": "youtube",
    "number": "04",
    "title": "The first impression",
    "accent": "before the first play.",
    "description": "YouTube thumbnail design built around visual hierarchy, expressive composition and a clear story at a glance.",
    "tone": "dark",
    "groups": [
      {
        "id": "thumbnails",
        "label": "YouTube thumbnails",
        "items": [
          {
            "id": "thumbnails-1",
            "title": "Gaming commentary",
            "src": "/images/portfolio/YouTube/YouTube/006d8144-1842-4918-9210-13a0af673229.webp",
            "width": 1091,
            "height": 614,
            "kind": "thumbnail",
            "medium": "image"
          },
          {
            "id": "thumbnails-2",
            "title": "A cinematic universe",
            "src": "/images/portfolio/YouTube/YouTube/1 (1).webp",
            "width": 1189,
            "height": 670,
            "kind": "thumbnail",
            "medium": "image"
          },
          {
            "id": "thumbnails-3",
            "title": "Platform commentary",
            "src": "/images/portfolio/YouTube/YouTube/1 (2).webp",
            "width": 1189,
            "height": 673,
            "kind": "thumbnail",
            "medium": "image"
          },
          {
            "id": "thumbnails-4",
            "title": "Gaming news",
            "src": "/images/portfolio/YouTube/YouTube/1 (3).webp",
            "width": 1192,
            "height": 658,
            "kind": "thumbnail",
            "medium": "image"
          },
          {
            "id": "thumbnails-5",
            "title": "Film commentary",
            "src": "/images/portfolio/YouTube/YouTube/1 (4).webp",
            "width": 1207,
            "height": 676,
            "kind": "thumbnail",
            "medium": "image"
          },
          {
            "id": "thumbnails-6",
            "title": "Entertainment thumbnail",
            "src": "/images/portfolio/YouTube/YouTube/1 (5).webp",
            "width": 1192,
            "height": 658,
            "kind": "thumbnail",
            "medium": "image"
          }
        ]
      }
    ]
  },
  {
    "id": "models",
    "number": "05",
    "title": "A different",
    "accent": "dimension of detail.",
    "description": "Character modelling, form studies and visual development, from mechanical forms to stylised personalities.",
    "tone": "light",
    "groups": [
      {
        "id": "models",
        "label": "3D modelling",
        "items": [
          {
            "id": "models-1",
            "title": "Mechanical character",
            "src": "/images/portfolio/YouTube/3d models/034760aa-8d96-444f-bbb9-f13e241ecc9b.webp",
            "width": 659,
            "height": 614,
            "kind": "model",
            "medium": "image"
          },
          {
            "id": "models-2",
            "title": "Character head studies",
            "src": "/images/portfolio/YouTube/3d models/5b09efb8-9afc-44f3-9764-1c7549886b40.webp",
            "width": 1382,
            "height": 614,
            "kind": "model",
            "medium": "image"
          },
          {
            "id": "models-3",
            "title": "Stylised character model",
            "src": "/images/portfolio/YouTube/3d models/6894691c-6361-442a-af00-13b54920a331.webp",
            "width": 1091,
            "height": 614,
            "kind": "model",
            "medium": "image"
          },
          {
            "id": "models-4",
            "title": "Toon character model",
            "src": "/images/portfolio/YouTube/3d models/6af86a43-1195-42ed-96de-1c4262f739ac.webp",
            "width": 392,
            "height": 614,
            "kind": "model",
            "medium": "image"
          },
          {
            "id": "models-5",
            "title": "Winged character model",
            "src": "/images/portfolio/YouTube/3d models/a5f9e800-cc77-4005-b339-ffcdf9c133b5.webp",
            "width": 675,
            "height": 614,
            "kind": "model",
            "medium": "image"
          },
          {
            "id": "models-6",
            "title": "Character clothing study",
            "src": "/images/portfolio/YouTube/3d models/c16d0789-65d2-4f7d-b3b3-900b7f10cf9c.webp",
            "width": 621,
            "height": 614,
            "kind": "model",
            "medium": "image"
          }
        ]
      }
    ]
  },
  {
    "id": "motion",
    "number": "06",
    "title": "Ideas that",
    "accent": "refuse to stand still.",
    "description": "2D animation, character motion and illustrated loops. Open a preview to watch the original work.",
    "tone": "dark",
    "groups": [
      {
        "id": "2d-motion",
        "label": "2D animation",
        "items": [
          {
            "id": "motion-1",
            "title": "2D animation study 01",
            "src": "/images/portfolio/YouTube/2d models/099db71e-065c-451a-be77-233e9bc76e4e.mov",
            "width": 854,
            "height": 480,
            "kind": "motion",
            "medium": "video",
            "poster": "/images/portfolio-previews/motion-1.jpg"
          },
          {
            "id": "motion-2",
            "title": "2D animation study 02",
            "src": "/images/portfolio/YouTube/2d models/170b2167-8b53-46c4-9336-564bcc8c9caa.mov",
            "width": 854,
            "height": 480,
            "kind": "motion",
            "medium": "video",
            "poster": "/images/portfolio-previews/motion-2.jpg"
          },
          {
            "id": "motion-3",
            "title": "2D animation study 03",
            "src": "/images/portfolio/YouTube/2d models/48a0bf4e-c3be-427b-8dfe-9429ca00c64b.mov",
            "width": 1920,
            "height": 1020,
            "kind": "motion",
            "medium": "video",
            "poster": "/images/portfolio-previews/motion-3.jpg"
          },
          {
            "id": "motion-4",
            "title": "2D animation study 04",
            "src": "/images/portfolio/YouTube/2d models/5a79b152-2480-4d81-98f9-fc2f5a2104ad.mov",
            "width": 854,
            "height": 480,
            "kind": "motion",
            "medium": "video",
            "poster": "/images/portfolio-previews/motion-4.jpg"
          },
          {
            "id": "motion-5",
            "title": "2D animation study 05",
            "src": "/images/portfolio/YouTube/2d models/60e894da-525b-431a-a890-8c36cd544eb8.mov",
            "width": 854,
            "height": 480,
            "kind": "motion",
            "medium": "video",
            "poster": "/images/portfolio-previews/motion-5.jpg"
          },
          {
            "id": "motion-6",
            "title": "2D animation study 06",
            "src": "/images/portfolio/YouTube/2d models/b99df2c9-b170-4bcc-9db5-17895b32ec0a.mov",
            "width": 854,
            "height": 480,
            "kind": "motion",
            "medium": "video",
            "poster": "/images/portfolio-previews/motion-6.jpg"
          }
        ]
      },
      {
        "id": "gif-motion",
        "label": "GIFs & motion",
        "items": [
          {
            "id": "animated-art",
            "title": "An illustrated loop",
            "src": "/images/portfolio/YouTube/GIF and animations/IMG_1255.gif",
            "width": 270,
            "height": 270,
            "kind": "motion",
            "medium": "gif",
            "poster": "/images/portfolio-previews/animated-art.jpg"
          },
          {
            "id": "motion-short",
            "title": "A motion study",
            "src": "/images/portfolio/YouTube/GIF and animations/WhatsApp Video 2026-07-18 at 4.00.02 AM.mp4",
            "width": 3000,
            "height": 2408,
            "kind": "motion",
            "medium": "video",
            "poster": "/images/portfolio-previews/motion-short.jpg"
          }
        ]
      }
    ]
  }
];

export const featuredPortfolio: PortfolioItem[] = portfolioSections.map(section => section.groups[0].items[0]);
