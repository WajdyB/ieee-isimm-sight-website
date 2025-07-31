# SIGHT ISIMM Website

A modern, responsive website for the IEEE ISIMM Student Branch's Special Interest Group in Humanitarian Technology (SIGHT). Built with Next.js, React, and Tailwind CSS.

## 🌟 Features

### Core Pages
- **Homepage** - Introduction to SIGHT ISIMM with mission overview and recent events
- **About Us** - Detailed information about our mission, vision, and core values
- **Leadership Team** - Meet our dedicated committee members and leadership
- **Events** - Showcase of our humanitarian technology events and projects
- **SDGs** - Interactive showcase of the 17 Sustainable Development Goals
- **Admin Panel** - Event management system for administrators

### Key Features
- **Responsive Design** - Optimized for all devices (desktop, tablet, mobile)
- **Modern UI/UX** - Clean, professional design with smooth animations
- **Dynamic Content** - Real-time event updates and management
- **Interactive Elements** - Hover effects, animations, and smooth transitions
- **SEO Optimized** - Proper meta tags and structured content
- **Accessibility** - WCAG compliant design and navigation

## 🚀 Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Lucide React icons
- **Database**: MongoDB (for events management)
- **Deployment**: Vercel-ready

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **MongoDB** database (for full functionality)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ieee-sight-isimm-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
ieee-sight-isimm-website/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── about/             # About page
│   ├── admin/             # Admin panel
│   ├── committee/         # Leadership team page
│   ├── events/            # Events page
│   ├── sdgs/              # SDGs showcase page
│   ├── test-events/       # Test events page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── ui/               # UI components (buttons, etc.)
│   ├── header.tsx        # Navigation header
│   └── footer.tsx        # Footer component
├── lib/                  # Utility functions
│   └── images.ts         # Image configurations
├── public/               # Static assets
│   └── images/           # Image files
├── styles/               # Additional styles
└── tailwind.config.ts    # Tailwind configuration
```

## 🎨 Design System

### Color Scheme
- **Primary**: Red (#B91C1C) - Represents humanitarian focus
- **Secondary**: White and gray tones for clean design
- **Accent**: Various colors for SDG cards

### Typography
- **Headings**: Bold, modern fonts
- **Body**: Clean, readable text
- **Responsive**: Scales appropriately across devices

## 📱 Responsive Design

The website is fully responsive with breakpoints for:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Testing (if configured)
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
```

## 📊 Content Management

### Events System
- **Dynamic Events**: Events are stored in MongoDB
- **Admin Panel**: Add, edit, and manage events
- **Real-time Updates**: Changes reflect immediately

### Static Content
- **Committee Members**: Managed through `lib/images.ts`
- **SDGs Data**: Hardcoded in the SDGs page component
- **Images**: Stored in `public/images/` directory

## 🌐 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- **Netlify**: Compatible with Next.js
- **Railway**: Easy deployment with database
- **AWS/GCP**: For enterprise deployments

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **SIGHT ISIMM Committee** - Content and direction
- **Development Team** - Technical implementation

## 📞 Contact

- **Email**: contact@sight-isimm.org
- **Facebook**: [IEEESIGHTISIMMSA](https://www.facebook.com/IEEESIGHTISIMMSA)
- **LinkedIn**: [ieee_sight_isimm_sag](https://www.linkedin.com/company/ieee_sight_isimm_sag)

## 🙏 Acknowledgments

- **IEEE SIGHT** for the humanitarian technology mission
- **ISIMM Student Branch** for support and resources
- **Next.js Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework

---

**Made with ❤️ for humanitarian technology advancement** 