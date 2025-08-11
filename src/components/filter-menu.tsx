
"use client"

import type { Dispatch, SetStateAction } from "react"
import * as React from "react"
import Image from "next/image"
import { fairs, styles, type MediaItem } from "@/lib/media"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { UploadButton } from "./upload-button"

export type Filters = {
  fairs: Set<string>
  styles: Set<string>
}

type FilterMenuProps = {
  mediaItems: MediaItem[]
  filters: Filters
  onFiltersChange: Dispatch<SetStateAction<Filters>>
  columns: 1 | 2 | 3 | 4
  onColumnsChange: Dispatch<SetStateAction<1 | 2 | 3 | 4>>
  onUpload: (newMedia: MediaItem[]) => void
}

export function FilterMenu({
  mediaItems,
  filters,
  onFiltersChange,
  columns,
  onColumnsChange,
  onUpload,
}: FilterMenuProps) {

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
  
  const columnPreviews = React.useMemo(() => {
    let count = 9;
    if (columns === 1) count = 2;
    else if (columns === 2) count = 6;
    else if (columns === 3) count = 15;
    else if (columns === 4) count = 24;
    return mediaItems.slice(0, count);
  }, [columns, mediaItems]);


  return (
    <div className="text-white pt-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

        {/* Col 1: Feiras */}
        <div className="md:col-span-3">
          <h3 className="font-bold text-xl mb-4">ESCOLHA AS <span className="text-accent">FEIRAS</span></h3>
          <button 
            onClick={clearFairs}
            className={`w-full text-left p-2 text-xl hover:bg-accent ${filters.fairs.size === 0 ? 'bg-accent text-accent-foreground' : ''}`}>
            Todas as Feiras
          </button>
          {fairs.map((fair) => (
            <button
              key={fair}
              onClick={() => handleFairChange(fair)}
              className={`w-full text-left p-2 text-xl hover:bg-accent ${filters.fairs.has(fair) ? 'bg-accent text-accent-foreground' : ''}`}
            >
              {fair}
            </button>
          ))}
        </div>

        {/* Col 2: Estilos */}
        <div className="md:col-span-3">
          <h3 className="font-bold text-xl mb-4">ESCOLHA OS <span className="text-accent">ESTILOS</span></h3>
           <button 
            onClick={clearStyles}
            className={`w-full text-left p-2 text-xl hover:bg-accent ${filters.styles.size === 0 ? 'bg-accent text-accent-foreground' : ''}`}>
            Todos os Estilos
          </button>
          {styles.map((style) => (
             <button
              key={style}
              onClick={() => handleStyleChange(style)}
              className={`w-full text-left p-2 text-xl hover:bg-accent ${filters.styles.has(style) ? 'bg-accent text-accent-foreground' : ''}`}
            >
              {style}
            </button>
          ))}
        </div>

        {/* Col 3: Colunas */}
        <div className="md:col-span-3">
          <h3 className="font-bold text-xl mb-4">ESCOLHA O <span className="text-accent">N° DE COLUNAS</span></h3>
          <div className="grid grid-cols-4 gap-0 mb-4">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                className={`w-full h-10 flex items-center justify-center ${columns === num ? 'bg-accent text-accent-foreground' : 'bg-gray-700 hover:bg-gray-600'}`}
                onClick={() => onColumnsChange(num as 1 | 2 | 3 | 4)}
              >
                {num}
              </button>
            ))}
          </div>
          <div className={cn("grid gap-1", columnGridClasses[columns])}>
            {columnPreviews.map(item => (
                 <div key={item.id} className="relative aspect-square">
                    <Image
                        src={item.src}
                        alt={item.alt}
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint={item['data-ai-hint']}
                    />
                 </div>
            ))}
          </div>
        </div>

        {/* Col 4: Dicas e Apoio */}
        <div className="md:col-span-3">
           <div className="bg-gray-800 bg-opacity-50 p-4 mb-6">
              <h3 className="font-bold flex items-center mb-2 text-xl"><Star className="w-5 h-5 mr-2 text-accent" /><span className="text-accent">FAVORITOS</span></h3>
              <p className="text-sm text-gray-300 mb-2">Para adicionar ou remover mídias, edite a pasta public/media e rode npm run generate-media no terminal.</p>
               <UploadButton onUpload={onUpload} />
           </div>
           
           <div className="mb-6">
              <h3 className="font-bold text-xl mb-2"><span className="text-accent">DICAS</span></h3>
              <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                <li>Pesquise artes por feiras e estilos com a combinação de botões</li>
                <li>Arraste e solte as imagens e vídeos para organizar</li>
                <li>Faça downloads</li>
                <li>Escolha favoritos</li>
                <li>Compartilhe em suas redes para ajudar na divulgação das feiras orgânicas e fortalecer nossos agricultores familiares</li>
              </ul>
           </div>

           <div>
              <h3 className="font-bold text-xl mb-2"><span className="text-accent">APOIE ESSE PROJETO</span></h3>
              <p className="text-sm text-gray-300 mb-2">
                Não aceitamos recursos públicos em nosso apoio às famílias de agricultores orgânicos. Por isso, sua doação espontânea — mesmo que pequena — é essencial para manter e desenvolver esse projeto. Contribua com alguns satoshis de BTC para o endereço abaixo. Muito obrigado!
              </p>
              <div className="bg-gray-800 p-2 text-center">
                <p className="text-xs break-all">clqruelz138as900axknvhkjaug0mv9s7jhmxhfzj</p>
                <p className="text-sm font-bold mt-1">QR</p>
              </div>
              <p className="text-xs text-center mt-4 text-gray-400">Powered by Marcos Melo | Essência Vital</p>
           </div>
        </div>
      </div>
    </div>
  )
}
