import type { MediaItem } from './media-types';

const INHAME_ARANHA_STORY = `INHAME-ARANHA, INHAME-ARANHA
Na feira orgânica ele encanta
Nutritivo e natural,
Herói do campo, sensacional!

Com grandes fibras, vêm grandes responsabilidades!

Ele era só um tubérculo comum... até ser picado por uma aranha diferentona e cheia de energia, que vivia em um solo superadubado e rico em matéria orgânica de uma fazenda agroecológica! Agora, o Inhame-Aranha salta sobre hortas e prédios, lança teias nutritivas e enfrenta os maiores vilões do planeta: os agrotóxicos!

Rico em vitaminas — principalmente as do complexo B —, fibras, propriedades anti-inflamatórias e desintoxicantes, o Inhame-Aranha não só derrota os inimigos da saúde, como ainda fortalece o sistema imunológico de quem acredita nele. Quando necessário, nosso herói de cara rugosa, mas coração cremoso, coloca sua máscara e luta bravamente contra as corporações que envenenam nossos pratos e adoecem nossa população. Defensor dos orgânicos, guardião das hortaliças e protetor dos pequenos agricultores, o Inhame-Aranha está aqui para te despertar para um mundo mais saudável, sustentável e saboroso.

Prepare-se: a revolução vegetal chegou às alturas! Se você quer saúde de verdade, então vem pras feiras orgânicas nesse sábado e traga sua ecobag! O Inhame-Aranha estará te esperando com sabor, coragem e muitos vegetais do bem!`;

const UVERINE_STORY = `VENHA ENCONTRAR O UVERINE E MUITOS OUTROS HERÓIS DA NATUREZA EM NOSSAS FEIRAS ORGÂNICAS DO CIRCUITIO CARIOCA! 

Com garras de resveramantium, compostas por um alto teor de antioxidantes vindos de seu próprio sangue (ou melhor, do suco), Uverine não é um herói derivado de qualquer uva. Ele é o resultado de uma mutação natural envolvendo as lendárias uvas amarelas Niágara, Itália e Chardonnay — uma fusão poderosa que deu origem ao mais casca-grossa dos heróis orgânicos. Imortal, indestrutível e com um leve aroma frutado, Uverine corta, com suas afiadas garras de resveramantium, as toxinas, os radicais livres e os vilões agrotóxicos que ameaçam sua saúde e a do planeta. Quando Uverine não está em trabalho de podas regenerativas em plantações de videiras, ele está ao lado dos X-Veggies na defesa de uma alimentação limpa, sustentável e deliciosa, protegendo hortas, lavouras e a dignidade das famílias agricultoras. Uverine não envelhece — e luta todos os dias para que você também se torne longevo, viva melhor e mais protegido. Ele pode até guardar alguma doçura interior, mas, quando abre os braços e aciona suas garras… já era!

A batalha pela saúde começa no seu prato e Uverine já escolheu o lado certo da luta. E você? Venha fortalecer-se nas feiras Orgânicas do Circuito Carioca!`;

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
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_botafogo_48_coisa_de_milho.png?alt=media&token=af1c79f0-daa4-4f8d-90f7-7bd4d929ae49",
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
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_45_uva_negra.mp4?alt=media&token=27e54a78-560e-44e3-baa7-2aef1d5b647d",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_47_coisa_de_milho.mp4?alt=media&token=e40bb5f9-cebc-4774-ac51-67a48c555dcc",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_50_limao_america.mp4?alt=media&token=050a78ee-7a7f-414f-887a-b9f95db1ae3e",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_52_uverine.mp4?alt=media&token=46963e56-610d-46cc-a901-b013e28c530f",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_53_berinjela_negra.mp4?alt=media&token=6e86a4ed-a0b4-436b-b924-4a5ece394ed9",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_56_brulk.mp4?alt=media&token=495ad525-2254-4de1-94fa-05724014e1b5",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_58_mandiorpheus.mp4?alt=media&token=1695a7c2-bc7b-4160-acc4-5efc5b27dd98",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_59_abobrinha_maravilha.mp4?alt=media&token=9ae1343f-fa88-4afd-b561-a36c0463282e",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_63_pepino_verde.mp4?alt=media&token=6a9065d8-9de8-48a6-8b23-18ed0456edfb",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_76_beterraba_de_ferro.mp4?alt=media&token=71612028-2518-4f71-b62a-743a52626abb",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_17_feira_botafogo.png?alt=media&token=0f21f6fe-99b4-4681-ab29-4a4c00f7424b",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_18_feira_botafogo.png?alt=media&token=0a2a9081-5a5b-461c-80f3-34c1301b9135",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_20_feira_botafogo.png?alt=media&token=80b3b03e-47ed-429f-b627-d5b96173d193",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_22_feira_botafogo.png?alt=media&token=77e3ae70-2104-408b-9a81-ec93e1d85fef",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_35_feira_botafogo.png?alt=media&token=2f43b48e-c15a-45bf-84ba-ddeb51b6dc82",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_36_feira_botafogo.png?alt=media&token=2ed40f88-cdb7-4c82-917b-79971cfadeb2",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_44_feira_botafogo.png?alt=media&token=67a8c528-9944-44b1-9d1a-b5c34572c8e0",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_69_feira_botafogo.png?alt=media&token=3571b9b9-73eb-45ce-b4f7-fb19b5e59035",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_70_feira_botafogo.png?alt=media&token=e4d7462d-5785-4e10-be6a-040a43a11d3a",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_71_feira_botafogo.png?alt=media&token=e8618e7b-e9a0-46fc-975f-8959ce2aa670",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_73_feira_botafogo.png?alt=media&token=615fe4fb-6502-451a-b578-df860be6e04c",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_74_feira_botafogo.png?alt=media&token=fd2ae21c-ea12-45be-b9b3-918fb3d2f719",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_75_feira_botafogo.png?alt=media&token=0ab97dff-2cd6-47c9-8a31-0d7604f0718b",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_78_feira_botafogo.png?alt=media&token=2bd0d260-62f6-4e4d-82a7-6398ea5cf8f8",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_79_feira_botafogo.png?alt=media&token=546d2869-64a7-4c75-90d4-849de10209c3",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_80_feira_botafogo.png?alt=media&token=1711da43-cfe5-49df-84be-6d2a7c058a36",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_81_feira_botafogo.png?alt=media&token=e3180007-5a02-480a-918c-6cee9d1ddefb",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_chuva_06_feira_botafogo.png?alt=media&token=0ccb0f94-0abc-404c-9a99-b3d2befd4230",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_chuva_10_feira_botafogo.png?alt=media&token=53f72ddf-d829-4f77-9833-8660ef973d72",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_82_feira_botafogo.png?alt=media&token=22c0c612-50a5-4af2-938d-1556b89d3c5d",
    "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_83_feira_botafogo.png?alt=media&token=452e855a-516e-4852-9790-894af1d07d4d",
];

export const mediaB: MediaItem[] = mediaUrls.map((url, index) => {
    const alt = getAltFromUrl(url);
    const item: MediaItem = {
        id: `b-${index + 1}`,
        type: getTypeFromFilename(alt),
        src: url,
        alt: alt,
        author: 'Essência Vital',
        fair: 'Botafogo',
        style: getStyleFromFilename(alt),
        'data-ai-hint': 'market photo' // Generic hint
    };

    if (alt.toLowerCase().includes('inhame_aranha')) {
        item.characterName = 'Inhame-Aranha';
        item.story = INHAME_ARANHA_STORY;
    }

    if (alt.toLowerCase().includes('uverine')) {
        item.characterName = 'Uverine';
        item.story = UVERINE_STORY;
    }

    return item;
});