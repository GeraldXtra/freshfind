# FreshFind Project Report

## Problem Definition
Farmers markets are one of the best places to buy fresh, affordable food in Lagos, but finding the right one is harder than it should be. Information about where a market is, which days it runs and what hours it keeps is spread across flyers, WhatsApp groups, social media posts and word of mouth. There is no single place a resident can check. People end up showing up on the wrong day, arriving after the market has wound down, or travelling across town for produce that is out of season.

FreshFind solves this with a simple website that puts every market in one place. A visitor can search markets by area, day of the week or produce type, open a market to see its location on a map, its weekly schedule and the produce it usually carries, browse a produce guide that shows what is in season and where to find it, ask a built in assistant common questions, and bookmark markets and produce for the session.

The project follows the TechWiz 7 brief under the eGreen Basket theme. The brief sets clear limits. The site must be built with frontend technologies only, all information must come from JSON or text files, nothing can be written back or stored on a server, and the assistant must run on pre scripted rules rather than a live AI service.

## Design Specifications

### Technology
- React with Vite for the single page application
- React Router for moving between pages without reloading
- Plain CSS with one central theme file of variables
- JSON files for all market, produce and chatbot data
- No backend, no database, no external AI service

### Pages
1. Home: hero with a search panel, markets near you, in season this week
2. Market Directory: all markets with filters for area, day, produce type and open now, plus sorting by name, next open day and distance
3. Market Detail: banner, about section, weekly schedule, typical produce, map, address and directions
4. Produce Guide: catalogue filtered by category, with season and markets for each item
5. Seasonal Picks: this week's top picks and a season calendar
6. Bookmarks: saved markets and produce with session notes, export and share
7. Contact Us: contact details and a map showing the visitor's location
8. About Us: mission, why FreshFind, and the team
9. Not Found: a friendly page for wrong links

Features shared across pages: a navbar with search, a bookmark count and a non functional login button as the brief requires, a floating chatbot on every page, breadcrumbs on every page except Home, a live clock, a simulated visitor counter and the footer. At phone widths the navbar collapses into a menu and the footer stacks.

### Visual design
- Colors: cream background, deep green for headings and the footer, amber yellow for primary buttons and badges, white cards with soft borders
- Fonts: Fraunces for headings, Plus Jakarta Sans for body text
- Layout: content width of 1200px, responsive at 900px and 600px
- Feel: warm, premium and clean, with hover effects and smooth transitions
Design mockups for all nine pages are in design/mockups.

### Data design
Three JSON files in src/data hold everything the site shows. Their fields are documented in docs/DATA_GUIDE.md.
- markets.json: id, name, area, address, lat, lng, description, about, image, schedule (seven days with open and close times or null), produce (list of produce ids), featured.
- produce.json: id, name, category, season (month numbers), description, markets (list of market ids), image.
- chatbot.json: greeting, quick replies, fallback, entities for markets, produce and days, and intents with keywords, answers, optional actions, links and quick replies.
Records join on ids so no fact is typed twice.

### Bookmarks
Bookmarks and notes are kept in the browser's session storage. They belong to that browser only and clear when the tab closes. This meets the brief, which allows no server storage and describes notes as session only.

## Diagrams
The diagrams are in docs/diagrams as Mermaid files: site map, the user flow for finding a market, the data flow, the chatbot matching flow, the bookmarks flow, the open now logic and the application structure. Exported images of each are included in the submitted report.

## Test Data Used in the Project
The sample data and the test scenarios are listed in docs/TEST_DATA.md.

## Project Installation Instructions

### Requirements
- Node.js version 18 or newer
- npm, which comes with Node.js
- A modern browser such as Chrome, Edge or Firefox

### Steps
1. Unzip the source code folder, or clone the repository.
2. Open a terminal inside the freshfind folder.
3. Run npm install to download the project dependencies.
4. Run npm run dev to start the development server.
5. Open the local address printed in the terminal, usually http://localhost:5173/freshfind/

### Production build
1. Run npm run build to create the optimized site in the dist folder.
2. Run npm run preview to view the built site locally.
3. The dist folder can be uploaded to any static host such as GitHub Pages.

No environment variables, database or API keys are needed.
