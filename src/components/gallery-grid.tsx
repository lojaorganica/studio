
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
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  handleDragEnter: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  handleDragEnd: () => void;
}

export function GalleryGrid({
  items,
  columns,
  onItemClick,
  loadMore,
  hasMore,
  handleDragStart,
  handleDragEnter,
  handleDragEnd,
}: GalleryGridProps) {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  })

  React.useEffect(() => {
    if (inView && hasMore) {
      loadMore()
    }
  }, [inView, hasMore, loadMore])

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
            key={`${item.id}-${index}`}
            item={item}
            index={index}
            onClick={() => onItemClick(index)}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnter={(e) => handleDragEnter(e, index)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => e.preventDefault()}
          />
        ))}
      </div>
      <div ref={ref} className="h-20 w-full mt-10 flex justify-center items-center">
        {hasMore && (
           <Button onClick={loadMore} variant="secondary">Carregar Mais</Button>
        )}
      </div>
    </div>
  )
}
