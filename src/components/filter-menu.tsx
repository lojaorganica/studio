
"use client"

import type { Dispatch, SetStateAction } from "react"
import * as React from "react"
import Image from "next/image"
import { fairs, styles, allMedia, type MediaItem } from "@/lib/media"
import { Star, Upload } from "lucide-react"
import { Button } from "./ui/button"

export type Filters = {
  fairs: Set<string>
  styles: Set<string>
}

type FilterMenuProps = {
  filters: Filters
  onFiltersChange: Dispatch<SetStateAction<Filters>>
  columns: 1 | 2 | 3 | 4
  onColumnsChange: Dispatch<SetStateAction<1 | 2 | 3 | 4>>
  onUpload: (newItems: MediaItem[]) => void
}

const columnPreviews = allMedia.slice(0, 9);

export function FilterMenu({
  filters,
  onFiltersChange,
  columns,
  onColumnsChange,
  onUpload
}: FilterMenuProps) {

  const fileInputRef = React.useRef<HTMLInputElement>(null);

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newItems: MediaItem[] = [];
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target?.result as string;
        const type = file.type.startsWith('image/') ? 'image' : 'video';
        
        const newItem: MediaItem = {
          id: `local-${Date.now()}-${Math.random()}`,
          type: type,
          src: src,
          alt: file.name,
          author: "Usuário Local",
          fair: "Tijuca", // Default or ask user
          style: "Fotografia", // Default or ask user
        };
        newItems.push(newItem);

        // When the last file is processed, update the state
        if (newItems.length === files.length) {
            onUpload(newItems);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const clearFairs = () => onFiltersChange(prev => ({ ...prev, fairs: new Set() }))
  const clearStyles = () => onFiltersChange(prev => ({ ...prev, styles: new Set() }))


  return (
    <div className="text-white pt-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

        {/* Col 1: Feiras */}
        <div className="md:col-span-2">
          <h3 className="font-bold mb-4">ESCOLHA AS FEIRAS</h3>
          <button 
            onClick={clearFairs}
            className={`w-full text-left p-2 mb-2 rounded ${filters.fairs.size === 0 ? 'bg-accent text-white' : 'hover:bg-accent/80'}`}>
            Todas as Feiras
          </button>
          {fairs.map((fair) => (
            <button
              key={fair}
              onClick={() => handleFairChange(fair)}
              className={`w-full text-left p-2 rounded ${filters.fairs.has(fair) ? 'bg-accent text-white' : 'hover:bg-accent/80'}`}
            >
              {fair}
            </button>
          ))}
        </div>

        {/* Col 2: Estilos */}
        <div className="md:col-span-2">
          <h3 className="font-bold mb-4">ESCOLHA OS ESTILOS</h3>
           <button 
            onClick={clearStyles}
            className={`w-full text-left p-2 mb-2 rounded ${filters.styles.size === 0 ? 'bg-accent text-white' : 'hover:bg-accent/80'}`}>
            Todos os Estilos
          </button>
          {styles.map((style) => (
             <button
              key={style}
              onClick={() => handleStyleChange(style)}
              className={`w-full text-left p-2 rounded ${filters.styles.has(style) ? 'bg-accent text-white' : 'hover:bg-accent/80'}`}
            >
              {style}
            </button>
          ))}
        </div>

        {/* Col 3: Colunas */}
        <div className="md:col-span-3">
          <h3 className="font-bold mb-4">ESCOLHA O N° DE COLUNAS</h3>
          <div className="flex justify-start items-center mb-4">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                className={`w-10 h-10 flex items-center justify-center rounded-md mr-2 ${columns === num ? 'bg-accent text-white' : 'bg-gray-700'}`}
                onClick={() => onColumnsChange(num as 1 | 2 | 3 | 4)}
              >
                {num}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-1">
            {columnPreviews.map(item => (
                 <div key={item.id} className="relative aspect-square">
                    <Image
                        src={item.src}
                        alt={item.alt}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                        data-ai-hint={item['data-ai-hint']}
                    />
                 </div>
            ))}
          </div>
        </div>

        {/* Col 4: Dicas e Apoio */}
        <div className="md:col-span-5">
           <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg mb-6">
              <h3 className="font-bold flex items-center mb-2"><Upload className="w-5 h-5 mr-2 text-accent" />UPLOAD DE MÍDIAS</h3>
              <p className="text-sm text-gray-300 mb-4">Carregue suas próprias imagens e vídeos para visualizá-los na galeria.</p>
               <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                multiple
                accept="image/*,video/*"
                className="hidden"
              />
              <Button onClick={() => fileInputRef.current?.click()} className="w-full bg-accent hover:bg-accent/90">
                <Upload className="w-4 h-4 mr-2" />
                Escolher Arquivos
              </Button>
           </div>
           
           <div className="mb-6">
              <h3 className="font-bold mb-2">DICAS</h3>
              <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                <li>Pesquise artes por feiras e estilos com a combinação de botões</li>
                <li>Arraste e solte as imagens e vídeos para organizar</li>
                <li>Faça downloads</li>
                <li>Escolha favoritos</li>
                <li>Compartilhe em suas redes para ajudar na divulgação das feiras orgânicas e fortalecer nossos agricultores familiares</li>
              </ul>
           </div>

           <div>
              <h3 className="font-bold mb-2">APOIE ESSE PROJETO</h3>
              <p className="text-sm text-gray-300 mb-2">
                Não aceitamos recursos públicos em nosso apoio às famílias de agricultores orgânicos. Por isso, sua doação espontânea — mesmo que pequena — é essencial para manter e desenvolver esse projeto. Contribua com alguns satoshis de BTC para o endereço abaixo. Muito obrigado!
              </p>
              <div className="bg-gray-800 p-2 rounded-md text-center">
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
