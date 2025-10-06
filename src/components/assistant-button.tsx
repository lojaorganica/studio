"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Bot, Send, User, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatBubble } from './chat-bubble';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type Message = {
  role: 'user' | 'model';
  parts: { text: string }[];
};

export function AssistantButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', parts: [{ text: input }] };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: messages,
          message: input,
        }),
      });

      if (!response.ok) {
        throw new Error('A resposta da rede não foi OK');
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        role: 'model',
        parts: [{ text: data.text }],
      };
      setMessages((prev) => [...prev, assistantMessage]);

    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      const errorMessage: Message = {
        role: 'model',
        parts: [{ text: 'Desculpe, não consegui me conectar. Verifique se a chave de API está configurada corretamente e tente novamente. 🤖' }],
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-accent hover:bg-accent/90 shadow-lg flex items-center justify-center"
      >
        <Bot className="w-8 h-8 text-accent-foreground" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[480px] w-[90vw] h-[80vh] bg-background/90 backdrop-blur-sm flex flex-col p-0">
           <DialogHeader className="p-4 border-b border-border flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                    <Bot className="w-6 h-6 text-accent-foreground" />
                 </div>
                 <div>
                    <DialogTitle className="text-lg font-bold text-foreground">Sofia, sua assistente</DialogTitle>
                    <p className="text-xs text-muted-foreground">Online</p>
                 </div>
              </div>
              <DialogClose asChild>
                 <Button variant="ghost" size="icon" className="rounded-full">
                    <X className="w-4 h-4" />
                 </Button>
              </DialogClose>
           </DialogHeader>

          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              <ChatBubble role="model">
                Olá! Eu sou a Sofia. 🌿 Como posso te ajudar a explorar a galeria do Circuito Carioca de Feiras Orgânicas hoje?
              </ChatBubble>
              {messages.map((msg, index) => (
                <ChatBubble key={index} role={msg.role}>
                  {msg.parts[0].text}
                </ChatBubble>
              ))}
              {isLoading && (
                <ChatBubble role="model" isLoading />
              )}
            </div>
          </ScrollArea>

          <DialogFooter className="p-4 border-t border-border">
            <form onSubmit={handleSendMessage} className="w-full flex items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pergunte sobre as feiras, a arte..."
                className="flex-1 bg-input"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
