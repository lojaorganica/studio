"use client"

import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

type ChatBubbleProps = {
  role: 'user' | 'model';
  children: React.ReactNode;
  isLoading?: boolean;
};

export function ChatBubble({ role, children, isLoading = false }: ChatBubbleProps) {
  const isUser = role === 'user';

  return (
    <div className={cn(
      "flex gap-3 text-sm",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
          <Bot className="w-5 h-5 text-accent-foreground" />
        </div>
      )}
      <div className={cn(
        "rounded-lg px-3 py-2 max-w-[80%] break-words",
        isUser
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-secondary-foreground"
      )}>
        {isLoading ? (
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-current animate-pulse delay-0"></span>
            <span className="h-2 w-2 rounded-full bg-current animate-pulse delay-150"></span>
            <span className="h-2 w-2 rounded-full bg-current animate-pulse delay-300"></span>
          </div>
        ) : (
          children
        )}
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
          <User className="w-5 h-5 text-muted-foreground" />
        </div>
      )}
    </div>
  );
}
