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
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_cartoon_feira_botafogo_67_ivison.jpg?alt=media&token=6448f512-2caa-4852-9e74-052f207a2e37",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_botafogo_28_walace.mp4?alt=media&token=71db03c5-f42f-43a3-a93c-6554a33a0885",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_botafogo_29_giulia.mp4?alt=media&token=e8adaecd-739b-4e81-a22d-121b9d51c46b",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_botafogo_30_ailton.mp4?alt=media&token=c28f942c-27ad-4852-9b62-549a670cf8b2",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_botafogo_31_nathalia.mp4?alt=media&token=145a513d-358f-4bf7-a2e4-e9476ae1647f",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feira_botafogo_68_ivison.mp4?alt=media&token=877cf44d-87a8-4770-9f7f-a8b83f3db25f",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_026_abacate_feira_botafogo.mp4?alt=media&token=baebbf62-d59a-478f-8c1e-cbaa35f3af40",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_027_maracugina_feira_botafogo.mp4?alt=media&token=7371976d-0cc8-4810-baac-1410094e0833",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_061_maca_feira_botafogo.mp4?alt=media&token=c5b1b902-2fdf-433a-a452-54a8365b7d73",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_066_cenoura_feira_botafogo.mp4?alt=media&token=8b41e41c-b21b-450e-9dff-90f4ff8c4bdb",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_021_tomate_feira_botafogo.png?alt=media&token=eb699d1b-406a-4de8-bc2f-164a02c438cd",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_023_maca_feira_botafogo.png?alt=media&token=e75e3315-857a-461c-a694-b624180fcb5a",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_025_abacate_feira_botafogo.png?alt=media&token=3ccd599f-6d93-4807-b59d-d994568765b1",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_062_maracugina_feira_botafogo.png?alt=media&token=e0622de6-7c14-43ef-ad61-6b174638a2df",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_065_cenoura_feira_botafogo.png?alt=media&token=cf0536a9-3e0b-4e58-9c6c-25ef766bdba1",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_botafogo_19_joaninha.png?alt=media&token=16fdf6d3-a1e1-4bf8-9d90-c9a46d40e5e9",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_botafogo_38_aqualface.png?alt=media&token=1c3c8255-b72d-46df-92a1-4a585132c568",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_botafogo_39_batatman.png?alt=media&token=bbf8388d-1612-4597-892b-10b6ffb3b905",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_botafogo_40_robinete.png?alt=media&token=ead347d1-e911-4f03-a924-61618faff60c",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_botafogo_42_inhame_aranha.png?alt=media&token=365a2b21-0b97-44b8-9932-59f8d1be9ac6",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_botafogo_43_sporock.png?alt=media&token=da813c2b-f270-4d1b-87a4-1d1298dfb65f",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_botafogo_46_uva_negra.png?alt=media&token=4a3eddc4-67d4-4d07-bc21-77b9540fe71d",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_botafogo_48_coisa_de_milho.png?alt=media&token=af1c79f0-daa4-4f8d-90f7-7bd4d929ae89",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_botafogo_49_limao_america.png?alt=media&token=ad2d7296-19ca-4989-98ee-f5e720daadd6",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_botafogo_51_uverine.png?alt=media&token=144bd897-9c7a-4c27-ba43-4340421ac398",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_botafogo_54_berinjela_negra.png?alt=media&token=90ab807c-4067-4eac-ad53-014568fe6dab",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_botafogo_55_brulk.png?alt=media&token=d15a716f-0348-4a2d-a51d-891ce48d2496",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_botafogo_57_mandiorpheus.png?alt=media&token=63a59b94-58ed-4090-90da-e960e42689b0",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_botafogo_60_abobrinha_maravilha.png?alt=media&token=54b99ce7-fc90-4d44-82ca-38c3bd974dbe",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_botafogo_64_pepino_verde.png?alt=media&token=ca90291c-d4b0-4e68-a56a-4b36e928b2ad",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_botafogo_77_beterraba_de_ferro.png?alt=media&token=3e700f16-dc49-4066-9993-bd1151d2b5e7",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_32_batatman.mp4?alt=media&token=e5105a98-3287-4ffe-9818-797b1a624220",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_33_Inhame_aranha.mp4?alt=media&token=1a9ddd79-96b9-43f7-bba7-aaa96b768775",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_34_sporock.mp4?alt=media&token=d111b5e0-494c-4cd1-abac-dbeb3b9d79fb",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_37_aqualface.mp4?alt=media&token=926d8fdf-b7e6-48da-b5c9-c4e9f5a94a3c",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_41_robinete.mp4?alt=media&token=1691c276-afbb-4a9f-985d-d08b605baf6d",
];

export const mediaB: MediaItem[] = mediaUrls.map((url, index) => {
    const alt = getAltFromUrl(url);
    return {
        id: `b-${index + 1}`,
        type: getTypeFromFilename(alt),
        src: url,
        alt: alt,
        author: 'Essência Vital',
        fair: 'Botafogo',
        style: getStyleFromFilename(alt),
        'data-ai-hint': 'market photo' // Generic hint
    };
});
