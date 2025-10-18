# Portfolio Frontend

A modern portfolio website featuring advanced GSAP ScrollTrigger animations and responsive design.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- Python 3 (optional, for alternative server)

### Running the Portfolio

**Option 1: Node.js HTTP Server (Recommended)**
```bash
npx http-server "D:\Shawn Mutogo Portifolio\portfolio-frontend" -p 8081 -i -c-1
```
Then open: `http://localhost:8081`

**Option 2: Python HTTP Server (Alternative)**
```bash
cd "D:\Shawn Mutogo Portifolio\portfolio-frontend"
python -m http.server 8080
```
Then open: `http://localhost:8080`

## ✨ Features

### GSAP ScrollTrigger Animations
1. **Rotating Parallax Hero** - Central profile image with orbiting design icons
2. **Project Components Breakdown** - Single project image that breaks into technology components on scroll
3. **Build-Up Image Reveal** - Full-height image revealed from bottom-up using clip-path
4. **Text Mask Video Reveal** - Background video masked by text using mix-blend-mode

### Technical Features
- ✅ GSAP 3.12.5 + ScrollTrigger CDN
- ✅ Four isolated CSS modules with scoped classes
- ✅ Four isolated JavaScript modules with IIFE wrapping
- ✅ Respects `prefers-reduced-motion` user preference
- ✅ Lazy loading for images
- ✅ Accessible markup with proper alt text
- ✅ Mobile responsive design
- ✅ No conflicts with existing portfolio styles

## 📁 Project Structure

```
portfolio-frontend/
├── index.html                 # Main portfolio page
├── css/
│   ├── gsap-parallax-hero.css
│   ├── gsap-project-breakdown.css
│   ├── gsap-image-reveal.css
│   ├── gsap-text-mask-video.css
│   ├── case-studies.css
│   ├── loading.css
│   └── video-gallery.css
├── js/
│   ├── gsap-parallax-hero.js
│   ├── gsap-project-breakdown.js
│   ├── gsap-image-reveal.js
│   ├── gsap-text-mask-video.js
│   ├── loading-effects.js
│   └── api-client.js
├── public/
│   ├── profile.jpg
│   ├── charity-cover.webp
│   ├── red-notice-cover.webp
│   ├── techunity-cover.webp
│   └── *.svg files
└── videos/
    └── hero-background.mp4
```

## 🎯 Testing

1. Open `http://localhost:8081` in your browser
2. Scroll through the page to see all four animations trigger
3. Check browser console (F12) for any JavaScript errors
4. Test responsiveness by resizing the browser window
5. Test accessibility by enabling `prefers-reduced-motion` in dev tools

## 🔧 Customization

### Replacing Assets
- **Hero center image**: Update `public/profile.jpg`
- **Orbit icons**: Replace the `public/*.svg` files referenced
- **Breakdown final shot/icons**: Update `public/*` paths in the section markup
- **Build-Up reveal image**: Update `public/red-notice-cover.webp`
- **Text Mask background**: Replace `videos/hero-background.mp4` or the poster

### Animation Settings
Each animation can be customized by editing the respective JS files:
- `js/gsap-parallax-hero.js` - Parallax rotation and zoom settings
- `js/gsap-project-breakdown.js` - Component scatter animation
- `js/gsap-image-reveal.js` - Clip-path reveal timing
- `js/gsap-text-mask-video.js` - Text letter spacing animation

## 📝 Notes

- All GSAP animations are scoped to their respective sections to prevent conflicts
- The server command uses absolute path to ensure correct directory serving
- The `-i` flag serves `index.html` as the default file
- The `-c-1` flag disables caching for development

## 🐛 Troubleshooting

**Server shows directory listing instead of portfolio:**
- Make sure you're using the absolute path: `"D:\Shawn Mutogo Portifolio\portfolio-frontend"`
- Include the `-i` flag to serve index.html as default

**404 errors for images/videos:**
- Check that files exist in the `public/` and `videos/` directories
- Verify file paths in the HTML match actual file locations

**Animations not working:**
- Check browser console for JavaScript errors
- Verify GSAP CDN loaded successfully
- Ensure `prefers-reduced-motion` is not enabled
