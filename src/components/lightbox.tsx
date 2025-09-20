
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

type LightboxProps = {
  item: MediaItem
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export function Lightbox({ item, onClose, onNext, onPrev }: LightboxProps) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-full p-2 sm:p-4 bg-background/80 backdrop-blur-md border-0 flex flex-col gap-4">
        <div className="relative flex items-center justify-center">
          <div className="w-full h-full flex justify-center items-center">
            {item.type === "image" ? (
              <Image
                src={item.src}
                alt={item.alt}
                width={1200}
                height={1200}
                data-ai-hint={item['data-ai-hint']}
                className="max-h-[80vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
              />
            ) : (
              <video
                src={item.src}
                controls
                autoPlay
                className="max-h-[80vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
              />
            )}
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 md:left-4 bg-background/50 hover:bg-background/80 rounded-full h-10 w-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 md:right-4 bg-background/50 hover:bg-background/80 rounded-full h-10 w-10"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="flex justify-center gap-2">
            <Badge variant="secondary">{item.fair}</Badge>
            <Badge variant="secondary">{item.style}</Badge>
        </div>

      </DialogContent>
    </Dialog>
  )
}
