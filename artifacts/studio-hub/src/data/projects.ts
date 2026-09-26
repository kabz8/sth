export type PortfolioProject = {
  id: number;
  title: string;
  category: "Residential" | "Hospitality" | "Commercial" | "Site Supervision";
  location: string;
  year: number;
  area: string;
  description: string;
  story: string;
  coverImage: string;
  images: string[];
};

export const projects: PortfolioProject[] = [
  {
    id: 1,
    title: "The Ridge House",
    category: "Residential",
    location: "Karen, Nairobi",
    year: 2025,
    area: "420 m²",
    description: "A calm family home shaped around views, shade, and a private garden court.",
    story: "The Ridge House is arranged as a sequence of sheltered rooms around a planted central garden. The plan opens toward the landscape while keeping the arrival sequence quiet and deliberate.\n\nA restrained palette of white render, dark metal, and warm timber gives the home a tactile character. Deep roof lines and carefully positioned openings keep the interiors comfortable through Nairobi's changing light.",
    coverImage: "/project-house-front.jpg",
    images: ["/project-house-front.jpg", "/project-house-aerial.jpg", "/project-house-red-car.jpg"],
  },
  {
    id: 2,
    title: "Olive Court Residence",
    category: "Residential",
    location: "Runda, Nairobi",
    year: 2024,
    area: "510 m²",
    description: "A generous contemporary residence that brings landscape into the daily rhythm of the home.",
    story: "Olive Court Residence uses a strong horizontal plan to connect living spaces, bedrooms, and outdoor terraces. Each room is oriented toward a specific garden moment, creating a home that feels expansive without losing intimacy.\n\nThe material strategy pairs local stone with soft timber and generous glazing. The result is a quiet, durable setting for family life.",
    coverImage: "/project-mansion.jpg",
    images: ["/project-mansion.jpg", "/project-house-aerial.jpg", "/project-house-front.jpg"],
  },
  {
    id: 3,
    title: "Kilimani Courtyard",
    category: "Commercial",
    location: "Kilimani, Nairobi",
    year: 2025,
    area: "2,800 m²",
    description: "A mixed-use building that gives a busy urban site a more human scale.",
    story: "Kilimani Courtyard places a shaded public threshold at the centre of a compact urban development. Retail, workspaces, and shared terraces are connected by a sequence of planted walkways.\n\nThe architecture responds to the street with a clear, durable facade and opens inward to a softer courtyard landscape. It is designed to age well as the neighbourhood continues to change.",
    coverImage: "/project-apartment-block.jpg",
    images: ["/project-apartment-block.jpg", "/project-house-aerial.jpg", "/project-house-red-car.jpg"],
  },
  {
    id: 4,
    title: "The Canopy Retreat",
    category: "Hospitality",
    location: "Naivasha, Kenya",
    year: 2023,
    area: "1,150 m²",
    description: "A low-impact hospitality retreat that makes the surrounding landscape the main experience.",
    story: "The Canopy Retreat is a collection of low-slung pavilions set lightly into the landscape. Shared spaces sit beneath a deep canopy, creating a continuous transition between shelter and open air.\n\nNatural materials, filtered daylight, and carefully framed views keep the experience grounded in its setting. The project prioritises quiet, shade, and a close relationship with the land.",
    coverImage: "/project-pretty-set-1.jpg",
    images: ["/project-pretty-set-1.jpg", "/project-pretty-set-2.jpg", "/project-pretty-set-3.jpg"],
  },
  {
    id: 5,
    title: "Red Clay House",
    category: "Site Supervision",
    location: "Lavington, Nairobi",
    year: 2024,
    area: "360 m²",
    description: "A carefully supervised residence where craft, proportion, and material detail carry the design.",
    story: "Red Clay House began with a simple brief: make a compact urban home feel generous and connected to its garden. The construction process required close attention to junctions, joinery, and the relationship between old and new materials.\n\nThrough regular site supervision and precise coordination, the finished house retains the clarity of the original design intent while feeling lived-in and warm.",
    coverImage: "/project-house-red-car.jpg",
    images: ["/project-house-red-car.jpg", "/project-pretty-set-4.jpg", "/project-house-front.jpg"],
  },
  {
    id: 6,
    title: "Mara Studio Offices",
    category: "Commercial",
    location: "Westlands, Nairobi",
    year: 2022,
    area: "1,900 m²",
    description: "Flexible offices designed around daylight, collaboration, and a strong sense of arrival.",
    story: "Mara Studio Offices transforms a deep commercial floorplate into a sequence of bright, adaptable work settings. Shared meeting spaces sit along a central spine, while quieter work areas receive filtered daylight from planted terraces.\n\nThe interior architecture uses a measured palette and durable details to support changing teams and ways of working. The building is designed to remain useful long after the first fit-out.",
    coverImage: "/project-pretty-set-2.jpg",
    images: ["/project-pretty-set-2.jpg", "/project-pretty-set-3.jpg", "/project-apartment-block.jpg"],
  },
];