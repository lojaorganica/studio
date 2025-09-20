
"use client"

import type { Dispatch, SetStateAction } from "react"
import * as React from "react"
import Image from "next/image"
import { Star, X } from "lucide-react"

import type { MediaItem } from "@/lib/media"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"

export type Filters = {
  fair: string
  style: string
}

type MobileMenuProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  fairs: string[]
  styles: string[]
  filters: Filters
  onFiltersChange: Dispatch<SetStateAction<Filters>>
  columns: 1 | 2 | 3 | 4
  onColumnsChange: Dispatch<SetStateAction<1 | 2 | 3 | 4>>
  onUpload: (newMedia: MediaItem[]) => void
  showOnlyFavorites: boolean
  onToggleFavorites: () => void
  mediaItems: MediaItem[]
}

export function MobileMenu({
  children,
  isOpen,
  onOpenChange,
  fairs,
  styles,
  filters,
  onFiltersChange,
  columns,
  onColumnsChange,
  onUpload,
  showOnlyFavorites,
  onToggleFavorites,
  mediaItems,
}: MobileMenuProps) {

  const handleFairChange = (fair: string) => {
    onFiltersChange((prevFilters) => ({
      ...prevFilters,
      fair: prevFilters.fair === fair ? '' : fair,
    }))
  }

  const handleStyleChange = (style: string) => {
    onFiltersChange((prevFilters) => ({
      ...prevFilters,
      style: prevFilters.style === style ? '' : style,
    }))
  }

  const clearFairs = () => onFiltersChange(prev => ({ ...prev, fair: '' }))
  const clearStyles = () => onFiltersChange(prev => ({ ...prev, style: '' }))
  
  const columnGridClasses: Record<1 | 2 | 3 | 4, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  };

  const columnPreviewsCount: Record<1 | 2 | 3 | 4, number> = {
    1: 2,
    2: 6,
    3: 15,
    4: 24
  };
  
  const columnPreviews = React.useMemo(() => {
    return mediaItems.slice(0, columnPreviewsCount[columns]).map(item => ({
      id: item.id,
      src: item.src,
      alt: item.alt,
      type: item.type
    }));
  }, [columns, mediaItems, columnPreviewsCount]);


  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="left" className="w-[85vw] max-w-sm bg-black/90 backdrop-blur-sm text-white p-4 overflow-y-auto">
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold tracking-wider text-white">PORTFÓLIO - CIRCUITO CARIOCA DE FEIRAS ORGÂNICAS</h1>
          <p className="mt-2 text-xs text-gray-300">Aqui você encontra todas as artes produzidas ao longo de mais de uma década.</p>
        </div>

        <Accordion type="multiple" defaultValue={['fairs', 'styles']} className="w-full">

          <AccordionItem value="fairs">
            <AccordionTrigger className="font-bold text-xl mb-2 text-white no-underline">
              <span className="mr-1">ESCOLHA AS</span>
              <span className="text-accent ml-1">FEIRAS</span>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col">
              <button 
                onClick={clearFairs}
                className={`w-full text-left p-2 text-lg hover:bg-accent ${!filters.fair ? 'bg-accent text-accent-foreground' : ''}`}>
                Todas as Feiras
              </button>
              {fairs.map((fair) => (
                <button
                  key={fair}
                  onClick={() => handleFairChange(fair)}
                  className={`w-full text-left p-2 text-lg hover:bg-accent ${filters.fair === fair ? 'bg-accent text-accent-foreground' : ''}`}
                >
                  {fair}
                </button>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="styles">
            <AccordionTrigger className="font-bold text-xl mb-2 text-white no-underline">
              <span className="mr-1">ESCOLHA OS</span>
              <span className="text-accent ml-1">ESTILOS</span>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col">
              <button 
                onClick={clearStyles}
                className={`w-full text-left p-2 text-lg hover:bg-accent ${!filters.style ? 'bg-accent text-accent-foreground' : ''}`}>
                Todos os Estilos
              </button>
              {styles.map((style) => (
                 <button
                  key={style}
                  onClick={() => handleStyleChange(style)}
                  className={`w-full text-left p-2 text-lg hover:bg-accent ${filters.style === style ? 'bg-accent text-accent-foreground' : ''}`}
                >
                  {style}
                </button>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="columns">
            <AccordionTrigger className="font-bold text-xl mb-2 text-white no-underline">
               <span className="mr-1">ESCOLHA O</span>
               <span className="text-accent ml-1">N° DE COLUNAS</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-4 gap-0 mb-4">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    className={cn('w-full p-2 text-xl flex items-center justify-center border-0', 
                      columns === num 
                      ? 'bg-accent text-accent-foreground' 
                      : 'bg-black hover:bg-accent'
                    )}
                    onClick={() => onColumnsChange(num as 1 | 2 | 3 | 4)}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <div className={cn("grid gap-1", columnGridClasses[columns])}>
                {columnPreviews.map((item) => (
                    <div key={item.id} className="relative aspect-square">
                        {item.type === 'image' ? (
                            <Image src={item.src} alt={item.alt} fill className="object-cover rounded bg-muted/20" />
                        ) : (
                            <video
                                src={item.src}
                                loop
                                muted
                                autoPlay
                                playsInline
                                className="w-full h-full object-cover rounded bg-muted/20"
                            />
                        )}
                    </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <div className="border-b">
            <button
              onClick={onToggleFavorites}
              className={cn(
                'flex w-full flex-1 items-center py-4 font-bold text-xl no-underline'
              )}
            >
              <span className="mr-2">MEUS</span>
              <span className={cn(showOnlyFavorites ? "text-yellow-400" : "text-accent")}>
                FAVORITOS
              </span>
              <Star
                strokeWidth={1}
                className={cn(
                  'w-5 h-5 ml-2',
                   showOnlyFavorites ? 'text-yellow-400 fill-yellow-400' : 'text-accent'
                )}
              />
            </button>
          </div>
          
          <AccordionItem value="dicas">
            <AccordionTrigger className="font-bold text-xl mb-2 text-white no-underline">
              <span className="mr-1">ALGUMAS</span>
              <span className="text-accent ml-1">DICAS</span>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-gray-300 leading-relaxed">
                Pesquise artes por feiras e estilos com a combinação de botões
                <span className="text-accent mx-1.5 font-bold">&bull;</span>
                Arraste e solte as imagens e vídeos para organizar
                <span className="text-accent mx-1.5 font-bold">&bull;</span>
                Faça downloads
                <span className="text-accent mx-1.5 font-bold">&bull;</span>
                Escolha favoritos
                <span className="text-accent mx-1.5 font-bold">&bull;</span>
                Compartilhe em suas redes para ajudar na divulgação das feiras orgânicas e fortalecer nossos agricultores familiares
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="apoio">
            <AccordionTrigger className="font-bold text-xl mb-2 text-white no-underline">
              <span className="mr-1">APOIE O</span>
              <span className="text-accent ml-1">PROJETO</span>
            </AccordionTrigger>
            <AccordionContent>
               <div>
                  <h3 className="font-bold text-lg mb-2"><span className="text-accent">APOIE ESSE PROJETO</span></h3>
                  <p className="text-sm text-gray-300 mb-2 space-y-1">
                    Sua doação espontânea é essencial. Contribua com alguns satoshis de BTC para o endereço abaixo.
                  </p>
                  <div className="bg-gray-800 p-2 text-center">
                    <p className="text-xs break-all">clqruelz138as900axknvhkjaug0mv9s7jhmxhfzj</p>
                    <p className="text-sm font-bold mt-1">QR</p>
                  </div>
                  <p className="text-xs text-center mt-4 text-gray-400">Powered by Marcos Melo | Essência Vital</p>
               </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </SheetContent>
    </Sheet>
  )
}
