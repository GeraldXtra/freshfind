# Gerald's walkthrough

## What I own
The data files in src/data, the theme and index.css, the shared components (Navbar, Footer, SearchOverlay, ChatbotWidget, MarketCard, BookmarkButton, Breadcrumbs), the helpers in src/utils, the BookmarksContext, and the pages Home, Bookmarks and Not Found.

## Home page (src/pages/Home.jsx and src/styles/home.css)
The page keeps three pieces of state for the search panel: area, day and produce. The dropdown options are built from the data, so the areas come from the unique area values in markets.json and the produce list from produce.json sorted by name.

Two things happen with the search. First, live filtering: hasFilters is true as soon as one dropdown is chosen, and matches is the markets list run through one filter that drops a market failing any chosen condition. The section heading changes to the number of matches and the grid shows them at once. Second, the round Search button submits the form and navigates to the Directory with the choices as URL parameters, so Amanda's page opens with the same filters applied.

When nothing is chosen the grid shows nearby: the four markets with featured true, or, once the visitor allows location, all markets sorted by distanceKm and cut to four, each card showing its distance.

In season this week filters produce.json with inSeason for the current month from useClock, sorts by season length so the truly seasonal items come first, and shows four.

The hero uses hero.png as a background with a dark overlay so the white text stays readable. All cards are the shared MarketCard.

## MarketCard (src/components/MarketCard.jsx)
Takes a market, an optional distance and the current time. It builds the badge with openBadge, the hours line with hoursLabel, the photo with marketImage, and places a BookmarkButton over the image. The image and the title are links to /market/ plus the id. The button sits outside the link on purpose, because a button inside a link would also trigger the link.

## Chatbot (src/components/ChatbotWidget.jsx, src/utils/chatbot.js, src/styles/chatbot.css)
The widget holds the open state, the message list, the current quick reply chips, the input text and a typing flag. Sending a message adds the visitor's bubble, calls answerQuestion in chatbot.js, and after half a second adds the bot's bubble with its link button and chips. Escape closes it and the list scrolls to the newest message.

answerQuestion is the rule engine. It normalises the text, looks for market, produce and day entities, and routes: a market mention fills the market info template, a produce mention fills the produce info template, the word today runs the open now check, otherwise intents are scored by matched keywords and the best one answers, either as written or computed from the data (seasonal, open now, open on a day, near me). Templates use placeholders like {marketName} that fill is a simple text replace. If nothing matches the fallback is shown. If the near me action has no location yet, the widget asks the browser for it.

## Bookmarks page (src/pages/Bookmarks.jsx and src/styles/bookmarks.css)
useBookmarks gives the saved market ids, produce ids, the notes, remove, setNote, getNote, clearAll and count. The page turns ids back into full records by finding them in the data files, shows them under two tabs, and lets the visitor type a note that setNote stores next to the id. Export builds a plain text list with hoursLabel and seasonLabel, copies it to the clipboard and downloads it as freshfind-bookmarks.txt. The share icons open WhatsApp, X and Facebook with a message built from the saved names. Everything lives in sessionStorage, so it clears when the tab closes.

## BookmarksContext (src/context/BookmarksContext.jsx)
Loads the saved object from sessionStorage on start, writes it back on every change, and shares it through React context so the navbar badge, every card and the Bookmarks page always agree.

## Search overlay (src/components/SearchOverlay.jsx)
Filters markets by name or area and produce by name as you type and shows up to four of each as links. Enter navigates to the Directory with q set to the text.

## Questions judges may ask
- Why React? Nine pages share one frame, and components let us build the card, the badge and the bookmark button once.
- Why JSON files? The brief forbids a backend. JSON files are the data store the brief asks for and they load with the page.
- How does open now work? Schedules store real times; isOpenNow compares the clock with today's entry.
- Is the chatbot real AI? No. It is a rule engine reading three local files. Every sentence it can say is in chatbot.json.
- Why do bookmarks vanish when the tab closes? The brief says notes are session only and nothing may be stored on a server, so we use sessionStorage.
