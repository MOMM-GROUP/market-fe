"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Linkedin, Instagram, Users } from "lucide-react"

// A simple component for social links to avoid repetition
const SocialLink = ({
  href,
  icon: Icon,
  title,
  description,
}: {
  href: string
  icon: React.ElementType
  title: string
  description: string
}) => (
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
)

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-br from-teal-50 via-orange-50 to-pink-50">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">Get in Touch</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Join our Discord community to connect with the team, ask questions, and be part of the conversation.
          </p>
        </div>
      </section>

      <div className="container py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Discord CTA */}
          <Card className="border-2 border-teal-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6 text-teal-600" />
                Join Our Discord Community
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Discord is where the real conversations happen. Connect directly with our founding team, ask questions,
                share ideas, and be part of building MOMM.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="h-4 w-4 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-semibold">For Investors</p>
                    <p className="text-sm text-muted-foreground">Ask about investment opportunities and financials</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold">For Vendors</p>
                    <p className="text-sm text-muted-foreground">Learn about selling on MOMM and partnership options</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="h-4 w-4 text-pink-600" />
                  </div>
                  <div>
                    <p className="font-semibold">For Contributors</p>
                    <p className="text-sm text-muted-foreground">
                      Explore open roles and start contributing to the platform
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold">General Inquiries</p>
                    <p className="text-sm text-muted-foreground">Ask anything about MOMM and our mission</p>
                  </div>
                </div>
              </div>

              <Button asChild size="lg" className="w-full bg-teal-600 hover:bg-teal-700">
                <a href="https://discord.gg/PptvudG7jb" target="_blank" rel="noopener noreferrer">
                  Join Discord Now
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Social Links */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Follow Our Journey</CardTitle>
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

            <Card className="bg-gradient-to-r from-teal-50 to-orange-50 border-2 border-teal-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">Why Discord?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We believe in transparent, community-driven communication. Discord allows us to have real-time
                  conversations, share updates instantly, and build together as a community.
                </p>
                <p className="text-sm text-muted-foreground">
                  No waiting for email responses—just direct access to the people building MOMM.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
