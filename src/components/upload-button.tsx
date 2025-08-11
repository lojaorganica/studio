
"use client"

import * as React from "react"
import { Button } from "./ui/button"
import type { MediaItem } from "@/lib/media"
import { Upload } from "lucide-react"

type UploadButtonProps = {
  onUpload: (newMedia: MediaItem[]) => void;
}

export function UploadButton({ onUpload }: UploadButtonProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    const newMediaItems: Promise<MediaItem>[] = Array.from(files).map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const src = e.target?.result as string;
          const type = file.type.startsWith("video") ? "video" : "image";
          
          const newItem: MediaItem = {
            id: crypto.randomUUID(),
            src,
            type,
            alt: file.name,
            author: "Local Upload",
            fair: "Tijuca", // Default value
            style: "Fotografia", // Default value
          };
          resolve(newItem)
        }
        reader.readAsDataURL(file)
      })
    })

    Promise.all(newMediaItems).then((items) => {
      onUpload(items)
    })
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        multiple
        accept="image/*,video/*"
        className="hidden"
      />
      <Button onClick={handleClick} className="w-full" variant="outline">
        <Upload className="mr-2 h-4 w-4" />
        Enviar Mídias
      </Button>
    </>
  )
}
