"use client"

import type { Dispatch, SetStateAction } from "react"
import * as React from "react"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import type { MediaItem } from "@/lib/media"
import { GalleryItem } from "@/components/gallery-item"
import { Skeleton } from "./ui/skeleton"

type GalleryGridProps = {
  items: MediaItem[]
  setItems: Dispatch<SetStateAction<MediaItem[]>>
  columns: 1 | 2 | 3 | 4
  onItemClick: (index: number) => void
  loadMore: () => void
  hasMore: boolean
}

export function GalleryGrid({
  items,
  setItems,
  columns,
  onItemClick,
  loadMore,
  hasMore,
}: GalleryGridProps) {
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null)
  const [dropIndex, setDropIndex] = React.useState<number | null>(null)

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  })

  React.useEffect(() => {
    if (inView && hasMore) {
      loadMore()
    }
  }, [inView, hasMore, loadMore])

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragEnter = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault()
    if (index !== draggedIndex) {
      setDropIndex(index)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    setDropIndex(null)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault()
    if (draggedIndex === null) return

    setItems((prevItems) => {
      const newItems = [...prevItems]
      const [draggedItem] = newItems.splice(draggedIndex, 1)
      newItems.splice(index, 0, draggedItem)
      return newItems
    })
    setDraggedIndex(null)
    setDropIndex(null)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
    setDropIndex(null)
  }

  const gridClasses = {
    1: "grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-3 lg:grid-cols-4",
  }

  return (
    <div className="p-4 md:p-6">
      <div
        className={cn(
          "grid gap-4 md:gap-6",
          gridClasses[columns],
          "grid-cols-1"
        )}
        onDragOver={handleDragOver}
      >
        {items.map((item, index) => (
          <GalleryItem
            key={`${item.id}-${index}`}
            item={item}
            index={index}
            onClick={() => onItemClick(index)}
            isDragging={draggedIndex === index}
            isDropTarget={dropIndex === index}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnter={(e) => handleDragEnter(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
          />
        ))}
      </div>
      <div ref={ref} className="h-10 w-full mt-6">
        {hasMore && (
           <div className={cn("grid gap-4 md:gap-6", gridClasses[columns], "grid-cols-1")}>
            {Array.from({ length: columns }).map((_, i) => (
                <Skeleton key={i} className="h-64 w-full" />
            ))}
           </div>
        )}
      </div>
    </div>
  )
}
