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
import { fairs, styles } from "@/lib/media"

export type Filters = {
  fairs: Set<string>
  styles: Set<string>
}

type FilterMenuProps = {
  filters: Filters
  onFiltersChange: Dispatch<SetStateAction<Filters>>
  columns: 1 | 2 | 3 | 4
  onColumnsChange: Dispatch<SetStateAction<1 | 2 | 3 | 4>>
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
}: FilterMenuProps) {

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

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
            <Accordion type="multiple" defaultValue={["fairs", "styles"]} className="w-full">
              <div className="grid md:grid-cols-2 gap-x-6">
                <AccordionItem value="fairs" className="border-b-0">
                  <AccordionTrigger className="text-base font-semibold">Fairs</AccordionTrigger>
                  <AccordionContent>
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
                <AccordionItem value="styles" className="border-b-0">
                  <AccordionTrigger className="text-base font-semibold">Styles</AccordionTrigger>
                  <AccordionContent>
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
              </div>
            </Accordion>
        </div>
        <div>
          <h3 className="text-base font-semibold mb-4">Layout</h3>
          <p className="text-sm text-muted-foreground mb-4">Escolha o número de colunas.</p>
          <div className="flex justify-start items-center bg-muted p-1 rounded-lg">
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
        </div>
      </div>
       <p className="text-xs text-muted-foreground mt-6 text-center">Arraste e solte para reordenar as obras de arte.</p>
    </>
  )
}
