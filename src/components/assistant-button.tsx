"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, Loader2, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { GoogleGenerativeAI } from "@google/generative-ai";

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
Sofia: "Ok, limpando os filtros e mostrando toda a galeria novamente. 😊<|JSON|>{\\"action\\": \\"filter\\", \\"filters\\": {\\"fair\\": \\"\\", \\"style\\": \\"\\", \\"showOnlyFavorites\\": false}}"
`;

// A chave de API está agora diretamente no código para garantir o funcionamento.
const API_KEY = "AIzaSyDaA76diGNYghIXd2ASpLLRFw3QN6LyeUo";

let genAI: GoogleGenerativeAI | null = null;
if (API_KEY) {
  genAI = new GoogleGenerativeAI(API_KEY);
} else {
  console.error("Chave de API do Gemini não encontrada.");
}

const model = genAI?.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: SYSTEM_INSTRUCTION,
});


type AssistantState = 'idle' | 'listening' | 'processing' | 'speaking';

type AssistantButtonProps = {
  onApplyFilters: (filters: any) => void;
};

interface CustomWindow extends Window {
  SpeechRecognition: typeof SpeechRecognition;
  webkitSpeechRecognition: typeof SpeechRecognition;
}
declare const window: CustomWindow;

export function AssistantButton({ onApplyFilters }: AssistantButtonProps) {
  const [state, setState] = useState<AssistantState>('idle');
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
      }
    };

    // As vozes são carregadas de forma assíncrona
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices(); // Tenta carregar imediatamente também

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'pt-BR';
      recognition.interimResults = false;
      recognition.continuous = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          handleSendMessage(transcript);
        }
      };

      recognition.onend = () => {
        setState(prevState => (prevState === 'listening' ? 'idle' : prevState));
      };
      
      recognition.onerror = (event) => {
        console.error("Erro no reconhecimento de voz:", event.error);
        if (event.error === 'no-speech') {
            toast({ title: "Assistente", description: "Não ouvi nada. Tente novamente." });
        } else {
            toast({ title: "Erro de Voz", description: `Não consegui captar sua voz: ${event.error}`, variant: 'destructive' });
        }
        setState('idle');
      };
      
      recognitionRef.current = recognition;
    } else {
        console.error("Speech Recognition API não é suportada neste navegador.");
    }

    return () => {
      recognitionRef.current?.abort();
      window.speechSynthesis?.cancel();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseDown = () => {
    if (state !== 'idle') return;
    if (recognitionRef.current) {
      window.speechSynthesis?.cancel(); 
      setState('listening');
      try {
        recognitionRef.current.start();
      } catch(e) {
        console.error("Não foi possível iniciar a escuta:", e);
        toast({ title: "Erro", description: "Não foi possível iniciar a gravação.", variant: 'destructive' });
        setState('idle');
      }
    }
  };

  const handleMouseUp = () => {
    if (state !== 'listening') return;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch(e) {
        console.error("Não foi possível parar a escuta:", e);
        setState('idle');
      }
    }
  };
  
  const speak = async (text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
        console.error('Síntese de voz não é suportada neste navegador.');
        setState('idle');
        return;
    }

    const startSpeaking = () => {
      window.speechSynthesis.cancel();
    
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.1;

      // Agora usamos as vozes do estado, que sabemos que estão carregadas
      const brVoice = voices.find(voice => voice.lang === 'pt-BR');
      if (brVoice) {
          utterance.voice = brVoice;
      } else {
        console.warn("Nenhuma voz em 'pt-BR' encontrada. Usando a voz padrão do navegador.");
      }

      utterance.onstart = () => setState('speaking');
      utterance.onend = () => setState('idle');
      utterance.onerror = (e) => {
          console.error("Erro na síntese de voz:", e);
          toast({ title: "Erro de Áudio", description: "Não consegui reproduzir a resposta.", variant: 'destructive' });
          setState('idle');
      };
      
      window.speechSynthesis.speak(utterance);
    };

    // Se as vozes ainda não foram carregadas, esperamos.
    if (voices.length === 0 && window.speechSynthesis.getVoices().length === 0) {
      // Define um timeout caso o evento onvoiceschanged não dispare
      const voiceTimeout = setTimeout(() => {
        console.warn("Timeout ao esperar pelas vozes. Tentando falar com a voz padrão.");
        startSpeaking();
      }, 1000); // Espera 1 segundo

      window.speechSynthesis.onvoiceschanged = () => {
        clearTimeout(voiceTimeout);
        setVoices(window.speechSynthesis.getVoices()); // Atualiza o estado
        startSpeaking();
      };
    } else {
      if (voices.length === 0) setVoices(window.speechSynthesis.getVoices());
      startSpeaking();
    }
  };

  const handleSendMessage = async (messageToSend: string) => {
    if (!messageToSend.trim()) {
      setState('idle');
      return;
    }
    
    if (!API_KEY || !model) {
      const errorMessage = "Desculpe, a minha configuração de IA não está completa. Por favor, verifique a chave de API no ambiente.";
      console.error(errorMessage);
      speak(errorMessage);
      setState('idle');
      return;
    }

    setState('processing');

    try {
      const chat = model.startChat({ history: [] });
      const result = await chat.sendMessage(messageToSend);
      const response = await result.response;
      let text = response.text();

      let filters = null;
      if (text.includes('<|JSON|>')) {
        const parts = text.split('<|JSON|>');
        text = parts[0];
        try {
          const jsonPart = parts[1];
          const parsedJson = JSON.parse(jsonPart);
          if (parsedJson.action === 'filter') {
            filters = parsedJson.filters;
          }
        } catch (e) {
          console.error("Erro ao parsear JSON da resposta da IA:", e);
        }
      }
      
      speak(text);

      if (filters) {
        onApplyFilters(filters);
      }

    } catch (error: any) {
      console.error("Erro ao chamar a API do Gemini:", error);
      const errorMessage = "Desculpe, não consegui me conectar. Por favor, verifique se a sua chave de API é válida e tente novamente.";
      speak(errorMessage);
      setState('idle');
    }
  };


  const getButtonIcon = () => {
    const iconSize = "w-8 h-8";
    switch (state) {
      case 'listening':
        return <Mic className={cn(iconSize, "text-accent-foreground")} />;
      case 'processing':
        return <Loader2 className={cn(iconSize, "text-accent-foreground animate-spin")} />;
      case 'speaking':
        return <Volume2 className={cn(iconSize, "text-accent-foreground")} />;
      case 'idle':
      default:
        return <Mic className={cn(iconSize, "text-accent-foreground")} />;
    }
  };
  
  const getButtonClass = () => {
    switch (state) {
      case 'listening':
        return "bg-red-600 hover:bg-red-700 scale-110";
      case 'processing':
        return "bg-accent/80 cursor-not-allowed";
      case 'speaking':
         return "bg-blue-600 hover:bg-blue-700";
      case 'idle':
      default:
        return "bg-accent hover:bg-accent/90";
    }
  }

  return (
      <Button
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        disabled={state === 'processing' || !recognitionRef.current || !API_KEY}
        className={cn(
          "fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out touch-manipulation",
          getButtonClass()
        )}
      >
        {getButtonIcon()}
      </Button>
  );
}
