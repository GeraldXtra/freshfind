# Data Flow Diagram, Level 1, explained

Image: docs/diagrams/png/04-dfd-level-1.png. Source: docs/diagrams/04-dfd-level-1.md.

## What it shows
Level 1 opens the single circle from Level 0 and shows the six processes inside FreshFind, with the data each one reads and returns. The outside things and the stores are the same as Level 0.

## The shapes
- Rounded box: the Visitor, the external entity.
- Circles numbered 1.0 to 6.0: the processes. The numbering is the DFD convention for the first level of detail.
- Cylinders D1 to D4: the data stores. D1 markets.json, D2 produce.json, D3 chatbot.json, D4 sessionStorage. Naming stores D1, D2 and so on is also the convention.
- Plain boxes: the browser clock, the browser geolocation and Google Maps.
- Labelled arrows: the data flows.

## Reading it process by process
- 1.0 Search and filter markets. Receives area, day, produce and text from the visitor. Reads D1 for the markets and D2 for the produce names in the dropdown. Reads the clock for open now and the geolocation for distances. Returns market cards. This is the Home search and the Directory.
- 2.0 Show market detail. Receives a market id. Reads D1 for the record and D2 for the produce tiles. Reads the clock for today and the next opening. Returns the detail page.
- 3.0 Browse produce and seasons. Receives a category or a month. Reads D2 for the items and D1 for market names. Reads the clock for the current month. Returns the guide and the calendar.
- 4.0 Answer questions. Receives a question. Reads D3 for intents and entities, D1 and D2 for the facts, the clock for time based answers and the geolocation for near me. Returns an answer with a link.
- 5.0 Manage bookmarks. Receives save, note, remove and export actions. Reads and writes D4, the only two way arrow on the diagram. Reads D1 and D2 to turn saved ids back into cards. Returns the bookmark list and the text file.
- 6.0 Show location and maps. Receives allow location. Reads the geolocation and the coordinates in D1. Sends coordinates to Google Maps and receives the map. Returns maps and directions.

## The logic behind it
Each process reads only what it needs. D1 is read by every process because markets are the heart of the site. D3 is read only by the assistant. D4 is written only by bookmarks. The clock feeds four processes, which is why one shared hook provides it.

## Where it lives in the code
1.0 Home.jsx and Directory.jsx. 2.0 MarketDetail.jsx. 3.0 ProduceGuide.jsx and Seasonal.jsx. 4.0 chatbot.js and ChatbotWidget.jsx. 5.0 BookmarksContext.jsx, BookmarkButton.jsx and Bookmarks.jsx. 6.0 useGeolocation, links.js and the map iframes in MarketDetail.jsx and Contact.jsx.

## Questions judges may ask
- Which process writes data? Only 5.0, and only to the session store.
- Why does the assistant read all three files? Its answers are filled from real market and produce records, and its rules come from chatbot.json.
- Who built each process? 1.0 Gerald and Amanda, 2.0 Ibrahim, 3.0 Osakue, 4.0 and 5.0 Gerald, 6.0 shared between Amanda, Ibrahim and Gerald.
