
"use client"

import * as React from "react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Filter, Leaf, Upload, X } from "lucide-react"

import { FilterMenu, type Filters } from "@/components/filter-menu"
import { GalleryGrid } from "@/components/gallery-grid"
import { Lightbox } from "@/components/lightbox"
import { allMedia, type MediaItem } from "@/lib/media"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const INITIAL_VISIBLE_ITEMS = 12
const ITEMS_TO_LOAD = 6
const MOUSE_Y_THRESHOLD_TOP = 50
const MOUSE_Y_THRESHOLD_BOTTOM = 250

// Function to shuffle an array
const shuffleArray = (array: MediaItem[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};


export default function Home() {
  const [items, setItems] = React.useState<MediaItem[]>([]);
  
  React.useEffect(() => {
    setItems(shuffleArray(allMedia));
  }, []);

  const [columns, setColumns] = React.useState<1 | 2 | 3 | 4>(3)
  const [filters, setFilters] = React.useState<Filters>({
    fairs: new Set(),
    styles: new Set(),
  })

  const [lightboxOpen, setLightboxOpen] = React.useState(false)
  const [activeIndex, setActiveIndex] = React.useState(0)
  
  const [visibleCount, setVisibleCount] = React.useState(INITIAL_VISIBLE_ITEMS);
  const [isFilterMenuOpen, setFilterMenuOpen] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const isDesktop = window.innerWidth >= 768; // md breakpoint
      if (!isDesktop) return;

      const shouldBeOpen = event.clientY < MOUSE_Y_THRESHOLD_TOP;
      const shouldBeClosed = event.clientY > MOUSE_Y_THRESHOLD_BOTTOM;

      if (shouldBeOpen) {
        setFilterMenuOpen(true);
      } else if (shouldBeClosed) {
        setFilterMenuOpen(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

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
  
  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      handleMediaUpload(event.target.files)
    }
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
      };
      newItems.push(newItem);
    }
    setItems((prevItems) => [...newItems, ...prevItems]);
  };

  // Reset visibility when filters change
  React.useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_ITEMS);
  }, [filters]);

  const filterMenuComponent = (
    <FilterMenu
      filters={filters}
      onFiltersChange={setFilters}
      columns={columns}
      onColumnsChange={setColumns}
    />
  )

  return (
    <div className="flex min-h-screen w-full flex-col bg-black">
       <Collapsible
        open={isFilterMenuOpen}
        onOpenChange={setFilterMenuOpen}
        className="sticky top-0 z-30 flex flex-col border-b bg-black/80 backdrop-blur-sm"
      >
        <header className="flex h-16 items-center gap-4 px-4 md:px-6">
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-primary" />
              <h1 className="text-lg font-semibold tracking-wider text-foreground">
                Organic Art Gallery
              </h1>
            </div>

            <div className="ml-auto flex items-center gap-2">
              {/* Desktop filter button */}
              <div className="hidden md:block">
                  <CollapsibleTrigger asChild>
                    <Button variant="outline">
                      {isFilterMenuOpen ? <X className="mr-2 h-4 w-4" /> : <Filter className="mr-2 h-4 w-4" />}
                      Filtros
                    </Button>
                  </CollapsibleTrigger>
              </div>
              
              {/* Mobile filter button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">Filtros</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="md:hidden">
                  <div className="p-4">
                    <h2 className="text-lg font-semibold mb-4">Filtros</h2>
                    {filterMenuComponent}
                  </div>
                </SheetContent>
              </Sheet>
              
              <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  multiple
                  accept="image/*,video/*"
                />
              <Button onClick={handleUploadClick}>
                <Upload className="mr-2 h-4 w-4" />
                Carregar
              </Button>
            </div>
        </header>

          {/* Desktop Collapsible Content */}
        <CollapsibleContent className="hidden md:block border-t border-white/20">
          <div className="p-6">
            {filterMenuComponent}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <main className="flex-1 overflow-auto">
        <GalleryGrid
          items={itemsToShow}
          columns={columns}
          onItemClick={openLightbox}
          loadMore={loadMore}
          hasMore={hasMore}
        />
      </main>

      {lightboxOpen && (
        <Lightbox
          item={filteredItems[activeIndex]}
          onClose={() => setLightboxOpen(false)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </div>
  )
}
