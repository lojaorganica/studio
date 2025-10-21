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
    if (filename.endsWith('.mp4') || filename.endsWith('.webm') || filename.endsWith('.ogg')) {
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
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_cartoon_feiras_flamengo_laranjeiras_74_ivison.png?alt=media&token=407a4857-fb2d-46b1-8856-9bb112bfd8c4",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_cartoon_feiras_flamengo_laranjeiras_94_ivison.png?alt=media&token=1ea6662f-bfd7-42ee-aa5e-233c1ad2f55b",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feiras_flamengo_laranjeiras_43_paloma.mp4?alt=media&token=17e6a8e3-9797-43b8-91df-dccbe0ec3464",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feiras_flamengo_laranjeiras_54_ivison.mp4?alt=media&token=3797a156-ffba-48af-8eac-a8a072319b47",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feiras_flamengo_laranjeiras_57_matias_.mp4?alt=media&token=88a4f562-c791-42cb-9818-cf1353a2027f",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_feiras_flamengo_laranjeiras_58_ivison.mp4?alt=media&token=6220b309-0314-4bdd-a6fc-e55721a5b97d",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_story_cartoon_feiras_flamengo_laranjeiras_39_ivison.png?alt=media&token=7e1f27a6-096c-4cac-821f-7e248615d9cb",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_story_cartoon_feiras_flamengo_laranjeiras_40_rosana.png?alt=media&token=4a6b1bcb-b277-4b7a-8fcd-63536e5abba2",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_story_cartoon_feiras_flamengo_laranjeiras_50.png?alt=media&token=205a9dc5-a895-4c60-aebf-8167ff449f81",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faagr_story_cartoon_feiras_flamengo_laranjeiras_83_ivison.png?alt=media&token=742c77b6-5a2c-4e65-9163-777b01601c2d",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_049_cenoura_feiras_flamengo_laranjeiras.mp4?alt=media&token=e8690e8c-bbd4-457b-8505-4bb96a35ce72",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_100_maca_feiras_flamengo_laranjeiras.mp4?alt=media&token=3992dbf1-f9a7-4647-b6da-844899465c67",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_101_abacate_feiras_flamengo_laranjeiras.mp4?alt=media&token=3d60f792-26f0-46b8-8f2e-ffbaced5fe9e",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_148_maracugina_feiras_flamengo_laranjeiras.mp4?alt=media&token=5e734681-a11a-4c52-ab3f-f9e4f4f2b2bd",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_032_tomate_feiras_flamengo_laranjeiras.png?alt=media&token=74d3017f-cab1-4405-9ddb-f69fde2dea30",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_035_beterraba_feiras_flamengo_laranjeiras.png?alt=media&token=a8c4c8eb-4d1c-41c0-a8ff-a7e20fc42ea4",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_036_maca_feiras_flamengo_laranjeiras.png?alt=media&token=fee100de-79d1-49b2-bc71-a2916ee26b7a",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_037_cenoura_feiras_flamengo_laranjeiras.png?alt=media&token=54caaae8-b76d-467d-8a46-75dfa64be777",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_043_abacate_feiras_flamengo_laranjeiras.png?alt=media&token=b9186611-97da-4b22-8319-bf856e898eb2",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_044_maracugina_feiras_flamengo_laranjeiras.png?alt=media&token=eb6da12e-6593-4375-a41a-dc8565b73d8a",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_022_feiras_flamengo_laranjeiras.png?alt=media&token=ec1b32ab-312e-4254-9eee-2c49db247a28",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feiras_flamengo_laranjeiras_102_beterraba_de_ferro.mp4?alt=media&token=ad453906-baaa-47c3-9ea4-c38324383ad5",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feiras_flamengo_laranjeiras_62_batatman.mp4?alt=media&token=763b8176-92ec-4c32-8139-d3c66d227e3c",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feiras_flamengo_laranjeiras_64_banantrix.mp4?alt=media&token=a55b04c4-928e-4afc-be14-ad2b0fb104a1",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feiras_flamengo_laranjeiras_65_mandiorpheus.mp4?alt=media&token=05b3e20a-7040-425b-af72-1079e680d6dc",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feiras_flamengo_laranjeiras_68_robinete.mp4?alt=media&token=4f4b7fc5-422a-4f5c-a16a-b02c54ac4b8c",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feiras_flamengo_laranjeiras_71_aqualface.mp4?alt=media&token=ba042fd5-4607-4390-9f30-51e43dd15971",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feiras_flamengo_laranjeiras_75_sporock.mp4?alt=media&token=6f899a1f-5a6e-485b-b05c-9bfe3ae8ea40",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feiras_flamengo_laranjeiras_76_inhame_aranha.mp4?alt=media&token=265991b4-78c0-432f-8b6b-ce8e51a17151",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feiras_flamengo_laranjeiras_79_uva_negra.mp4?alt=media&token=c7a801e4-5bbf-400f-95ac-df6bf9cd6b6d",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feiras_flamengo_laranjeiras_81_limao_america.mp4?alt=media&token=b95ecd70-ce76-4784-b69e-2abae347d7a1",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feiras_flamengo_laranjeiras_90_brulk.mp4?alt=media&token=bcd78c9e-6e3c-4569-925a-5fa135f903b9",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feiras_flamengo_laranjeiras_91_pepino_verde.mp4?alt=media&token=f5276a1d-ce00-4ee9-a202-b15f600fc591",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feiras_flamengo_laranjeiras_92_abobrinha_maravilha.mp4?alt=media&token=593dfe46-61df-4ff9-8e78-569414f7ac92",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feiras_flamengo_laranjeiras_95_coisa_de_milho.mp4?alt=media&token=20f6db62-6595-43db-bb49-f5a33d60927e",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feiras_flamengo_laranjeiras_96_berinjela_negra.mp4?alt=media&token=764fb0fc-7a34-4403-905a-b6aa9e6606a6",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_story_cartoon_016_tomate_feiras_flamengo_laranjeiras.png?alt=media&token=bf89420e-a785-42a5-9a1e-91b581dd70bc",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_story_cartoon_018_feiras_flamengo_laranjeiras.png?alt=media&token=8694ede7-c2dd-4f74-b380-25eabfd6e2a5",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_story_cartoon_022_mara_feiras_flamengo_laranjeiras.png?alt=media&token=4b8e18fa-d353-4401-94df-a3d1a2324442",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_story_cartoon_024_abacate_feiras_flamengo_laranjeiras.png?alt=media&token=613306ca-b6cc-4832-8f5a-3b6639247439",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_story_cartoon_033_beterraba_feiras_flamengo_laranjeiras.png?alt=media&token=aa3d03c3-6625-4e86-9582-d5d1a9a9af80",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_story_cartoon_082_cenoura_feiras_flamengo_laranjeiras.png?alt=media&token=ffeacc6a-506a-4553-8319-439b7d38afd9",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_story_cartoon_111_feiras_flamengo_laranjeiras.png?alt=media&token=9ecdc472-3533-4a7a-adc2-e23653a94743",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_103_bete.png?alt=media&token=b6c3e862-4a7a-4bf6-b78a-bc8579495b86",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_36_bata.png?alt=media&token=20e18dcb-b7f0-410a-922b-a98a9ab2d985",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_38_robin.png?alt=media&token=526e91d5-bf81-46e6-9d66-e9efa84d4807",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_44_sporock.png?alt=media&token=43001901-4292-4d29-bd47-edb5897cca89",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_45_inhame.png?alt=media&token=fdd03fd9-4461-4561-9a67-304ab8aeee55",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_48_uva.png?alt=media&token=a65368aa-dec7-471a-a6e7-e06fd1582154",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_49_limao.png?alt=media&token=d293f76c-464c-4d1b-8015-303f146aaaf6",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_52_uverine.png?alt=media&token=658030d2-6d5f-4032-9d14-844f75a6500a",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_53_beri.png?alt=media&token=b733bbed-dcd6-4f2a-ad0d-b786684f6f2a",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_57_brulk.png?alt=media&token=5f80cf2e-6492-45a1-9e8d-0f92dde7ab73",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_63_abobrinha_maravilha.png?alt=media&token=db9327cd-a40d-44ad-ba44-aaaf85730fa4",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_64_coisa.jpeg?alt=media&token=8a0dfdbb-c4d9-4028-bd7e-7c1fdc657543",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_70_aqua.png?alt=media&token=47c7ac36-9d58-42fa-ba71-1f8057e6e7f4",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_76_mandi.png?alt=media&token=3b4385d4-6c8a-42cb-a48b-10919dcfe8f2",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_79_pepino.png?alt=media&token=fc091f89-17c3-4e76-8457-473eef8f8bc3",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_100_feiras_flamengo_laranjeiras.png?alt=media&token=91ea86db-096f-4a19-b23b-21554960e9b0",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_101_feiras_flamengo_laranjeiras.png?alt=media&token=a91e2c0f-3af0-4532-941d-f1d7d4b94d7c",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_104_feiras_flamengo_laranjeiras.png?alt=media&token=9645ed01-1b76-4e27-85c5-dcd5f518745f",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_105_feiras_flamengo_laranjeiras.png?alt=media&token=28ba7cae-3e5a-4c30-8453-8998ef421160",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_106_feiras_flamengo_laranjeiras.png?alt=media&token=ea662e40-ce90-4943-87a3-b22042138950",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_107_feiras_flamengo_laranjeiras.png?alt=media&token=028b924a-d799-43de-8b22-ad8a6602ba9e",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_24_feiras_flamengo_laranjeiras.png?alt=media&token=0ac5b001-8917-45c3-948e-3e2df672a4c8",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_28_feiras_flamengo_laranjeiras.png?alt=media&token=43e62ab2-c4ce-4932-9d9a-e260d5265421",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_29_feiras_flamengo_laranjeiras.png?alt=media&token=0d51bbb2-3781-4828-a305-83b990b948f4",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_30_feiras_flamengo_laranjeiras.png?alt=media&token=fd137203-7560-41f7-ae15-214a993bbe75",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_83_feiras_flamengo_laranjeiras.png?alt=media&token=a35b8b74-f1b0-4720-a812-14e2c6ac2a42",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_84_feiras_flamengo_laranjeiras.png?alt=media&token=f052a68b-1edc-425e-9abd-8db6472e4883",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_85_feiras_flamengo_laranjeiras.png?alt=media&token=2db403c1-c96b-4bb2-90e6-7611eafe6484",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_87_feiras_flamengo_laranjeiras.png?alt=media&token=a14a4194-9342-4ece-9282-b0fccf353bee",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_88_feiras_flamengo_laranjeiras.png?alt=media&token=d21bc3be-d6a4-4066-a0f1-f84fe015bf41",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_93_feiras_flamengo_laranjeiras.png?alt=media&token=7e9bd07a-f9e2-4558-8d36-e5e8d8b295d1",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_98_feiras_flamengo_laranjeiras.png?alt=media&token=95ca9421-86a0-4627-a63b-f114388f13af",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_99_feiras_flamengo_laranjeiras.png?alt=media&token=3c8d1c6a-6774-4994-90be-3df101244507",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_chuva_04_feiras_flamengo_laranjeiras.png?alt=media&token=ba9cca46-b2e6-4bc1-bc78-0450851fe69c",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_chuva_07_feiras_flamengo_laranjeiras.png?alt=media&token=9fd03b83-8db6-459f-815c-727cde5bb5db",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_06_feiras_flamengo_laranjeiras.png?alt=media&token=13944fa6-03c1-424c-b727-f843485f6f22",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_101_feiras_flamengo_laranjeiras.png?alt=media&token=ba12cd57-2f7f-474b-beb4-3efed5c9de0b",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_105_feiras_flamengo_laranjeiras.png?alt=media&token=2c6bb5e8-3702-40f0-88d6-dcfc30c80ac8",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_107_feiras_flamengo_laranjeiras.png?alt=media&token=e6d6067a-0643-481e-98bc-35be29e2d154",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_109_feiras_flamengo_laranjeiras.png?alt=media&token=92168ec7-2a24-46a4-9e45-218b750b4cfe",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_10_feiras_flamengo_laranjeiras.png?alt=media&token=9d4c61d5-b6fd-4be9-acc5-38c3376ee42a",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_113_feiras_flamengo_laranjeiras.png?alt=media&token=9262e2fd-bcae-4891-ac19-d2a92bfa49f1",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_51_feiras_flamengo_laranjeiras.png?alt=media&token=b828b911-6e83-469d-8ec7-ee97da5773ef",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_55_feiras_flamengo_laranjeiras.png?alt=media&token=41336d51-1cfa-43d1-b809-4a65e921ce83",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_56_feiras_flamengo_laranjeiras.png?alt=media&token=563926dd-3bdf-458e-b93e-a7ed58ce9d97",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_81_feiras_flamengo_laranjeiras.png?alt=media&token=6e5361e3-2bb1-4a98-a071-70ff578e979b",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_86_feiras_flamengo_laranjeiras.png?alt=media&token=02ea7dc9-1ae6-4740-9b31-5940b7e1beec",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_88_feiras_flamengo_laranjeiras.png?alt=media&token=ae312598-6b6b-414d-84d9-c3407ecbe77b",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_91_feiras_flamengo_laranjeiras.png?alt=media&token=d7068ec0-b70f-4ae3-8204-5fdf7eba2399",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_92_feiras_flamengo_laranjeiras.png?alt=media&token=48b88133-d10d-43ee-b9f4-5c3cf11dd342",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_95_feiras_flamengo_laranjeiras.png?alt=media&token=3a1ed573-4186-4df2-a6fa-592c44faa2f1",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_97_feiras_flamengo_laranjeiras.png?alt=media&token=8be16d63-017f-49ce-8def-55435f3e9c10",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_98_feiras_flamengo_laranjeiras.png?alt=media&token=27500fce-19c1-4280-9b52-a9a59979feb6",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_chuva_19_feiras_flamengo_laranjeiras.png?alt=media&token=f4d8b975-1240-4a73-bd25-9aabdb6099e2",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_chuva_23_feiras_flamengo_laranjeiras.png?alt=media&token=7f5df071-2da1-438f-a425-bbfe8464d0b1",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_103_bete.png?alt=media&token=3c112f6f-4ad9-4a54-8564-9d0ed6e9582d",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_23_joaninha.png?alt=media&token=a069c205-4637-4b90-8e63-c085fc868f1b",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_61_batatman.png?alt=media&token=6ea75b42-6d6c-454c-b13f-8d0cb5928e40",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_63_mandio.png?alt=media&token=099d9f7d-9464-4984-a582-0cfc61fb4f1e",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_65_inhame.png?alt=media&token=325038c4-6b3d-4596-895c-8313f18d284a",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_66_uverine.png?alt=media&token=e6fb071b-b225-4283-8ae2-78434e00d8fc",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_67_robinete.png?alt=media&token=d5136c13-3189-4129-9579-acb47f39f467",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_70_aqua.png?alt=media&token=4a9952c9-1db4-4707-9e5b-c17b588bf68e",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_77_sporock.png?alt=media&token=07d8f7a7-b4d8-4fbb-a66c-2946e6c5af79",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_80_uva_negra.png?alt=media&token=bb990aa6-f533-4275-a241-0b8344cac861",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_82_limao.png?alt=media&token=1a7c917d-c619-4b4d-aceb-403ad22e8d58",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_93_abobrinha.png?alt=media&token=6d3b6395-a7ad-4538-98a7-732494b7b0b4",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_93_pepino.png?alt=media&token=0dc5c5d8-ed9c-471d-8067-4ffe4b7ee6e7",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_94a_coisa.png?alt=media&token=b690ab5e-a050-420c-8ff5-3881b8b1fed9",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_94b_coisa.png?alt=media&token=de667db8-a4c9-43ed-b645-44a100243639",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_97_berin.png?alt=media&token=29eb0d33-0244-426e-8cf4-6199f9146f35",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_99_brulk.png?alt=media&token=593a813f-b898-4f13-ba07-8286acd7acf1",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_108_feiras_flamengo_laranjeiras.png?alt=media&token=4f87c177-42d5-4448-812d-1562fe385b46",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_109_feiras_flamengo_laranjeiras.png?alt=media&token=c3026733-dd66-42d3-9659-ef8e10d197e2",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_116_feiras_flamengo_laranjeiras.png?alt=media&token=99a6bf6c-badb-46fd-b5d3-d19d7871b8c9",
  "https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_117_feiras_flamengo_laranjeiras.png?alt=media&token=4e53f6f4-dd95-4ae7-aebe-3b7a9df18c59"
];

export const mediaFL: MediaItem[] = mediaUrls.map((url, index) => {
    const alt = getAltFromUrl(url);
    const item: MediaItem = {
        id: `fl-${index + 1}`,
        type: getTypeFromFilename(alt),
        src: url,
        alt: alt,
        author: 'Essência Vital',
        fair: 'Flamengo e Laranjeiras',
        style: getStyleFromFilename(alt),
        'data-ai-hint': 'market photo' // Generic hint
    };

    if (alt.toLowerCase().includes('inhame_aranha') || alt.toLowerCase().includes('inhame.png')) {
        item.characterName = 'Inhame-Aranha';
        item.story = INHAME_ARANHA_STORY;
    }

    if (alt.toLowerCase().includes('uverine')) {
        item.characterName = 'Uverine';
        item.story = UVERINE_STORY;
    }
    
    return item;
});
