"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { getAwards } from "@/lib/api"

interface AwardItem {
  _id: string
  title: string
  year: number
  description: string
  imageUrl?: string
}

export default function AwardsPage() {
  const [awards, setAwards] = useState<AwardItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const res = await getAwards()
        if (res.success) setAwards(res.data ?? [])
        else setAwards([])
      } catch (e) {
        console.error(e)
        setAwards([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const getImageSrc = (award: AwardItem) => {
    if (award.imageUrl) return award.imageUrl
    return "/placeholder.svg"
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-red-700">Awards</span> & Recognition
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Celebrating the achievements and recognitions earned by IEEE SIGHT ISIMM
            </p>
          </div>
        </div>
      </section>

      {/* Awards Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading...</div>
          ) : awards.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No awards to display yet. Check back soon!
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {awards.map((award) => (
                <div
                  key={award._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden bg-gray-50 aspect-square">
                    <Image
                      src={getImageSrc(award)}
                      alt={award.title}
                      fill
                      className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-red-700 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {award.year}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-red-700 transition-colors duration-200">
                      {award.title}
                    </h3>
                    {award.description && (
                      <p className="text-gray-600 leading-relaxed line-clamp-3">
                        {award.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
