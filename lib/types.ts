import type { User } from "@supabase/supabase-js";

export interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  role: string;
  created_at: string;
}

export interface Certification {
  id: string
  name: string
  priority: number
  product_count: number
}

export interface HomePageClientProps {
  products: Product[]
  categories: Category[]
  certifications: Certification[]
}


export interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  subcategories?: Category[];
  image_url: string | null
}

// We can create a handy Session type
export interface ServerSession {
  user: User;
  profile: UserProfile;
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  compare_at_price: number | null
  featured_image_url: string | null
  brand: string
  category_id: string
  vendor_id: string
  is_active: boolean
  vendors: {
    business_name: string
    is_verified: boolean
  } | null
  categories: {
    name: string
    slug: string
  } | null
}

export interface ProductLink {
  id: string
  platform: string
  url: string
  price: number
  currency: string
  is_available: boolean
  last_updated: string
}
export interface WhereToBuySectionProps {
  productId: string
  className?: string
}