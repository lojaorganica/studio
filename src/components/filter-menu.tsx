
"use client"

import type { Dispatch, SetStateAction } from "react"
import * as React from "react"
import Image from "next/image"
import { fairs as allFairs, styles as allStyles, type MediaItem } from "@/lib/media"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

export type Filters = {
  fair: string
  style: string
}

type FilterMenuProps = {
  fairs: string[]
  styles: string[]
  filters: Filters
  onFiltersChange: Dispatch<SetStateAction<Filters>>
  columns: 1 | 2 | 3 | 4
  onColumnsChange: Dispatch<SetStateAction<1 | 2 | 3 | 4>>
  showOnlyFavorites: boolean
  onToggleFavorites: () => void
  mediaItems: MediaItem[]
  onShowResgate: () => void;
  onReturnToGallery: () => void;
}

export function FilterMenu({
  fairs,
  styles,
  filters,
  onFiltersChange,
  columns,
  onColumnsChange,
  showOnlyFavorites,
  onToggleFavorites,
  mediaItems,
  onShowResgate,
  onReturnToGallery,
}: FilterMenuProps) {

  const handleFairChange = (fair: string) => {
    onReturnToGallery();
    onFiltersChange((prevFilters) => ({
      ...prevFilters,
      fair: prevFilters.fair === fair ? '' : fair,
    }))
  }

  const handleStyleChange = (style: string) => {
    onReturnToGallery();
    onFiltersChange((prevFilters) => ({
      ...prevFilters,
      style: prevFilters.style === style ? '' : style,
    }))
  }

  const clearFairs = () => {
    onReturnToGallery();
    onFiltersChange(prev => ({ ...prev, fair: '' }))
  }
  const clearStyles = () => {
    onReturnToallGallery();
    onFiltersChange(prev => ({ ...prev, style: '' }))
  }

  const handleToggleFavorites = () => {
    onReturnToGallery();
    onToggleFavorites();
  }

  const handleColumnsChange = (num: 1 | 2 | 3 | 4) => {
    onReturnToGallery();
    onColumnsChange(num);
  }

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
  }, [columns, mediaItems]);

  const [copySuccess, setCopySuccess] = React.useState('');
  const btcAddress = "bc1qruelzl38as900axknvhkjaug0mv9s7jhmxhfzj";

  const handleCopy = () => {
    navigator.clipboard.writeText(btcAddress).then(() => {
      setCopySuccess('Copiado!');
      setTimeout(() => setCopySuccess(''), 2000); // Reset after 2 seconds
    }, (err) => {
      setCopySuccess('Falhou');
      setTimeout(() => setCopySuccess(''), 2000);
    });
  };


  return (
    <div className="text-white pt-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

        {/* Col 1: Feiras & NFT */}
        <div className="md:col-span-3">
          <h3 className="font-bold text-xl mb-4">ESCOLHA AS <span className="text-accent">FEIRAS</span></h3>
          <div className="flex flex-col">
            <button 
              onClick={clearFairs}
              className={`w-full text-left p-2 text-xl hover:bg-accent ${!filters.fair ? 'bg-accent text-accent-foreground' : ''}`}>
              Todas as Feiras
            </button>
            {fairs.map((fair) => (
              <button
                key={fair}
                onClick={() => handleFairChange(fair)}
                className={`w-full text-left p-2 text-xl hover:bg-accent ${filters.fair === fair ? 'bg-accent text-accent-foreground' : ''}`}
              >
                {fair}
              </button>
            ))}
          </div>
           <div className="mt-6">
            <h3 className="font-bold text-xl mb-4 text-left">
              RESGATE SUA <span className="text-accent">GOTA | NFT</span>
            </h3>
            <div 
              className="cursor-pointer"
              onClick={onShowResgate}
            >
              <div className="flex flex-col items-start gap-3">
                <div className="w-4/5 flex-shrink-0">
                  <Image
                    src="https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/nft_gotas%2FNFT%2001%20-%20Batatman.webp?alt=media&token=06fb6126-ab32-4a2a-8761-b9278f769956"
                    alt="NFT Batatman"
                    width={250}
                    height={250}
                    className="rounded-md object-cover w-full h-auto"
                  />
                </div>
                <p className="text-xs text-left text-gray-300">
                  Parabéns! Você encontrou uma Gota. Clique aqui e siga os passos para resgatar seu NFT exclusivo.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Col 2: Estilos */}
        <div className="md:col-span-3">
          <h3 className="font-bold text-xl mb-4">ESCOLHA OS <span className="text-accent">ESTILOS</span></h3>
           <button 
            onClick={clearStyles}
            className={`w-full text-left p-2 text-xl hover:bg-accent ${!filters.style ? 'bg-accent text-accent-foreground' : ''}`}>
            Todos os Estilos
          </button>
          {styles.map((style) => (
             <button
              key={style}
              onClick={() => handleStyleChange(style)}
              className={`w-full text-left p-2 text-xl hover:bg-accent ${filters.style === style ? 'bg-accent text-accent-foreground' : ''}`}
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
                className={cn('w-full p-2 text-xl flex items-center justify-center border-0', 
                  columns === num 
                  ? 'bg-accent text-accent-foreground' 
                  : 'bg-black hover:bg-accent'
                )}
                onClick={() => handleColumnsChange(num as 1 | 2 | 3 | 4)}
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
        </div>

        {/* Col 4: Dicas e Apoio */}
        <div className="md:col-span-3">
            <button
              onClick={handleToggleFavorites}
              className={cn(
                'w-full p-2 text-xl flex items-center justify-center mb-4 border-0',
                showOnlyFavorites
                  ? 'bg-accent text-accent-foreground'
                  : 'text-yellow-400 hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Star className="w-5 h-5 mr-2" />
              <span className="font-bold">FAVORITOS</span>
            </button>
            
           <div className="mb-4">
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
              <p className="text-sm text-gray-300 mb-2 space-y-1">
                Não aceitamos recursos públicos em nosso apoio às famílias de agricultores orgânicos. Por isso, sua doação espontânea — mesmo que pequena — é essencial para manter e desenvolver esse projeto. Contribua com alguns satoshis de BTC para o endereço abaixo. Muito obrigado!
              </p>
               <div 
                className="bg-gray-800 p-2 text-center cursor-pointer hover:bg-gray-700"
                onClick={handleCopy}
              >
                {copySuccess ? (
                    <p className="text-sm font-bold text-accent">{copySuccess}</p>
                ) : (
                    <p className="text-xs break-all">{btcAddress}</p>
                )}
              </div>
           </div>
        </div>
      </div>
      <div className="mt-4 text-right">
        <p className="text-xs text-gray-400">Powered by Marcos Melo | Essência Vital</p>
      </div>
    </div>
  )
}

    