export type FieldType = "text" | "textarea" | "image" | "repeater" | "group" | "stringList" | "icon";

export interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  itemFields?: FieldConfig[];
  fields?: FieldConfig[];
}

export interface BlockFormSchema {
  label: string;
  category?: string;
  fields: FieldConfig[];
}

export const PAGE_CATEGORIES = [
  "Main",
  "Home Page",
  "About Page",
  "Services Page",
  "Portfolio Page",
  "Resources Page",
  "Trade Pages",
  "Contact Page",
  "Downloads Page",
  "Header and Footer",
  "Legal Pages",
] as const;

const linkItemFields: FieldConfig[] = [
  { key: "label", label: "Label", type: "text" },
  { key: "href", label: "Link (URL or path)", type: "text" },
];

const dropdownItemFields: FieldConfig[] = [
  { key: "label", label: "Dropdown label", type: "text" },
  { key: "href", label: "Link", type: "text" },
  { key: "items", label: "Menu items", type: "repeater", itemFields: linkItemFields },
];

export const CONTENT_BLOCK_SCHEMAS: Record<string, BlockFormSchema> = {
  navbar: {
    label: "Navigation Bar",
    category: "Header and Footer",
    fields: [
      { key: "siteName", label: "Site name", type: "text" },
      { key: "tagline", label: "Tagline", type: "text" },
      { key: "mainLinks", label: "Main navigation links", type: "repeater", itemFields: linkItemFields },
      { key: "dropdowns", label: "Dropdown menus", type: "repeater", itemFields: dropdownItemFields },
      { key: "trailingLinks", label: "Trailing links", type: "repeater", itemFields: linkItemFields },
      {
        key: "resourcesDropdown", label: "Resources dropdown", type: "group", fields: [
          { key: "label", label: "Label", type: "text" },
          { key: "href", label: "Link", type: "text" },
          { key: "items", label: "Menu items", type: "repeater", itemFields: linkItemFields },
        ]
      },
      { key: "languages", label: "Language codes (one per line)", type: "stringList" },
    ],
  },
  home_hero: {
    label: "Home Hero",
    category: "Home Page",
    fields: [
      { key: "badge", label: "Badge", type: "text" },
      { key: "badgeIcon", label: "Select Badge Icon", type: "icon" },
      { key: "headline", label: "Headline", type: "text" },
      { key: "tagline", label: "Tagline", type: "textarea" },
      { key: "image", label: "Hero Image URL", type: "image" },
      { key: "ctaText", label: "CTA Button Text", type: "text" },
      { key: "ctaLink", label: "CTA Button Link", type: "text" },
    ],
  },
  home_leadership: {
    label: "Home Leadership",
    category: "Home Page",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
    ],
  },
  home_trust: {
    label: "Home Trust Section",
    category: "Home Page",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      {
        key: "badges", label: "Trust badges", type: "repeater", itemFields: [
          { key: "icon", label: "Select Icon", type: "icon" },
          { key: "label", label: "Label", type: "text" },
          { key: "value", label: "Value", type: "text" },
        ]
      },
    ],
  },
  home_heritage: {
    label: "Home Heritage",
    category: "Home Page",
    fields: [
      { key: "sectionTitle", label: "Section title", type: "text" },
      { key: "sectionDescription", label: "Section description", type: "textarea" },
      { key: "image", label: "Image URL", type: "image" },
      {
        key: "mission", label: "Mission", type: "group", fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "icon", label: "Select Icon", type: "icon" },
        ]
      },
      {
        key: "vision", label: "Vision", type: "group", fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "icon", label: "Select Icon", type: "icon" },
        ]
      },
      {
        key: "badge", label: "Badge", type: "group", fields: [
          { key: "value", label: "Value", type: "text" },
          { key: "label", label: "Label", type: "text" },
        ]
      },
    ],
  },
  about_hero: {
    label: "About Hero",
    category: "About Page",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "image", label: "Hero image URL", type: "image" },
    ],
  },
  about_history: {
    label: "About History",
    fields: [
      { key: "paragraphs", label: "History paragraphs (one per line)", type: "stringList" },
    ],
  },
  about_sections: {
    label: "About Section Titles",
    category: "About Page",
    fields: [
      { key: "historyTitle", label: "History section title", type: "text" },
      { key: "leadershipTitle", label: "Leadership section title", type: "text" },
      { key: "leadershipDescription", label: "Leadership section description", type: "textarea" },
    ],
  },
  contact_info: {
    label: "Contact Info",
    category: "Contact Page",
    fields: [
      { key: "address", label: "Address", type: "text" },
      { key: "email", label: "Email", type: "text" },
      { key: "supportEmail", label: "Support email", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "hours", label: "Business hours", type: "text" },
    ],
  },
  contact_cta: {
    label: "Contact CTA",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "primaryButtonText", label: "Primary button text", type: "text" },
      { key: "secondaryButtonText", label: "Secondary button text", type: "text" },
      { key: "secondaryLink", label: "Secondary link URL", type: "text" },
    ],
  },
  contact_subjects: {
    label: "Contact Form Subjects",
    category: "Contact Page",
    fields: [
      {
        key: "items", label: "Subject options", type: "repeater", itemFields: [
          { key: "value", label: "Value", type: "text" },
          { key: "label", label: "Label", type: "text" },
        ]
      },
    ],
  },
  footer_contact: {
    label: "Footer Contact",
    fields: [
      { key: "companyName", label: "Company name", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "address", label: "Address", type: "text" },
      { key: "email", label: "Email", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
    ],
  },
  footer_social: {
    label: "Footer Social Links",
    category: "Header and Footer",
    fields: [
      { key: "facebook", label: "Facebook URL", type: "text" },
      { key: "twitter", label: "Twitter URL", type: "text" },
      { key: "linkedin", label: "LinkedIn URL", type: "text" },
    ],
  },
  footer_links: {
    label: "Footer Links",
    fields: [
      { key: "quickLinks", label: "Quick links", type: "repeater", itemFields: linkItemFields },
      { key: "resourceLinks", label: "Resource links", type: "repeater", itemFields: linkItemFields },
    ],
  },
  footer_copyright: {
    label: "Footer Copyright",
    category: "Header and Footer",
    fields: [
      { key: "companyName", label: "Company name", type: "text" },
      { key: "links", label: "Bottom links", type: "repeater", itemFields: linkItemFields },
    ],
  },
  services_hero: {
    label: "Services Hero",
    category: "Services Page",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "image", label: "Image URL", type: "image" },
    ],
  },
  services: {
    label: "Services List",
    category: "Services Page",
    fields: [
      {
        key: "items", label: "Services", type: "repeater", itemFields: [
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "image", label: "Image URL", type: "image" },
        ]
      },
    ],
  },
  resources_hero: {
    label: "Resources Hero",
    fields: [
      { key: "badge", label: "Badge", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "image", label: "Image URL", type: "image" },
    ],
  },
  resources_categories: {
    label: "Resources Categories",
    category: "Resources Page",
    fields: [
      {
        key: "items", label: "Categories", type: "repeater", itemFields: [
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "icon", label: "Select Icon", type: "icon" },
          { key: "link", label: "Link", type: "text" },
        ]
      },
    ],
  },
  values: {
    label: "Values",
    category: "About Page",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      {
        key: "items", label: "Value items", type: "repeater", itemFields: [
          { key: "icon", label: "Select Icon", type: "icon" },
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ]
      },
    ],
  },
  achievements: {
    label: "Achievements",
    category: "About Page",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      {
        key: "stats", label: "Statistics", type: "repeater", itemFields: [
          { key: "icon", label: "Select Icon", type: "icon" },
          { key: "value", label: "Value", type: "text" },
          { key: "label", label: "Label", type: "text" },
        ]
      },
      {
        key: "awards", label: "Awards", type: "repeater", itemFields: [
          { key: "year", label: "Year", type: "text" },
          { key: "title", label: "Title", type: "text" },
          { key: "issuer", label: "Issuer", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ]
      },
    ],
  },
  partners: {
    label: "Partners",
    category: "Home Page",
    fields: [
      {
        key: "items", label: "Partners", type: "repeater", itemFields: [
          { key: "name", label: "Name", type: "text" },
          { key: "image", label: "Logo URL", type: "image" },
          { key: "description", label: "Description (optional)", type: "textarea" },
        ]
      },
    ],
  },
  org_structure: {
    label: "Organization Structure",
    category: "About Page",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      {
        key: "departments", label: "Departments", type: "repeater", itemFields: [
          { key: "icon", label: "Select Icon", type: "icon" },
          { key: "name", label: "Name", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ]
      },
      {
        key: "hierarchy", label: "Hierarchy", type: "repeater", itemFields: [
          { key: "label", label: "Label", type: "text" },
        ]
      },
    ],
  },
  portfolio_stats: {
    label: "Portfolio Stats",
    fields: [
      { key: "projectsCompleted", label: "Projects completed", type: "text" },
      { key: "yearsExperience", label: "Years experience", type: "text" },
      { key: "globalPartners", label: "Global partners", type: "text" },
      { key: "valueGenerated", label: "Value generated", type: "text" },
    ],
  },
  testimonials: {
    label: "Testimonials",
    category: "Portfolio Page",
    fields: [
      {
        key: "items", label: "Testimonials", type: "repeater", itemFields: [
          { key: "quote", label: "Quote", type: "textarea" },
          { key: "author", label: "Author", type: "text" },
          { key: "role", label: "Role", type: "text" },
        ]
      },
    ],
  },
  trade_main: {
    label: "Trade Main Page",
    category: "Trade Pages",
    fields: [
      {
        key: "hero", label: "Hero section", type: "group", fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "image", label: "Image URL", type: "image" },
        ]
      },
      {
        key: "sections", label: "Sections", type: "repeater", itemFields: [
          { key: "id", label: "ID", type: "text" },
          { key: "badge", label: "Badge", type: "text" },
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "bulletItems", label: "Bullet items (one per line)", type: "stringList" },
          { key: "link", label: "Link", type: "text" },
          { key: "image", label: "Image URL", type: "image" },
        ]
      },
    ],
  },
  trade_expertise: {
    label: "Trade Expertise",
    fields: [
      {
        key: "hero", label: "Hero", type: "group", fields: [
          { key: "badge", label: "Badge", type: "text" },
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "image", label: "Image URL", type: "image" },
        ]
      },
      {
        key: "section", label: "Section", type: "group", fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "items", label: "Items (one per line)", type: "stringList" },
        ]
      },
      { key: "services", label: "Services (one per line)", type: "stringList" },
      {
        key: "industries", label: "Industries", type: "repeater", itemFields: [
          { key: "image", label: "Image URL", type: "image" },
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ]
      },
    ],
  },
  trade_import_export: {
    label: "Trade Import/Export",
    category: "Trade Pages",
    fields: [
      {
        key: "hero", label: "Hero", type: "group", fields: [
          { key: "badge", label: "Badge", type: "text" },
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "image", label: "Image URL", type: "image" },
        ]
      },
      {
        key: "section", label: "Section", type: "group", fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "image", label: "Image URL", type: "image" },
        ]
      },
      { key: "services", label: "Services (one per line)", type: "stringList" },
    ],
  },
  trade_supply_chain: {
    label: "Trade Supply Chain",
    category: "Trade Pages",
    fields: [
      {
        key: "hero", label: "Hero", type: "group", fields: [
          { key: "badge", label: "Badge", type: "text" },
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "image", label: "Image URL", type: "image" },
        ]
      },
      {
        key: "section", label: "Section", type: "group", fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ]
      },
      { key: "services", label: "Services (one per line)", type: "stringList" },
      {
        key: "features", label: "Features", type: "repeater", itemFields: [
          { key: "icon", label: "Select Icon", type: "icon" },
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ]
      },
      {
        key: "cta", label: "Call to action", type: "group", fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "buttonText", label: "Button text", type: "text" },
        ]
      },
    ],
  },
  trade_partnerships: {
    label: "Trade Partnerships",
    fields: [
      {
        key: "hero", label: "Hero", type: "group", fields: [
          { key: "badge", label: "Badge", type: "text" },
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "image", label: "Image URL", type: "image" },
        ]
      },
      {
        key: "section", label: "Section", type: "group", fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ]
      },
      { key: "services", label: "Services (one per line)", type: "stringList" },
      {
        key: "features", label: "Features", type: "repeater", itemFields: [
          { key: "icon", label: "Select Icon", type: "icon" },
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ]
      },
    ],
  },
  cookies_policy: {
    label: "Cookies Policy",
    category: "Legal Pages",
    fields: [
      { key: "lastUpdated", label: "Last updated date", type: "text" },
      { key: "badge", label: "Badge", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "textarea" },
      { key: "dateLabel", label: "Date label", type: "text" },
      { key: "infoRight", label: "Info right text", type: "text" },
      {
        key: "sections", label: "Sections", type: "repeater", itemFields: [
          { key: "heading", label: "Heading", type: "text" },
          { key: "paragraphs", label: "Paragraphs (one per line)", type: "stringList" },
          {
            key: "cards", label: "Cards", type: "repeater", itemFields: [
              { key: "title", label: "Title", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
            ]
          },
        ]
      },
      {
        key: "note", label: "Note", type: "group", fields: [
          { key: "heading", label: "Heading", type: "text" },
          { key: "content", label: "Content", type: "textarea" },
        ]
      },
      { key: "contactEmail", label: "Contact email", type: "text" },
    ],
  },
  privacy_policy: {
    label: "Privacy Policy",
    fields: [
      { key: "lastUpdated", label: "Last updated", type: "text" },
      { key: "badge", label: "Badge", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "textarea" },
      { key: "dateLabel", label: "Date label", type: "text" },
      { key: "version", label: "Version", type: "text" },
      {
        key: "sections", label: "Sections", type: "repeater", itemFields: [
          { key: "heading", label: "Heading", type: "text" },
          { key: "content", label: "Content", type: "textarea" },
        ]
      },
      {
        key: "contactBlock", label: "Contact block", type: "group", fields: [
          { key: "companyName", label: "Company name", type: "text" },
          { key: "address", label: "Address", type: "textarea" },
          { key: "email", label: "Email", type: "text" },
        ]
      },
    ],
  },
  terms_of_service: {
    label: "Terms of Service",
    category: "Legal Pages",
    fields: [
      { key: "lastUpdated", label: "Last updated", type: "text" },
      { key: "badge", label: "Badge", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "textarea" },
      { key: "dateLabel", label: "Date label", type: "text" },
      { key: "infoRight", label: "Info right", type: "text" },
      {
        key: "sections", label: "Sections", type: "repeater", itemFields: [
          { key: "heading", label: "Heading", type: "text" },
          { key: "content", label: "Content", type: "textarea" },
        ]
      },
      {
        key: "callouts", label: "Callouts", type: "repeater", itemFields: [
          { key: "heading", label: "Heading", type: "text" },
          { key: "content", label: "Content", type: "textarea" },
          { key: "variant", label: "Variant (amber/primary)", type: "text" },
        ]
      },
    ],
  },
  downloads_hero: {
    label: "Downloads Hero",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
    ],
  },
  quote_labels: {
    label: "Quote Modal Labels",
    category: "Trade Pages",
    fields: [
      { key: "importExport", label: "Import/Export label", type: "text" },
      { key: "supplyChain", label: "Supply chain label", type: "text" },
      { key: "partnerships", label: "Partnerships label", type: "text" },
      { key: "requestQuote", label: "Request quote button", type: "text" },
    ],
  },
};

export function getBlockSchema(key: string): BlockFormSchema | null {
  return CONTENT_BLOCK_SCHEMAS[key] ?? null;
}

export function getBlockTypeOptions(): { key: string; label: string }[] {
  return Object.entries(CONTENT_BLOCK_SCHEMAS).map(([key, schema]) => ({
    key,
    label: `${schema.label} (${key})`,
  }));
}

export function getGroupedBlockSchemas(): Record<string, { key: string; label: string }[]> {
  const grouped: Record<string, { key: string; label: string }[]> = {};
  for (const [key, schema] of Object.entries(CONTENT_BLOCK_SCHEMAS)) {
    const category = schema.category ?? "Uncategorized";
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push({ key, label: schema.label });
  }
  const ordered: Record<string, { key: string; label: string }[]> = {};
  for (const cat of PAGE_CATEGORIES) {
    if (grouped[cat]) ordered[cat] = grouped[cat];
  }
  for (const cat of Object.keys(grouped)) {
    if (!PAGE_CATEGORIES.includes(cat as (typeof PAGE_CATEGORIES)[number])) {
      ordered[cat] = grouped[cat];
    }
  }
  return ordered;
}
