"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { X, ChevronDown, Filter } from "lucide-react"
import { getFilterConfigForCategory } from "@/lib/filter-config"
import { CertificationFilter } from "./certification-filter"
import { createClient } from "@/lib/supabase/client"

interface FilterState {
  priceRange: { min: string; max: string }
  selectedCertifications: string[]
  dimensions: string
  weightRange: { min: string; max: string }
  features: string[]
  ingredients: string[]
  verifiedOnly: boolean
}

interface DynamicProductFiltersProps {
  selectedCategory: string
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  onClearFilters: () => void
}

export function DynamicProductFilters({
  selectedCategory,
  filters,
  onFiltersChange,
  onClearFilters,
}: DynamicProductFiltersProps) {
  const [availableFeatures, setAvailableFeatures] = useState<string[]>([])
  const [availableIngredients, setAvailableIngredients] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  const filterConfig = getFilterConfigForCategory(selectedCategory)
  const supabase = createClient()

  useEffect(() => {
    fetchFilterOptions()
  }, [selectedCategory])

  const fetchFilterOptions = async () => {
    setLoading(true)

    try {
      // Fetch unique features and ingredients for the selected category
      let query = supabase
        .from("products")
        .select("features, ingredients, categories!inner(slug)")
        .eq("is_active", true)

      if (selectedCategory !== "all") {
        query = query.eq("categories.slug", selectedCategory)
      }

      const { data, error } = await query

      if (error) {
        console.error("Error fetching filter options:", error)
      } else {
        // Extract unique features
        const features = new Set<string>()
        const ingredients = new Set<string>()

        data?.forEach((product) => {
          if (product.features) {
            // Split features by common delimiters and clean up
            product.features.split(/[,;|\n]/).forEach((feature: string) => {
              const cleaned = feature.trim()
              if (cleaned) features.add(cleaned)
            })
          }

          if (product.ingredients) {
            // Split ingredients by common delimiters and clean up
            product.ingredients.split(/[,;|\n]/).forEach((ingredient: string) => {
              const cleaned = ingredient.trim()
              if (cleaned) ingredients.add(cleaned)
            })
          }
        })

        setAvailableFeatures(Array.from(features).slice(0, 20)) // Limit to top 20
        setAvailableIngredients(Array.from(ingredients).slice(0, 20)) // Limit to top 20
      }
    } catch (error) {
      console.error("Error fetching filter options:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateFilters = (updates: Partial<FilterState>) => {
    onFiltersChange({ ...filters, ...updates })
  }

  const hasActiveFilters =
    filters.priceRange.min ||
    filters.priceRange.max ||
    filters.selectedCertifications.length > 0 ||
    filters.dimensions ||
    filters.weightRange.min ||
    filters.weightRange.max ||
    filters.features.length > 0 ||
    filters.ingredients.length > 0 ||
    filters.verifiedOnly

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </h3>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onClearFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>

        <div className="space-y-6">
          {/* Price Range Filter */}
          {filterConfig.price && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Price Range</h4>
              <div className="flex gap-2">
                <Input
                  placeholder="Min"
                  type="number"
                  value={filters.priceRange.min}
                  onChange={(e) =>
                    updateFilters({
                      priceRange: { ...filters.priceRange, min: e.target.value },
                    })
                  }
                />
                <Input
                  placeholder="Max"
                  type="number"
                  value={filters.priceRange.max}
                  onChange={(e) =>
                    updateFilters({
                      priceRange: { ...filters.priceRange, max: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          )}

          {/* Certifications Filter */}
          {filterConfig.certifications && (
            <div className="space-y-3">
              <CertificationFilter
                selectedCertifications={filters.selectedCertifications}
                onCertificationChange={(certifications) => updateFilters({ selectedCertifications: certifications })}
                entityType="product"
              />
            </div>
          )}

          {/* Dimensions/Size Filter */}
          {filterConfig.dimensions && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium">
                {selectedCategory.includes("clothing") || selectedCategory.includes("shoes") ? "Size" : "Dimensions"}
              </h4>
              <Input
                placeholder={selectedCategory.includes("clothing") ? "e.g., M, L, XL" : "e.g., 10x5x3 inches"}
                value={filters.dimensions}
                onChange={(e) => updateFilters({ dimensions: e.target.value })}
              />
            </div>
          )}

          {/* Weight Range Filter */}
          {filterConfig.weight && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium">
                {selectedCategory.includes("food") || selectedCategory.includes("beverages")
                  ? "Package Size"
                  : "Weight"}
              </h4>
              <div className="flex gap-2">
                <Input
                  placeholder="Min"
                  type="number"
                  value={filters.weightRange.min}
                  onChange={(e) =>
                    updateFilters({
                      weightRange: { ...filters.weightRange, min: e.target.value },
                    })
                  }
                />
                <Input
                  placeholder="Max"
                  type="number"
                  value={filters.weightRange.max}
                  onChange={(e) =>
                    updateFilters({
                      weightRange: { ...filters.weightRange, max: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          )}

          {/* Features Filter */}
          {filterConfig.features && !loading && availableFeatures.length > 0 && (
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full justify-between bg-transparent">
                  <span>Features {filters.features.length > 0 && `(${filters.features.length})`}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 space-y-2 max-h-48 overflow-y-auto">
                {availableFeatures.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={`feature-${feature}`}
                      checked={filters.features.includes(feature)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateFilters({ features: [...filters.features, feature] })
                        } else {
                          updateFilters({ features: filters.features.filter((f) => f !== feature) })
                        }
                      }}
                    />
                    <Label htmlFor={`feature-${feature}`} className="text-sm cursor-pointer">
                      {feature}
                    </Label>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Ingredients Filter */}
          {filterConfig.ingredients && !loading && availableIngredients.length > 0 && (
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full justify-between bg-transparent">
                  <span>Ingredients {filters.ingredients.length > 0 && `(${filters.ingredients.length})`}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 space-y-2 max-h-48 overflow-y-auto">
                {availableIngredients.map((ingredient) => (
                  <div key={ingredient} className="flex items-center space-x-2">
                    <Checkbox
                      id={`ingredient-${ingredient}`}
                      checked={filters.ingredients.includes(ingredient)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateFilters({ ingredients: [...filters.ingredients, ingredient] })
                        } else {
                          updateFilters({ ingredients: filters.ingredients.filter((i) => i !== ingredient) })
                        }
                      }}
                    />
                    <Label htmlFor={`ingredient-${ingredient}`} className="text-sm cursor-pointer">
                      {ingredient}
                    </Label>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Verified Vendor Filter */}
          {filterConfig.verifiedVendor && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Vendor</h4>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="verified-only"
                  checked={filters.verifiedOnly}
                  onCheckedChange={(checked) => updateFilters({ verifiedOnly: checked as boolean })}
                />
                <Label htmlFor="verified-only" className="text-sm cursor-pointer">
                  Verified vendors only
                </Label>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
