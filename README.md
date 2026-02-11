# 🍹 Fruticana - Premium Scrollytelling Website

A production-grade, Awwwards-level interactive website featuring canvas-based scroll animations for three premium juice flavors.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-ff69b4)

## ✨ Features

- 🎬 **Canvas-Based Scroll Animation** - Smooth image sequence playback synchronized to scroll
- 🎨 **Premium UI/UX** - Glassmorphism effects, gradient branding, smooth transitions
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- ♿ **Accessible** - WCAG compliant with reduced-motion support
- 🚀 **Static Export** - Deploy anywhere (Netlify, Vercel, GitHub Pages)
- ⚡ **Performance Optimized** - Preloading, RAF rendering, code splitting

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create optimized production build
npm run build

# Output will be in the 'out' directory
```

### Preview Production Build

```bash
# Use a static file server
npx serve out
```

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Main page orchestration
│   └── globals.css         # Global styles & utilities
├── components/
│   ├── Navbar.tsx          # Fixed header with glassmorphism
│   ├── Footer.tsx          # Premium footer
│   ├── ProductBottleScroll.tsx    # Canvas scroll engine
│   └── ProductTextOverlays.tsx    # Scroll-based text
├── data/
│   └── products.ts         # Product data (3 flavors)
├── public/
│   └── images/
│       ├── guava/          # 200 frame sequence
│       ├── mango/          # 163 frame sequence
│       └── berry/          # 200 frame sequence
└── Configuration files...
```

## 🎨 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Canvas:** HTML5 Canvas API
- **Font:** Outfit (Google Fonts)

### Vercel (Recommended)

The easiest way to deploy is using the Vercel Platform:

1. Push your code to a GitHub, GitLab, or Bitbucket repository.
2. Import your repository into [Vercel](https://vercel.com/new).
3. Vercel will automatically detect Next.js and configure the build settings.
   - **Build Command:** `npm run build`
   - **Output Directory:** `out` (due to `output: 'export'` in `next.config.mjs`)

### Netlify

1. Run `npm run build`
2. Visit [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag & drop the `out` folder

### Other Platforms

The `out` directory contains static files that can be deployed to any static host.

## 📸 Screenshots

The website features three premium juice flavors:

1. **Guava Juice** - Tropical Paradise in Every Sip
2. **Mango Juice** - Golden Nectar of Excellence
3. **Mixed Berry** - A Symphony of Berries

Each flavor has:
- Unique color scheme
- 160+ canvas animation frames
- Scroll-synchronized text overlays
- Product details & benefits
- Call-to-action sections

## 🎯 Key Features Breakdown

### Canvas Scroll Animation

- Preloads all image frames with progress indicator
- Maps scroll position (0-100%) to frame index
- Retina display support (`devicePixelRatio`)
- Smooth 60fps rendering via `requestAnimationFrame`
- Proper cleanup on component unmount

### Product Transitions

- Smooth fade transitions between flavors
- Automatic scroll reset on product change
- Left/right arrow navigation
- Bottom flavor selector pills

### Accessibility

- Semantic HTML5 structure
- ARIA labels on interactive elements
- `prefers-reduced-motion` support
- Keyboard navigation
- Screen reader friendly

## 🔧 Configuration

### Environment Variables (Optional)

Create a `.env.local` file for any API keys or configuration:

```env
# Example (not currently used)
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

### Customization

- **Colors:** Edit `tailwind.config.ts` brand colors
- **Products:** Modify `data/products.ts`
- **Fonts:** Change in `app/layout.tsx`
- **Animations:** Adjust in component files

## 📝 Scripts

```bash
npm run dev      # Start development server (port 3000)
npm run build    # Create production build
npm run start    # Start production server (not compatible with static export)
npm run lint     # Run ESLint
```

## 🐛 Troubleshooting

### Build Fails

- Ensure Node.js version is 18+
- Delete `node_modules` and `.next` folders, then run `npm install` again
- Check for TypeScript errors: `npx tsc --noEmit`

### Images Not Loading

- Verify image paths in `data/products.ts` match folder structure
- Ensure all frames exist (ezgif-frame-001.jpg → ezgif-frame-XXX.jpg)
- Check browser console for 404 errors

### Performance Issues

- Reduce number of frames in image sequence
- Compress JPG images further
- Enable lazy loading for below-fold content

## 📄 License

This project is proprietary. All rights reserved.

## 🤝 Contributing

This is a client project. For inquiries, please contact the project maintainer.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **Framer** - For the incredible motion library
- **Tailwind Labs** - For the utility-first CSS framework

---

**Built with ❤️ for Fruticana**
