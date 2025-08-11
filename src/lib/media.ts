export type MediaItem = {
  id: string
  type: "image" | "video"
  src: string
  alt: string
  author: string
  fair: "ArtRio" | "SP-Arte" | "Frieze" | "Art Basel"
  style: "Abstract" | "Figurative" | "Street Art" | "Surrealism" | "Minimalism"
}

export const allMedia: MediaItem[] = [
  // A diverse set of 36 items
  { id: "1", type: "image", src: "https://placehold.co/600x800.png", alt: "Abstract painting 1", author: "Artist One", fair: "ArtRio", style: "Abstract", "data-ai-hint": "abstract painting" },
  { id: "2", type: "image", src: "https://placehold.co/800x600.png", alt: "Figurative sculpture", author: "Artist Two", fair: "SP-Arte", style: "Figurative", "data-ai-hint": "figurative sculpture" },
  { id: "3", type: "image", src: "https://placehold.co/600x600.png", alt: "Street art mural", author: "Artist Three", fair: "Frieze", style: "Street Art", "data-ai-hint": "street art" },
  { id: "4", type: "image", src: "https://placehold.co/700x800.png", alt: "Surrealist drawing", author: "Artist Four", fair: "Art Basel", style: "Surrealism", "data-ai-hint": "surrealist drawing" },
  { id: "5", type: "image", src: "https://placehold.co/800x800.png", alt: "Minimalist installation", author: "Artist Five", fair: "ArtRio", style: "Minimalism", "data-ai-hint": "minimalist installation" },
  { id: "6", type: "image", src: "https://placehold.co/600x900.png", alt: "Abstract painting 2", author: "Artist One", fair: "SP-Arte", style: "Abstract", "data-ai-hint": "abstract colorful" },
  { id: "7", type: "image", src: "https://placehold.co/900x600.png", alt: "Figurative painting", author: "Artist Two", fair: "Frieze", style: "Figurative", "data-ai-hint": "figurative painting" },
  { id: "8", type: "image", src: "https://placehold.co/600x750.png", alt: "Street art graffiti", author: "Artist Three", fair: "Art Basel", style: "Street Art", "data-ai-hint": "urban graffiti" },
  { id: "9", type: "image", src: "https://placehold.co/750x600.png", alt: "Surrealist collage", author: "Artist Four", fair: "ArtRio", style: "Surrealism", "data-ai-hint": "surreal collage" },
  { id: "10", type: "image", src: "https://placehold.co/850x650.png", alt: "Minimalist sculpture", author: "Artist Five", fair: "SP-Arte", style: "Minimalism", "data-ai-hint": "minimalist sculpture" },
  { id: "11", type: "image", src: "https://placehold.co/650x850.png", alt: "Abstract digital art", author: "Artist One", fair: "Frieze", style: "Abstract", "data-ai-hint": "digital abstract" },
  { id: "12", type: "image", src: "https://placehold.co/800x700.png", alt: "Figurative drawing", author: "Artist Two", fair: "Art Basel", style: "Figurative", "data-ai-hint": "charcoal drawing" },
  { id: "13", type: "image", src: "https://placehold.co/700x800.png", alt: "Street art stencil", author: "Artist Three", fair: "ArtRio", style: "Street Art", "data-ai-hint": "stencil art" },
  { id: "14", type: "image", src: "https://placehold.co/600x800.png", alt: "Surrealist painting", author: "Artist Four", fair: "SP-Arte", style: "Surrealism", "data-ai-hint": "dreamscape painting" },
  { id: "15", type: "image", src: "https://placehold.co/800x600.png", alt: "Minimalist photography", author: "Artist Five", fair: "Frieze", style: "Minimalism", "data-ai-hint": "minimalist architecture" },
  { id: "16", type: "image", src: "https://placehold.co/600x900.png", alt: "Abstract textile", author: "Artist One", fair: "Art Basel", style: "Abstract", "data-ai-hint": "abstract textile" },
  { id: "17", type: "image", src: "https://placehold.co/900x600.png", alt: "Figurative ceramics", author: "Artist Two", fair: "ArtRio", style: "Figurative", "data-ai-hint": "ceramic art" },
  { id: "18", type: "image", src: "https://placehold.co/600x600.png", alt: "Street art installation", author: "Artist Three", fair: "SP-Arte", style: "Street Art", "data-ai-hint": "public installation" },
  { id: "19", type: "image", src: "https://placehold.co/800x800.png", alt: "Surrealist sculpture", author: "Artist Four", fair: "Frieze", style: "Surrealism", "data-ai-hint": "surreal sculpture" },
  { id: "20", type: "image", src: "https://placehold.co/700x800.png", alt: "Minimalist painting", author: "Artist Five", fair: "Art Basel", style: "Minimalism", "data-ai-hint": "monochrome painting" },
  { id: "21", type: "image", src: "https://placehold.co/800x700.png", alt: "Abstract expressionism", author: "Artist One", fair: "ArtRio", style: "Abstract", "data-ai-hint": "expressionist art" },
  { id: "22", type: "image", src: "https://placehold.co/700x900.png", alt: "Portrait photography", author: "Artist Two", fair: "SP-Arte", style: "Figurative", "data-ai-hint": "portrait photography" },
  { id: "23", type: "image", src: "https://placehold.co/900x700.png", alt: "Graffiti art piece", author: "Artist Three", fair: "Frieze", style: "Street Art", "data-ai-hint": "colorful graffiti" },
  { id: "24", type: "image", src: "https://placehold.co/700x700.png", alt: "Dream-like digital art", author: "Artist Four", fair: "Art Basel", style: "Surrealism", "data-ai-hint": "dreamy digital" },
  { id: "25", type: "image", src: "https://placehold.co/800x900.png", alt: "Geometric abstraction", author: "Artist Five", fair: "ArtRio", style: "Minimalism", "data-ai-hint": "geometric art" },
  { id: "26", type: "image", src: "https://placehold.co/900x800.png", alt: "Colorful abstract art", author: "Artist One", fair: "SP-Arte", style: "Abstract", "data-ai-hint": "vibrant abstract" },
  { id: "27", type: "image", src: "https://placehold.co/800x800.png", alt: "Bronze sculpture", author: "Artist Two", fair: "Frieze", style: "Figurative", "data-ai-hint": "bronze sculpture" },
  { id: "28", type: "image", src: "https://placehold.co/600x900.png", alt: "Urban photography", author: "Artist Three", fair: "Art Basel", style: "Street Art", "data-ai-hint": "urban landscape" },
  { id: "29", type: "image", src: "https://placehold.co/900x600.png", alt: "Fantasy illustration", author: "Artist Four", fair: "ArtRio", style: "Surrealism", "data-ai-hint": "fantasy art" },
  { id: "30", type: "image", src: "https://placehold.co/600x600.png", alt: "Clean line art", author: "Artist Five", fair: "SP-Arte", style: "Minimalism", "data-ai-hint": "line art" },
  { id: "31", type: "image", src: "https://placehold.co/800x600.png", alt: "Ink wash painting", author: "Artist One", fair: "Frieze", style: "Abstract", "data-ai-hint": "ink wash" },
  { id: "32", type: "image", src: "https://placehold.co/600x800.png", alt: "Life drawing", author: "Artist Two", fair: "Art Basel", style: "Figurative", "data-ai-hint": "life drawing" },
  { id: "33", type: "image", src: "https://placehold.co/800x800.png", alt: "Paste-up art", author: "Artist Three", fair: "ArtRio", style: "Street Art", "data-ai-hint": "pasteup art" },
  { id: "34", type: "image", src: "https://placehold.co/700x800.png", alt: "Psychedelic art", author: "Artist Four", fair: "SP-Arte", style: "Surrealism", "data-ai-hint": "psychedelic art" },
  { id: "35", type: "image", src: "https://placehold.co/800x700.png", alt: "Conceptual art", author: "Artist Five", fair: "Frieze", style: "Minimalism", "data-ai-hint": "conceptual art" },
  { id: "36", type: "image", src: "https://placehold.co/700x900.png", alt: "Fluid abstract", author: "Artist One", fair: "Art Basel", style: "Abstract", "data-ai-hint": "fluid art" },
]

export const fairs = [...new Set(allMedia.map((item) => item.fair))]
export const styles = [...new Set(allMedia.map((item) => item.style))]
