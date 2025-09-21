export type MediaItem = {
    id: string
    type: "image" | "video"
    src: string
    alt: string
    author: string
    fair: "Tijuca" | "Grajaú" | "Flamengo e Laranjeiras" | "Botafogo" | "Leme"
    style: "Animações de Agricultores" | "Animações de Alimentos" | "Animações de Personagens" | "Fotografia" | "Flyer" | "Cartoon" | "Story" | "Datas Especiais" | "Dias de Chuva"
    "data-ai-hint"?: string
  }
  