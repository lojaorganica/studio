
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

export const allMedia: MediaItem[] = [
  { id: "tijuca-1", type: "image", src: "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_84_feira_tijuca.png?alt=media&token=b917b926-b18e-47a0-8a7e-5b7f5f330ca9", alt: "fot_84_feira_tijuca", author: "Essência Vital", fair: "Tijuca", style: "Fotografia", "data-ai-hint": "market photo" },
  { id: "tijuca-2", type: "image", src: "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_tijuca_76_abobrinha_maravilha.png?alt=media&token=91fe35d1-61d0-4c47-aab4-be6a0cd06f30", alt: "ap_cartoon_feira_tijuca_76_abobrinha_maravilha", author: "Essência Vital", fair: "Tijuca", style: "Cartoon", "data-ai-hint": "character cartoon" },
  { id: "tijuca-3", type: "image", src: "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_tijuca_92_beterraba_de_ferro.png?alt=media&token=8082d54a-1cde-4893-9b5d-ec123e3f84f3", alt: "ap_cartoon_feira_tijuca_92_beterraba_de_ferro", author: "Essência Vital", fair: "Tijuca", style: "Cartoon", "data-ai-hint": "character cartoon" },
  { id: "tijuca-4", type: "image", src: "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_tijuca_81_pepino_verde.png?alt=media&token=b33cf144-855e-4731-aaf6-3de935f12bf8", alt: "ap_cartoon_feira_tijuca_81_pepino_verde", author: "Essência Vital", fair: "Tijuca", style: "Cartoon", "data-ai-hint": "character cartoon" },
  { id: "tijuca-5", type: "video", src: "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_48_batatman.mp4?alt=media&token=b294d6aa-3bc5-444e-9887-602c546b901b", alt: "ap_feira_tijuca_48_batatman", author: "Essência Vital", fair: "Tijuca", style: "Animações de Personagens" },
  { id: "tijuca-6", type: "video", src: "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_49_inhame_aranha.mp4?alt=media&token=806d4f89-478f-447f-a1b9-f56a11c70adb", alt: "ap_feira_tijuca_49_inhame_aranha", author: "Essência Vital", fair: "Tijuca", style: "Animações de Personagens" },
  { id: "tijuca-7", type: "video", src: "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_52_robinete.mp4?alt=media&token=d22a3e62-056e-4e0e-ac0a-a1d484f4093a", alt: "ap_feira_tijuca_52_robinete", author: "Essência Vital", fair: "Tijuca", style: "Animações de Personagens" },
  { id: "tijuca-8", type: "video", src: "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_54_sporock.mp4?alt=media&token=3d4055cf-76d2-45e4-a62a-a1c553b78ca8", alt: "ap_feira_tijuca_54_sporock", author: "Essência Vital", fair: "Tijuca", style: "Animações de Personagens" },
  { id: "tijuca-9", type: "video", src: "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_57_aqualface.mp4?alt=media&token=e41f3c31-8497-401f-8fe2-982ed1077501", alt: "ap_feira_tijuca_57_aqualface", author: "Essência Vital", fair: "Tijuca", style: "Animações de Personagens" },
  { id: "tijuca-10", type: "video", src: "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_61_uva_negra.mp4?alt=media&token=c03748c9-20b7-45d2-a481-91da4ad879a1", alt: "ap_feira_tijuca_61_uva_negra", author: "Essência Vital", fair: "Tijuca", style: "Animações de Personagens" },
  { id: "tijuca-11", type: "video", src: "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_63_coisa_de_milho.mp4?alt=media&token=5df59f3d-73b8-4329-b28a-c0aabd7a38b5", alt: "ap_feira_tijuca_63_coisa_de_milho", author: "Essência Vital", fair: "Tijuca", style: "Animações de Personagens" },
  { id: "tijuca-12", type: "video", src: "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_66_limao_america.mp4?alt=media&token=4db398b0-b3d6-4ea1-80de-b64bf18aeac9", alt: "ap_feira_tijuca_66_limao_america", author: "Essência Vital", fair: "Tijuca", style: "Animações de Personagens" },
  { id: "tijuca-13", type: "video", src: "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_68_uverine.mp4?alt=media&token=5a60387d-2326-4e17-a5ff-e4bd45602f02", alt: "ap_feira_tijuca_68_uverine", author: "Essência Vital", fair: "Tijuca", style: "Animações de Personagens" },
  { id: "tijuca-14", type: "video", src: "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_69_berinjela_negra.mp4?alt=media&token=bcdf44e0-5bc5-4646-9379-caf271254a04", alt: "ap_feira_tijuca_69_berinjela_negra", author: "Essência Vital", fair: "Tijuca", style: "Animações de Personagens" },
  { id: "tijuca-15", type: "video", src: "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_71_brulk.mp4?alt=media&token=ab21e3a9-38d5-4d5a-82d0-d5f51839e53c", alt: "ap_feira_tijuca_71_brulk", author: "Essência Vital", fair: "Tijuca", style: "Animações de Personagens" },
  { id: "tijuca-16", type: "video", src: "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_74_mandiorpheus.mp4?alt=media&token=929cebd8-b86a-4bc1-b866-9b995315d36f", alt: "ap_feira_tijuca_74_mandiorpheus", author: "Essência Vital", fair: "Tijuca", style: "Animações de Personagens" },
  { id: "1", type: "image", src: "https://placehold.co/600x800.png", alt: "Arte de Agricultor", author: "Artista Um", fair: "Tijuca", style: "Animações de Agricultores", "data-ai-hint": "farmer animation" },
  { id: "2", type: "image", src: "https://placehold.co/800x600.png", alt: "Comida Animada", author: "Artista Dois", fair: "Grajaú", style: "Animações de Alimentos", "data-ai-hint": "food animation" },
  { id: "3", type: "image", src: "https://placehold.co/600x600.png", alt: "Personagem da Feira", author: "Artista Três", fair: "Flamengo e Laranjeiras", style: "Animações de Personagens", "data-ai-hint": "character animation" },
  { id: "4", type: "image", src: "https://placehold.co/700x800.png", alt: "Foto da Feira", author: "Fotógrafo Quatro", fair: "Botafogo", style: "Fotografia", "data-ai-hint": "market photo" },
  { id: "5", type: "image", src: "https://placehold.co/800x800.png", alt: "Flyer do Evento", author: "Designer Cinco", fair: "Leme", style: "Flyer", "data-ai-hint": "event flyer" },
  { id: "6", type: "image", src: "https://placehold.co/600x900.png", alt: "Cartoon de Vegetal", author: "Cartunista Seis", fair: "Tijuca", style: "Cartoon", "data-ai-hint": "vegetable cartoon" },
  { id: "7", type: "image", src: "https://placehold.co/900x600.png", alt: "História em Quadrinhos", author: "Artista Sete", fair: "Grajaú", style: "Story", "data-ai-hint": "comic strip" },
  { id: "8", type: "image", src: "https://placehold.co/600x750.png", alt: "Anúncio de Data", author: "Designer Oito", fair: "Flamengo e Laranjeiras", style: "Datas Especiais", "data-ai-hint": "special date" },
  { id: "9", type: "image", src: "https://placehold.co/750x600.png", alt: "Arte de Dia Chuvoso", author: "Artista Nove", fair: "Botafogo", style: "Dias de Chuva", "data-ai-hint": "rainy day" },
  { id: "10", type: "image", src: "https://placehold.co/850x650.png", alt: "Foto de Produto", author: "Fotógrafo Quatro", fair: "Leme", style: "Fotografia", "data-ai-hint": "product photography" },
  { id: "11", type: "image", src: "https://placehold.co/650x850.png", alt: "Agricultor Sorrindo", author: "Artista Um", fair: "Tijuca", style: "Animações de Agricultores", "data-ai-hint": "smiling farmer" },
  { id: "12", type: "image", src: "https://placehold.co/800x700.png", alt: "Cesta de Orgânicos", author: "Artista Dois", fair: "Grajaú", style: "Animações de Alimentos", "data-ai-hint": "organic basket" },
  { id: "13", type: "image", src: "https://placehold.co/700x800.png", alt: "Mascote da Feira", author: "Artista Três", fair: "Flamengo e Laranjeiras", style: "Animações de Personagens", "data-ai-hint": "market mascot" },
  { id: "14", type: "image", src: "https://placehold.co/600x800.png", alt: "Flyer de Desconto", author: "Designer Cinco", fair: "Botafogo", style: "Flyer", "data-ai-hint": "discount flyer" },
  { id: "15", type: "image", src: "https://placehold.co/800x600.png", alt: "Charge Política", author: "Cartunista Seis", fair: "Leme", style: "Cartoon", "data-ai-hint": "political cartoon" },
  { id: "16", type: "image", src: "https://placehold.co/600x900.png", alt: "Story sobre a Colheita", author: "Artista Sete", fair: "Tijuca", style: "Story", "data-ai-hint": "harvest story" },
  { id: "17", type: "image", src: "https://placehold.co/900x600.png", alt: "Banner de Feriado", author: "Designer Oito", fair: "Grajaú", style: "Datas Especiais", "data-ai-hint": "holiday banner" },
  { id: "18", type: "image", src: "https://placehold.co/600x600.png", alt: "Feira na Chuva", author: "Artista Nove", fair: "Flamengo e Laranjeiras", style: "Dias de Chuva", "data-ai-hint": "market rain" },
  { id: "19", type: "image", src: "https://placehold.co/800x800.png", alt: "Retrato de Cliente", author: "Fotógrafo Quatro", fair: "Botafogo", style: "Fotografia", "data-ai-hint": "customer portrait" },
  { id: "20", type: "image", src: "https://placehold.co/700x800.png", alt: "Mãos na Terra", author: "Artista Um", fair: "Leme", style: "Animações de Agricultores", "data-ai-hint": "hands on soil" },
  { id: "21", type: "image", src: "https://placehold.co/800x700.png", alt: "Tomates Animados", author: "Artista Dois", fair: "Tijuca", style: "Animações de Alimentos", "data-ai-hint": "animated tomatoes" },
  { id: "22", type: "image", src: "https://placehold.co/700x900.png", alt: "O Espantalho", author: "Artista Três", fair: "Grajaú", style: "Animações de Personagens", "data-ai-hint": "scarecrow character" },
  { id: "23", type: "image", src: "https://placehold.co/900x700.png", alt: "Flyer de Conscientização", author: "Designer Cinco", fair: "Flamengo e Laranjeiras", style: "Flyer", "data-ai-hint": "awareness flyer" },
  { id: "24", type: "image", src: "https://placehold.co/700x700.png", alt: "Tira Cômica", author: "Cartunista Seis", fair: "Botafogo", style: "Cartoon", "data-ai-hint": "comic panel" },
  { id: "25", type: "image", src: "https://placehold.co/800x900.png", alt: "Story do Agricultor", author: "Artista Sete", fair: "Leme", style: "Story", "data-ai-hint": "farmer story" },
  { id: "26", type: "image", src: "https://placehold.co/900x800.png", alt: "Banner Dia das Mães", author: "Designer Oito", fair: "Tijuca", style: "Datas Especiais", "data-ai-hint": "mothers day banner" },
  { id: "27", type: "image", src: "https://placehold.co/800x800.png", alt: "Guarda-chuva Colorido", author: "Artista Nove", fair: "Grajaú", style: "Dias de Chuva", "data-ai-hint": "colorful umbrella" },
  { id: "28", type: "image", src: "https://placehold.co/600x900.png", alt: "Banca de Frutas", author: "Fotógrafo Quatro", fair: "Flamengo e Laranjeiras", style: "Fotografia", "data-ai-hint": "fruit stand" },
  { id: "29", type: "image", src: "https://placehold.co/900x600.png", alt: "Trator na Fazenda", author: "Artista Um", fair: "Botafogo", style: "Animações de Agricultores", "data-ai-hint": "farm tractor" },
  { id: "30", type: "image", src: "https://placehold.co/600x600.png", alt: "Alface Dançante", author: "Artista Dois", fair: "Leme", style: "Animações de Alimentos", "data-ai-hint": "dancing lettuce" },
  { id: "31", type: "image", src: "https://placehold.co/800x600.png", alt: "A Menina da Feira", author: "Artista Três", fair: "Tijuca", style: "Animações de Personagens", "data-ai-hint": "market girl" },
  { id: "32", type: "image", src: "https://placehold.co/600x800.png", alt: "Flyer da Semana", author: "Designer Cinco", fair: "Grajaú", style: "Flyer", "data-ai-hint": "weekly flyer" },
  { id: "33", type: "image", src: "https://placehold.co/800x800.png", alt: "Charge sobre Agrotóxicos", author: "Cartunista Seis", fair: "Flamengo e Laranjeiras", style: "Cartoon", "data-ai-hint": "pesticide cartoon" },
  { id: "34", type: "image", src: "https://placehold.co/700x800.png", alt: "Story dos Bastidores", author: "Artista Sete", fair: "Botafogo", style: "Story", "data-ai-hint": "behind the scenes" },
  { id: "35", type: "image", src: "https://placehold.co/800x700.png", alt: "Especial de Natal", author: "Designer Oito", fair: "Leme", style: "Datas Especiais", "data-ai-hint": "christmas special" },
  { id: "36", type: "image", src: "https://placehold.co/700x900.png", alt: "Poça d'água", author: "Artista Nove", fair: "Tijuca", style: "Dias de Chuva", "data-ai-hint": "water puddle" },
]

export const fairs = [...new Set(allMedia.map((item) => item.fair))]
export const styles = [...new Set(allMedia.map((item) => item.style))]
