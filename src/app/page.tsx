"use client"

import * as React from "react"
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { FilterMenu, type Filters } from "@/components/filter-menu"
import { GalleryGrid } from "@/components/gallery-grid"
import { Lightbox } from "@/components/lightbox"
import { allMedia, type MediaItem } from "@/lib/media"
import { Leaf } from "lucide-react"

const INITIAL_VISIBLE_ITEMS = 12
const ITEMS_TO_LOAD = 6

export default function Home() {
  const [items, setItems] = React.useState<MediaItem[]>(allMedia)
  const [columns, setColumns] = React.useState<1 | 2 | 3 | 4>(3)
  const [filters, setFilters] = React.useState<Filters>({
    fairs: new Set(),
    styles: new Set(),
  })

  const [lightboxOpen, setLightboxOpen] = React.useState(false)
  const [activeIndex, setActiveIndex] = React.useState(0)
  
  const [visibleCount, setVisibleCount] = React.useState(INITIAL_VISIBLE_ITEMS);

  const filteredItems = React.useMemo(() => {
    return items.filter((item) => {
      const fairFilter = filters.fairs.size === 0 || filters.fairs.has(item.fair)
      const styleFilter = filters.styles.size === 0 || filters.styles.has(item.style)
      return fairFilter && styleFilter
    })
  }, [items, filters])
  
  const itemsToShow = React.useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  const hasMore = visibleCount < filteredItems.length;

  const loadMore = React.useCallback(() => {
    if (hasMore) {
      setVisibleCount((prev) => prev + ITEMS_TO_LOAD)
    }
  }, [hasMore])

  const openLightbox = (index: number) => {
    const itemInFilteredList = itemsToShow[index];
    const originalIndex = filteredItems.findIndex(item => item.id === itemInFilteredList.id);
    setActiveIndex(originalIndex)
    setLightboxOpen(true)
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % filteredItems.length)
  }

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + filteredItems.length) % filteredItems.length
    )
  }

  const handleMediaUpload = (files: FileList) => {
    const newItems: MediaItem[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const newItem: MediaItem = {
        id: `${Date.now()}-${i}`,
        type: file.type.startsWith('image/') ? 'image' : 'video',
        src: URL.createObjectURL(file),
        alt: file.name,
        author: 'Local Upload',
        fair: 'Art Basel', // Default values
        style: 'Abstract', // Default values
        'data-ai-hint': 'local upload',
      };
      newItems.push(newItem);
    }
    setItems((prevItems) => [...newItems, ...prevItems]);
  };

  // Reset visibility when filters change
  React.useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_ITEMS);
  }, [filters]);

  return (
    <SidebarProvider>
      <Sidebar
        collapsible="icon"
        className="backdrop-blur-sm"
        variant="sidebar"
      >
        <FilterMenu
          filters={filters}
          onFiltersChange={setFilters}
          columns={columns}
          onColumnsChange={setColumns}
          onMediaUpload={handleMediaUpload}
        />
      </Sidebar>
      <SidebarInset>
        <div className="flex h-full flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-background/95 px-4 md:px-6 sticky top-0 z-30 backdrop-blur-sm">
            <SidebarTrigger className="flex md:hidden" />
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-primary" />
              <h1 className="text-lg font-semibold tracking-wider text-foreground">
                Organic Art Gallery
              </h1>
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            <GalleryGrid
              items={itemsToShow}
              setItems={setItems}
              columns={columns}
              onItemClick={openLightbox}
              loadMore={loadMore}
              hasMore={hasMore}
            />
          </main>
        </div>
      </SidebarInset>
      {lightboxOpen && (
        <Lightbox
          item={filteredItems[activeIndex]}
          onClose={() => setLightboxOpen(false)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </SidebarProvider>
  )
}
