# Gerald's walkthrough, line by line

I own the data in src/data, the theme, index.css, the shared components, the helpers in src/utils, the BookmarksContext, and the pages Home, Bookmarks and Not Found. This file explains the pieces I wrote or specified so that any team member can also explain them.

## The shared pieces the pages sit on

### Navbar.jsx
Holds two pieces of state, whether the search overlay is open and whether the mobile menu is open. `navItems` is the list the links are built from, so adding Contact was one line. NavLink from the router gives each link an active state, turned into the `is-active` class by `linkClass`. The bookmark link reads `count` from useBookmarks and renders the badge only when count is above zero. The Login button does nothing on purpose, the brief asks for a non functional one. The hamburger toggles the panel; two effects close the panel on route change and on Escape.

### Footer.jsx
Plain content plus two live pieces: LiveClock, which uses useClock, and VisitorCounter, which on first visit in a session stores a random number between 4000 and 6000 in sessionStorage and adds one on later visits, a simulated counter as the brief describes.

### BookmarksContext.jsx and useBookmarks
On start the provider reads the key ff_bookmarks from sessionStorage inside a try and catch (in case storage is blocked) and keeps `{ markets: [], produce: [], notes: {} }` in state. Every change writes it back. It exposes markets, produce, notes, count, isSaved(type, id), toggle(type, id), remove(type, id), setNote(id, text), getNote(id) and clearAll(). Because it is React context, every component that calls useBookmarks re renders when the store changes, which is how the navbar badge, every card's button, the detail page save button and the Bookmarks page stay in agreement.

### BookmarkButton.jsx
Takes type, id and label. Calls isSaved and toggle. Stops the click from bubbling so it works when placed over a card image, and is placed as a sibling of links rather than inside them, because a button inside a link would also follow the link.

### The helpers in src/utils
- schedule.js: DAY_KEYS, DAY_LABELS, formatTime, hoursLabel (groups consecutive days with the same hours into Mon–Sat), isOpenNow, nextOpening, openBadge, todayHours.
- season.js: MONTHS, currentMonth, inSeason, seasonLabel.
- geo.js: distanceKm using the haversine formula, rounded to one decimal.
- images.js: marketImage, produceImage, pageImage, each building the path with new URL so Vite bundles the file.
- links.js: mapEmbedUrl, directionsUrl, whatsappShareUrl, xShareUrl, facebookShareUrl.
- chatbot.js: the assistant's rule engine, below.

## Home.jsx

### Imports and constants
State and navigation from react and the router, both data files, pageImage and produceImage, currentMonth and inSeason, distanceKm, useClock, useGeolocation, MarketCard, the white version of the logo for the dark hero, and the stylesheet. `days`, `areas` and `produceOptions` are the dropdown lists, built from data the same way as in the Directory. The icons are inline SVGs. `locationLabel` maps location status to button text.

### Inside the component
- `navigate` sends the visitor to another page in code. `now` from the clock, location from the hook, and three pieces of state for the search panel.
- `seasonal` filters produce in season this month, sorts shortest season first and takes four.
- `nearby` is the four featured markets, or, once location is granted, all markets with a distance attached, sorted nearest first and cut to four.
- `hasFilters`, `matches` and `shown`: the moment a dropdown is chosen, `matches` filters the markets (same three rules as the Directory) and `shown` becomes those instead of `nearby`. This gives the dynamic results the brief asks for on the home page.
- `clearFilters` resets the three dropdowns. `handleSearch` stops the form's page reload with preventDefault, builds URL parameters with URLSearchParams from whatever is chosen, and navigates to the Directory with them, so Amanda's page opens pre filtered.

### The JSX
- The hero uses hero.png as an inline background style, the dark overlay comes from CSS, and the search form holds three controlled selects inside `.home-search-field` blocks with icons, and a round submit button.
- The markets section head switches between Markets near you and N matching markets, and between the location button and the Clear search button, based on hasFilters. The grid renders MarketCard for each entry of `shown`, or the empty message.
- In season this week maps `seasonal` into round image links to the Produce Guide.

## MarketCard.jsx
Takes market, distance and now. Computes the badge with openBadge, the hours line with hoursLabel, the image with marketImage. The image and title are Links to the detail page. The badge and the BookmarkButton sit over the image. The distance line appears only when distance is not undefined. This one component is used by Home, the Directory and can be used by Bookmarks, so every market card on the site is the same code.

## The chatbot

### chatbot.js, the rule engine
- `normalize` lowercases the text, removes apostrophes (so whats and what's match the same keyword) and tidies spaces.
- `hasWord` builds a regular expression with word boundaries, so the keyword hi does not match inside which.
- `findEntity` scans a table of words (markets, produce or days from chatbot.json) and returns the id of the longest matching word, so lekki fresh beats lekki.
- `scoreIntent` adds up the lengths of every keyword of an intent found in the text; longer, more specific phrases outscore short ones.
- `fill` replaces each `{placeholder}` in a template with a value.
- `nextOpen` walks forward through a schedule to find the next opening, skipping today if the market already opened.
- `marketInfo` fills the market info template from the market record, adds that day's hours when a day was mentioned and Open right now when isOpenNow says so, and builds the link to the market page. `produceInfo` does the same for a produce record. `seasonal`, `openNow`, `openDay` and `nearMe` compute their lists from the data and fill their templates; each has a noResults path.
- `answerQuestion` is the entry point: normalize, find entities, route a market mention to marketInfo, a produce mention to produceInfo, the word today to openNow; otherwise score all intents, and if a day was mentioned with an opening kind of intent go to openDay; then dispatch by the winning intent's action, or return its written answer, or the fallback.

### ChatbotWidget.jsx
State: open, the message list, the current chips, the input text, typing. `makeMessage` creates a message object with a unique id. `send` adds the visitor's bubble, calls answerQuestion with the current time and the coordinates if granted, asks for location when the near me action had none, and after half a second adds the bot's bubble, its link and its chips. Effects scroll to the newest message, focus the input when opened and close on Escape. Links inside answers are router Links that close the panel.

## Bookmarks.jsx
Reads the saved ids from useBookmarks and turns them into records with find. `tab` picks Markets or Produce, starting on Produce only when there are no saved markets. `buildList` writes the export text using hoursLabel and seasonLabel and any notes. `handleExport` copies the text to the clipboard inside a try and catch, then creates a text file with a Blob and downloads it by clicking an invisible link, then shows a short status. `shareText` is the message behind the share icons, built from the saved names. Each card has a note input bound to getNote and setNote and a remove button. Two empty states link to the Directory and the Produce Guide.

## SearchOverlay.jsx
Takes open and onClose. Keeps the query text, clears it and focuses the input when opened, closes on Escape. Filters markets by name or area and produce by name while typing and shows up to four of each as links. Enter navigates to the Directory with q set to the text. Clicking the dark background closes it; clicking inside the panel does not, because stopPropagation keeps the click from reaching the background.

## NotFound.jsx
A 404 message and two links, Home and Browse markets. Rendered by the router for unknown addresses and by the detail page for unknown ids.

## How everything connects, in one paragraph
Three JSON files hold every fact, joined by ids. The helpers turn those facts into hours, badges, seasons, distances, paths and links, once, for everyone. The shared frame and the shared card make every page look the same. The bookmarks context lets any page save an id and every page see it. The Directory accepts filters in the address, so Home, the search overlay and the assistant can send visitors there. The assistant reads the same three files and its answers link back into the pages. Nothing is stored anywhere but the visitor's own browser session.

## Questions judges may ask me
- Why React with Vite? Nine pages share one frame and a set of components; Vite builds fast and outputs a static site.
- Why JSON and not a database? The brief forbids a backend; JSON is the data store it asks for and it ships with the site.
- Is the assistant AI? No. Every sentence it can say is in chatbot.json; the engine only matches words and fills blanks.
- Why session storage for bookmarks? The brief says notes are session only and nothing may be stored on a server.
- How would you add a market? One record in markets.json, one photo, and every page picks it up.
- What did AI tools do on this project? Mockups and photos, scaffolding and helper functions we reviewed, planning and debugging help. It is all listed in docs/AI_TOOLS.md, and we can explain every file.
