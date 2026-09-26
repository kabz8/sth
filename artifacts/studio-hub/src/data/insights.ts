import blogImage from "@assets/generated_images/blog-1.jpg";

export type Insight = {
  id: number;
  title: string;
  category: string;
  createdAt: string;
  readTime: number;
  author: string;
  excerpt: string;
  content: string;
  featuredImage: string;
};

export const insights: Insight[] = [
  {
    id: 1,
    title: "Designing for Nairobi's Changing Light",
    category: "Architecture",
    createdAt: "2026-08-14T09:00:00.000Z",
    readTime: 6,
    author: "Studio Hub Architects",
    excerpt: "How orientation, shade, and material choices help buildings feel calm, comfortable, and connected to Nairobi's landscape.",
    content: "Good architecture begins with careful observation. In Nairobi, the quality of light changes quickly across the day, moving from a bright morning clarity to a warmer afternoon glow. We use that rhythm to shape openings, thresholds, and moments of pause.\n\nDeep overhangs, shaded courtyards, and carefully placed screens can reduce glare without closing a building off from its surroundings. Materials also matter: textured stone, timber, and lime-washed surfaces catch changing light in ways that make a space feel different from morning to evening.\n\nThe result is not a building that fights its climate, but one that works with it. When orientation and detail are considered together, comfort becomes part of the architectural character.",
    featuredImage: blogImage,
  },
  {
    id: 2,
    title: "The Case for Slower, More Considered Spaces",
    category: "Design Culture",
    createdAt: "2026-07-02T09:00:00.000Z",
    readTime: 5,
    author: "Studio Hub Architects",
    excerpt: "Why the most memorable spaces are often the ones that leave room for movement, quiet, and everyday rituals.",
    content: "A successful space does more than look complete in a photograph. It gives people room to arrive, settle, move, and make it their own. That often means resisting the pressure to fill every surface or resolve every view at once.\n\nWe look for a sequence of experiences: a compressed entry opening into a generous room, a framed view that reveals itself gradually, or a quiet corner that makes a busy home feel balanced. These decisions create an architecture that is experienced over time rather than consumed in a single glance.\n\nSlower spaces are not empty spaces. They are edited spaces, where proportion, texture, and daylight do the work of creating atmosphere.",
    featuredImage: blogImage,
  },
  {
    id: 3,
    title: "From Site Constraints to Design Opportunities",
    category: "Practice",
    createdAt: "2026-05-18T09:00:00.000Z",
    readTime: 7,
    author: "Studio Hub Architects",
    excerpt: "A practical approach to turning difficult sites, tight budgets, and complex requirements into stronger design decisions.",
    content: "Every project arrives with constraints. A steep site, a narrow frontage, an existing tree canopy, or a demanding budget can initially feel like a limitation. The first step is to understand which constraints are fixed and which ones can become useful design parameters.\n\nA slope can create a natural split-level sequence. A limited footprint can make circulation more efficient. An existing tree can become the centre of a courtyard rather than an obstacle to remove. These moves require discipline, but they often produce buildings with more character and less waste.\n\nThe strongest design response is rarely the one that ignores the site. It is the one that reads the site carefully and gives its conditions a clear architectural expression.",
    featuredImage: blogImage,
  },
];