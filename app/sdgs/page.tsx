"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Globe, Target, Heart, Users, Leaf, Droplets, Zap, BookOpen, Scale, Home, TreePine, Fish, Mountain, Sun, Wind, Shield } from "lucide-react"

interface SDG {
  id: number
  title: string
  shortTitle: string
  description: string
  color: string
  icon: React.ComponentType<any>
  image: string
  targets: string[]
  technologyImpact: string
}

const sdgs: SDG[] = [
  {
    id: 1,
    title: "No Poverty",
    shortTitle: "End poverty in all its forms everywhere",
    description: "End poverty in all its forms everywhere. More than 700 million people still live in extreme poverty and are struggling to fulfill the most basic needs like health, education, and access to water and sanitation.",
    color: "from-red-500 to-red-700",
    icon: Heart,
    image: "/images/sdgs/sdg1.png",
    targets: ["Eradicate extreme poverty", "Reduce poverty by at least 50%", "Implement social protection systems"],
    technologyImpact: "Digital financial services, mobile banking, and e-commerce platforms help provide financial inclusion and economic opportunities for the poor."
  },
  {
    id: 2,
    title: "Zero Hunger",
    shortTitle: "End hunger, achieve food security and improved nutrition",
    description: "End hunger, achieve food security and improved nutrition and promote sustainable agriculture. Hunger is the leading cause of death in the world.",
    color: "from-orange-500 to-orange-700",
    icon: Leaf,
    image: "/images/sdgs/sdg2.png",
    targets: ["End hunger and malnutrition", "Double agricultural productivity", "Ensure sustainable food production"],
    technologyImpact: "Precision agriculture, IoT sensors, and AI-powered crop monitoring systems optimize food production and reduce waste."
  },
  {
    id: 3,
    title: "Good Health and Well-being",
    shortTitle: "Ensure healthy lives and promote well-being for all",
    description: "Ensure healthy lives and promote well-being for all at all ages. Health is fundamental to human development and well-being.",
    color: "from-green-500 to-green-700",
    icon: Heart,
    image: "/images/sdgs/sdg3.png",
    targets: ["Reduce maternal mortality", "End preventable deaths", "Achieve universal health coverage"],
    technologyImpact: "Telemedicine, mobile health apps, and AI diagnostics improve healthcare access in remote areas."
  },
  {
    id: 4,
    title: "Quality Education",
    shortTitle: "Ensure inclusive and equitable quality education",
    description: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all. Education is the foundation for improving people's lives and sustainable development.",
    color: "from-red-500 to-red-700",
    icon: BookOpen,
    image: "/images/sdgs/sdg4.png",
    targets: ["Ensure free primary and secondary education", "Increase number of qualified teachers", "Eliminate gender disparities"],
    technologyImpact: "E-learning platforms, virtual reality classrooms, and educational apps provide access to quality education anywhere."
  },
  {
    id: 5,
    title: "Gender Equality",
    shortTitle: "Achieve gender equality and empower all women and girls",
    description: "Achieve gender equality and empower all women and girls. Gender equality is not only a fundamental human right, but a necessary foundation for a peaceful, prosperous and sustainable world.",
    color: "from-pink-500 to-pink-700",
    icon: Users,
    image: "/images/sdgs/sdg5.png",
    targets: ["End discrimination against women", "Ensure equal participation", "Enhance use of enabling technology"],
    technologyImpact: "Digital platforms and mobile apps empower women with access to information, education, and economic opportunities."
  },
  {
    id: 6,
    title: "Clean Water and Sanitation",
    shortTitle: "Ensure availability and sustainable management of water",
    description: "Ensure availability and sustainable management of water and sanitation for all. Water scarcity affects more than 40 percent of people globally.",
    color: "from-blue-500 to-blue-700",
    icon: Droplets,
    image: "/images/sdgs/sdg6.png",
    targets: ["Achieve universal access to safe drinking water", "Improve water quality", "Increase water-use efficiency"],
    technologyImpact: "Smart water management systems, IoT sensors, and water purification technologies ensure clean water access."
  },
  {
    id: 7,
    title: "Affordable and Clean Energy",
    shortTitle: "Ensure access to affordable, reliable, sustainable energy",
    description: "Ensure access to affordable, reliable, sustainable and modern energy for all. Energy is central to nearly every major challenge and opportunity.",
    color: "from-yellow-500 to-yellow-700",
    icon: Zap,
    image: "/images/sdgs/sdg7.png",
    targets: ["Ensure universal access to energy", "Increase renewable energy share", "Improve energy efficiency"],
    technologyImpact: "Solar panels, smart grids, and energy storage solutions provide clean, affordable energy to communities."
  },
  {
    id: 8,
    title: "Decent Work and Economic Growth",
    shortTitle: "Promote sustained, inclusive and sustainable economic growth",
    description: "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all. Economic growth should be a positive force for the whole planet.",
    color: "from-red-500 to-red-700",
    icon: Target,
    image: "/images/sdgs/sdg8.png",
    targets: ["Sustain per capita economic growth", "Achieve higher levels of productivity", "Promote development-oriented policies"],
    technologyImpact: "Digital platforms, e-commerce, and automation create new job opportunities and improve productivity."
  },
  {
    id: 9,
    title: "Industry, Innovation and Infrastructure",
    shortTitle: "Build resilient infrastructure, promote sustainable industrialization",
    description: "Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation. Investment in infrastructure and innovation are crucial drivers of economic growth and development.",
    color: "from-orange-500 to-orange-700",
    icon: Zap,
    image: "/images/sdgs/sdg9.png",
    targets: ["Develop quality infrastructure", "Promote inclusive industrialization", "Enhance scientific research"],
    technologyImpact: "3D printing, IoT, and smart manufacturing technologies drive innovation and sustainable industrialization."
  },
  {
    id: 10,
    title: "Reduced Inequalities",
    shortTitle: "Reduce inequality within and among countries",
    description: "Reduce inequality within and among countries. The international community has made significant strides towards lifting people out of poverty.",
    color: "from-red-500 to-red-700",
    icon: Scale,
    image: "/images/sdgs/sdg10.png",
    targets: ["Achieve income growth for bottom 40%", "Promote social inclusion", "Ensure equal opportunities"],
    technologyImpact: "Digital platforms and mobile technologies bridge gaps and provide equal access to opportunities."
  },
  {
    id: 11,
    title: "Sustainable Cities and Communities",
    shortTitle: "Make cities and human settlements inclusive, safe, resilient",
    description: "Make cities and human settlements inclusive, safe, resilient and sustainable. Cities are hubs for ideas, commerce, culture, science, productivity, social development and much more.",
    color: "from-yellow-500 to-yellow-700",
    icon: Home,
    image: "/images/sdgs/sdg11.png",
    targets: ["Ensure access to adequate housing", "Provide sustainable transport systems", "Reduce environmental impact"],
    technologyImpact: "Smart city technologies, IoT sensors, and data analytics create sustainable, efficient urban environments."
  },
  {
    id: 12,
    title: "Responsible Consumption and Production",
    shortTitle: "Ensure sustainable consumption and production patterns",
    description: "Ensure sustainable consumption and production patterns. Sustainable consumption and production is about doing more and better with less.",
    color: "from-yellow-500 to-yellow-700",
    icon: Leaf,
    image: "/images/sdgs/sdg12.png",
    targets: ["Achieve sustainable management of natural resources", "Halve per capita food waste", "Ensure sustainable practices"],
    technologyImpact: "Circular economy technologies, waste tracking systems, and sustainable supply chain solutions reduce environmental impact."
  },
  {
    id: 13,
    title: "Climate Action",
    shortTitle: "Take urgent action to combat climate change and its impacts",
    description: "Take urgent action to combat climate change and its impacts. Climate change is now affecting every country on every continent.",
    color: "from-green-500 to-green-700",
    icon: TreePine,
    image: "/images/sdgs/sdg13.png",
    targets: ["Strengthen resilience to climate hazards", "Integrate climate measures into policies", "Improve education and awareness"],
    technologyImpact: "Renewable energy technologies, carbon capture systems, and climate monitoring tools combat climate change."
  },
  {
    id: 14,
    title: "Life Below Water",
    shortTitle: "Conserve and sustainably use the oceans, seas and marine resources",
    description: "Conserve and sustainably use the oceans, seas and marine resources for sustainable development. The world's oceans drive global systems that make the Earth habitable for humankind.",
    color: "from-blue-500 to-blue-700",
    icon: Fish,
    image: "/images/sdgs/sdg14.png",
    targets: ["Prevent marine pollution", "Protect marine ecosystems", "Regulate harvesting and end overfishing"],
    technologyImpact: "Ocean monitoring systems, sustainable fishing technologies, and marine conservation tools protect ocean health."
  },
  {
    id: 15,
    title: "Life on Land",
    shortTitle: "Protect, restore and promote sustainable use of terrestrial ecosystems",
    description: "Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss.",
    color: "from-green-500 to-green-700",
    icon: Mountain,
    image: "/images/sdgs/sdg15.png",
    targets: ["Conserve terrestrial ecosystems", "Combat desertification", "Halt biodiversity loss"],
    technologyImpact: "Satellite monitoring, AI-powered conservation tools, and sustainable land management technologies protect ecosystems."
  },
  {
    id: 16,
    title: "Peace, Justice and Strong Institutions",
    shortTitle: "Promote peaceful and inclusive societies for sustainable development",
    description: "Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels.",
    color: "from-blue-500 to-blue-700",
    icon: Shield,
    image: "/images/sdgs/sdg16.png",
    targets: ["Reduce violence and related death rates", "End abuse and exploitation", "Develop effective institutions"],
    technologyImpact: "Digital governance platforms, transparency tools, and justice system technologies promote peace and accountability."
  },
  {
    id: 17,
    title: "Partnerships for the Goals",
    shortTitle: "Strengthen the means of implementation and revitalize partnerships",
    description: "Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development. A successful sustainable development agenda requires partnerships between governments, the private sector and civil society.",
    color: "from-blue-500 to-blue-700",
    icon: Globe,
    image: "/images/sdgs/sdg17.png",
    targets: ["Mobilize financial resources", "Enhance technology cooperation", "Promote effective partnerships"],
    technologyImpact: "Digital collaboration platforms, knowledge sharing networks, and global partnerships accelerate SDG implementation."
  }
]

export default function SDGsPage() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll(".animate-on-scroll")
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Sustainable Development <span className="text-red-700">Goals</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Discover the 17 Sustainable Development Goals.
            </p>
          </div>
        </div>
      </section>

      {/* SDGs Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sdgs.map((sdg) => (
              <div
                key={sdg.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 animate-on-scroll overflow-hidden border border-gray-100"
              >
                {/* SDG Number Badge */}
                <div className="relative">
                  <div className={`absolute top-4 left-4 z-10 bg-gradient-to-r ${sdg.color} text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg`}>
                    SDG {sdg.id}
                  </div>
                                     <div className="relative h-64 overflow-hidden">
                     <Image
                       src={sdg.image}
                       alt={sdg.title}
                       width={400}
                       height={400}
                       className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                       onError={(e) => {
                         const target = e.target as HTMLImageElement
                         target.src = "/images/placeholder.jpg"
                       }}
                     />
                     <div className={`absolute inset-0 bg-gradient-to-t ${sdg.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                   </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${sdg.color} text-white mr-3`}>
                      <sdg.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{sdg.title}</h3>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4 font-medium">{sdg.shortTitle}</p>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {sdg.description}
                  </p>

                  {/* Technology Impact */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Technology Impact:</h4>
                    <p className="text-xs text-gray-600">{sdg.technologyImpact}</p>
                  </div>

                  {/* Key Targets */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-900">Key Targets:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {sdg.targets.slice(0, 2).map((target, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          {target}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-red-700 to-red-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Mission</h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Be part of the solution! Help us develop innovative technology solutions that address these global challenges and create positive impact for communities worldwide.
            </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Button asChild size="lg" variant="secondary">
                 <Link href="https://sight.ieee.org/" target="_blank" rel="noopener noreferrer">
                   Learn More About SIGHT
                 </Link>
               </Button>
               <Button asChild size="lg" variant="secondary">
                  <Link href="https://www.iso.org/sdg" target="_blank" rel="noopener noreferrer">
                    Learn More About SDGs
                  </Link>
                </Button>
             </div>
          </div>
        </div>
      </section>
    </div>
  )
} 