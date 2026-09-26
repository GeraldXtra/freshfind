# Amanda's walkthrough

## What I own
src/pages/Directory.jsx with src/styles/directory.css, and src/pages/Contact.jsx with src/styles/contact.css.

## Market Directory, how it works
The page keeps six pieces of state: area, day, produce item, open now, the search text and the sort order. They start empty, and one useEffect reads the address bar with useSearchParams when the page opens, so a link like /directory?day=sat&produce=tomatoes arrives with those filters already set. That is how the Home search panel, the search overlay and the chatbot hand visitors to my page.

The list is built in three plain steps.
1. filtered runs markets.json through one filter. Each if inside it throws out a market that fails a switched on filter: wrong area, closed on the chosen day, does not sell the chosen produce, not open now (using isOpenNow with the clock), or name and area not containing the search text.
2. withDistance attaches a distance to each market with distanceKm, but only when the visitor has allowed location through useGeolocation. Otherwise distance stays undefined and the cards simply do not show it.
3. sorted copies that list and sorts it one of three ways: by name, by how many days until the market next opens, or by distance. daysUntilOpen counts forward from today through the schedule using DAY_KEYS and returns the number of days to the first open day.

The dropdown options come from the data: unique areas from markets.json and produce names from produce.json. The open now control is a button that flips openOnly. The Distance sort option appears only after location is granted. The count line shows the number of results and Clear filters resets all six pieces of state. The grid renders the shared MarketCard for every result, so my cards are identical to the Home cards. If nothing matches, an empty state offers to show all markets.

## Contact, how it works
The page has almost no state of its own. useGeolocation gives status, coords and request. A useEffect calls request when the page opens, so the browser asks for permission at once. point is the visitor's coordinates when granted, otherwise the centre of Lagos, and it feeds mapEmbedUrl, which builds a Google Maps embed address with no API key. The note under the map changes with the status, so allowed, blocked and unsupported each get a clear sentence, and blocked offers a Try again link. The contact details match the footer on purpose.

## Questions judges may ask
- How do the filters combine? They are all ands. A market must pass every switched on filter to stay in the list.
- How does sorting by distance know where I am? The browser's geolocation, only after you allow it. We never store the position.
- Why does the page accept filters from the address bar? So other pages can send visitors here with the right filters, and so a link with filters can be shared.
- What happens if I block location on Contact? The map shows Lagos and the site still works. The brief requires the site to be usable without it.
