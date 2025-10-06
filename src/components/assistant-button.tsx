'use client';

import * as React from 'react';
import {Microphone} from 'lucide-react';
import {cn} from '@/lib/utils';
import {
  interpretCommand,
  type InterpretCommandInput,
} from '@/ai/flows/assistant-flow';
import {textToSpeech} from '@/ai/flows/text-to-speech-flow';
import type {Filters} from './filter-menu';

type AssistantButtonProps = {
  onFiltersChange: React.Dispatch<React.SetStateAction<Filters>>;
  currentFilters: Filters;
};

type AssistantState = 'idle' | 'listening' | 'thinking' | 'speaking';

const STATE_COLORS: Record<AssistantState, string> = {
  idle: 'bg-accent',
  listening: 'bg-red-500',
  thinking: 'bg-blue-500',
  speaking: 'bg-green-500',
};

const STATE_TEXT: Record<AssistantState, string> = {
  idle: 'Pressione para falar',
  listening: 'Ouvindo...',
  thinking: 'Processando...',
  speaking: 'Sofia está falando...',
};

export function AssistantButton({
  onFiltersChange,
  currentFilters,
}: AssistantButtonProps) {
  const [state, setState] = React.useState<AssistantState>('idle');
  const [transcript, setTranscript] = React.useState('');
  const recognitionRef = React.useRef<SpeechRecognition | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'pt-BR';

      recognition.onresult = event => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        processCommand(text);
      };

      recognition.onend = () => {
        if (state === 'listening') {
          setState('idle');
        }
      };
      
      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setState('idle');
      }

      recognitionRef.current = recognition;
    } else {
      console.warn('Speech recognition not supported in this browser.');
    }

    audioRef.current = new Audio();

    return () => {
        if (recognitionRef.current) {
            recognitionRef.current.onresult = null;
            recognitionRef.current.onend = null;
            recognitionRef.current.onerror = null;
        }
        if (audioRef.current) {
            audioRef.current.onended = null;
        }
    };
  }, [state]);

  const processCommand = async (command: string) => {
    if (!command) return;

    setState('thinking');
    try {
      const input: InterpretCommandInput = {
        command,
        currentFilters,
      };
      const {appliedFilters, responseText} = await interpretCommand(input);

      if (appliedFilters) {
        if (appliedFilters.clear) {
          onFiltersChange({fair: '', style: ''});
        } else {
          onFiltersChange(prev => ({
            fair: appliedFilters.fair !== undefined ? appliedFilters.fair : prev.fair,
            style: appliedFilters.style !== undefined ? appliedFilters.style : prev.style,
          }));
        }
      }

      const {audio} = await textToSpeech(responseText);
      speak(audio);
    } catch (error) {
      console.error('Error processing command:', error);
      setState('idle');
    }
  };

  const speak = (audioDataUri: string) => {
    if (audioRef.current) {
      setState('speaking');
      audioRef.current.src = audioDataUri;
      audioRef.current.play();
      audioRef.current.onended = () => {
        setState('idle');
      };
    }
  };

  const handleMouseDown = () => {
    if (recognitionRef.current && state === 'idle') {
      try {
        recognitionRef.current.start();
        setState('listening');
      } catch (e) {
        console.error("Error starting recognition:", e);
      }
    }
  };

  const handleMouseUp = () => {
    if (recognitionRef.current && state === 'listening') {
      recognitionRef.current.stop();
    }
  };
  
  if (!recognitionRef.current) {
    return null; // Don't render if speech recognition is not supported
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center group">
        <div className="absolute bottom-full mb-2 w-max bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {STATE_TEXT[state]}
        </div>
        <button
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            className={cn(
                'w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background',
                STATE_COLORS[state]
            )}
            disabled={state !== 'idle' && state !== 'listening'}
        >
            <Microphone className="w-8 h-8" />
        </button>
    </div>
  );
}
