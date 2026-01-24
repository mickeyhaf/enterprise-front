// Mock data for the application

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: "Dr. Tesfaye Hagos",
    role: "Managing Director",
    description: "PhD in Strategic Management with 20+ years of consultancy experience across Africa.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgIa0LBydZg1ubxyErFFj8XKqvTOK5d7_7OTj3Hb3A0X7RUTiA2u6saVtMh7iU9UTuv7zm4ETy4620OOZQ6TQ8oifGraLleIsE4a5xNruTpwLCNz5GCQkx5bPtwy_t50MP2Et7VF6TOmYyHXgZ2oQdIrkRouYzJDScR8jPsPGhSYrgKeG6ITv1jHiIUgF2JpypxymspFSFfkUUwUwZQaTx-dTXD5rMWviRSCI-b5F1Aq9BQirGNqYPatg2xnF2QmunNi7wDIMR-j17"
  },
  {
    id: '2',
    name: "Ms. Selamawit Kassa",
    role: "Director of Operations",
    description: "Expert in logistics and infrastructure development projects in emerging markets.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCtxVlcl-gnjzWsuPlV6PxBvqqR1hdBZEw6kBWG6u07uAL4mBktYhy_vE5wOVnSn86F4SyCqTNkBGnOAZFmT2L1J4BmV-j-41sFOkGVi8H-0b63_se1gelW8aW-bmS1k3fa9-ZtNaRirti2pAl6mFEsKhuUTT_tzlyw3jIr0ilKu2CSyndyw73u-KJsjEJvJndBI3P1cV0zIvFyIPAeVCnzK4M3400wYIaIvX668JrC7NiRwlEeOjKg8DF97Gd31pFa7i1j4zIkZQZ"
  },
  {
    id: '3',
    name: "Ato Gebremedhin T.",
    role: "Financial Controller",
    description: "Certified Public Accountant specializing in public-private partnership financing.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuArZfHMXyLu6bE9DlN9LiX3kznR88dr2mhDOpHw0gvXhsxHPlaKa_lb3vpOWPa38-xxvHDwtsPx4ethSbFQKdDFuP86XQGUb5baDVtCWoovEwFD_1E1y1FV3pghTjgsP3RUAafZMG55UdLngpbe0CA1P85Z7nqVuzHKjV-yK954Et4dFvLeju_XwGkfJbRZBu5fix3mhgksBTyu1dvG4In6ssgP8yTv1NHeUAcxlJ2QT0iCRlzIs28nFTaDw5U73jj5CCOtJIt0lytN"
  },
  {
    id: '4',
    name: "Dr. Almaz Berhe",
    role: "Technical Advisor",
    description: "Head of Innovation Lab, focusing on renewable energy and environmental tech.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAj2TqrSz5GqTnny1EaluHJdm8FZ2t59TX6BXKm7-wrKLO7cN7JYHthpE94yXx4ymfl6r4sxn50g5kYsAFepye2qDnBuUDbw-ypEtM-kjBQh0hTypufXvfeKveGZnAeWxBNEvJFc4ItvFDmsPIYMGstLGTIrCa_6q6GYz-ilZ-57QqqxJMPvWzweU3af0TvCpImFgCGlHza8TE7_ZvCm9BTlg8BCRFgVY1TmVwwo5qXXXn0jOPKTTQg2GmVVjbwXJ4oVP-AeolBVTm"
  }
];

export async function fetchTeamMembers(): Promise<TeamMember[]> {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(TEAM_MEMBERS);
    }, 1000);
  });
}
