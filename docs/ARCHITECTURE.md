# How FreshFind Works

## What we are building
A website that helps people in Lagos find farmers markets. Where each market is, the days and hours it opens, and what produce is in season. It is our entry for TechWiz 7 and the judges will mark us against the SRS document, so every feature in that document must exist and work.

## The frame
The site is built with React using Vite. It is a single page application, so the browser loads once and React Router swaps pages in and out without reloading. App.jsx sets up the router, wraps everything in the BookmarksProvider, and renders the Navbar, the page area, the ChatbotWidget and the Footer. Every page renders inside that frame. Nine pages live in src/pages plus a Not Found page.

At phone widths the Navbar collapses into a menu and the Footer stacks into one column, so responsiveness of the frame is handled once for everyone. Each page handles the responsiveness of its own content.

## Styling
One theme file, src/styles/theme.css, holds every color, font, spacing and radius as a variable. The Navbar and Footer have their own CSS files and each page has one CSS file in src/styles. No raw hex codes inside pages. The THEME_GUIDE explains every variable.

## The data is the center
There is no backend and no database. The database is three JSON files in src/data. markets.json has one record per market. produce.json has one record per produce item with its season and the markets that sell it. chatbot.json has the greeting, the fallback, the entities the assistant recognises and every answer it can give. Pages import the files directly and read them. Nothing is ever written back and nothing is sent to a server. The DATA_GUIDE explains every field.

## Shared helpers
src/utils holds small pure functions so logic is written once:
- schedule.js turns a market schedule into an hours line, an open now check, a next opening time and a badge.
- season.js turns a season month list into a label and checks what is in season now.
- geo.js measures distance between two coordinates.
- images.js builds image paths from the names stored in the JSON files.
- links.js builds map embed, directions and share links.

## Hooks
- useClock gives the current time, ticking every second. It powers the live clock in the footer, the open now badges and the season checks.
- useGeolocation asks the browser for the visitor's position only after the visitor presses a button, and reports idle, loading, granted, denied or unsupported. It powers sort by distance, markets near you and the Contact page map.
- useBookmarks comes from the BookmarksContext and gives every component the same saved list.

## Open now
Every market schedule stores each day as open and close times in 24 hour format, or null when closed. isOpenNow compares the current day and time from useClock with today's entry. openBadge returns OPEN NOW or when the market next opens. Because the data is real times and not text, the same function works for every market and every page.

## Bookmarks
Saved markets, saved produce and notes live in the browser's sessionStorage under one key. The BookmarksContext loads them on start, updates them on every change and shares them with the Navbar badge, every card's bookmark button and the Bookmarks page. Closing the tab clears them. That is exactly what the brief asks for: session only notes and no server storage.

## Chatbot
The assistant is a rule engine, not a live AI. When the visitor sends text or taps a chip:
1. The text is lowercased and trimmed.
2. Entities are searched first: any market name, produce name or day word from chatbot.json.
3. A market mention answers with the market info template filled from markets.json. A produce mention answers with the produce info template filled from produce.json.
4. Otherwise every intent is scored by how many of its keywords appear in the text and the best one wins. Intents with an action compute their answer from the data files, for example the markets open on Saturday. Other intents return their answer exactly as written.
5. If an action finds nothing it returns its noResults text. If nothing matches, the fallback is shown.
6. Answers can carry a link button to a page and their own quick reply chips.
Every sentence the assistant can say is written in chatbot.json. Placeholders only pull facts from the other two files.

## Search
The search icon opens the overlay. Typing and pressing Enter goes to the Directory with q set to the text. The Directory filters names and areas by that text.

## Routing
/ Home, /directory, /market/:id, /produce, /seasonal, /bookmarks, /contact, /about, and anything else shows Not Found. The Vite base is /freshfind/ so the site can live on GitHub Pages.

## What we are achieving
A judge should be able to open the site, find a market, check its hours, browse produce, ask the assistant a question, bookmark things and export the list, on a laptop or a phone, without anything breaking. And when asked why the code looks the way it does, any of us can answer.
