// Images configuration for the SIGHT ISIMM website
export const aboutImages = {
  // Mission & Vision section image
  mission: {
    src: "/images/about/about-image.png", // You'll add this image
    alt: "SIGHT ISIMM Mission and Vision",
    width: 600,
    height: 500,
    className: "relative rounded-3xl shadow-2xl object-cover",
  },
  
  // Photo Gallery images - you can add up to 12 images
  gallery: [
    {
      src: "/images/events/international-sight-day.jpg", // Event/Activity 1
      alt: "International Sight Day",
      title: "International Sight Day",
      width: 300,
      height: 300,
    },
    {
      src: "/images/events/blender.jpg", // Event/Activity 2
      alt: "Blender Workshop", 
      title: "Blender Workshop",
      width: 300,
      height: 300,
    },
    {
      src: "/images/events/3ich-ieee.jpg", // Event/Activity 3
      alt: "3ich IEEE 1.0",
      title: "3ich IEEE 1.0",
      width: 300,
      height: 300,
    },
    {
      src: "/images/events/its-benefits.jpg", // Event/Activity 4
      alt: "ITS Benefits",
      title: "ITS Benefits",
      width: 300,
      height: 300,
    },
    {
      src: "/images/events/3ich-ieee-2.jpg", // Event/Activity 5
      alt: "3ich IEEE 2.0",
      title: "3ich IEEE 2.0",
      width: 300,
      height: 300,
    },
  ],
} as const

// Committee images configuration
export const committeeImages = {
  // Committee member photos - Updated with actual SIGHT ISIMM committee members
  members: [
    {
      name: "Nour Elhouda Salem",
      position: "Chairwoman",
      image: "/images/committee/nour-salem.png", 
      facebook: "https://www.facebook.com/salem.nour.3",
      email: "nour.salem@ieee.org",
      linkedin: "https://www.linkedin.com/in/nour-elhouda-salem-64a5a9283/",
    },
    {
      name: "Ons Guidara",
      position: "Vice Chair",
      image: "/images/committee/ons-guidara.png", 
      facebook: "https://www.facebook.com/ons.guidara.121097",
      email: "ons.guidara@ieee.org",
      linkedin: "https://www.linkedin.com/in/ons-guidara-3308a1219/",
    },
    {
      name: "Yasmine Bregui",
      position: "Secretary",
      image: "/images/committee/yasmine-bregui.png", 
      facebook: "https://www.facebook.com/yasmine.bregui",
      email: "yasmine.bregui@ieee.org",
      linkedin: "",
    },
    {
      name: "Nour Ben Hamouda",
      position: "Treasurer",
      image: "/images/committee/nour-ben-hamouda.png", 
      facebook: "https://www.facebook.com/nour.edu.2025",
      email: "nour.benhamouda@ieee.org",
      linkedin: "https://www.linkedin.com/in/nour-ben-hamouda-b564a033a/",
    },
  ],
  
  // Chair photo for leadership message section
  chair: {
    src: "/images/committee/nour-salem.png", 
    alt: "Nour Elhouda Salem - Chairwoman",
    width: 80,
    height: 80,
    className: "w-16 h-16 rounded-full object-cover mr-4",
  },
} as const

// Helper function to get gallery images (with fallback to placeholders)
export const getGalleryImages = () => {
  return aboutImages.gallery.map((image, index) => ({
    ...image,
    // Fallback to placeholder if image doesn't exist
    src: image.src.startsWith('/placeholder') ? image.src : image.src,
  }))
}

// Helper function to get committee members with fallback images
export const getCommitteeMembers = () => {
  return committeeImages.members.map((member, index) => ({
    ...member,
    // Fallback to placeholder if image doesn't exist
    image: member.image.startsWith('/placeholder') ? member.image : member.image,
  }))
}