import type { MediaItem } from './media-types';

function getStyleFromFilename(filename: string): MediaItem['style'] {
  if (filename.includes('aagr')) return 'Animações de Agricultores';
  if (filename.includes('aali')) return 'Animações de Alimentos';
  if (filename.startsWith('ap_') || filename.includes('ap_story') || filename.includes('as_story')) return 'Animações de Personagens';
  if (filename.includes('fot')) return 'Fotografia';
  if (filename.includes('flyer')) return 'Flyer';
  if (filename.includes('cartoon')) return 'Cartoon';
  if (filename.includes('story')) return 'Story';
  if (filename.includes('especial')) return 'Datas Especiais';
  if (filename.includes('chuva')) return 'Dias de Chuva';
  return 'Fotografia'; // Default
}

function getTypeFromFilename(filename: string): 'image' | 'video' {
    const lowerCaseFilename = filename.toLowerCase();
    if (lowerCaseFilename.endsWith('.mp4') || lowerCaseFilename.endsWith('.webm') || lowerCaseFilename.endsWith('.ogg')) {
        return 'video';
    }
    return 'image';
}

function getAltFromUrl(url: string): string {
    try {
        const decodedUrl = decodeURIComponent(url);
        const path = new URL(decodedUrl).pathname;
        const filenameWithToken = path.split('/').pop() || '';
        const filename = filenameWithToken.split('?')[0] || '';
        const alt = filename.replace(/%2F/g, '/').split('/').pop() || 'media';
        return alt;
    } catch (e) {
        return 'media';
    }
}


const mediaUrls: string[] = [
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_07_todas_feiras.png?alt=media&token=0c6bea03-3935-4639-a0e3-9bcbd33cf808",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_08_todas_feiras.png?alt=media&token=56c2eda9-daac-4693-904e-b2cc6996e235",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_100_todas_feiras.png?alt=media&token=db59ef83-a38d-431a-80fc-a1f2060295b4",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_106_todas_feiras.png?alt=media&token=49a11a3c-095a-47fa-ab16-d0085a31c810",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_108_todas_feiras.png?alt=media&token=ac2d9ba2-3c3b-4ed4-80b7-a849bdade9b9",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_110_todas_feiras.png?alt=media&token=968d83ff-7a59-4c1f-beaf-15b2e60151da",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_114_todas_feiras.png?alt=media&token=d86938b3-1668-45fa-9444-76ff03d6b5f5",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_43_todas_feiras.png?alt=media&token=02a1bed4-63a1-4810-9eb2-3013dec3f1c7",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_58_todas_feiras.png?alt=media&token=ea00d11e-45c4-4023-be1e-d5f473b3a36b",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_59_todas_feiras.png?alt=media&token=9025e448-562a-47ea-ae55-d9ed24e2a8b1",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_69_todas_feiras.png?alt=media&token=cce76e39-615e-42cb-bb98-f5c0633e5ccf",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_87_todas_feiras.png?alt=media&token=8d29edf1-4171-4171-932e-31e8a40210a0",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_89_todas_feiras.png?alt=media&token=284c5a20-5902-4c10-9857-7a157819368e",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_90_todas_feiras.png?alt=media&token=99fbb7cc-5d25-4b4e-ae45-89490c18e636",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_93_todas_feiras.png?alt=media&token=4b722d48-acfc-4c88-adc2-eacce4191538",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_94_todas_feiras.png?alt=media&token=ce9cedad-ae22-415e-ac75-6179b4aab562",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_96_todas_feiras.png?alt=media&token=3fa773a3-cd11-4d4f-b9e0-c524b44a005e",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_99_todas_feiras.png?alt=media&token=81393c97-beb6-49f6-a8d4-e56fa4e57d53",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_chuva_17_todas_feiras.png?alt=media&token=0fc68154-09ef-41d5-a270-119fcd5d2c27",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_chuva_92_todas_feiras.png?alt=media&token=831f13a2-6713-4560-a409-bbd3587710c3",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_story_cartoon_todas_feiras_46_rosana.png?alt=media&token=3732fbf6-ad39-42c2-a29a-23a387394942",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_story_cartoon_todas_feiras_47_lucia.png?alt=media&token=d2e290cc-4024-4802-aceb-cdf7af1c6ffb",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_story_cartoon_todas_feiras_85_ivison.png?alt=media&token=5448cd01-de1a-4076-8616-3aceeee0b98e",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_story_cartoon_011_todas_feiras.png?alt=media&token=7ef01ca7-f1bf-41ad-af39-0893982e5f21",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_story_cartoon_020_maca_todas_feiras.png?alt=media&token=10dcc0f4-a78f-4b87-9f7c-56d493de4239",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_story_cartoon_026_abacate_todas_feiras.png?alt=media&token=b7e3b73e-9d3c-4435-ba0d-886b4dc347f3",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_story_cartoon_027_cenoura_todas_feiras.png?alt=media&token=5f43898f-8834-4727-9639-602569c68356",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_story_cartoon_028_maracugina_todas_feiras.png?alt=media&token=06363945-c644-4399-8945-638076d672a8",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_story_cartoon_084_tomate_todas_feiras.png?alt=media&token=2a215bd2-cd94-4582-86ba-3ca38fe90c19",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_todas_feiras_102_beterraba_de_ferro.png?alt=media&token=68d94139-f7c3-412e-ae5f-ee8f560e2cd8",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_todas_feiras_36_batatman.png?alt=media&token=9c5f537f-6f8f-4932-a1c5-f838b5f26bb5",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_todas_feiras_41_sporock.png?alt=media&token=6f8933dd-843c-47af-9d23-2857596aa576",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_todas_feiras_42_inhame_aranha.png?alt=media&token=6d6fdfd8-8139-41a5-b6a5-0f5d51e55885",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_todas_feiras_61_aqualface.png?alt=media&token=e3a7691c-dff9-47b7-b75c-3fba31ad6de0",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_todas_feiras_66_robinete.png?alt=media&token=a4b6681c-e989-435f-9afa-881449696269",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_todas_feiras_67_coisa_de_milho.png?alt=media&token=3fb50090-3c24-4dbd-8809-0ee48af7171b",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_todas_feiras_68_uva_negra.png?alt=media&token=eb834665-5b86-434e-87a0-cabd67f8211a",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_todas_feiras_70_limao_america.png?alt=media&token=9e888adf-86a8-42d0-9577-a37238695479",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_todas_feiras_72_uverine.png?alt=media&token=d886adda-aebc-4fec-b3f6-5e1a1d18a41c",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_todas_feiras_73_berinjela_negra.png?alt=media&token=2ccff49f-bff4-41ed-9f13-ed64c77e102b",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_todas_feiras_75_brulk.png?alt=media&token=bf189472-fab5-4d29-99f8-1a0cf2ee730b",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_todas_feiras_79_abobrinha_maravilha.png?alt=media&token=f8621c97-24e7-44bd-984a-2b10413a420d",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_todas_feiras_80_pepino.png?alt=media&token=ba9dd9e5-75a3-453e-872f-62e03f804ab3",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_todas_feiras_82_mandiorpheus.png?alt=media&token=7e3c2a88-26c5-41e9-8485-afb18b428d25",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_104_todas_feiras.png?alt=media&token=33d6ff96-1419-4605-89a6-bb5bc623854f",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_cartoon_todas_feiras_23.jpg?alt=media&token=516dc23a-e262-400a-ad5c-6e9a3fb31af1",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_todas_feiras_46_walace.mp4?alt=media&token=6a684f74-8af1-4de8-a719-bd4319e8fdf6",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_todas_feiras_49_matias_david.mp4?alt=media&token=a8e5b1b2-d770-4a83-8b28-5347044a7b40",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_038_maca_todas_feiras.mp4?alt=media&token=b5df862e-93e4-4da4-919a-49ce127c9e56",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_041_abacate_todas_feiras.mp4?alt=media&token=1684e6ac-ef75-4dfd-b6d0-8704a51c4598",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_045_maracugina_todas_feiras.mp4?alt=media&token=e35e3036-b7db-4612-b982-bb015746815b",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_086_cenoura_todas_feiras.mp4?alt=media&token=bf290504-fe62-46b4-ad35-723462f99d6e",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_036_tomate_todas_feiras.png?alt=media&token=fdbec818-f58c-4e83-9bf0-1fdc71cf5d84",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_038_maca_todas_feiras.png?alt=media&token=05762ea0-08ca-4b61-b142-61530b638160",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_042_abacate_todas_feiras.png?alt=media&token=7d85e45a-a2c9-4d21-acae-f669ee710929",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_082_maracugina_todas_feiras.png?alt=media&token=1ed067f6-2336-4084-aca2-1ecd9a03f896",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_085_cenoura_todas_feiras.png?alt=media&token=0ec75bb3-3d2b-4613-9786-2cccae7e3c41",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_107_todas_feiras.png?alt=media&token=8e85de64-1938-49c1-8fcf-565e54f1512d"
];

export const mediaGeral: MediaItem[] = mediaUrls.map((url, index) => {
    const alt = getAltFromUrl(url);
    return {
        id: `geral-${index + 1}`,
        type: getTypeFromFilename(alt),
        src: url,
        alt: alt,
        author: 'Essência Vital',
        fair: 'Tijuca', // Placeholder, a lógica de filtro usará o nome do arquivo
        style: getStyleFromFilename(alt),
        'data-ai-hint': 'market photo' // Generic hint
    };
});
