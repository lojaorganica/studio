
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
      // Requer que o toque seja mantido por 250ms e movido menos de 5px para ativar o arrasto
      // Isto evita que o scroll da página seja confundido com um arrasto
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

  const toggleShowOnlyFavorites = () => {
    setShowOnlyFavorites(prev => !prev);
  }


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
    // Optionally scroll to top to show the new items
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowResgate = (show: boolean) => {
    setShowingResgate(show);
    // When showing resgate, ensure filters are cleared to avoid conflicts
    if(show) {
      setFilters({ fair: '', style: '' });
      setShowOnlyFavorites(false);
    }
  };


  const filteredItems = React.useMemo(() => {
    const fairKeywords: { [key: string]: string } = {
      'Tijuca': 'tijuca',
      'Grajaú': 'grajau',
      'Flamengo e Laranjeiras': 'feiras_flamengo_laranjeiras',
      'Botafogo': 'botafogo',
      'Leme': 'leme',
    };

    const styleKeywords: { [key: string]: string } = {
        'Animações de Agricultores': 'aagr',
        'Animações de Alimentos': 'aali',
        'Animações de Personagens': 'ap_',
        'Fotografia': 'fot',
        'Flyer': 'flyer',
        'Cartoon': 'cartoon',
        'Story': 'story',
        'Datas Especiais': 'especial',
        'Dias de Chuva': 'chuva',
    };

    let baseItems = items;
    if (showOnlyFavorites) {
        baseItems = items.filter(item => favoritedIds.has(item.id));
    }

    return baseItems.filter((item) => {
        const filename = item.alt.toLowerCase();

        // Se nenhum filtro estiver aplicado, mostra tudo
        if (!filters.fair && !filters.style) {
            return true;
        }

        const fairKeyword = filters.fair ? fairKeywords[filters.fair] : null;
        const styleKeyword = filters.style ? styleKeywords[filters.style] : null;

        // Regra especial para Story
        if (styleKeyword === 'story' && filters.fair) {
            if (filters.fair !== 'Flamengo e Laranjeiras') {
                // Para qualquer feira (exceto Fla/Laranjeiras) + Story, busca por "todas_feiras"
                return filename.includes('story') && filename.includes('todas_feiras');
            }
             // Se for Fla/Laranjeiras, a regra geral abaixo já funciona (procurando por feiras_flamengo_laranjeiras e story)
        }
        
        let fairFilterPassed = !filters.fair;
        if (fairKeyword) {
            fairFilterPassed = filename.includes(fairKeyword);
        }

        let styleFilterPassed = !filters.style;
        if (styleKeyword) {
            if (styleKeyword === 'ap_') {
                 styleFilterPassed = filename.startsWith('ap_') || filename.includes('ap_story') || filename.includes('as_story');
            } else {
                styleFilterPassed = filename.includes(styleKeyword);
            }
        }

        return fairFilterPassed && styleFilterPassed;
    });
  }, [items, filters, favoritedIds, showOnlyFavorites]);
  
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


  // Reset visibility when filters change
  React.useEffect(() => {
    if (!showingResgate) {
      setVisibleCount(INITIAL_VISIBLE_ITEMS);
    }
  }, [filters, showOnlyFavorites, showingResgate]);
  
  React.useEffect(() => {
    if (filters.fair || filters.style) {
      handleShowResgate(false);
    }
  }, [filters]);


  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => document.body.classList.remove('dragging')}
    >
      <div className="flex flex-col min-h-screen w-full bg-background text-foreground">
        {/* Mobile Menu */}
        <div className="md:hidden fixed top-4 left-4 z-50">
          <MobileMenu
            isOpen={isMobileMenuOpen}
            onOpenChange={setMobileMenuOpen}
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
            onShowResgate={() => handleShowResgate(true)}
          >
            <button
              className="p-2 bg-black/80 backdrop-blur-sm rounded-md"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6 text-white" />
            </button>
          </MobileMenu>
        </div>

        {/* Desktop Menu */}
        <div
          key="filter-menu-container"
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
                  <h1 className="text-3xl font-bold tracking-wider text-white">GALERIA DE ARTES - CIRCUITO CARIOCA DE FEIRAS ORGÂNICAS</h1>
                  <p className="mt-4 text-lg text-gray-300">Aqui você encontra todas as artes produzidas ao longo de mais de uma década, com apoio da organização Essência Vital, para a comunicação, propaganda e marketing de suporte às feiras orgânicas do Circuito Carioca e suas famílias de agricultores.</p>
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
                    onShowResgate={() => handleShowResgate(true)}
                  />
              </div>
          </div>
        </div>
        
        <main className="flex-1 overflow-auto pt-20 md:pt-0">
          {showingResgate ? (
            <ResgateNft onBack={() => handleShowResgate(false)} />
          ) : (
            <div className="md:pt-[24rem]">
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
