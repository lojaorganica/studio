
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
  const isStoryWithCharacter = item.style === 'Story' && !!item.characterName;

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-full h-full md:h-auto md:max-h-[90vh] p-0 bg-transparent border-0 flex items-center justify-center shadow-none gap-0">
        
        {/* Main Content Area */}
        <div className={cn(
          "relative w-full h-full flex flex-col md:flex-row items-center gap-4 p-4 md:p-8",
           isStoryWithCharacter ? "justify-center" : "justify-center"
        )}>
            
            {/* Media container */}
            <div className={cn(
              "relative flex flex-col items-center justify-center w-full",
              isStoryWithCharacter ? "md:w-auto md:flex-shrink" : "h-full flex-1"
            )}>
                <div className={cn(
                    "relative flex justify-center items-center w-full",
                    isStoryWithCharacter ? "h-full md:h-auto" : "h-full"
                  )}>
                    {item.type === "image" ? (
                        <Image
                        src={item.src}
                        alt={item.alt}
                        width={1200}
                        height={1200}
                        data-ai-hint={item['data-ai-hint']}
                        className={cn(
                          "w-auto h-auto object-contain rounded-lg shadow-2xl",
                           isStoryWithCharacter 
                            ? "max-h-[50vh] md:max-h-[80vh]"
                            : "max-h-[70vh] md:max-h-[85vh]"
                        )}
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
                <div className="flex justify-center gap-2 py-2">
                    <Badge variant="secondary">{item.fair}</Badge>
                    <Badge variant="secondary">{item.style}</Badge>
                </div>
            </div>

            {/* Story Panel */}
            {item.story && (
              <div className={cn(
                  "w-full md:w-80 lg:w-96 flex-shrink-0 bg-background/80 backdrop-blur-sm p-4 rounded-lg self-center",
                  isStoryWithCharacter ? "h-[45vh] md:h-auto md:max-h-[80vh]" : "h-[35vh] md:h-auto md:max-h-[80vh]"
                )}>
                <ScrollArea className="h-full w-full">
                    {item.characterName && <h2 className="text-xl font-bold mb-2 text-accent">{item.characterName}</h2>}
                    <div className="text-sm text-foreground/90 whitespace-pre-wrap space-y-3 pr-4">
                    {item.story.split('\n\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                    </div>
                </ScrollArea>
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
