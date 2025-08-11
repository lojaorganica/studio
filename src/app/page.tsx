
"use client"

import * as React from "react"
import { FilterMenu, type Filters } from "@/components/filter-menu"
import { GalleryGrid } from "@/components/gallery-grid"
import { Lightbox } from "@/components/lightbox"
import { allMedia, type MediaItem, fairs, styles } from "@/lib/media"
import { cn } from "@/lib/utils"

const INITIAL_VISIBLE_ITEMS = 12
const ITEMS_TO_LOAD = 6
const MOUSE_Y_THRESHOLD_TOP = 50
const TABLET_BREAKPOINT = 1024; // lg breakpoint

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
  
  const [draggingId, setDraggingId] = React.useState<string | null>(null);
  const [dragOverItemId, setDragOverItemId] = React.useState<string | null>(null);

  const [favoritedIds, setFavoritedIds] = React.useState<Set<string>>(new Set());
  const [showOnlyFavorites, setShowOnlyFavorites] = React.useState(false);
  const menuLeaveTimer = React.useRef<NodeJS.Timeout | null>(null);

  const toggleFavorite = (id: string) => {
    setFavoritedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleShowOnlyFavorites = () => {
    setShowOnlyFavorites(prev => !prev);
  }


  React.useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (window.innerWidth < TABLET_BREAKPOINT) return;
      if (event.clientY < MOUSE_Y_THRESHOLD_TOP) {
        setMenuOpen(true);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleMouseEnterMenu = () => {
    if (menuLeaveTimer.current) {
      clearTimeout(menuLeaveTimer.current);
      menuLeaveTimer.current = null;
    }
  };

  const handleMouseLeaveMenu = () => {
    menuLeaveTimer.current = setTimeout(() => {
      setMenuOpen(false);
    }, 100);
  };
  
  const handleUploadMedia = (newMediaItems: MediaItem[]) => {
    setItems(prevItems => [...newMediaItems, ...prevItems]);
    // Optionally scroll to top to show the new items
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const filteredItems = React.useMemo(() => {
    if (showOnlyFavorites) {
        return items.filter(item => favoritedIds.has(item.id));
    }
    return items.filter((item) => {
      const fairFilter = filters.fairs.size === 0 || [...filters.fairs].some(fair => item.fair.includes(fair))
      const styleFilter = filters.styles.size === 0 || filters.styles.has(item.style)
      return fairFilter && styleFilter
    })
  }, [items, filters, favoritedIds, showOnlyFavorites])
  
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
  const handleDragStart = (id: string) => {
    setDraggingId(id);
  };

  const handleDragEnter = (id: string) => {
    if (draggingId === null || draggingId === id) return;
    setDragOverItemId(id);
  };
  
  const handleDragEnd = () => {
    if (!draggingId || !dragOverItemId || draggingId === dragOverItemId) {
      setDraggingId(null);
      setDragOverItemId(null);
      return;
    }

    setItems(currentItems => {
      const dragItemIndex = currentItems.findIndex(item => item.id === draggingId);
      const hoverItemIndex = currentItems.findIndex(item => item.id === dragOverItemId);

      if (dragItemIndex === -1 || hoverItemIndex === -1) {
        return currentItems; // Should not happen
      }
      
      const newItems = [...currentItems];
      const [draggedItem] = newItems.splice(dragItemIndex, 1);
      newItems.splice(hoverItemIndex, 0, draggedItem);
      
      return newItems;
    });

    setDraggingId(null);
    setDragOverItemId(null);
  };


  // Reset visibility when filters change
  React.useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_ITEMS);
  }, [filters, showOnlyFavorites]);

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <div 
        key="filter-menu-container"
        onMouseEnter={handleMouseEnterMenu}
        onMouseLeave={handleMouseLeaveMenu}
        className={cn(
            "fixed top-0 left-0 right-0 z-50 bg-black/90 transition-transform duration-300 ease-in-out will-change-transform backdrop-blur-sm",
            isMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="pt-6 pb-6">
           <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-3xl font-bold tracking-wider text-white">PORTFÓLIO - CIRCUITO CARIOCA DE FEIRAS ORGÂNICAS</h1>
                <p className="mt-4 text-base text-gray-300">Aqui você encontra todas as artes produzidas ao longo de mais de uma década, com apoio da organização Essência Vital, para a comunicação, propaganda e marketing de suporte às feiras orgânicas do Circuito Carioca e suas famílias de agricultores.</p>
            </div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <FilterMenu
                  fairs={fairs}
                  styles={styles}
                  filters={filters}
                  onFiltersChange={setFilters}
                  columns={columns}
                  onColumnsChange={setColumns}
                  onUpload={handleUploadMedia}
                  showOnlyFavorites={showOnlyFavorites}
                  onToggleFavorites={toggleShowOnlyFavorites}
                  mediaItems={items}
                />
            </div>
        </div>
      </div>
      
      <main className="flex-1 overflow-auto pt-8">
        <GalleryGrid
          items={itemsToShow}
          columns={columns}
          onItemClick={openLightbox}
          loadMore={loadMore}
          hasMore={hasMore}
          draggingId={draggingId}
          onItemDragStart={handleDragStart}
          onItemDragEnter={handleDragEnter}
          onItemDragEnd={handleDragEnd}
          favoritedIds={favoritedIds}
          onToggleFavorite={toggleFavorite}
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
