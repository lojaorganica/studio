
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
    1: "sm:columns-1",
    2: "sm:columns-2",
    3: "sm:columns-3",
    4: "sm:columns-4",
  }

  return (
    <div className="p-4 md:p-6">
      <div
        className={cn(
          "columns-1 gap-4 md:gap-6",
          columnClasses[columns]
        )}
      >
        {items.map((item, index) => (
          <GalleryItem
            key={item.id}
            item={item}
            isDragging={draggingId === item.id}
            onClick={() => onItemClick(index)}
            onDragStart={() => onItemDragStart(item.id)}
            onDragEnter={() => onItemDragEnter(item.id)}
            onDragEnd={onItemDragEnd}
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
