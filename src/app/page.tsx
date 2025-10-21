
"use client"

import * as React from "react"
import { DndContext, closestCenter, type DragEndEvent, useSensor, useSensors, TouchSensor, MouseSensor } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import { FilterMenu, type Filters } from "@/components/filter-menu"
import { GalleryGrid } from "@/components/gallery-grid"
import { Lightbox } from "@/components/lightbox"
import { ResgateNft } from "@/components/resgate-nft"
import { allMedia, type MediaItem, fairs, styles } from "@/lib/media"
import { cn } from "@/lib/utils"
import { MobileMenu } from "@/components/mobile-menu"
import { Menu } from "lucide-react"

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
    fair: '',
    style: '',
  })

  const [lightboxOpen, setLightboxOpen] = React.useState(false)
  const [activeIndex, setActiveIndex] = React.useState(0)
  
  const [visibleCount, setVisibleCount] = React.useState(INITIAL_VISIBLE_ITEMS);
  const [isMenuOpen, setMenuOpen] = React.useState(false)
  
  const [favoritedIds, setFavoritedIds] = React.useState<Set<string>>(new Set());
  const [showOnlyFavorites, setShowOnlyFavorites] = React.useState(false);
  const menuLeaveTimer = React.useRef<NodeJS.Timeout | null>(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  const [showingResgate, setShowingResgate] = React.useState(false);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );


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
  
  const handleReturnToGallery = () => {
    if (showingResgate) {
      setShowingResgate(false);
    }
  }

  const handleSetFilters = (newFilters: React.SetStateAction<Filters>) => {
    handleReturnToGallery();
    setFilters(newFilters);
  };
  
  const handleSetColumns = (newColumns: React.SetStateAction<1 | 2 | 3 | 4>) => {
    handleReturnToGallery();
    setColumns(newColumns);
  };
  
  const handleToggleShowOnlyFavorites = () => {
    if (favoritedIds.size === 0 && !showOnlyFavorites) return;
    handleReturnToGallery();
    setShowOnlyFavorites(prev => !prev);
  };


  React.useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (window.innerWidth < TABLET_BREAKPOINT) return;
      if (event.clientY < MOUSE_Y_THRESHOLD_TOP) {
        if (menuLeaveTimer.current) clearTimeout(menuLeaveTimer.current);
        setMenuOpen(true);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleMouseEnterMenu = () => {
    if (window.innerWidth < TABLET_BREAKPOINT) return;
    if (menuLeaveTimer.current) {
      clearTimeout(menuLeaveTimer.current);
      menuLeaveTimer.current = null;
    }
    setMenuOpen(true);
  };

  const handleMouseLeaveMenu = () => {
    if (window.innerWidth < TABLET_BREAKPOINT) return;
    menuLeaveTimer.current = setTimeout(() => {
      setMenuOpen(false);
    }, 100);
  };
  
  const handleUploadMedia = (newMediaItems: MediaItem[]) => {
    setItems(prevItems => [...newMediaItems, ...prevItems]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowResgate = (show: boolean) => {
    setShowingResgate(show);
    if(show) {
      setFilters({ fair: '', style: '' });
      setShowOnlyFavorites(false);
      setMobileMenuOpen(false);
    }
  };

  const filteredItems = React.useMemo(() => {
    const sourceItems = showOnlyFavorites
      ? items.filter(item => favoritedIds.has(item.id))
      : items;

    let results = sourceItems;

    if (filters.style) {
      results = results.filter(item => {
        if (filters.style === "Animações de Personagens") {
          return item.style === "Animações de Personagens" || item.style === "Cartoon";
        }
        if (filters.style === "Story") {
          return item.style === "Story" || item.alt.includes("story");
        }
        return item.style === filters.style;
      });
    }

    if (filters.fair) {
        const isFlaLaranjeiras = filters.fair === 'Flamengo e Laranjeiras';
        
        if (filters.style === "Animações de Personagens") {
            const fairSpecificCharacters = results.filter(item => item.fair === filters.fair);
            const genericCharacterStories = sourceItems.filter(item => 
                item.fair === 'todas_feiras' &&
                (item.alt.includes('ap_cartoon_story_todas_feiras') || item.alt.includes('ap_story_personagem_todas_feiras'))
            );
            results = [...fairSpecificCharacters, ...genericCharacterStories];
        } else {
            results = results.filter(item => {
                if (item.fair === filters.fair) return true;
                if (!isFlaLaranjeiras && item.fair === 'todas_feiras') return true;
                return false;
            });
        }
    }
    
    // Remove duplicates
    const uniqueIds = new Set<string>();
    return results.filter(item => {
      if (uniqueIds.has(item.id)) {
        return false;
      }
      uniqueIds.add(item.id);
      return true;
    });

  }, [filters, favoritedIds, showOnlyFavorites, items]);
  
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
  
  function handleDragEnd(event: DragEndEvent) {
    document.body.classList.remove('dragging');
    const {active, over} = event;

    if (over && active.id !== over.id) {
      setItems((currentItems) => {
        const oldIndex = currentItems.findIndex(item => item.id === active.id);
        const newIndex = currentItems.findIndex(item => item.id === over.id);
        return arrayMove(currentItems, oldIndex, newIndex);
      });
    }
  }

  function handleDragStart() {
    document.body.classList.add('dragging');
  }


  React.useEffect(() => {
    if (!showingResgate) {
      setVisibleCount(INITIAL_VISIBLE_ITEMS);
    }
  }, [filters, showOnlyFavorites, showingResgate]);
  

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => document.body.classList.remove('dragging')}
    >
      <div className="flex flex-col min-h-screen w-full bg-background text-foreground">
        <div className="md:hidden fixed top-4 left-4 z-50">
          <MobileMenu
            isOpen={isMobileMenuOpen}
            onOpenChange={setMobileMenuOpen}
            fairs={fairs}
            styles={styles}
            filters={filters}
            onFiltersChange={handleSetFilters}
            columns={columns}
            onColumnsChange={handleSetColumns}
            onUpload={handleUploadMedia}
            showOnlyFavorites={showOnlyFavorites}
            onToggleFavorites={handleToggleShowOnlyFavorites}
            favoritedIds={favoritedIds}
            mediaItems={items}
            onShowResgate={handleShowResgate}
          >
            <button
              className="p-2 bg-black/80 backdrop-blur-sm rounded-md"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6 text-white" />
            </button>
          </MobileMenu>
        </div>

        <header
          className={cn(
            "fixed top-0 left-0 right-0 z-40 bg-black/90 transition-transform duration-300 ease-in-out will-change-transform backdrop-blur-sm",
            "hidden md:block",
            isMenuOpen ? "translate-y-0" : "-translate-y-full"
          )}
          onMouseEnter={handleMouseEnterMenu}
          onMouseLeave={handleMouseLeaveMenu}
        >
          <div className="pt-6 pb-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                  <h1 className="text-4xl font-bold tracking-wider text-white">GALERIA ORGÂNICA - CIRCUITO CARIOCA DE FEIRAS ORGÂNICAS</h1>
                  <p className="mt-4 text-lg text-gray-300">Aqui você encontra todas as artes digitais produzidas com apoio da organização Essência Vital, ao longo de mais de uma década, para a comunicação, propaganda e marketing das feiras orgânicas do Circuito Carioca e apoio às famílias de seus agricultores.</p>
              </div>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <FilterMenu
                    fairs={fairs}
                    styles={styles}
                    filters={filters}
                    onFiltersChange={handleSetFilters}
                    columns={columns}
                    onColumnsChange={handleSetColumns}
                    showOnlyFavorites={showOnlyFavorites}
                    onToggleFavorites={handleToggleShowOnlyFavorites}
                    favoritedIds={favoritedIds}
                    mediaItems={items}
                    onShowResgate={() => handleShowResgate(true)}
                    onReturnToGallery={handleReturnToGallery}
                  />
              </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto">
          {showingResgate ? (
            <div>
              <ResgateNft onClose={handleReturnToGallery} />
            </div>
          ) : (
             <div>
                <GalleryGrid
                  items={itemsToShow}
                  columns={columns}
                  onItemClick={openLightbox}
                  loadMore={loadMore}
                  hasMore={hasMore}
                  favoritedIds={favoritedIds}
                  onToggleFavorite={toggleFavorite}
                />
             </div>
          )}
        </main>

        {lightboxOpen && !showingResgate && (
          <Lightbox
            item={filteredItems[activeIndex]}
            onClose={() => setLightboxOpen(false)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
      </div>
    </DndContext>
  )
}
