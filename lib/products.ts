export type Product = {
  slug: string;
  title: string;
  shortDescription: string;
  image: string;
  overview: string;
  highlights: string[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "construction-materials",
    title: "Construction Materials",
    shortDescription:
      "High-quality cement, reinforcement bars, and finishing materials for large-scale infrastructure projects.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCy0CHoOaR_EuZN-cOReFWOt3iAsGtQeZ0grPlPurcIegBkZj7TQDqRT4Fndi1TEfYaV7fHQR-jggMj5fqBq6y-qI3BXKdchQk14OveuGngJPx8c12b0kqAGQhaCbRGLDnJDtby4IuGV42Oa_Vh1u2MSVbvvrTfFpriQ7c-RaIAZRcNk3NEFXkZiJikWYFVSEI2R8n43TOXo0qUWLFafKmoZ9TH1qH6MH5iJHzmN4l7XU8kgptPeRMpkXMOwjz4E4fLx81vA-Frlsuw",
    overview:
      "We supply dependable construction inputs for public and private sector projects. Our materials are sourced to meet performance and durability expectations across a wide range of environments.",
    highlights: [
      "Cement and concrete additives",
      "Reinforcement bars and structural steel",
      "Finishing materials and fittings",
      "Procurement support for bulk orders",
    ],
  },
  {
    slug: "industrial-machinery",
    title: "Industrial Machinery",
    shortDescription: "Advanced manufacturing equipment and heavy machinery sourced from global leaders.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDuq25mY3vXtdcC6waRuuYWdh-edBAMgq6MdS_JXCUmLFWfLOoyvNpZoj_099FXdAgo9XaQ8KE8PLMnWwdiQ7MyBH8IGsagy-as-ltkMky2oJGuxvfaONJ99VOQReAmppFueZxJ47Ycar9VSmxPWdSXnw7WzSRmNzGz9fYWQM84mOzB0uRpiD6zNa5QAHqZND5H5k0IyHOohMJrcRfAw9nUa8zYUh0NNjbxcNf0XrtPydzrGQfxKG0nfWx0zSDgwyVglJ7HL0HJW3ir",
    overview:
      "From sourcing to delivery coordination, we support industrial clients with equipment that improves productivity and operational reliability.",
    highlights: [
      "Heavy equipment sourcing and specification matching",
      "Spare parts and consumables coordination",
      "Logistics and import facilitation support",
      "Installation and commissioning guidance (partner-led)",
    ],
  },
  {
    slug: "agricultural-inputs",
    title: "Agricultural Inputs",
    shortDescription: "Certified fertilizers, improved seeds, and modern farming tools to boost productivity.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAAj2TqrSz5GqTnny1EaluHJdm8FZ2t59TX6BXKm7-wrKLO7cN7JYHthpE94yXx4ymfl6r4sxn50g5kYsAFepye2qDnBuUDbw-ypEtM-kjBQh0hTypufXvfeKveGZnAeWxBNEvJFc4ItvFDmsPIYMGstLGTIrCa_6q6GYz-ilZ-57QqqxJMPvWzweU3af0TvCpImFgCGlHza8TE7_ZvCm9BTlg8BCRFgVY1TmVwwo5qXXXn0jOPKTTQg2GmVVjbwXJ4oVP-AeolBVTm",
    overview:
      "We help farmers and agribusinesses access reliable inputs and tools that support improved yields and efficient operations.",
    highlights: [
      "Certified fertilizers and soil amendments",
      "Improved seed varieties (availability-based)",
      "Farming tools and small equipment",
      "Bulk procurement for cooperatives and programs",
    ],
  },
  {
    slug: "textile-and-garments",
    title: "Textile & Garments",
    shortDescription: "Premium cotton fabrics and ready-made garments for domestic and export markets.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuArZfHMXyLu6bE9DlN9LiX3kznR88dr2mhDOpHw0gvXhsxHPlaKa_lb3vpOWPa38-xxvHDwtsPx4ethSbFQKdDFuP86XQGUb5baDVtCWoovEwFD_1E1y1FV3pghTjgsP3RUAafZMG55UdLngpbe0CA1P85Z7nqVuzHKjV-yK954Et4dFvLeju_XwGkfJbRZBu5fix3mhgksBTyu1dvG4In6ssgP8yTv1NHeUAcxlJ2QT0iCRlzIs28nFTaDw5U73jj5CCOtJIt0lytN",
    overview:
      "We connect buyers to quality textiles and garments through trusted supply relationships and export-ready handling.",
    highlights: [
      "Cotton fabrics and textile inputs",
      "Ready-made garments for local and export markets",
      "Quality inspection coordination",
      "Trade documentation support for export orders",
    ],
  },
];

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

