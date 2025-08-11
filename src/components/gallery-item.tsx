
"use client"

import * as React from "react"
import Image from "next/image"
import type { MediaItem as MediaItemType } from "@/lib/media"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Badge } from "./ui/badge"
import { Star, Share2, Download } from "lucide-react"

// Custom SVG Icons to match the reference image
const PlayIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clipRule="evenodd" />
    </svg>
);

const PauseIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM9 8.25a.75.75 0 00-.75.75v6c0 .414.336.75.75.75h.75a.75.75 0 00.75-.75V9a.75.75 0 00-.75-.75H9zm5.25 0a.75.75 0 00-.75.75v6c0 .414.336.75.75.75h.75a.75.75 0 00.75-.75V9a.75.75 0 00-.75-.75h-.75z" clipRule="evenodd" />
    </svg>
);


type GalleryItemProps = {
  item: MediaItemType
  isDragging: boolean
  onClick: () => void
  onDragStart: (id: string) => void
  onDragEnter: (id: string) => void
  onDragEnd: () => void
}

export function GalleryItem({
  item,
  isDragging,
  onClick,
  onDragStart,
  onDragEnter,
  onDragEnd,
}: GalleryItemProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = React.useState(true)
  const [isFavorited, setIsFavorited] = React.useState(false)

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    // Logic for custom drag visual
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, 1, 1);
    e.dataTransfer.setDragImage(canvas, 0, 0);
    e.dataTransfer.effectAllowed = 'move';
    document.body.classList.add("dragging");
    onDragStart(item.id);
  };
  
  const handleDragEnd = () => {
    document.body.classList.remove("dragging");
    onDragEnd();
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDragEnter(item.id);
  }

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    const video = videoRef.current
    if (video) {
      if (video.paused) {
        video.play()
        setIsPlaying(true)
      } else {
        video.pause()
        setIsPlaying(false)
      }
    }
  }

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFavorited(!isFavorited)
  }

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.alt,
          text: `Confira esta arte do Circuito Carioca de Feiras Orgânicas: ${item.alt}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Erro ao compartilhar:", error)
      }
    } else {
      alert("O compartilhamento não é suportado neste navegador.")
    }
  }

  const handleDownload = async (e: React.MouseEvent) => {
      e.stopPropagation();
      try {
          const response = await fetch(item.src);
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          const filename = item.src.split('/').pop() || item.alt.replace(/ /g, '_');
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
      } catch (error) {
          console.error("Erro ao fazer o download:", error);
          alert("Não foi possível fazer o download do arquivo.");
      }
  };

  return (
    <div
      className={cn(
        "group relative mb-4 break-inside-avoid cursor-grab",
        isDragging && "opacity-50"
      )}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragEnter={() => onDragEnter(item.id)}
    >
      <Card
        className="overflow-hidden h-full w-full transform-gpu transition-all duration-300 ease-in-out group-hover:scale-[1.02] border-0 bg-transparent"
      >
        <div
          onClick={onClick}
          className="w-full h-full cursor-pointer"
        >
          {item.type === 'image' ? (
            <Image
              src={item.src}
              alt={item.alt}
              width={600}
              height={800}
              data-ai-hint={item['data-ai-hint']}
              className="object-cover w-full h-full"
              draggable={false}
            />
          ) : (
            <video
              ref={videoRef}
              src={item.src}
              loop
              muted
              autoPlay
              playsInline
              className="object-cover w-full h-full"
              draggable={false}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
        
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Badge variant="secondary">{item.fair}</Badge>
            <Badge variant="secondary">{item.style}</Badge>
        </div>

        {/* Action Buttons Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex justify-between items-center">
            {/* Favorite Button */}
            <button
              onClick={toggleFavorite}
              className="p-2 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors focus:outline-none focus:ring-2 focus:ring-white/75 active:ring-2 active:ring-white/75"
              aria-label="Favoritar"
            >
              <Star className={cn("w-6 h-6", isFavorited ? "fill-yellow-400 text-yellow-400" : "fill-transparent")} />
            </button>

            <div className="flex items-center gap-2">
              {/* Share Button */}
              <button
                onClick={handleShare}
                className="p-2 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors focus:outline-none focus:ring-2 focus:ring-white/75 active:ring-2 active:ring-white/75"
                aria-label="Compartilhar"
              >
                <Share2 className="w-6 h-6" />
              </button>
              {/* Download Button */}
              <button
                onClick={handleDownload}
                className="p-2 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors focus:outline-none focus:ring-2 focus:ring-white/75 active:ring-2 active:ring-white/75"
                aria-label="Download"
              >
                <Download className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Play/Pause button only for videos */}
        {item.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <button
              onClick={togglePlay}
              className="p-2 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors pointer-events-auto focus:outline-none focus:ring-2 focus:ring-white/75 active:ring-2 active:ring-white/75"
              aria-label={isPlaying ? "Pausar" : "Reproduzir"}
            >
              {isPlaying ? <PauseIcon className="w-10 h-10" /> : <PlayIcon className="w-10 h-10" />}
            </button>
          </div>
        )}
      </Card>
    </div>
  )
}
