"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, Loader2, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

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
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
      }
    };

    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices(); 

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
  
  const speak = (text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
        console.error('Síntese de voz não é suportada neste navegador.');
        setState('idle');
        return;
    }

    const startSpeaking = (voice: SpeechSynthesisVoice | undefined) => {
      window.speechSynthesis.cancel();
    
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.1;

      if (voice) {
          utterance.voice = voice;
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

    const allVoices = window.speechSynthesis.getVoices();
    const brVoice = allVoices.find(voice => voice.lang === 'pt-BR');

    if (allVoices.length > 0) {
      startSpeaking(brVoice);
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        const updatedVoices = window.speechSynthesis.getVoices();
        const updatedBrVoice = updatedVoices.find(voice => voice.lang === 'pt-BR');
        startSpeaking(updatedBrVoice);
      };
    }
  };

  const handleSendMessage = async (messageToSend: string) => {
    if (!messageToSend.trim()) {
      setState('idle');
      return;
    }
    
    setState('processing');

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageToSend }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "A resposta da API não foi bem-sucedida.");
      }
      
      const result = await response.json();
      let text = result.text;
      
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
      console.error("Erro ao chamar a API do assistente:", error);
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
        disabled={state === 'processing' || !recognitionRef.current}
        className={cn(
          "fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out touch-manipulation",
          getButtonClass()
        )}
      >
        {getButtonIcon()}
      </Button>
  );
}
