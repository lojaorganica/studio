
"use client"

import * as React from "react"
import { FilterMenu, type Filters } from "@/components/filter-menu"
import { GalleryGrid } from "@/components/gallery-grid"
import { Lightbox } from "@/components/lightbox"
import { allMedia, type MediaItem } from "@/lib/media"
import { cn } from "@/lib/utils"

const INITIAL_VISIBLE_ITEMS = 12
const ITEMS_TO_LOAD = 6
const MOUSE_Y_THRESHOLD_TOP = 50
const TABLET_BREAKPOINT = 768; // md breakpoint

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
  const [isMenuOpen, setMenuOpen] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)
  
  const dragItemId = React.useRef<string | null>(null);
  const dragOverItemId = React.useRef<string | null>(null);


  React.useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const isDesktopOrTablet = window.innerWidth >= TABLET_BREAKPOINT;
      if (!isDesktopOrTablet) {
        if (isMenuOpen) setMenuOpen(false);
        return;
      }

      if (event.clientY < MOUSE_Y_THRESHOLD_TOP) {
        if (!isMenuOpen) setMenuOpen(true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMenuOpen]);

  const handleMouseLeaveMenu = () => {
     setMenuOpen(false);
  };
  
  const handleUploadMedia = (newMediaItems: MediaItem[]) => {
    setItems(prevItems => [...newMediaItems, ...prevItems]);
    // Optionally scroll to top to show the new items
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const filteredItems = React.useMemo(() => {
    return items.filter((item) => {
      const fairFilter = filters.fairs.size === 0 || [...filters.fairs].some(fair => item.fair.includes(fair))
      const styleFilter = filters.styles.size === 0 || filters.styles.has(item.style)
      return fairFilter && styleFilter
    })
  }, [items, filters])
  
  const itemsToShow = React.useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount])

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
  
  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    dragItemId.current = id;
    const crt = e.currentTarget.cloneNode(true) as HTMLElement;
    crt.style.backgroundColor = 'transparent';
    crt.style.opacity = '0';
    document.body.appendChild(crt);
    e.dataTransfer.setDragImage(crt, 0, 0);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    dragOverItemId.current = id;
  };
  
  const handleDragEnd = () => {
    if (dragItemId.current === null || dragOverItemId.current === null || dragItemId.current === dragOverItemId.current) {
        dragItemId.current = null;
        dragOverItemId.current = null;
        return;
    }

    setItems(oldItems => {
        const dragItemIndex = oldItems.findIndex(item => item.id === dragItemId.current);
        const dragOverItemIndex = oldItems.findIndex(item => item.id === dragOverItemId.current);

        if (dragItemIndex === -1 || dragOverItemIndex === -1) {
            return oldItems;
        }
        
        const newItems = [...oldItems];
        const [draggedItem] = newItems.splice(dragItemIndex, 1);
        newItems.splice(dragOverItemIndex, 0, draggedItem);

        dragItemId.current = null;
        dragOverItemId.current = null;

        return newItems;
    });
  };


  // Reset visibility when filters change
  React.useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_ITEMS);
  }, [filters]);

  return (
    <div className="min-h-screen w-full bg-black">
      <div 
        ref={menuRef}
        onMouseLeave={handleMouseLeaveMenu}
        className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-transform duration-700 ease-in-out",
            isMenuOpen ? "translate-y-0" : "-translate-y-full",
            "will-change-transform"
        )}
      >
        <div className="bg-black/80 backdrop-blur-sm">
           <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 text-center">
                <h1 className="text-3xl font-bold tracking-wider text-white">PORTFÓLIO - CIRCUITO CARIOCA DE FEIRAS ORGÂNICAS</h1>
                <p className="mt-4 text-base text-gray-300">Aqui você encontra todas as artes produzidas ao longo de mais de uma década, com apoio da organização Essência Vital, para a comunicação, propaganda e marketing de suporte às feiras orgânicas do Circuito Carioca e suas famílias de agricultores.</p>
            </div>
            <div className="p-6">
              <FilterMenu
                  filters={filters}
                  onFiltersChange={setFilters}
                  columns={columns}
                  onColumnsChange={setColumns}
                  onUpload={handleUploadMedia}
                />
            </div>
        </div>
      </div>
      
      <main className="flex-1 overflow-auto pt-4">
        <GalleryGrid
          items={itemsToShow}
          columns={columns}
          onItemClick={openLightbox}
          loadMore={loadMore}
          hasMore={hasMore}
          handleDragStart={handleDragStart}
          handleDragEnter={handleDragEnter}
          handleDragEnd={handleDragEnd}
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
