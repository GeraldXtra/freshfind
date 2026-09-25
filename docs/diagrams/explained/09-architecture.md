# Application structure, explained

Image: docs/diagrams/png/09-architecture.png. Source: docs/diagrams/09-architecture.md.

## What it shows
How the code is organised: what contains what, and which shared pieces support which pages. It is a picture of the folders in src.

## The shapes
- Boxes are components, groups of files, or the data. The cylinder is the three data files.
- Solid arrows mean "contains" or "renders". App renders the Router, the Router renders the frame and so on.
- Dotted arrows mean "is used by". The shared components, helpers, hooks, data and theme are used by the pages but do not contain them.

## Reading it top to bottom
- App is the root. It renders the BrowserRouter, which handles addresses.
- Inside the router sits the BookmarksProvider, so every component below it can read the same bookmarks store.
- The provider renders four things: the Navbar with the SearchOverlay and the mobile menu, the page area, the ChatbotWidget and the Footer with the live clock and visitor counter.
- The page area shows one of nine pages depending on the address: Home, Directory, MarketDetail, ProduceGuide, Seasonal, Bookmarks, Contact, About or NotFound.
- The dotted arrows from the shared components box (MarketCard, BookmarkButton, Breadcrumbs) go to the pages that use them.
- The helpers box (schedule, season, geo, images, links, chatbot) is used by the pages and by the chatbot widget.
- The hooks box (useClock, useGeolocation, useBookmarks) is used by pages and by the navbar for the badge.
- The data cylinder is used by the pages and the chatbot.
- The theme box (theme.css and index.css) styles the navbar, the pages and the footer.

## The logic behind it
Shared things sit once at the top or the side and are reused, so the site behaves the same everywhere. The frame is built once and every page inherits it. Only the page area changes when the address changes, which is what a single page application means.

## Where it lives in the code
App.jsx for the top, src/components for the frame and shared pieces, src/pages for the pages, src/utils for the helpers, src/hooks and src/context for the hooks and the provider, src/data for the cylinder, src/styles for the theme.

## Questions judges may ask
- Why is the provider above the navbar? So the navbar badge can read the bookmarks store as well as the pages.
- What changes when I click a link? Only the page area; the frame stays.
- Where would you add a new page? A file in src/pages, a route in App.jsx, a link in the navbar list.
