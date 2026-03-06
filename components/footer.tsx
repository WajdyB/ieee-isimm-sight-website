import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react"
import { Logo } from "@/components/ui/logo"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=100091680498696",
      icon: Facebook,
      color: "hover:text-blue-600",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/ieee.sight.isimm/?hl=fr",
      icon: Instagram,
      color: "hover:text-pink-600",
    },
    {
      name: "Email",
      href: "mailto:contact@sight-isimm.org",
      icon: Mail,
              color: "hover:text-red-700",
    },
  ]

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Leadership Team", href: "/committee" },
    { name: "Events", href: "/events" },
    { name: "Awards", href: "/awards" },
    { name: "SDGs", href: "/sdgs" },
  ]

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center mb-4 w-fit">
              <Logo type="wie" className="h-12 w-auto" />
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Special Interest Group in Humanitarian Technology (SIGHT) of IEEE ISIMM Student Branch. Advancing humanitarian technology 
              through innovation, collaboration, and sustainable development solutions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 transition-colors duration-200 ${social.color}`}
                  aria-label={social.name}
                >
                  <social.icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
                            <h3 className="text-lg font-semibold mb-4 text-red-400">Quick Links</h3>
                <ul className="space-y-2">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-red-400 transition-colors duration-200"
                      >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-red-400">Contact</h3>
            <div className="space-y-2 text-gray-300">
              <p>IEEE ISIMM SIGHT Group</p>
              <p>Monastir, Tunisia</p>
              <p>
                <Link
                  href="mailto:contact@sight-isimm.org"
                  className="hover:text-red-400 transition-colors duration-200"
                >
                  contact@sight-isimm.org
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} SIGHT ISIMM. All rights reserved.
            </p>
            <div className="flex items-center gap-3 mt-4 md:mt-0 flex-wrap justify-center">
              <span className="text-gray-400 text-sm">Powered by</span>
              <Link href="https://isimm.ieee.tn/" target="_blank" rel="noopener noreferrer" className="flex items-center" aria-label="IEEE ISIMM Student Branch">
                <Logo type="ieee" className="h-6 w-auto" />
              </Link>
              <span className="text-gray-400 text-sm">and</span>
              <Link href="https://sight.ieee.tn/" target="_blank" rel="noopener noreferrer" className="flex items-center" aria-label="SIGHT Tunisia Section">
                <Logo type="sightTunisia" className="h-6 w-auto" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 