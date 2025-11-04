"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Linkedin, Instagram, Users, Mail, Send } from "lucide-react"

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
  const [inquiryType, setInquiryType] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate form submission - in production, this would send to different endpoints
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Route to different email addresses based on inquiry type
      const emailRoutes = {
        investor: "invest@momm.com",
        brand: "brands@momm.com",
        contributor: "contribute@momm.com",
        general: "hello@momm.com",
      }

      console.log("Form submitted:", {
        ...formData,
        inquiryType,
        routeTo: emailRoutes[inquiryType as keyof typeof emailRoutes],
      })

      setSubmitStatus("success")
      setFormData({ name: "", email: "", message: "" })
      setInquiryType("")
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-br from-teal-50 via-orange-50 to-pink-50">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">Get in Touch</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Whether you're an investor, brand, contributor, or just curious—we'd love to hear from you.
          </p>
        </div>
      </section>

      <div className="container py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="inquiry-type">I'm interested in...</Label>
                  <Select value={inquiryType} onValueChange={setInquiryType} required>
                    <SelectTrigger id="inquiry-type">
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="investor">Investing in MOMM</SelectItem>
                      <SelectItem value="brand">Brand Partnership</SelectItem>
                      <SelectItem value="contributor">Contributing to MOMM</SelectItem>
                      <SelectItem value="general">General Inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                {submitStatus === "success" && (
                  <div className="p-4 bg-green-50 text-green-800 rounded-lg text-sm">
                    Thanks for reaching out! We'll get back to you within 48 hours.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-4 bg-red-50 text-red-800 rounded-lg text-sm">
                    Something went wrong. Please try again or email us directly.
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info & Social */}
          <div className="space-y-6">
            {/* Direct Email */}
            <Card>
              <CardHeader>
                <CardTitle>Email Us Directly</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-teal-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Investors</p>
                    <a href="mailto:invest@momm.com" className="text-sm text-primary hover:underline">
                      invest@momm.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Brand Partnerships</p>
                    <a href="mailto:brands@momm.com" className="text-sm text-primary hover:underline">
                      brands@momm.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-pink-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Contributors</p>
                    <a href="mailto:contribute@momm.com" className="text-sm text-primary hover:underline">
                      contribute@momm.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">General Inquiries</p>
                    <a href="mailto:hello@momm.com" className="text-sm text-primary hover:underline">
                      hello@momm.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
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
    </div>
  )
}
