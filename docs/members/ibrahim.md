# Ibrahim's walkthrough

## What I own
src/pages/MarketDetail.jsx with src/styles/market-detail.css, and src/pages/About.jsx with src/styles/about.css.

## Market Detail, how it works
useParams reads the id from the address, for example mile12 from /market/mile12. The page finds that one record in markets.json. If there is no such id it renders the Not Found page instead, so a wrong link never breaks.

Everything on the page is that one record. The banner uses marketImage for the photo, openBadge from the clock for OPEN NOW or when it next opens, and a save button that calls toggle from useBookmarks and shows Saved when isSaved is true. The About section prints the about field.

The weekly schedule is a table built by looping over the seven days. For each day the schedule entry is either null, printed as Closed, or an object with open and close printed through formatTime. Today's row gets the is-today class and a Today tag; today comes from DAY_KEYS and the clock's day number.

Typical produce turns the market's produce ids into full records by finding each in produce.json, then shows a tile with produceImage and the name, linking to the Produce Guide.

The side card holds the map, an iframe whose address comes from mapEmbedUrl with the market's lat and lng, the address and area from the record, the next opening from nextOpenLabel, and a Get Directions link built by directionsUrl that opens Google Maps in a new tab. nextOpenLabel walks forward from today through the schedule and returns Today at, Tomorrow at or the day name with the opening time. The card is sticky on desktop and stacks under the main content on tablets and phones.

## About, how it works
Plain content: the mission hero with about-mission.webp fading into the cream background, three reasons with icons, and a team list rendered into cards. Each card shows the person's initials in a green circle and lays the photo over it, so if a photo file is missing the initials show instead.

## Questions judges may ask
- Where does the schedule come from? The market's schedule object in markets.json, seven keys, each null or open and close times.
- How is today highlighted? The clock gives the day number, DAY_KEYS turns it into the schedule key, and that row gets a class.
- What if the address has an id that does not exist? The page shows Not Found.
- Does the map need an API key? No. It is a Google Maps embed address built from the coordinates.
