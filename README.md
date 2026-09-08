A lightweight, responsive and accessibility-focused web framework for building modern websites and Progressive Web Apps.

Built with semantic HTML, modern CSS, Flexbox, JavaScript and Progressive Web App technologies, with accessibility and progressive enhancement at its core.

✨ Features

- Modern HTML / HTML5
- Semantic HTML structure
- WAI-ARIA compatible
- Accessibility-focused components
- Responsive design
- CSS Flexbox layout
- Mobile-first approach
- Progressive Web App (PWA) support
- Web App Manifest
- Service Worker support
- Offline capabilities
- Installable web applications
- SEO-friendly structure
- Lightweight architecture
- Minimal dependencies
- Static hosting compatible
- Progressive enhancement
- Blog / news-ready architecture

🎯 Philosophy

The framework follows a simple principle:

«Build with the web platform first. Enhance it when necessary.»

Native HTML elements and browser capabilities are preferred whenever possible.

JavaScript is used to enhance the experience rather than becoming a requirement for basic content and navigation.

Accessibility is considered part of the architecture, not an additional feature added at the end of development.

🧱 Architecture

The framework is built around three primary layers:

HTML
 │
 ├── Semantic structure
 ├── Content
 └── Accessibility semantics
        │
        ▼
CSS
 │
 ├── Responsive layout
 ├── Flexbox
 ├── Typography
 └── Visual presentation
        │
        ▼
JavaScript
 │
 ├── Interactive components
 ├── Progressive enhancement
 └── Application functionality
        │
        ▼
PWA
 │
 ├── Manifest
 ├── Service Worker
 └── Offline functionality

📱 Responsive Layout

The framework uses modern CSS layout techniques with Flexbox as a primary layout method.

The layout is designed to adapt to:

- Mobile phones
- Tablets
- Laptops
- Desktop computers
- Large displays

Example:

.container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.content {
    flex: 1 1 40rem;
}

.sidebar {
    flex: 0 1 20rem;
}

♿ Accessibility

Accessibility is an integral part of the framework.

The framework encourages:

- Semantic HTML
- Logical heading hierarchy
- Keyboard navigation
- Visible focus states
- Accessible forms
- Meaningful alternative text
- Logical document structure
- ARIA landmarks where appropriate
- Accessible interactive components

Native HTML semantics should be preferred whenever they provide the required functionality.

ARIA is used to enhance semantics where necessary.

📲 Progressive Web App

The framework supports Progressive Web App functionality through standard web platform technologies.

Typical PWA components include:

manifest.json
service-worker.js
icons/

A PWA can provide:

- Installability
- Offline functionality
- Cached resources
- Application-shell behavior
- Standalone application display
- Improved mobile experience

📰 Blog / News

The framework can be used to create a static blog or news system without requiring a database.

Example:

/blog/
├── index.html
├── article-1/
│   └── index.html
├── article-2/
│   └── index.html
└── images/

Individual articles can contain:

- Title
- Publication date
- Modification date
- Featured image
- Article content
- Categories
- Tags
- Previous / next navigation
- SEO metadata
- Open Graph metadata
- Structured data

The architecture can later be connected to an API or CMS.

🔌 API Ready

The framework is designed so that static content can later be replaced with dynamic API data.

Static:

const posts = [
    {
        title: "Example Article",
        date: "2026-09-08",
        image: "/images/example.jpg",
        slug: "example-article"
    }
];

Future API integration:

const response = await fetch("/api/posts");
const posts = await response.json();

This allows the framework to start as a completely static website while remaining ready for future dynamic functionality.

🔍 SEO

The framework is designed with search-engine-friendly HTML architecture.

Recommended elements include:

- Unique page titles
- Meta descriptions
- Canonical URLs
- Semantic headings
- Descriptive URLs
- Image "alt" attributes
- Open Graph metadata
- Sitemap
- robots.txt
- Structured data

⚡ Performance

The framework aims to keep the client-side footprint small.

The core principles are:

- Minimal dependencies
- Lightweight CSS
- Minimal JavaScript
- Native browser functionality
- Static assets where possible
- Progressive enhancement
- Efficient responsive layouts

🧩 Progressive Enhancement

The framework follows this general model:

Semantic HTML
      ↓
Functional website
      ↓
Responsive CSS
      ↓
Enhanced JavaScript
      ↓
PWA functionality
      ↓
Optional API / dynamic services

The basic website should remain useful without relying entirely on JavaScript whenever practical.

📁 Suggested Project Structure

project/
│
├── index.html
├── manifest.json
├── robots.txt
├── sitemap.xml
│
├── css/
│   ├── reset.css
│   ├── framework.css
│   └── components.css
│
├── js/
│   ├── app.js
│   ├── navigation.js
│   └── components.js
│
├── blog/
│   ├── index.html
│   └── articles/
│
├── images/
│
├── icons/
│
└── service-worker.js

🚀 Getting Started

Clone the repository:

Run the project using a local HTTP server.

For example:

python3 -m http.server 8080

Then open:

http://localhost:8080

A local HTTP server is recommended when testing PWA functionality such as Service Workers.

🌐 Deployment

The framework can be deployed to static hosting services or any web server capable of serving HTML, CSS, JavaScript and static assets.

Possible deployment environments include:

- GitHub Pages
- Firebase Hosting
- Cloudflare Pages
- Netlify
- Vercel
- Traditional web hosting
- Self-hosted web servers

🛣️ Roadmap

- [x] Semantic HTML foundation
- [x] Responsive Flexbox layout
- [x] Accessibility foundation
- [x] PWA manifest
- [x] Service Worker architecture
- [x] Static blog architecture
- [x] SEO foundation
- [ ] RSS / Atom feed
- [ ] API integration
- [ ] Dynamic content management
- [ ] Optional CMS integration
- [ ] Automated sitemap generation
- [ ] Advanced accessibility testing
- [ ] Component documentation
- [ ] Theme system
- [ ] Developer tooling

📜 License

This project is licensed under the MIT License.

Copyright © 2026 Jānis Bedeicis.

See the "LICENSE" (LICENSE) file for the complete license.

👤 Author

Jānis Bedeicis

Web developer, designer and creator of this framework.

---

Built for the modern web.

Semantic HTML · Responsive CSS · Accessibility · PWA · Progressive Enhancement
