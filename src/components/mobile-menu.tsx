
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
import { UploadButton } from "./upload-button"

export type Filters = {
  fairs: Set<string>
  styles: Set<string>
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
    onFiltersChange((prevFilters) => {
      const newSet = new Set(prevFilters.fairs)
      if (newSet.has(fair)) {
        newSet.delete(fair)
      } else {
        newSet.add(fair)
      }
      return { ...prevFilters, fairs: newSet }
    })
  }

  const handleStyleChange = (style: string) => {
    onFiltersChange((prevFilters) => {
      const newSet = new Set(prevFilters.styles)
      if (newSet.has(style)) {
        newSet.delete(style)
      } else {
        newSet.add(style)
      }
      return { ...prevFilters, styles: newSet }
    })
  }

  const clearFairs = () => onFiltersChange(prev => ({ ...prev, fairs: new Set() }))
  const clearStyles = () => onFiltersChange(prev => ({ ...prev, styles: new Set() }))
  
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
            <AccordionTrigger className="font-bold text-xl mb-2 text-white no-underline">ESCOLHA AS <span className="text-accent">FEIRAS</span></AccordionTrigger>
            <AccordionContent className="flex flex-col">
              <button 
                onClick={clearFairs}
                className={`w-full text-left p-2 text-lg hover:bg-accent ${filters.fairs.size === 0 ? 'bg-accent text-accent-foreground' : ''}`}>
                Todas as Feiras
              </button>
              {fairs.map((fair) => (
                <button
                  key={fair}
                  onClick={() => handleFairChange(fair)}
                  className={`w-full text-left p-2 text-lg hover:bg-accent ${filters.fairs.has(fair) ? 'bg-accent text-accent-foreground' : ''}`}
                >
                  {fair}
                </button>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="styles">
            <AccordionTrigger className="font-bold text-xl mb-2 text-white no-underline">ESCOLHA OS <span className="text-accent">ESTILOS</span></AccordionTrigger>
            <AccordionContent className="flex flex-col">
              <button 
                onClick={clearStyles}
                className={`w-full text-left p-2 text-lg hover:bg-accent ${filters.styles.size === 0 ? 'bg-accent text-accent-foreground' : ''}`}>
                Todos os Estilos
              </button>
              {styles.map((style) => (
                 <button
                  key={style}
                  onClick={() => handleStyleChange(style)}
                  className={`w-full text-left p-2 text-lg hover:bg-accent ${filters.styles.has(style) ? 'bg-accent text-accent-foreground' : ''}`}
                >
                  {style}
                </button>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="columns">
            <AccordionTrigger className="font-bold text-xl mb-2 text-white no-underline">ESCOLHA O <span className="text-accent">N° DE COLUNAS</span></AccordionTrigger>
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

          <AccordionItem value="actions">
            <AccordionTrigger className="font-bold text-xl mb-2 text-white no-underline">MAIS <span className="text-accent">OPÇÕES</span></AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4">
                <button
                  onClick={onToggleFavorites}
                  className={cn(
                    'w-full p-2 text-xl flex items-center justify-center border-0',
                    showOnlyFavorites
                      ? 'bg-accent text-accent-foreground'
                      : 'text-yellow-400 hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  <Star className="w-5 h-5 mr-2" />
                  <span className="font-bold">FAVORITOS</span>
                </button>
                <UploadButton onUpload={onUpload} />
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="info">
            <AccordionTrigger className="font-bold text-xl mb-2 text-white no-underline"><span className="text-accent">DICAS</span> & <span className="text-accent">APOIO</span></AccordionTrigger>
            <AccordionContent>
              <div className="mb-4">
                <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                  <li>Pesquise artes por feiras e estilos com a combinação de botões</li>
                  <li>Arraste e solte as imagens e vídeos para organizar</li>
                  <li>Faça downloads</li>
                  <li>Escolha favoritos</li>
                  <li>Compartilhe em suas redes para ajudar na divulgação</li>
                </ul>
              </div>

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

    