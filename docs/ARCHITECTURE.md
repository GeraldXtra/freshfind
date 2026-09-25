# How FreshFind Works

This describes the site as it is built. Read it before touching any code and read it again before the judging.

## What we built
A website that helps people in Lagos find farmers markets. Where each market is, the days and hours it opens, and what produce is in season. It is our entry for TechWiz 7 and it is judged against the SRS, so every feature in that document exists and works.

## The frame every page sits in
The site is built with React using Vite. It is a single page application: the browser loads once and React Router swaps pages in and out without reloading. App.jsx sets up the router, wraps everything in the BookmarksProvider, and renders the Navbar, the page area, the ChatbotWidget and the Footer. Every page renders inside that frame.

Shared components in src/components:
- Navbar: logo, the five links, the search button, the bookmark button with its live count, the non functional Login button the brief requires, the Find a Market button, and the collapsible menu at phone widths.
- Footer: brand, Explore links, Popular Markets, Contact, the live clock and the simulated visitor counter.
- SearchOverlay: opens from the navbar search button, shows matching markets and produce as you type, and sends Enter to the Directory with the text as a q parameter.
- ChatbotWidget: the floating assistant on every page, driven by chatbot.json through the rule engine in src/utils/chatbot.js.
- MarketCard: the one card used everywhere markets are listed, with photo, open badge, bookmark button, name, area, hours and description.
- BookmarkButton: the round save button used on every market and produce card.
- Breadcrumbs: the Home › Page trail at the top of every page except Home.

## The pages and who built them
- Home, Bookmarks and Not Found: Gerald.
- Market Directory and Contact Us: Amanda.
- Market Detail and About Us: Ibrahim.
- Produce Guide and Seasonal Picks: Osakue.
Each page has one CSS file in src/styles with class names starting with the page name.

## Styling
One theme file, src/styles/theme.css, holds every color, font, spacing, radius and text size as a variable. index.css applies the fonts, the box sizing rule, the container and the shared button and card classes. No raw hex codes inside pages. Two breakpoints only, 900px for tablets and 600px for phones.

## The data is the center
There is no backend and no database. The database is three JSON files in src/data. Pages import them like any module and read them. Nothing is ever written back and nothing is sent to a server.

markets.json is a list of eight markets. Each has an id, name, area, address, lat and lng, a short description, a longer about paragraph, an image name, a schedule with the seven days as open and close times or null when closed, a produce list of produce ids, and a featured flag.

produce.json is a list of 26 produce items. Each has an id, name, category, a season list of month numbers, a description, a markets list of market ids, and an image name.

chatbot.json is one object with the greeting, the default quick replies, the fallback, the entities the assistant recognises (market words, produce words and day words, keyed by the same ids) and the intents, each with keywords, an answer template, and optionally an action, a link and quick replies.

## How the three files connect
Everything joins on ids and nothing is typed twice.
- markets.produce holds produce ids. The detail page turns each id into a produce tile by looking it up in produce.json.
- produce.markets holds market ids. The Produce Guide and Seasonal Picks turn each id into a market name by looking it up in markets.json, and the Home and Directory filters use markets.produce to find markets that sell a chosen item.
- chatbot.json entities use the same market and produce ids, so when the assistant recognises the word tomato it opens produce.json with the id tomatoes and fills its answer from the real record. When it recognises Mile 12 it opens markets.json with the id mile12.
- Bookmarks store only ids in the browser session. The Bookmarks page turns them back into cards by looking them up in the two files.
- URLs use ids too: /market/mile12 and /directory?produce=tomatoes.
- Image names in both files feed the helpers in src/utils/images.js, so the file name in the data is the only place a photo is named.
If a market or produce item is ever added, it is one new record in one file and every page picks it up.

## Who reads which file
- Gerald. Home reads markets.json for the featured cards and the live search, and produce.json for what is in season. The chatbot reads all three files. Bookmarks reads markets.json and produce.json to rebuild saved cards from ids. The search overlay reads both to suggest matches.
- Amanda. Market Directory reads markets.json for the cards, filters and sorting, and produce.json only to fill the produce type dropdown. Contact reads no data file; it uses the browser location and the map helper.
- Ibrahim. Market Detail reads one record from markets.json by the id in the URL, then produce.json to build the typical produce tiles. About reads no data file; the team list lives in the page.
- Osakue. Produce Guide reads produce.json for the cards and markets.json to name the markets in Found at. Seasonal Picks reads produce.json for the picks and the calendar and markets.json for Best at.

## Shared helpers in src/utils
- schedule.js: hoursLabel turns a schedule into Mon–Sat · 6am–4pm, isOpenNow compares the clock with today's hours, openBadge returns OPEN NOW or when the market next opens, formatTime turns 06:00 into 6am, and DAY_KEYS maps the clock's day number to the schedule keys.
- season.js: currentMonth, inSeason and seasonLabel turn the month number lists into badges, picks and calendar bars.
- geo.js: distanceKm measures the distance between two coordinates.
- images.js: marketImage, produceImage and pageImage build image paths from the names in the data.
- links.js: mapEmbedUrl, directionsUrl and the share links.
- chatbot.js: the assistant's rule engine.

## Hooks and context
- useClock ticks every second and powers the footer clock, every open badge and the season checks.
- useGeolocation asks for the visitor's position and reports idle, loading, granted, denied or unsupported. It powers distance sorting, markets near you and the Contact map.
- BookmarksContext keeps saved markets, saved produce and notes in sessionStorage under one key and shares them with the navbar badge, every BookmarkButton, the detail page save button and the Bookmarks page. useBookmarks is how a component reads it. Closing the tab clears it, which is exactly what the brief asks for.

## The assistant, step by step
1. The text is lowercased, apostrophes removed, spaces tidied.
2. Entities are checked first: market words, produce words and day words from chatbot.json, matched as whole words.
3. A market mention fills the market info template from markets.json, adding that day's hours if a day was mentioned. A produce mention fills the produce info template from produce.json.
4. The word today goes to the open now check. Otherwise every intent with keywords is scored by the total length of its matched keywords and the best one wins.
5. Intents with an action compute their answer from the data: what is in season, which markets are open now, which open on a given day or the weekend, which are nearest after location is allowed. Other intents return their answer as written. If an action finds nothing it uses its noResults text. If nothing matches, the fallback and its chips are shown.
6. Answers can carry a link button to a page and their own quick replies.
Every sentence the assistant can say is written in chatbot.json. The engine only matches words and fills blanks from the other two files. No request ever leaves the browser.

## Open now and nearby
Schedules store real times, so one function serves every market on every page. isOpenNow compares the current day and minutes with today's entry. Distance sorting and markets near you appear only after the visitor allows location, and everything still works if they refuse.

## Routing
/ Home, /directory, /market/:id, /produce, /seasonal, /bookmarks, /contact, /about, anything else shows Not Found. The Directory reads area, day, produce, open and q from the address so the Home search panel, the search overlay and the assistant can send visitors to it with filters applied. The Vite base is /freshfind/ so the site can be hosted on GitHub Pages.
