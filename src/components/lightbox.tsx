
"use client"

import Image from "next/image"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { MediaItem } from "@/lib/media"
import { Badge } from "./ui/badge"
import { ScrollArea } from "./ui/scroll-area"
import { cn } from "@/lib/utils"

type LightboxProps = {
  item: MediaItem
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export function Lightbox({ item, onClose, onNext, onPrev }: LightboxProps) {
  const isStoryWithCharacter = !!item.story;

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-none w-full h-full p-0 bg-transparent border-0 flex items-center justify-center shadow-none gap-0">
        
        {/* Main Content Wrapper */}
        <div 
          className="relative w-full h-full flex flex-col items-center justify-center pt-8 p-4"
        >
          {isStoryWithCharacter ? (
            <div className="relative flex h-full w-full max-w-7xl items-center justify-center flex-col md:flex-row md:items-start gap-8">
              {/* Media container */}
              <div className="relative flex flex-col items-center justify-center max-h-[60vh] md:h-[80vh] w-full md:w-auto">
                <div className="relative flex justify-center items-center w-full h-full">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      data-ai-hint={item['data-ai-hint']}
                      className="object-contain rounded-lg shadow-2xl"
                    />
                </div>
                <div className="flex-shrink-0 flex justify-center gap-2 py-2">
                  <Badge variant="secondary">{item.fair}</Badge>
                  <Badge variant="secondary">{item.style}</Badge>
                </div>
              </div>

              {/* Story Panel */}
              <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg w-full self-center flex-shrink-0 max-h-[30vh] md:w-80 lg:w-96 md:max-h-[80vh]">
                <ScrollArea className="h-full w-full [&>div>div[class*='bg-border']]:bg-white/20">
                  {item.characterName && <h2 className="text-xl font-bold mb-2 text-accent">{item.characterName}</h2>}
                  <div className="text-sm text-foreground/90 whitespace-pre-wrap space-y-3 pr-4">
                    {item.story!.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          ) : (
             <div className="relative flex flex-col h-full w-full max-w-7xl items-center justify-center">
                <div className="relative flex justify-center items-center w-full h-full">
                    {item.type === "image" ? (
                        <Image
                            src={item.src}
                            alt={item.alt}
                            fill
                            data-ai-hint={item['data-ai-hint']}
                            className="object-contain rounded-lg shadow-2xl"
                        />
                    ) : (
                        <video
                            src={item.src}
                            controls
                            autoPlay
                            className="max-h-full max-w-full w-auto h-auto object-contain rounded-lg shadow-2xl"
                        />
                    )}
                </div>
                <div className="flex-shrink-0 flex justify-center gap-2 py-2">
                    <Badge variant="secondary">{item.fair}</Badge>
                    <Badge variant="secondary">{item.style}</Badge>
                </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <Button
            variant="ghost"
            size="icon"
            onClick={onPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 md:left-4 bg-background/50 hover:bg-background/80 rounded-full h-10 w-10 z-50"
            aria-label="Previous image"
            >
            <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
            variant="ghost"
            size="icon"
            onClick={onNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 md:right-4 bg-background/50 hover:bg-background/80 rounded-full h-10 w-10 z-50"
            aria-label="Next image"
            >
            <ChevronRight className="h-6 w-6" />
        </Button>
        
      </DialogContent>
    </Dialog>
  )
}
