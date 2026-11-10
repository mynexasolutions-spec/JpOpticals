export type Category = "Sunglasses" | "Optical";

export type Product = {
  slug: string;
  detailSlug?: string;
  name: string;
  price: string;
  priceValue: number;
  category: Category;
  image: string;
  hoverImage?: string;
  note: string;
  shape: "Aviator" | "Geometric" | "Oversized" | "Rimless";
  presentation?: "cutout" | "editorial";
  description: string;
};

export const products: Product[] = [
  {
    slug: "obsidian-oversized",
    name: "Obsidian Oversized",
    price: "₹12,800",
    priceValue: 12800,
    category: "Sunglasses",
    image: "/Glossy_Black_Oversized_Sunglasses-removebg-preview.png",
    hoverImage: "/Glossy_Black_Aviator_Sunglasses-removebg-preview.png",
    note: "Oversized acetate",
    shape: "Oversized",
    description: "A deep black acetate frame with an easy, oversized proportion and softly considered edges.",
  },
  {
    slug: "obsidian-aviator",
    name: "Obsidian Aviator",
    price: "₹13,200",
    priceValue: 13200,
    category: "Sunglasses",
    image: "/Glossy_Black_Aviator_Sunglasses-removebg-preview.png",
    hoverImage: "/Glossy_Black_Oversized_Sunglasses-removebg-preview.png",
    note: "Polished black acetate",
    shape: "Aviator",
    description: "A clean, architectural aviator with dark lenses and a quietly confident front.",
  },
  {
    slug: "crystal-edge",
    name: "Crystal Edge",
    price: "₹14,500",
    priceValue: 14500,
    category: "Sunglasses",
    image: "/Crystal-Edge_Rimless_Gradient_Sunglasses-removebg-preview.png",
    hoverImage: "/Faceted_Gradient_Rimless_Sunglasses-removebg-preview.png",
    note: "Gradient rimless",
    shape: "Rimless",
    description: "Clear faceted edges meet a soft gradient lens for a lighter, more graphic kind of sun protection.",
  },
  {
    slug: "crystal-facet",
    name: "Crystal Facet",
    price: "₹14,900",
    priceValue: 14900,
    category: "Sunglasses",
    image: "/Faceted_Gradient_Rimless_Sunglasses-removebg-preview.png",
    hoverImage: "/Crystal-Edge_Rimless_Gradient_Sunglasses-removebg-preview.png",
    note: "Sculpted crystal",
    shape: "Geometric",
    description: "A sculpted rimless silhouette with a little more light-catching detail at every angle.",
  },
  {
    slug: "gold-aviator",
    name: "Gold Aviator",
    price: "₹18,800",
    priceValue: 18800,
    category: "Sunglasses",
    image: "/products/Luxury Gold Aviator Sunglasses.png",
    hoverImage: "/products/Luxury Gold-Trimmed Sunglasses on Green.png",
    note: "Gold-trimmed metal",
    shape: "Aviator",
    presentation: "editorial",
    description: "A statement aviator in polished gold and black, made for the light that finds you first.",
  },
  {
    slug: "verde-gold",
    name: "Verde Gold",
    price: "₹19,200",
    priceValue: 19200,
    category: "Sunglasses",
    image: "/products/Luxury Gold-Trimmed Sunglasses on Green.png",
    hoverImage: "/products/Luxury Gold Aviator Sunglasses.png",
    note: "Black and gold metal",
    shape: "Geometric",
    presentation: "editorial",
    description: "Slim gold lines and dark green depth, composed for an evening that starts outside.",
  },
  {
    slug: "silver-geometry-sun",
    name: "Silver Geometry",
    price: "₹13,900",
    priceValue: 13900,
    category: "Sunglasses",
    image: "/products/Rimless_Geometric_Silver_Sunglasses-removebg-preview.png",
    hoverImage: "/products/Rimless_Green_Gradient_Sunglasses-removebg-preview.png",
    note: "Geometric metal",
    shape: "Geometric",
    description: "A rimless silver frame with precise facets and a softly tinted lens for everyday clarity.",
  },
  {
    slug: "moss-gradient-sun",
    name: "Moss Gradient",
    price: "₹13,600",
    priceValue: 13600,
    category: "Sunglasses",
    image: "/products/Rimless_Green_Gradient_Sunglasses-removebg-preview.png",
    hoverImage: "/products/Rimless_Geometric_Silver_Sunglasses-removebg-preview.png",
    note: "Tinted rimless",
    shape: "Rimless",
    description: "A quiet green gradient and an open rimless construction that keeps the look considered.",
  },
  {
    slug: "vermilion-aviator",
    name: "Vermilion Aviator",
    price: "₹18,400",
    priceValue: 18400,
    category: "Sunglasses",
    image: "/Luxury Gold Aviator Sunglasses.png",
    hoverImage: "/products/Luxury Gold Aviator Sunglasses.png",
    note: "The red edit",
    shape: "Aviator",
    presentation: "editorial",
    description: "The signature aviator seen through a warmer, deeper lens of light.",
  },
  {
    slug: "nightline-gold",
    name: "Nightline Gold",
    price: "₹18,900",
    priceValue: 18900,
    category: "Sunglasses",
    image: "/Luxury Gold-Trimmed Sunglasses on Green.png",
    hoverImage: "/products/Luxury Gold-Trimmed Sunglasses on Green.png",
    note: "The green edit",
    shape: "Geometric",
    presentation: "editorial",
    description: "A close-up study of black and gold, refined for a more deliberate point of view.",
  },
  {
    slug: "linea-silver",
    name: "Linea Silver",
    price: "₹13,900",
    priceValue: 13900,
    category: "Optical",
    image: "/products/Rimless_Geometric_Silver_Sunglasses-removebg-preview.png",
    hoverImage: "/products/Rimless_Green_Gradient_Sunglasses-removebg-preview.png",
    note: "Geometric metal",
    shape: "Geometric",
    description: "A precise silver rimless frame that keeps the face open and the details close.",
  },
  {
    slug: "linea-moss",
    name: "Linea Moss",
    price: "₹13,600",
    priceValue: 13600,
    category: "Optical",
    image: "/products/Rimless_Green_Gradient_Sunglasses-removebg-preview.png",
    hoverImage: "/products/Rimless_Geometric_Silver_Sunglasses-removebg-preview.png",
    note: "Tinted rimless",
    shape: "Rimless",
    description: "An understated green lens tone with a slim silhouette made for long days.",
  },
  {
    slug: "crystal-study",
    name: "Crystal Study",
    price: "₹14,500",
    priceValue: 14500,
    category: "Optical",
    image: "/Crystal-Edge_Rimless_Gradient_Sunglasses-removebg-preview.png",
    hoverImage: "/Faceted_Gradient_Rimless_Sunglasses-removebg-preview.png",
    note: "Clear faceted edge",
    shape: "Rimless",
    description: "The clarity of a rimless frame with a refined faceted edge that catches the room.",
  },
  {
    slug: "crystal-line",
    name: "Crystal Line",
    price: "₹14,900",
    priceValue: 14900,
    category: "Optical",
    image: "/Faceted_Gradient_Rimless_Sunglasses-removebg-preview.png",
    hoverImage: "/Crystal-Edge_Rimless_Gradient_Sunglasses-removebg-preview.png",
    note: "Sculpted crystal",
    shape: "Geometric",
    description: "A fine, sculptural optical frame with a little more expression at the temples.",
  },
  {
    slug: "studio-rimless",
    name: "Studio Rimless",
    price: "₹15,400",
    priceValue: 15400,
    category: "Optical",
    image: "/Modern Rimless Glasses Portrait.png",
    hoverImage: "/products/Rimless_Geometric_Silver_Sunglasses-removebg-preview.png",
    note: "Everyday rimless",
    shape: "Rimless",
    presentation: "editorial",
    description: "A portrait of the frame in its natural setting: light, easy, and made to disappear into the day.",
  },
  {
    slug: "studio-clear",
    name: "Studio Clear",
    price: "₹15,700",
    priceValue: 15700,
    category: "Optical",
    image: "/Modern Rimless Glasses Portrait.png",
    hoverImage: "/products/Rimless_Green_Gradient_Sunglasses-removebg-preview.png",
    note: "Clear lens edit",
    shape: "Rimless",
    presentation: "editorial",
    description: "A clear, minimal expression of the frame made for close work and closer conversations.",
  },
  {
    slug: "silver-geometry-optical",
    name: "Silver Geometry",
    price: "₹14,200",
    priceValue: 14200,
    category: "Optical",
    image: "/products/Rimless_Geometric_Silver_Sunglasses-removebg-preview.png",
    hoverImage: "/Crystal-Edge_Rimless_Gradient_Sunglasses-removebg-preview.png",
    note: "Lightweight metal",
    shape: "Geometric",
    description: "A lightweight silver geometry that brings structure without asking for attention.",
  },
  {
    slug: "green-geometry-optical",
    name: "Green Geometry",
    price: "₹14,400",
    priceValue: 14400,
    category: "Optical",
    image: "/products/Rimless_Green_Gradient_Sunglasses-removebg-preview.png",
    hoverImage: "/Faceted_Gradient_Rimless_Sunglasses-removebg-preview.png",
    note: "Soft green tint",
    shape: "Geometric",
    description: "A softly tinted optical frame with a considered edge and an easy, balanced fit.",
  },
  {
    slug: "clear-aviator-optical",
    name: "Clear Aviator",
    price: "₹15,900",
    priceValue: 15900,
    category: "Optical",
    image: "/Glossy_Black_Aviator_Sunglasses-removebg-preview.png",
    hoverImage: "/Glossy_Black_Oversized_Sunglasses-removebg-preview.png",
    note: "Architectural acetate",
    shape: "Aviator",
    description: "An optical take on the aviator with a strong brow line and a softened black finish.",
  },
  {
    slug: "soft-oversized-optical",
    name: "Soft Oversized",
    price: "₹15,200",
    priceValue: 15200,
    category: "Optical",
    image: "/Glossy_Black_Oversized_Sunglasses-removebg-preview.png",
    hoverImage: "/Glossy_Black_Aviator_Sunglasses-removebg-preview.png",
    note: "Polished acetate",
    shape: "Oversized",
    description: "A generous, polished optical frame with an easy confidence for everyday wear.",
  },
];

export const collectionDetails: Record<Category, { title: string; description: string; heroImage: string; heroAlt: string }> = {
  Sunglasses: {
    title: "Sunglasses for the changing light.",
    description: "A considered edit of bold silhouettes, precise metalwork, and lenses that make the day feel a little more yours.",
    heroImage: "/products/Luxury Gold Aviator Sunglasses.png",
    heroAlt: "Gold aviator sunglasses on a rich red background",
  },
  Optical: {
    title: "Optical frames with a point of view.",
    description: "Refined everyday frames selected for clarity, comfort, and the details that make a first impression last.",
    heroImage: "/Modern Rimless Glasses Portrait.png",
    heroAlt: "Person wearing refined rimless optical glasses",
  },
};

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

function getNoteTokens(note: string): string[] {
  return note
    .toLowerCase()
    .split(/[\s/-]+/)
    .filter((token) => token.length > 2);
}

export function getSimilarProducts(product: Product, limit: number): Product[] {
  const noteTokens = new Set(getNoteTokens(product.note));

  return products
    .filter((candidate) => candidate.slug !== product.slug)
    .map((candidate, index) => {
      const sharedNoteTokens = getNoteTokens(candidate.note).filter((token) =>
        noteTokens.has(token),
      ).length;
      const score =
        (candidate.category === product.category ? 6 : 0) +
        (candidate.shape === product.shape ? 4 : 0) +
        sharedNoteTokens * 2 +
        (candidate.presentation === product.presentation ? 1 : 0);

      return { candidate, index, score };
    })
    .sort(
      (first, second) =>
        second.score - first.score ||
        Math.abs(first.candidate.priceValue - product.priceValue) -
          Math.abs(second.candidate.priceValue - product.priceValue) ||
        first.index - second.index,
    )
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}
