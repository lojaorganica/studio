
"use client"

import * as React from "react"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import type { MediaItem } from "@/lib/media"
import { GalleryItem } from "@/components/gallery-item"
import { Button } from "./ui/button"

type GalleryGridProps = {
  items: MediaItem[]
  columns: 1 | 2 | 3 | 4
  onItemClick: (index: number) => void
  loadMore: () => void
  hasMore: boolean
  draggingId: string | null;
  onItemDragStart: (id: string) => void;
  onItemDragEnter: (id: string) => void;
  onItemDragEnd: () => void;
  favoritedIds: Set<string>;
  onToggleFavorite: (id: string) => void;
}

export function GalleryGrid({
  items,
  columns,
  onItemClick,
  loadMore,
  hasMore,
  draggingId,
  onItemDragStart,
  onItemDragEnter,
  onItemDragEnd,
  favoritedIds,
  onToggleFavorite,
}: GalleryGridProps) {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  })

  React.useEffect(() => {
    if (inView) {
      loadMore()
    }
  }, [inView, loadMore])

  const columnClasses = {
    1: "columns-1",
    2: "columns-2",
    3: "columns-3",
    4: "columns-4",
  }

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    document.body.classList.remove("dragging");
    onItemDragEnd();
  }
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }

  return (
    <div className="p-4 md:p-6">
      <div
        className={cn(
          "gap-4 md:gap-6",
          columnClasses[columns]
        )}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {items.map((item, index) => (
          <GalleryItem
            key={item.id}
            item={item}
            isDragging={draggingId === item.id}
            onClick={() => onItemClick(index)}
            onDragStart={onItemDragStart}
            onDragEnter={onItemDragEnter}
            onDragEnd={onItemDragEnd}
            isFavorited={favoritedIds.has(item.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
       <div ref={ref} className="h-1 w-full mt-10" />
       
       {hasMore && (
        <div className="flex justify-center mt-8">
            <Button onClick={loadMore} variant="secondary" className="bg-accent hover:bg-accent/80">Carregar Mais</Button>
        </div>
       )}
    </div>
  )
}
