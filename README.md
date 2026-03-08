# Azzedine Oubaid - Cybersecurity Portfolio

A modern, animated portfolio website built with React, GSAP, Three.js, and Framer Motion featuring a cyberpunk black & red theme.

## Features

✨ **Advanced Animations**
- GSAP scroll-triggered animations
- Framer Motion transitions
- Three.js 3D particle background
- Smooth page transitions

🎵 **Music Player**
- Spotify-style playlist interface
- Import music from your PC
- Play/pause/next/previous controls
- Volume control and mute option
- Music plays throughout the entire website

🎨 **Design**
- Black & Red cyberpunk theme
- Neon glowing effects
- Responsive design
- Glassmorphism UI elements

📱 **Sections**
- Hero section with profile
- Technical skills showcase
- Featured projects
- Cybersecurity expertise presentation
- Experience & education timeline
- Contact information

## Installation

1. Navigate to the project directory:
```bash
cd CyberPortfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Building for Production

```bash
npm run build
```

The optimized files will be in the `dist` folder.

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool
- **GSAP** - Animation library
- **Framer Motion** - React animation library
- **Three.js** - 3D graphics
- **@react-three/fiber** - React renderer for Three.js
- **React Icons** - Icon library

## Project Structure

```
CyberPortfolio/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── CyberSecurity.jsx
│   │   ├── Experience.jsx
│   │   ├── Contact.jsx
│   │   ├── MusicPlayer.jsx
│   │   ├── ThreeBackground.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Music Player Usage

1. Click the floating music icon in the bottom-right corner
2. Click "Import Music" to select audio files from your PC
3. Click on any track to play it
4. Use the controls to play/pause, skip tracks, and adjust volume
5. Music continues playing as you navigate through the website

## Customization

### Colors
Edit the CSS variables in `src/index.css`:
```css
:root {
  --primary-red: #ff0033;
  --dark-red: #990000;
  /* ... more colors ... */
}
```

### Profile Image
Replace `/profile.jpg` in the public folder with your own image.

### Content
Edit the component files to update:
- Personal information
- Skills and technologies
- Projects and links
- Experience details

## Contact

- **Email**: oubaidazzedine00@gmail.com
- **Phone**: +212 631 721 359
- **GitHub**: https://github.com/alexforc2244
- **LinkedIn**: https://www.linkedin.com/in/azzedine-oubaid-64a3673a8

## License

Copyright © 2024 Azzedine Oubaid. All rights reserved.
