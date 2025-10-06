'use client';
import {useState} from 'react';
import {BotMessageSquare} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {Textarea} from '@/components/ui/textarea';
import {useToast} from '@/hooks/use-toast';
import { generateStory, type StoryInput, type StoryOutput } from '@/ai/flows/storyFlow';
import { ScrollArea } from './ui/scroll-area';

export function AssistantButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'assistant', content: string}[]>([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const {toast} = useToast();

  const handleSendMessage = async () => {
    if (!currentQuery.trim()) return;

    const userMessage = { role: 'user' as const, content: currentQuery };
    setChatHistory(prev => [...prev, userMessage]);
    setIsLoading(true);
    setCurrentQuery('');

    try {
      // For now, we'll just use a simple flow.
      // In the future, this would call a more complex conversational flow.
      const response: StoryOutput = await generateStory({ topic: currentQuery });
      const assistantMessage = { role: 'assistant' as const, content: response.story };
      setChatHistory(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error('AI Assistant Error:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with the AI assistant. Please try again later.',
      });
      // remove the user message if the call fails
      setChatHistory(prev => prev.slice(0, prev.length -1));
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          className="rounded-full w-14 h-14 bg-accent hover:bg-accent/90"
          onClick={() => setIsOpen(true)}
        >
          <BotMessageSquare className="w-7 h-7" />
          <span className="sr-only">Open AI Assistant</span>
        </Button>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] md:max-w-lg lg:max-w-2xl bg-background/80 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle>Sofia - Sua Assistente de IA</DialogTitle>
            <DialogDescription>
              Peça ajuda para encontrar artes, obter informações sobre produtos orgânicos ou dicas para os agricultores.
            </DialogDescription>
          </DialogHeader>
          <div className="h-[50vh] flex flex-col">
            <ScrollArea className="flex-1 p-4 border rounded-md mb-4 bg-background/50">
                <div className="space-y-4">
                {chatHistory.map((message, index) => (
                    <div
                    key={index}
                    className={`flex ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                    >
                    <div
                        className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg p-3 ${
                        message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                    >
                        <p className="text-sm">{message.content}</p>
                    </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="max-w-xs md:max-w-md lg:max-w-lg rounded-lg p-3 bg-muted text-muted-foreground">
                            <p className="text-sm animate-pulse">Sofia está a pensar...</p>
                        </div>
                    </div>
                )}
                </div>
            </ScrollArea>
            <div className="flex gap-2">
                 <Textarea
                    placeholder="Escreva a sua mensagem..."
                    value={currentQuery}
                    onChange={(e) => setCurrentQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                        }
                    }}
                    className="flex-1"
                    disabled={isLoading}
                />
                <Button onClick={handleSendMessage} disabled={isLoading}>
                    Enviar
                </Button>
            </div>
          </div>
          <DialogFooter>
             <p className="text-xs text-muted-foreground/50">Powered by Essência Vital & Google AI</p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
