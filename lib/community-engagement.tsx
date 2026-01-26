export type EngagementPost = {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    author: string;
    category: string;
    image: string;
    content: string;
};

export const ENGAGEMENT_POSTS: EngagementPost[] = [
    {
        id: 1,
        slug: "sustainable-farming-support",
        title: "Empowering Local Farmers through Sustainable Practices",
        excerpt: "Our team recently completed a workshop for smallholder farmers, focusing on irrigation efficiency and crop diversification to improve food security.",
        date: "January 20, 2026",
        author: "Community Relations",
        category: "Social Impact",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDy0CHoOaR_EuZN-cOReFWOt3iAsGtQeZ0grPlPurcIegBkZj7TQDqRT4Fndi1TEfYaV7fHQR-jggMj5fqBq6y-qI3BXKdchQk14OveuGngJPx8c12b0kqAGQhaCbRGLDnJDtby4IuGV42Oa_Vh1u2MSVbvvrTfFpriQ7c-RaIAZRcNk3NEFXkZiJikWYFVSEI2R8n43TOXo0qUWLFafKmoZ9TH1qH6MH5iJHzmN4l7XU8kgptPeRMpkXMOwjz4E4fLx81vA-Frlsuw",
        content: `Our commitment to the community starts with the land that sustains us. In our most recent initiative, we collaborated with over 150 smallholder farmers in the surrounding regions of Mekelle to implement sustainable irrigation techniques and crop diversification strategies.

## Workshop Highlights

The program was divided into three core modules:
- **Water Management**: Implementing drip irrigation systems to maximize output while minimizing water usage.
- **Soil Health**: Training on organic composting and natural pest control methods.
- **Market Access**: Connecting local cooperatives with urban distribution networks to ensure fair pricing.

## Long-term Impact

By transitioning from dependency on rainfall to manageable irrigation, these farmers have reported a 30% increase in yield during the off-season. This not only improves their household income but also stabilizes the local food supply.

We continue to monitor these communities and provide ongoing technical support to ensure the shifts in practice are permanent and profitable.`
    },
    {
        id: 2,
        slug: "urban-youth-mentorship-program",
        title: "Urban Youth Mentorship Program Success",
        excerpt: "Over 50 young entrepreneurs participated in our latest mentorship series, gaining insights into business management and digital literacy.",
        date: "January 10, 2026",
        author: "Capacity Building",
        category: "Youth Development",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuq25mY3vXtdcC6waRuuYWdh-edBAMgq6MdS_JXCUmLFWfLOoyvNpZoj_099FXdAgo9XaQ8KE8PLMnWwdiQ7MyBH8IGsagy-as-ltkMky2oJGuxvfaONJ99VOQReAmppFueZxJ47Ycar9VSmxPWdSXnw7WzSRmNzGz9fYWQM84mOzB0uRpiD6zNa5QAHqZND5H5k0IyHOohMJrcRfAw9nUa8zYUh0NNjbxcNf0XrtPydzrGQfxKG0nfWx0zSDgwyVglJ7HL0HJW3ir",
        content: `The future of our economy lies in the hands of the youth. Our Urban Youth Mentorship Program was designed to bridge the gap between academic knowledge and real-world business challenges.

## Program Success Stories

This quarter, we saw 50 participants complete the intensive 8-week series. The curriculum focused on:
- **Digital Literacy**: Mastering tools for modern business management.
- **Financial Planning**: Budgeting, investment, and risk management for startups.
- **Leadership Skills**: Effective communication and team coordination.

Several groups of mentees have already started small-scale tech and service businesses, and we are proud to provide them with initial workspace and expert advisory pro-bono.

## Moving Forward

Based on the overwhelming response, we are planning to double the intake for our next cohort, ensuring more young people have access to these life-changing opportunities.`
    },
    {
        id: 3,
        slug: "capacity-building-for-local-administration",
        title: "Capacity Building for Local Administration",
        excerpt: "We partnered with local government offices to provide technical training on digital record-keeping and public service optimization.",
        date: "December 15, 2025",
        author: "Governance Team",
        category: "Capacity Building",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAj2TqrSz5GqTnny1EaluHJdm8FZ2t59TX6BXKm7-wrKLO7cN7JYHthpE94yXx4ymfl6r4sxn50g5kYsAFepye2qDnBuUDbw-ypEtM-kjBQh0hTypufXvfeKveGZnAeWxBNEvJFc4ItvFDmsPIYMGstLGTIrCa_6q6GYz-ilZ-57QqqxJMPvWzweU3af0TvCpImFgCGlHza8TE7_ZvCm9BTlg8BCRFgVY1TmVwwo5qXXXn0jOPKTTQg2GmVVjbwXJ4oVP-AeolBVTm",
        content: `A strong administration is the backbone of community development. In collaboration with regional governance bodies, MU Consultancy delivered a comprehensive capacity-building program for local government officials.

## Technical Training

The training focused on modernizing administrative processes through technology:
- **Digital Record-Keeping**: Transitioning from paper-based systems to secure, searchable digital databases.
- **Public Service Optimization**: Training on workflow management to reduce wait times for citizens.
- **Transparency & Ethics**: Workshops on maintaining integrity and accountability in public service.

## Results

Since the implementation of these new systems, the pilot offices have reported a 40% reduction in processing times for common citizen requests. This efficiency translates directly to better service for the community and more effective governance.`
    },
    {
        id: 4,
        slug: "renewable-energy-awareness-campaign",
        title: "Renewable Energy Awareness Campaign",
        excerpt: "Bringing clean energy solutions to rural communities. Our experts demonstrated the benefits of solar power for household and agricultural use.",
        date: "December 5, 2025",
        author: "Environmental Policy",
        category: "Sustainability",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuArZfHMXyLu6bE9DlN9LiX3kznR88dr2mhDOpHw0gvXhsxHPlaKa_lb3vpOWPa38-xxvHDwtsPx4ethSbFQKdDFuP86XQGUb5baDVtCWoovEwFD_1E1y1FV3pghTjgsP3RUAafZMG55UdLngpbe0CA1P85Z7nqVuzHKjV-yK954Et4dFvLeju_XwGkfJbRZBu5fix3mhgksBTyu1dvG4In6ssgP8yTv1NHeUAcxlJ2QT0iCRlzIs28nFTaDw5U73jj5CCOtJIt0lytN",
        content: `Clean energy is a catalyst for sustainable development. Our recent awareness campaign brought together renewable energy experts and community leaders to discuss the transition to green power.

## Bringing Solar to the People

We held live demonstrations in four rural districts, showing how solar energy can:
- **Power Education**: Providing lighting for schools and libraries in off-grid areas.
- **Boost Agriculture**: Demonstrating solar-powered water pumps for year-round farming.
- **Enhance Health**: Ensuring clinics have reliable power for refrigeration of vaccines and medicines.

## Community Adoption

Following the campaign, thirteen community centers have signed up for our solar integration pilot program. We are working with international partners to provide the necessary hardware and training for local maintenance teams, ensuring the systems remain operational for decades to come.`
    }
];

export function getEngagementPostBySlug(slug: string) {
    return ENGAGEMENT_POSTS.find((post) => post.slug === slug);
}

export function getEngagementPostById(id: number) {
    return ENGAGEMENT_POSTS.find((post) => post.id === id);
}
