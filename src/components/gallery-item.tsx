"use client"

import Image from "next/image"
import type { MediaItem as MediaItemType } from "@/lib/media"
import { cn } from "@/lib/utils"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "./ui/badge"

type GalleryItemProps = {
  item: MediaItemType
  index: number
  onClick: () => void
  isDragging: boolean
  isDropTarget: boolean
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void
  onDragEnter: (e: React.DragEvent<HTMLDivElement>) => void
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void
}

export function GalleryItem({
  item,
  index,
  onClick,
  isDragging,
  isDropTarget,
  ...dragProps
}: GalleryItemProps) {
  return (
    <div
      draggable
      data-dragging={isDragging}
      data-drop-target={isDropTarget}
      className={cn(
        "group relative cursor-grab transition-all duration-300 ease-in-out",
        isDragging && "opacity-30 scale-95",
        isDropTarget && "ring-2 ring-offset-2 ring-primary scale-105"
      )}
      {...dragProps}
    >
      <Card
        className="overflow-hidden h-full w-full transform-gpu transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:scale-[1.02]"
      >
        <button
          onClick={onClick}
          className="w-full h-full aspect-w-1 aspect-h-1"
          aria-label={`View details for ${item.alt}`}
        >
          <Image
            src={item.src}
            alt={item.alt}
            width={600}
            height={800}
            data-ai-hint={item['data-ai-hint']}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
        <div className="absolute bottom-0 left-0 p-4 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <h3 className="font-bold text-white text-lg drop-shadow-md">{item.alt}</h3>
            <p className="text-sm text-white/80 drop-shadow-md">{item.author}</p>
        </div>
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Badge variant="secondary">{item.fair}</Badge>
            <Badge variant="secondary">{item.style}</Badge>
        </div>
      </Card>
    </div>
  )
}
