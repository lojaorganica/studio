
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
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_026_abacate_feira_leme.mp4?alt=media&token=0f39fa51-a303-4482-b4a8-ff07ad8818ce",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_057_maracugina_feira_leme.mp4?alt=media&token=05c73073-97b5-4a8b-8e62-774656b0abeb",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_058_maca_feira_leme.mp4?alt=media&token=0f2b2221-e6ad-4486-849c-92aa8632391a",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_064_cenoura_feira_leme.mp4?alt=media&token=e142ddc9-efa8-4f0d-a7c7-d7a6705a9707",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_021_tomate_feira_leme.png?alt=media&token=5d076996-8237-4c42-a8f5-ea704f68cce6",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_023_maca_feira_leme.png?alt=media&token=4ea261b6-4d4f-41e6-b12b-2a7f706de8c0",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_025_abacate_feira_leme.png?alt=media&token=30c22b0d-24e1-4bd5-88a6-884604eb20fc",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_059_maracugina_feira_leme.png?alt=media&token=a3b82715-8751-42d1-94ce-ba1cb5e9770f",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_leme_26_walace.mp4?alt=media&token=d31d9126-1cd9-4620-b2c0-61bc5b881be6",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_leme_19_joaninha.png?alt=media&token=bac77cd6-37de-42a7-a53b-39e8addebdd0",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_leme_35_aqualface.png?alt=media&token=856e2570-beb7-4d8f-afbb-f718de41cb5f",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_leme_36_batatman.png?alt=media&token=00ac3512-8c0f-4179-aeac-eb5c4f1d7304",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_leme_38_robinete.png?alt=media&token=70899612-b0c3-4a74-b4ff-ad8cb10fa66b",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_leme_39_inhame_aranha.png?alt=media&token=bd5fa426-5e1b-4bcc-8f46-069c01e4dac1",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_leme_40_sporock.png?alt=media&token=dd3ec322-dd73-4639-b8ec-c58259101faf",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_leme_42_uva_negra.png?alt=media&token=a51b409a-bafc-4303-a65b-f123b45052b1",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_leme_44_coisa_de_milho.png?alt=media&token=4242b413-66e3-4607-b1cf-3214b5c3efd5",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_leme_45_limao_america.png?alt=media&token=4d03805c-8095-4d3a-acb9-4a65bac4cdc5",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_leme_47_uverine.png?alt=media&token=18f961db-2fb0-480d-8336-fd06d1f20158",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_leme_50_berinjela_negra.png?alt=media&token=595f9ec8-38a6-4710-89a4-c393043a02b2",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_leme_51_brulk.png?alt=media&token=0ebddb7c-3812-4dd5-927a-b154e7db738e",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_leme_53_mandiorpheus.png?alt=media&token=e47ac5f5-4dd5-4146-be8b-f868a0b12104",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_leme_56_abobrinha_maravilha.png?alt=media&token=e05beaa4-7ffc-43f9-9027-78d401170859",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_leme_61_pepino_verde.png?alt=media&token=e3dd85b2-8c8e-4b50-bc4d-cd7736496113",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_leme_73_beterraba_de_ferro.png?alt=media&token=5ad2d81b-e23b-4b2c-ac5c-655575b71503",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_30_batatman.mp4?alt=media&token=64961140-c13b-4b43-b7fd-e3c087b3fda0",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_31_inhame_aranha.mp4?alt=media&token=b786e600-78aa-476c-b02e-5fda5b6ae864",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_32_sporock.mp4?alt=media&token=8b9e2e97-ee65-4ba9-879b-762e63a98288",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_34_aqualface.mp4?alt=media&token=7e57f3b4-db37-41b3-b71c-1ecc72d0ea49",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_37_robinete.mp4?alt=media&token=d1c6b0b7-b35a-4be7-960c-cfe5836faf04",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_41_uva_negra.mp4?alt=media&token=94830cb3-1ffd-48a0-ac08-bc4cb28caf87",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_43_coisa_de_milho.mp4?alt=media&token=ed8ecd95-add1-49c3-abf2-8f06e3144ebb",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_46_limao_america.mp4?alt=media&token=d96c632e-04eb-4232-af1c-fb519c864e88",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_48_uverine.mp4?alt=media&token=4a067b3b-99f4-421d-86c8-9030e41b1cbc",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_49_berinjela_negra.mp4?alt=media&token=d039c9f3-4540-4a1f-980f-d9579da9a8c1",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_52_brulk.mp4?alt=media&token=ea5aff65-a165-410d-947a-ceada4f9bf10",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_54_mandiorpheus.mp4?alt=media&token=9489dd3c-627f-444f-8a36-2b77d4a08cf0",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_55_abobrinha_maravilha.mp4?alt=media&token=03afdf8a-1fc9-4525-a0a8-b4977d476c25",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_72_beterraba_de_ferro.mp4?alt=media&token=dffc16db-fc81-43ac-bfc7-867360ce3923",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_83_pepino_verde.mp4?alt=media&token=d53da7b0-0394-4a87-bc89-da1c1617c50d",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_17_feira_leme.png?alt=media&token=4c1d7ef5-8402-4bcc-ad7c-ba5a92c14249",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_18_feira_leme.png?alt=media&token=78f550ee-60a5-4bad-b032-393c7cc601d5",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_20_feira_leme.png?alt=media&token=bdb52e1c-825d-4376-ac8b-a3ff89ffc2b5",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_22_feira_leme.png?alt=media&token=a446e764-afce-4bf7-8f68-57c7389b0723",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_33_feira_leme.png?alt=media&token=d3a206f5-7bbf-481b-945c-e46d7c26a63c",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_34_feira_leme.png?alt=media&token=39186704-821e-4fb3-87b7-f85198a1b926",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_62_feira_leme.png?alt=media&token=5a1487b2-f1ac-4665-8901-f38b8720e91a",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_65_feira_leme.png?alt=media&token=e20da07f-bf42-4f71-9a40-da26da41b3f5",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_66_feira_leme.png?alt=media&token=619446c3-a087-4e41-b5b3-9fb08841350c",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_67_feira_leme.png?alt=media&token=738d5659-6b00-48da-bb0b-043a68549810",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_68_feira_leme.png?alt=media&token=e854aabb-599b-4779-8404-cc97db382795",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_69_feira_leme.png?alt=media&token=dbfbc3fb-f80a-416e-b56d-7ef2a30b3892",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_70_feira_leme.png?alt=media&token=aab42b41-491b-4f39-b4ca-93ab306ab49c",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_71_feira_leme.png?alt=media&token=19aab830-4428-4f90-985c-7ddc47fddfe4",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_74_feira_leme.png?alt=media&token=e7a0607d-45da-44fe-be6e-a305d5a14720",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_75_feira_leme.png?alt=media&token=4328619a-7162-4fd6-adf7-62893d8267fb",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_76_feira_leme.png?alt=media&token=a724d52d-cc6d-48d3-a78c-bf13bdca24c8",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_77_feira_leme.png?alt=media&token=439ac59a-6722-4572-a4d0-b0e1c4d820fb",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_chuva_03_feira_leme.png?alt=media&token=82275657-8da7-44a5-b537-c64b245b77b8",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_chuva_11_feira_leme.png?alt=media&token=967f6e39-8a8a-4c6c-9856-3f12ade1d6c1"
];

export const mediaL: MediaItem[] = mediaUrls.map((url, index) => {
    const alt = getAltFromUrl(url);
    return {
        id: `l-${index + 1}`,
        type: getTypeFromFilename(alt),
        src: url,
        alt: alt,
        author: 'Essência Vital',
        fair: 'Leme',
        style: getStyleFromFilename(alt),
        'data-ai-hint': 'market photo' // Generic hint
    };
});
