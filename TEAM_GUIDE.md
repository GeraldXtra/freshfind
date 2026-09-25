# FreshFind Team Guide

## Who builds what
- Gerald (Leader): Home page (mockups 01-home.png and 06-chatbot-open.png), Bookmarks page (09-bookmarks.png), the Chatbot widget, all files in src/data, shared layout in src/components (Navbar, Footer, SearchOverlay, LiveClock, VisitorCounter, Breadcrumbs) and src/styles. Branch: feature/gerald-home-chatbot-bookmarks
- Amanda: Market Directory page (02-directory.png) and Contact Us page (07-contact.png). Branch: feature/amanda-directory-contact
- Ibrahim: Market Detail page (03-market-detail.png) and About Us page (08-about.png). Branch: feature/ibrahim-detail-about
- Osakue: Produce Guide page (04-produce-guide.png) and Seasonal Picks page (05-seasonal.png). Branch: feature/osakue-produce-seasonal

All mockups live in design/mockups. Your page must match your mockup.

## Rules
1. Only touch the files you own. If you need a change in a shared file, tell Gerald.
2. Only Gerald edits src/data. Every page reads from those JSON files, nobody hardcodes market or produce info inside a page.
3. All colors, fonts, spacing and radius come from the variables in src/styles/theme.css. Read docs/THEME_GUIDE.md before styling anything. Never type a raw hex code inside a page.
4. Read docs/ARCHITECTURE.md before writing any code.
5. Images have fixed names and folders. Read docs/IMAGES_GUIDE.md before using any image and never rename an image file.
6. Every page except Home renders the shared Breadcrumbs component at the top with its own trail.
7. Branch off dev, commit small, push, then open a pull request into dev. Nobody pushes to main.
8. A page is done when it matches its mockup in design/mockups, works on mobile width, reads from JSON, and has hover effects on its cards and buttons.
9. Ask questions in the group early. Stuck for more than 30 minutes means ask.
