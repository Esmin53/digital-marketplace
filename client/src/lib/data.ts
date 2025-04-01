export const CATEGORIES = [
    {
      id: 1,
      name: "E-books & Written Content",
      slug: "ebooks-written-content",
      icon: "📚", // Optionally add an icon
      subcategories: [
        { id: 101, name: "E-books", slug: "ebooks" },
        { id: 102, name: "Printable PDFs", slug: "printable-pdfs" },
        { id: 103, name: "Blog Templates", slug: "blog-templates" },
      ],
    },
    {
      id: 2,
      name: "Digital Art & Design",
      slug: "digital-art-design",
      icon: "🎨",
      subcategories: [
        { id: 201, name: "UI/UX Kits", slug: "ui-ux-kits" },
        { id: 202, name: "Stock Illustrations", slug: "stock-illustrations" },
        { id: 203, name: "Logo Templates", slug: "logo-templates" },
      ],
    },
    {
      id: 3,
      name: "Music & Audio",
      slug: "music-audio",
      icon: "🎵",
      subcategories: [
        { id: 301, name: "Royalty-Free Music", slug: "royalty-free-music" },
        { id: 302, name: "Sound Effects", slug: "sound-effects" },
        { id: 303, name: "Audio Presets", slug: "audio-presets" },
      ],
    },
    {
      id: 4,
      name: "Software & Web Development",
      slug: "software-web-development",
      icon: "💻",
      subcategories: [
        { id: 401, name: "Website Templates", slug: "website-templates" },
        { id: 402, name: "App Templates", slug: "app-templates" },
        { id: 403, name: "Code Snippets", slug: "code-snippets" },
      ],
    },
    {
      id: 5,
      name: "Photography & Video",
      slug: "photography-video",
      icon: "📷",
      subcategories: [
        { id: 501, name: "Stock Photos", slug: "stock-photos" },
        { id: 502, name: "Video Footage", slug: "video-footage" },
        { id: 503, name: "Photo Filters", slug: "photo-filters" },
      ],
    },
  ];
  
  export const CATEGORIES_ENUM = [
    "ebooks-written-content",
    "digital-art-design",
    "music-audio",
    "software-web-development",
    "photography-video",
  ] as const ; 
  
  export const SUBCATEGORIES_ENUM = [
    "ebooks",
    "printable-pdfs",
    "blog-templates",
    "ui-ux-kits",
    "stock-illustrations",
    "logo-templates",
    "royalty-free-music",
    "sound-effects",
    "audio-presets",
    "website-templates",
    "app-templates",
    "code-snippets",
    "stock-photos",
    "video-footage",
    "photo-filters",
  ] as const;
  