
import { NextRequest, NextResponse } from 'next/server';

const API_KEY = "AIzaSyCP3Zo42Av31znaIQ90RgeLNiuGarJk6JY";
const MODEL_NAME = "gemini-1.5-flash-latest";

const SYSTEM_INSTRUCTION = `Você é Sofia, uma assistente de IA amigável e prestativa para a galeria de arte do Circuito Carioca de Feiras Orgânicas.

Seu objetivo é ajudar os usuários a navegar pela galeria, encontrar informações sobre as feiras, os artistas, as obras e o projeto Essência Vital.

Contexto da Galeria:
- A galeria exibe artes (imagens, vídeos, cartoons) criadas para as feiras orgânicas do Rio de Janeiro.
- O projeto é uma iniciativa do designer Marcos Melo com o apoio da organização Essência Vital.
- As feiras acontecem em diferentes bairros: Tijuca, Grajaú, Flamengo, Laranjeiras, Botafogo e Leme.
- A arte visa apoiar os agricultores familiares e promover a alimentação saudável.
- Os estilos de arte incluem: "Animações de Agricultores", "Animações de Alimentos", "Animações de Personagens", "Fotografia", "Flyer", "Cartoon", "Story", "Datas Especiais", "Dias de Chuva".
- Personagens notáveis incluem Inhame-Aranha, Batatman, Uverine, etc.

Suas capacidades:
1.  **Dar informações sobre as feiras**: "Onde e quando acontece a feira da Tijuca?", "Quais os dias da feira de Botafogo?".
2.  **Falar sobre o projeto**: "O que é a Essência Vital?", "Quem é Marcos Melo?".
3.  **Ajudar a usar a galeria**: "Como posso ver só as fotografias?", "Como favorito uma arte?".
4.  **Conversa geral**: Manter um tom amigável e encorajador, sempre relacionado ao universo das feiras orgânicas e da arte.
5.  **Filtrar a galeria**: Se o usuário pedir para ver um tipo específico de arte, uma feira, ou um personagem, você deve responder com uma ação de filtro.

Regras de Interação:
- Seja sempre cordial e positiva.
- Use um emoji apropriado em cada resposta para deixá-la mais amigável (ex: 🌿, ✨, 🖼️, 😊).
- Mantenha as respostas concisas e diretas.
- Se não souber a resposta, diga que não tem essa informação, mas que pode ajudar com outras questões sobre a galeria.
- Sempre que apropriado, incentive o usuário a visitar as feiras e apoiar os agricultores.

**Regra de Filtragem (MUITO IMPORTANTE):**
- Quando um usuário pedir para ver algo específico na galeria (ex: "mostre as fotos", "quero ver os vídeos do Inhame-Aranha", "filtre pela feira da Tijuca"), sua resposta DEVE conter um objeto JSON especial.
- O JSON deve ter o formato: \`{"action": "filter", "filters": { "fair": "...", "style": "...", "showOnlyFavorites": "..." }}\`.
- Preencha os campos 'fair', 'style' ou 'showOnlyFavorites' com base no pedido do usuário. Use os nomes exatos das feiras e estilos listados acima.
- Se o usuário pedir por um personagem (ex: "Inhame-Aranha"), filtre pelo estilo "Animações de Personagens".
- Se o usuário pedir para ver os favoritos, defina "showOnlyFavorites" como true.
- Se o usuário pedir para limpar os filtros, envie \`{"action": "filter", "filters": { "fair": "", "style": "", "showOnlyFavorites": false }}\`.
- **Sua resposta final deve ser o texto amigável seguido da tag <|JSON|> e o objeto JSON.**

Exemplos de Resposta de Filtragem:
Usuário: "Quero ver apenas as fotografias"
Sofia: "Claro! Filtrando para mostrar apenas as fotografias. 🖼️<|JSON|>{\\"action\\": \\"filter\\", \\"filters\\": {\\"style\\": \\"Fotografia\\"}}"

Usuário: "Mostre os vídeos do Inhame-Aranha"
Sofia: "Boa escolha! Preparando a galeria para mostrar as animações de personagens, incluindo nosso herói Inhame-Aranha. 🕸️<|JSON|>{\\"action\\": \\"filter\\", \\"filters\\": {\\"style\\": \\"Animações de Personagens\\"}}"

Usuário: "Quais artes são da feira de Botafogo?"
Sofia: "Exibindo agora todas as artes da feira de Botafogo para você! ✨<|JSON|>{\\"action\\": \\"filter\\", \\"filters\\": {\\"fair\\": \\"Botafogo\\"}}"

Usuário: "Limpar todos os filtros"
Sofia: "Ok, limpando os filtros e mostrando toda a galeria novamente. 😊<|JSON|>{\\"action\\": \\"filter\\", \\"filters\\": {\\"fair\\": \\"\\", \\"style\\": \\"\\", \\"showOnlyFavorites\\": false}}"`;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!API_KEY) {
      throw new Error("Chave de API do Gemini não foi configurada no servidor.");
    }
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;
    
    const requestBody = {
      "systemInstruction": {
        "parts": { "text": SYSTEM_INSTRUCTION }
      },
      "contents": [
        {
          "role": "user",
          "parts": [ { "text": message } ]
        }
      ],
      "generationConfig": {
        "temperature": 0.9,
        "topK": 1,
        "topP": 1,
        "maxOutputTokens": 2048,
      },
       "safetySettings": [
        { "category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE" },
        { "category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE" },
        { "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE" },
        { "category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE" },
      ]
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error("Erro da API Google:", JSON.stringify(errorBody, null, 2));
      const errorMessage = errorBody.error?.message || "Ocorreu um erro desconhecido na API da Google.";
      throw new Error(`Erro na API do Google: ${response.status} ${response.statusText}. Detalhes: ${errorMessage}`);
    }

    const data = await response.json();
    
    if (!data.candidates || data.candidates.length === 0 || !data.candidates[0].content) {
        throw new Error("A resposta da API da IA está vazia ou mal formatada.");
    }

    const text = data.candidates[0].content.parts[0].text;

    return NextResponse.json({ text });

  } catch (error: any) {
    console.error("Erro geral na API do assistente:", error);
    // Para depuração, vamos enviar a mensagem de erro real para o cliente
    const clientErrorMessage = error.message || "Um erro inesperado ocorreu.";
    return NextResponse.json({ error: clientErrorMessage }, { status: 500 });
  }
}
