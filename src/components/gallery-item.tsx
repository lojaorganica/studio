"use client"

import * as React from "react"
import Image from "next/image"
import type { MediaItem as MediaItemType } from "@/lib/media"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Badge } from "./ui/badge"

type GalleryItemProps = {
  item: MediaItemType
  isDragging: boolean
  onClick: () => void
  onDragStart: (id: string) => void
  onDragEnter: (id: string) => void
  onDragEnd: () => void
}

export function GalleryItem({
  item,
  isDragging,
  onClick,
  onDragStart,
  onDragEnter,
  onDragEnd,
}: GalleryItemProps) {

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    // Set the drag effect to move
    e.dataTransfer.effectAllowed = 'move';
    
    // Create a transparent drag image to hide the default ghost
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, 1, 1);
    e.dataTransfer.setDragImage(canvas, 0, 0);

    // Add a global class to the body for the grabbing cursor
    document.body.classList.add("dragging");
    
    // Trigger the parent's drag start logic
    onDragStart(item.id);
  };
  
  const handleDragEnd = () => {
    // Remove the global cursor styling class
    document.body.classList.remove("dragging");
    // Trigger the parent's drag end logic
    onDragEnd();
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // This is crucial for drop to work
    onDragEnter(item.id);
  }

  return (
    <div
      className={cn(
        "group relative mb-4 break-inside-avoid cursor-grab",
        isDragging && "opacity-50"
      )}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragEnter={() => onDragEnter(item.id)}
    >
      <Card
        className="overflow-hidden h-full w-full transform-gpu transition-all duration-300 ease-in-out group-hover:scale-[1.02] border-0 bg-transparent"
      >
        <button
          onClick={onClick}
          className="w-full h-full"
          aria-label={`View details for ${item.alt}`}
          draggable={false} // Prevent button from being dragged itself
        >
          {item.type === 'image' ? (
            <Image
              src={item.src}
              alt={item.alt}
              width={600}
              height={800}
              data-ai-hint={item['data-ai-hint']}
              className="object-cover w-full h-full"
              draggable={false}
            />
          ) : (
            <video
              src={item.src}
              loop
              muted
              autoPlay
              playsInline
              className="object-cover w-full h-full"
              draggable={false}
            />
          )}

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
