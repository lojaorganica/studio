
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
    if (lowerCaseFilename.endsWith('.mp4') || lowerCaseFilename.endsWith('.webm') || lowerCaseFilename.endsWith('.ogg') || lowerCaseFilename.endsWith('.jpg') || lowerCaseFilename.endsWith('.png') || lowerCaseFilename.endsWith('.jpeg')) {
        // Assume video for mp4/webm/ogg, otherwise image
        if (lowerCaseFilename.endsWith('.mp4') || lowerCaseFilename.endsWith('.webm') || lowerCaseFilename.endsWith('.ogg')) {
            return 'video';
        }
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
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_107_todas_feiras.png?alt=media&token=8e85de64-1938-49c1-8fcf-565e54f1512d",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_102_beterraba_de_ferro.png?alt=media&token=42214b73-7be5-4396-8f92-00adc3574f34",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_28_joaninha.png?alt=media&token=ba64cf3f-d89f-45ad-89f9-a49eb6f5caf4",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_51_batatman.png?alt=media&token=2124d0fe-3ce9-48d0-8685-6a3afa681739",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_60_aqualface.png?alt=media&token=2982f1ee-4ee8-45e2-8e8c-2a97a9c70546",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_63_robinete.png?alt=media&token=6755a62d-0d0b-43b0-b418-588ebbfbdf85",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_64_inhame_aranha.png?alt=media&token=3526f683-a529-4c4a-adb0-62450cc3b513",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_65_sporock.png?alt=media&token=327dc776-015f-4593-a61e-c04304e352b6",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_67_coisa_de_milho.png?alt=media&token=8e3ba13e-34e7-407b-9884-9dadb23ce941",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_69_uva_negra.png?alt=media&token=2d5c7146-6399-4e55-b3e0-59f77cbf0fca",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_70_limao_america.png?alt=media&token=a697b88c-812c-4160-88d7-b0a16c420dd4",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_72_uverine.png?alt=media&token=4f8f32ae-d465-4af8-9982-a57026fcdbd8",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_75_berinjela_negra.png?alt=media&token=757d7d6e-9bdb-4cad-b8ad-373647305b22",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_76_brulk.png?alt=media&token=73c957a3-2746-41b8-b137-6a1b9f8ecab2",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_79_mandiorpheus.png?alt=media&token=e966c465-a399-4542-88c6-490d0079921a",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_82_abobrinha_maravilha.png?alt=media&token=bf9fe2e0-2f79-4c92-a62c-316ec2cb23f5",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_84_pepino_verde.png?alt=media&token=71f94515-ad48-44a7-9f05-abba16920f98",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_todas_feiras_101_beterraba_de_ferro.mp4?alt=media&token=fd86f923-d46b-40c2-a2b5-be3ac650a31a",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_todas_feiras_50_batatman.mp4?alt=media&token=29f805de-9691-42f0-9635-79e1b309d466",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_todas_feiras_53_sporock.mp4?alt=media&token=2e5e5013-ddcd-42e6-aef1-c5d0e2f73cea",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_todas_feiras_54_inhame_aranha.mp4?alt=media&token=495dbf1c-277f-40f2-bfa6-97e02627341b",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_todas_feiras_59_aqualface.mp4?alt=media&token=fa2284f5-8ba1-4f03-9df9-7dc9ac82f1a8",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_todas_feiras_62_robinete.mp4?alt=media&token=b00f09f7-b8c2-4703-b4fb-e63b27eb040b",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_todas_feiras_66_coisa_de_milho.mp4?alt=media&token=448a1fc2-2d81-485d-beac-5379948b0c69",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_todas_feiras_68_uva_negra.mp4?alt=media&token=166c086c-0904-4e7e-96e7-ad229d4fd979",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_todas_feiras_71_limao_america.mp4?alt=media&token=527890ce-aeca-4ba5-81a7-69863e8ba7bc",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_todas_feiras_73_uverine.mp4?alt=media&token=82d92f33-0508-4c72-b21c-0f4a4c6da6c2",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_todas_feiras_74_berinjela_negra.mp4?alt=media&token=00ba1d86-64b3-41e4-96f8-2ca4713cb7cd",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_todas_feiras_77_brulk.mp4?alt=media&token=305d9878-9585-45da-b2d9-ad87f6516532",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_todas_feiras_78_mandiorpheus.mp4?alt=media&token=9b1d80b4-c0d6-40ac-86a0-f8b7108aacdd",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_todas_feiras_80_abobrinha_maravilha.mp4?alt=media&token=1b7122a9-8c89-4d59-9c40-950c6254d250",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_todas_feiras_83_pepino_verde.mp4?alt=media&token=86aac784-9b1c-4536-8c86-b5364ccfb0bb",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_105_todas_feiras.png?alt=media&token=f81cd7b8-7341-453b-9d25-315ab25f12d2",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_106_todas_feiras.png?alt=media&token=2878e890-ced7-4d06-953e-79bf347d5ee1",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_108_todas_feiras.png?alt=media&token=f70155e2-1bb2-40c7-b5a6-f803b58fd975",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_109_todas_feiras.png?alt=media&token=31c24fe1-6817-4645-9106-1d7d67f8f201",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_110_todas_feiras.png?alt=media&token=7fff55d6-1d01-4061-9cda-00ceaeadf2b0",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_17_todas_feiras.png?alt=media&token=c43cccf1-d6c5-47d9-81b8-41f9da4cf8da",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_24_todas_feiras.png?alt=media&token=c1041860-0b95-4c20-b2b0-92de0997b0e6",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_26_todas_feiras.png?alt=media&token=8378bf23-e5e8-4ff5-b281-b23d3bfb216d",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_30_todas_feiras.png?alt=media&token=5a072510-7284-417c-aedd-42a3ca69f515",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_44_todas_feiras.png?alt=media&token=4bfa1f1c-3479-46e5-88b6-ed790c86606a",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_55_todas_feiras.png?alt=media&token=4b6ef0ae-b017-467a-b72f-ea40a277fb43",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_56_todas_feiras.png?alt=media&token=9e875aaa-d576-4a70-acb8-5fcdccd25898",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_57_todas_feiras.png?alt=media&token=f86b0654-4dda-4dd5-88fc-1bc030bb8bc4",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_61_todas_feiras.png?alt=media&token=a883548a-dbad-40a2-9cc9-da194b5e2ecb",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_67_todas_feiras.png?alt=media&token=3c3a9011-7475-4b4f-a85a-59cb8b95d904",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_87_todas_feiras.png?alt=media&token=1dbc620b-c1ef-493c-88cc-bbc655ef4a82",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_88_todas_feiras.png?alt=media&token=85ca053a-d91d-40a9-8d2f-86254194ed17",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_89_todas_feiras.png?alt=media&token=f5ecb791-8cc5-41db-9f36-ddee2814ac3f",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_90_todas_feiras.png?alt=media&token=b46ce33e-9f8f-48e8-9f57-e5373807d9c5",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_chuva_05_todas_feiras.png?alt=media&token=e32fa679-364f-461f-b10b-b249637c6af7",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_chuva_12_todas_feiras.png?alt=media&token=de487e97-0c48-4349-bf43-6a8112900d59"
];

export const mediaGeral: MediaItem[] = mediaUrls.map((url, index) => {
    const alt = getAltFromUrl(url);
    const type = getTypeFromFilename(alt);
    return {
        id: `geral-${index + 1}`,
        type: type,
        src: url,
        alt: alt,
        author: 'Essência Vital',
        fair: 'Tijuca', // Placeholder, a lógica de filtro usará o nome do arquivo
        style: getStyleFromFilename(alt),
        'data-ai-hint': type === 'image' ? 'market photo' : undefined
    };
});

    
