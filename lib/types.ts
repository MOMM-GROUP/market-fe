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

export interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  subcategories?: Category[];
}

// We can create a handy Session type
export interface ServerSession {
  user: User;
  profile: UserProfile;
}
}
