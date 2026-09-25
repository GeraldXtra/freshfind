# Site map, explained

Image: docs/diagrams/png/01-site-map.png. Source: docs/diagrams/01-site-map.md.

## What it shows
The pages of FreshFind and how a visitor moves between them. It is the map of the whole site in one picture.

## The shapes
- Every box is a page or a feature the visitor can reach.
- A solid arrow means "you can get from here to there with one click".
- There are no decisions on this diagram, it is structure, not logic.

## Reading it step by step
- Home is at the top because it is the entry point. From Home the visitor can reach the Market Directory, the Produce Guide, Seasonal Picks, About Us and Contact Us through the navbar, and My Bookmarks through the bookmark icon in the navbar.
- Market Directory, Produce Guide, Seasonal Picks and My Bookmarks all point to Market Detail, because each of them shows market cards or market links, and clicking one opens that market's page.
- My Bookmarks also points to the Produce Guide, because saved produce items link there.
- The chatbot box is drawn once but exists on every page. Its arrows to Market Detail, the Produce Guide and the Directory are the link buttons inside its answers.
- The search overlay box is also on every page. Its results link to a market page or, on Enter, to the Directory.
- Not Found catches any wrong address and sends the visitor back to Home.

## The logic behind it
Every page is reachable within two clicks from Home. Market Detail is the page most arrows point to because a market is what everyone is looking for. The chatbot and the search are drawn outside the page tree because they float over every page instead of being pages themselves.

## Where it lives in the code
App.jsx lists the routes. Navbar.jsx holds the links. The arrows into Market Detail are the Link elements inside MarketCard.jsx, ProduceGuide.jsx, Seasonal.jsx, Bookmarks.jsx, SearchOverlay.jsx and the chatbot answers in chatbot.json.

## Questions judges may ask
- How many pages are there? Nine pages plus Not Found.
- Why is Contact reachable from Home? It is in the navbar and the footer, and the chatbot links to it.
- Why is the chatbot not a page? It is a floating widget rendered by App.jsx under every page.
