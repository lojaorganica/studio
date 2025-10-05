
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

type LightboxProps = {
  item: MediaItem
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export function Lightbox({ item, onClose, onNext, onPrev }: LightboxProps) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-full p-2 sm:p-4 bg-transparent border-0 flex flex-col md:flex-row items-center justify-center shadow-none gap-4">
        <div className="relative w-full md:w-auto flex-shrink-0">
            <div className="flex justify-center items-center">
              {item.type === "image" ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={1200}
                  height={1200}
                  data-ai-hint={item['data-ai-hint']}
                  className="max-h-[70vh] md:max-h-[85vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
                />
              ) : (
                <video
                  src={item.src}
                  controls
                  autoPlay
                  className="max-h-[70vh] md:max-h-[85vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
                />
              )}
            </div>
        </div>
        
        <div className="relative flex flex-col w-full max-w-sm md:max-w-xs self-start md:self-center text-left bg-background/80 backdrop-blur-sm p-4 rounded-lg">
           <div className="flex justify-start gap-2 mb-4">
                <Badge variant="secondary">{item.fair}</Badge>
                <Badge variant="secondary">{item.style}</Badge>
            </div>
            {item.story && (
              <ScrollArea className="h-[20vh] md:h-[60vh] w-full pr-3">
                 {item.characterName && <h2 className="text-xl font-bold mb-2 text-accent">{item.characterName}</h2>}
                 <div className="text-sm text-foreground/90 whitespace-pre-wrap space-y-3">
                  {item.story.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                 </div>
              </ScrollArea>
            )}
        </div>

         <Button
              variant="ghost"
              size="icon"
              onClick={onPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 md:left-4 bg-background/50 hover:bg-background/80 rounded-full h-10 w-10 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 md:right-4 bg-background/50 hover:bg-background/80 rounded-full h-10 w-10 z-10"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
      </DialogContent>
    </Dialog>
  )
}
