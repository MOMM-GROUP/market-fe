"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { X, ChevronDown, Filter } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface FilterState {
  priceRange: { min: string; max: string }
  selectedCertifications: string[]
  selectedBrands: string[]
  selectedColors: string[]
  selectedMaterials: string[]
  selectedStyles: string[]
  selectedSizes: string[]
  selectedFeatures: string[]
  selectedIngredients: string[]
  selectedSubcategories: string[]
  verifiedOnly: boolean
}

interface AmazonStyleFiltersProps {
  selectedCategory: string
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  onClearFilters: () => void
}

interface Category {
  id: string
  name: string
  slug: string
  parent_id: string | null
}

interface Certification {
  id: string
  name: string
  description: string
  category: string
}

export function AmazonStyleFilters({
  selectedCategory,
  filters,
  onFiltersChange,
  onClearFilters,
}: AmazonStyleFiltersProps) {
  const [availableOptions, setAvailableOptions] = useState({
    brands: [] as string[],
    colors: [] as string[],
    materials: [] as string[],
    styles: [] as string[],
    sizes: [] as string[],
    features: [] as string[],
    ingredients: [] as string[],
  })
  const [subcategories, setSubcategories] = useState<Category[]>([])
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [openSections, setOpenSections] = useState({
    price: true,
    subcategories: true,
    certifications: false,
    brand: false,
    color: false,
    material: false,
    style: false,
    size: false,
    features: false,
    ingredients: false,
    vendor: false,
  })
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    fetchFilterOptions()
    fetchSubcategories()
    fetchCertifications()
  }, [selectedCategory])

  const fetchFilterOptions = async () => {
    setLoading(true)

    try {
      let query = supabase
        .from("products")
        .select("brand, color, material, style, size, features, ingredients, categories!inner(slug)")
        .eq("is_active", true)

      if (selectedCategory !== "all") {
        query = query.eq("categories.slug", selectedCategory)
      }

      const { data, error } = await query

      if (error) {
        console.error("Error fetching filter options:", error)
      } else {
        const options = {
          brands: new Set<string>(),
          colors: new Set<string>(),
          materials: new Set<string>(),
          styles: new Set<string>(),
          sizes: new Set<string>(),
          features: new Set<string>(),
          ingredients: new Set<string>(),
        }

        data?.forEach((product) => {
          if (product.brand) options.brands.add(product.brand)
          if (product.color) options.colors.add(product.color)
          if (product.material) options.materials.add(product.material)
          if (product.style) options.styles.add(product.style)
          if (product.size) options.sizes.add(product.size)

          if (product.features) {
            product.features.split(/[,;|\n]/).forEach((feature: string) => {
              const cleaned = feature.trim()
              if (cleaned) options.features.add(cleaned)
            })
          }

          if (product.ingredients) {
            product.ingredients.split(/[,;|\n]/).forEach((ingredient: string) => {
              const cleaned = ingredient.trim()
              if (cleaned) options.ingredients.add(cleaned)
            })
          }
        })

        setAvailableOptions({
          brands: Array.from(options.brands).sort(),
          colors: Array.from(options.colors).sort(),
          materials: Array.from(options.materials).sort(),
          styles: Array.from(options.styles).sort(),
          sizes: Array.from(options.sizes).sort(),
          features: Array.from(options.features).slice(0, 20).sort(),
          ingredients: Array.from(options.ingredients).slice(0, 20).sort(),
        })
      }
    } catch (error) {
      console.error("Error fetching filter options:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchSubcategories = async () => {
    if (selectedCategory === "all") {
      setSubcategories([])
      return
    }

    try {
      // First get the parent category
      const { data: parentCategory } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", selectedCategory)
        .single()

      if (parentCategory) {
        // Then get subcategories
        const { data: subcats } = await supabase
          .from("categories")
          .select("id, name, slug, parent_id")
          .eq("parent_id", parentCategory.id)
          .order("name")

        setSubcategories(subcats || [])
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error)
    }
  }

  const fetchCertifications = async () => {
    try {
      const { data, error } = await supabase
        .from("certifications")
        .select("id, name, description, category")
        .order("category")
        .order("name")

      if (error) {
        console.error("Error fetching certifications:", error)
      } else {
        setCertifications(data || [])
      }
    } catch (error) {
      console.error("Error fetching certifications:", error)
    }
  }

  const updateFilters = (updates: Partial<FilterState>) => {
    onFiltersChange({ ...filters, ...updates })
  }

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const handleMultiSelectChange = (field: keyof FilterState, value: string, checked: boolean) => {
    const currentValues = filters[field] as string[]
    if (checked) {
      updateFilters({ [field]: [...currentValues, value] })
    } else {
      updateFilters({ [field]: currentValues.filter((v) => v !== value) })
    }
  }

  const hasActiveFilters = Object.values(filters).some((value) =>
    Array.isArray(value) ? value.length > 0 : typeof value === "object" ? value.min || value.max : value,
  )

  const groupedCertifications = certifications.reduce(
    (acc, cert) => {
      if (!acc[cert.category]) {
        acc[cert.category] = []
      }
      acc[cert.category].push(cert)
      return acc
    },
    {} as Record<string, Certification[]>,
  )

  const FilterSection = ({
    title,
    sectionKey,
    children,
    count = 0,
  }: {
    title: string
    sectionKey: keyof typeof openSections
    children: React.ReactNode
    count?: number
  }) => (
    <Collapsible open={openSections[sectionKey]} onOpenChange={() => toggleSection(sectionKey)}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full justify-between p-0 h-auto font-medium text-left">
          <span className="flex items-center gap-2">
            {title}
            {count > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">{count}</span>
            )}
          </span>
          <ChevronDown className={`h-4 w-4 transition-transform ${openSections[sectionKey] ? "rotate-180" : ""}`} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-3">{children}</CollapsibleContent>
    </Collapsible>
  )

  const CheckboxList = ({
    options,
    selectedValues,
    field,
  }: {
    options: string[]
    selectedValues: string[]
    field: keyof FilterState
  }) => (
    <div className="space-y-2 max-h-48 overflow-y-auto">
      {options.map((option) => (
        <div key={option} className="flex items-center space-x-2">
          <Checkbox
            id={`${field}-${option}`}
            checked={selectedValues.includes(option)}
            onCheckedChange={(checked) => handleMultiSelectChange(field, option, checked as boolean)}
          />
          <Label htmlFor={`${field}-${option}`} className="text-sm cursor-pointer flex-1">
            {option}
          </Label>
        </div>
      ))}
    </div>
  )

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
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
          {/* Price Range */}
          <FilterSection title="Price" sectionKey="price">
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
          </FilterSection>

          {/* Subcategories - only show when inside a category */}
          {selectedCategory !== "all" && subcategories.length > 0 && (
            <FilterSection title="Category" sectionKey="subcategories" count={filters.selectedSubcategories.length}>
              <CheckboxList
                options={subcategories.map((sub) => sub.name)}
                selectedValues={filters.selectedSubcategories}
                field="selectedSubcategories"
              />
            </FilterSection>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <FilterSection
              title="Certifications"
              sectionKey="certifications"
              count={filters.selectedCertifications.length}
            >
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {Object.entries(groupedCertifications).map(([category, certs]) => (
                  <div key={category} className="space-y-2">
                    <h5 className="font-medium text-sm capitalize text-muted-foreground">{category}</h5>
                    <div className="space-y-2 pl-2">
                      {certs.map((cert) => (
                        <div key={cert.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={cert.id}
                            checked={filters.selectedCertifications.includes(cert.id)}
                            onCheckedChange={(checked) =>
                              handleMultiSelectChange("selectedCertifications", cert.id, checked as boolean)
                            }
                          />
                          <Label htmlFor={cert.id} className="text-sm cursor-pointer flex-1" title={cert.description}>
                            {cert.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </FilterSection>
          )}

          {/* Brand */}
          {!loading && availableOptions.brands.length > 0 && (
            <FilterSection title="Brand" sectionKey="brand" count={filters.selectedBrands.length}>
              <CheckboxList
                options={availableOptions.brands}
                selectedValues={filters.selectedBrands}
                field="selectedBrands"
              />
            </FilterSection>
          )}

          {/* Color */}
          {!loading && availableOptions.colors.length > 0 && (
            <FilterSection title="Color" sectionKey="color" count={filters.selectedColors.length}>
              <CheckboxList
                options={availableOptions.colors}
                selectedValues={filters.selectedColors}
                field="selectedColors"
              />
            </FilterSection>
          )}

          {/* Size */}
          {!loading && availableOptions.sizes.length > 0 && (
            <FilterSection title="Size" sectionKey="size" count={filters.selectedSizes.length}>
              <CheckboxList
                options={availableOptions.sizes}
                selectedValues={filters.selectedSizes}
                field="selectedSizes"
              />
            </FilterSection>
          )}

          {/* Material */}
          {!loading && availableOptions.materials.length > 0 && (
            <FilterSection title="Material" sectionKey="material" count={filters.selectedMaterials.length}>
              <CheckboxList
                options={availableOptions.materials}
                selectedValues={filters.selectedMaterials}
                field="selectedMaterials"
              />
            </FilterSection>
          )}

          {/* Style */}
          {!loading && availableOptions.styles.length > 0 && (
            <FilterSection title="Style" sectionKey="style" count={filters.selectedStyles.length}>
              <CheckboxList
                options={availableOptions.styles}
                selectedValues={filters.selectedStyles}
                field="selectedStyles"
              />
            </FilterSection>
          )}

          {/* Features */}
          {!loading && availableOptions.features.length > 0 && (
            <FilterSection title="Features" sectionKey="features" count={filters.selectedFeatures.length}>
              <CheckboxList
                options={availableOptions.features}
                selectedValues={filters.selectedFeatures}
                field="selectedFeatures"
              />
            </FilterSection>
          )}

          {/* Ingredients */}
          {!loading && availableOptions.ingredients.length > 0 && (
            <FilterSection title="Ingredients" sectionKey="ingredients" count={filters.selectedIngredients.length}>
              <CheckboxList
                options={availableOptions.ingredients}
                selectedValues={filters.selectedIngredients}
                field="selectedIngredients"
              />
            </FilterSection>
          )}

          {/* Verified Vendor */}
          <FilterSection title="Vendor" sectionKey="vendor">
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
          </FilterSection>
        </div>
      </CardContent>
    </Card>
  )
}
