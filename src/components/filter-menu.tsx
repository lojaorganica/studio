"use client"

import type { Dispatch, SetStateAction } from "react"
import * as React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarFooter
} from "@/components/ui/sidebar"
import { fairs, styles } from "@/lib/media"
import { Leaf, Upload } from "lucide-react"

export type Filters = {
  fairs: Set<string>
  styles: Set<string>
}

type FilterMenuProps = {
  filters: Filters
  onFiltersChange: Dispatch<SetStateAction<Filters>>
  columns: 1 | 2 | 3 | 4
  onColumnsChange: Dispatch<SetStateAction<1 | 2 | 3 | 4>>
  onMediaUpload: (files: FileList) => void
}

function ColumnIcon({ columns, active }: { columns: number, active: boolean }) {
  return (
    <div className="flex h-8 w-8 items-center justify-center gap-0.5">
      {Array.from({ length: columns }).map((_, i) => (
        <div key={i} className={`h-5/6 w-1 rounded-sm ${active ? 'bg-primary-foreground' : 'bg-muted-foreground'}`} />
      ))}
    </div>
  )
}

export function FilterMenu({
  filters,
  onFiltersChange,
  columns,
  onColumnsChange,
  onMediaUpload,
}: FilterMenuProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleFilterChange = (
    category: "fairs" | "styles",
    value: string,
    checked: boolean
  ) => {
    onFiltersChange((prevFilters) => {
      const newSet = new Set(prevFilters[category])
      if (checked) {
        newSet.add(value)
      } else {
        newSet.delete(value)
      }
      return { ...prevFilters, [category]: newSet }
    })
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onMediaUpload(event.target.files)
    }
  }

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-semibold tracking-wider text-sidebar-foreground">
                Organic Art Gallery
            </h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="px-4 mb-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            multiple
            accept="image/*,video/*"
          />
          <Button onClick={handleUploadClick} className="w-full">
            <Upload className="mr-2 h-4 w-4" />
            Carregar Mídias
          </Button>
        </div>
        <Accordion type="multiple" defaultValue={["fairs", "styles", "layout"]} className="w-full">
          <AccordionItem value="fairs">
            <AccordionTrigger className="px-4 text-base font-semibold">Fairs</AccordionTrigger>
            <AccordionContent className="px-4">
              <div className="grid gap-2">
                {fairs.map((fair) => (
                  <div key={fair} className="flex items-center gap-2">
                    <Checkbox
                      id={`fair-${fair}`}
                      checked={filters.fairs.has(fair)}
                      onCheckedChange={(checked) =>
                        handleFilterChange("fairs", fair, !!checked)
                      }
                    />
                    <Label htmlFor={`fair-${fair}`} className="cursor-pointer font-normal">
                      {fair}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="styles">
            <AccordionTrigger className="px-4 text-base font-semibold">Styles</AccordionTrigger>
            <AccordionContent className="px-4">
              <div className="grid gap-2">
                {styles.map((style) => (
                  <div key={style} className="flex items-center gap-2">
                    <Checkbox
                      id={`style-${style}`}
                      checked={filters.styles.has(style)}
                      onCheckedChange={(checked) =>
                        handleFilterChange("styles", style, !!checked)
                      }
                    />
                    <Label htmlFor={`style-${style}`} className="cursor-pointer font-normal">
                      {style}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="layout">
            <AccordionTrigger className="px-4 text-base font-semibold">Layout</AccordionTrigger>
            <AccordionContent className="px-4">
                <p className="text-sm text-muted-foreground mb-4">Choose the number of columns to display in the gallery.</p>
                <div className="flex justify-around items-center bg-muted p-1 rounded-lg">
                    {[1, 2, 3, 4].map((num) => (
                        <Button
                            key={num}
                            variant={columns === num ? 'primary' : 'ghost'}
                            size="icon"
                            className="w-14 h-14 flex flex-col items-center gap-1"
                            onClick={() => onColumnsChange(num as 1 | 2 | 3 | 4)}
                        >
                            <ColumnIcon columns={num} active={columns === num} />
                            <span className="text-xs">{num}</span>
                        </Button>
                    ))}
                </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </SidebarContent>
      <SidebarFooter>
         <p className="text-xs text-sidebar-foreground/50 px-4 text-center">Drag and drop to reorder artworks.</p>
      </SidebarFooter>
    </>
  )
}
