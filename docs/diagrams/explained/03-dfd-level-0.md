# Data Flow Diagram, Level 0, explained

Image: docs/diagrams/png/03-dfd-level-0.png. Source: docs/diagrams/03-dfd-level-0.md.

## What a DFD is
A Data Flow Diagram shows where information comes from, what handles it, where it is kept and where it goes. It does not show the order of clicks; the flowcharts do that. A Level 0 DFD, also called a context diagram, treats the whole system as one process and shows everything outside it that sends or receives data.

## The shapes
- The rounded box marked Visitor is an external entity: a person outside the system who sends data in and gets data back.
- The circle marked FreshFind web app is the one process, the whole system.
- Cylinders are data stores: markets.json, produce.json, chatbot.json and the browser's sessionStorage.
- Plain boxes at the edges are other outside things the system talks to: the browser clock, the browser geolocation, the Google Maps embed, and a box for what does not exist, a server.
- Every solid arrow is a data flow and its label says what data moves. A dotted arrow marks something that never happens.

## Reading it flow by flow
- Visitor to app: searches, filters, clicks and questions. App to visitor: pages, cards, answers and maps.
- markets.json to app: market records. produce.json to app: produce records. chatbot.json to app: intents and entities. All three arrows point one way, into the app, because the app only reads them.
- App and sessionStorage: a two way arrow labelled saved ids and notes. This is the only store the app writes to, and it lives in the visitor's own browser.
- Browser clock to app: the current day and time, which drives open now and the seasons.
- Browser geolocation to app: the position, labelled "only after permission".
- App to Google Maps: coordinates. Google Maps to app: the map image shown in the iframe.
- The dotted arrow to "No server, no database" says that no data ever leaves the browser.

## The logic behind it
The picture makes the SRS constraints visible: three read only files as the data source, one session store for bookmarks, no server. Everything the system knows comes from the three files, the clock and the visitor.

## Where it lives in the code
The three files are in src/data. sessionStorage is used by BookmarksContext.jsx and VisitorCounter.jsx. The clock is useClock, the geolocation is useGeolocation, the map is the iframe built by mapEmbedUrl in links.js.

## Questions judges may ask
- Why is there no server on the diagram? Because the brief forbids one; the dotted arrow states that on purpose.
- Where is user data stored? Only in sessionStorage in the visitor's browser, and only bookmark ids and notes.
- Does the map send our data anywhere? It receives coordinates to draw the map, nothing about the visitor.
