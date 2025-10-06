
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, Loader2, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type AssistantState = 'idle' | 'listening' | 'processing' | 'speaking';

type AssistantButtonProps = {
  onApplyFilters: (filters: any) => void;
};

// Adicionado para compatibilidade com navegadores
interface CustomWindow extends Window {
  SpeechRecognition: typeof SpeechRecognition;
  webkitSpeechRecognition: typeof SpeechRecognition;
}
declare const window: CustomWindow;

export function AssistantButton({ onApplyFilters }: AssistantButtonProps) {
  const [state, setState] = useState<AssistantState>('idle');
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

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
        if (state === 'listening') {
          setState('idle');
        }
      };
      
      recognition.onerror = (event) => {
        console.error("Erro no reconhecimento de voz:", event.error);
        setState('idle');
      };
      
      recognitionRef.current = recognition;
    }

    audioRef.current = new Audio();

    return () => {
      recognitionRef.current?.abort();
       if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      window.speechSynthesis?.cancel();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startListening = () => {
    if (recognitionRef.current && state === 'idle') {
       window.speechSynthesis?.cancel(); 
       if (audioRef.current) {
         audioRef.current.pause();
       }
       setState('listening');
      try {
        recognitionRef.current.start();
      } catch(e) {
        console.error("Não foi possível iniciar a escuta:", e);
        setState('idle');
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && state === 'listening') {
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
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.1;

    const voices = window.speechSynthesis.getVoices();
    const brVoice = voices.find(voice => voice.lang === 'pt-BR');
    if (brVoice) {
        utterance.voice = brVoice;
    }

    utterance.onstart = () => setState('speaking');
    utterance.onend = () => setState('idle');
    utterance.onerror = (e) => {
        console.error("Erro na síntese de voz:", e);
        setState('idle');
    };
    
    window.speechSynthesis.speak(utterance);
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
        throw new Error(errorData.error || 'A resposta da rede não foi OK');
      }

      const data = await response.json();

      speak(data.text);

      if (data.filters) {
        onApplyFilters(data.filters);
      }

    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      const errorMessage = 'Desculpe, não consegui me conectar. Por favor, verifique a sua chave de API.';
      speak(errorMessage);
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
        onMouseDown={startListening}
        onMouseUp={stopListening}
        onTouchStart={startListening}
        onTouchEnd={stopListening}
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
