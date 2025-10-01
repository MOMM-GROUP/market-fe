"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Linkedin, Instagram, Users } from "lucide-react"

// A simple component for social links to avoid repetition
const SocialLink = ({ href, icon: Icon, title, description }: { href: string; icon: React.ElementType; title: string; description: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-start gap-4 p-4 -m-4 rounded-lg hover:bg-muted transition-colors"
  >
    <Icon className="h-7 w-7 text-primary flex-shrink-0 mt-1" />
    <div>
      <p className="font-semibold text-base">{title}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </a>
);

export default function ContactPage() {
  return (
    <div className="min-h-[calc(100vh-10rem)] bg-background flex items-center">
      <div className="container py-12 md:py-10">
        <div className="max-w-3xl mx-auto text-center">
          
          <h1 className="text-4xl font-bold tracking-tight mb-4">Stay Connected</h1>
          <p className="text-lg text-muted-foreground mb-12">
            We're busy building the future of MOMM Market. The best way to follow our journey, get sneak peeks, and join the early community is on our social channels. Be the first to know when we go live!
          </p>

          <Card className="text-left">
            <CardHeader>
              <CardTitle>Join the Conversation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <SocialLink 
                href="https://discord.gg/PptvudG7jb"
                icon={Users}
                title="Join our Discord Server"
                description="For behind-the-scenes access, early discussions, and to connect directly with the founding team."
              />
              <SocialLink 
                href="https://www.instagram.com/mommgroupofficial/#"
                icon={Instagram}
                title="Follow on Instagram"
                description="For progress updates, sneak peeks, and to be part of our visual journey to launch."
              />
              <SocialLink 
                href="https://linkedin.com/company/momm-group"
                icon={Linkedin}
                title="Connect on LinkedIn"
                description="For official announcements, partnership inquiries, and professional updates."
              />
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}
