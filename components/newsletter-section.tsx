"use client"

import { useState } from "react"
import { Mail, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { subscribeNewsletter } from "@/lib/api"
import { toast } from "sonner"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      toast.error("Please enter your email address")
      return
    }
    setLoading(true)
    try {
      const res = await subscribeNewsletter(email.trim())
      if (res.success) {
        setEmail("")
        toast.success(res.message ?? "Thank you for subscribing!")
      } else {
        toast.error(res.message ?? "Something went wrong")
      }
    } catch (err) {
      toast.error("Failed to subscribe. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-gradient-to-r from-red-700 to-red-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Mail className="h-10 w-10 text-red-200" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Subscribe to Our Newsletter</h2>
          <p className="text-red-100 mb-6">
            Stay updated with our latest events, projects, and humanitarian technology news.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="flex-1 bg-white/10 border-white/30 text-white placeholder:text-red-200 focus:ring-white/50"
            />
            <Button
              type="submit"
              disabled={loading}
              className="bg-white text-red-700 hover:bg-gray-100 font-semibold shrink-0"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Subscribe"
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
