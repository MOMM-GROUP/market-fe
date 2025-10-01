import type React from "react";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";

// --- IMPORTS ---
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CategoryNav } from "@/components/category-nav";
import { createClient } from "@/lib/supabase/server"; 
import { Providers } from "./providers";
import type { Category, ServerSession, UserProfile } from "@/lib/types";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "MarketPlace - Multi-Vendor Platform",
  description: "Your trusted marketplace connecting customers with verified vendors worldwide",
};

// --- SERVER-SIDE DATA FETCHING FUNCTION ---
async function getNavData() {
  const supabase = await createClient();
  const { data: { user: authUser } } = await supabase.auth.getUser();

  let session: ServerSession | null = null;
  let categories: Category[] = [];

  if (authUser) {
    // IMPORTANT: Fetch the full profile now with select('*')
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", authUser.id)
      .single();

    if (profile) {
      // Create a session object that matches our new types
      session = {
        user: authUser,
        profile: { ...profile, email: authUser.email! },
      };
    }
  }

  if (!session || session.profile.role !== "vendor") {
    const { data: allCategories } = await supabase
      .from("categories")
      .select("id, name, slug, parent_id");

    if (allCategories) {
      const categoryMap = new Map<string, Category>();
      const topLevelCategories: Category[] = [];
      allCategories.forEach(category => {
        const typedCategory: Category = { ...category, subcategories: [] };
        categoryMap.set(typedCategory.id, typedCategory);
      });
      allCategories.forEach(category => {
        if (category.parent_id) {
          const parent = categoryMap.get(category.parent_id);
          if (parent) {
            const child = categoryMap.get(category.id)!;
            parent.subcategories?.push(child);
          }
        } else {
          const topLevelCat = categoryMap.get(category.id)!;
          topLevelCategories.push(topLevelCat);
        }
      });
      categories = topLevelCategories;
    }
  }
  return { user: session, categories: categories };
}

// --- THE ROOT LAYOUT COMPONENT ---
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, categories } = await getNavData();

  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} ${jetbrainsMono.variable}`}>
        {/* Use the new Providers wrapper here */}
        <Providers serverSession={user}>
          <div className="min-h-screen flex flex-col">
            <Suspense fallback={<div>Loading...</div>}>
              <Navbar />
              <CategoryNav initialUser={user ? user.profile : null} initialCategories={categories} />
              <main className="flex-1">{children}</main>
              <Footer />
            </Suspense>
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}