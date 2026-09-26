# Amanda's walkthrough, line by line

You own four files: src/pages/Directory.jsx, src/styles/directory.css, src/pages/Contact.jsx and src/styles/contact.css. Read this with the files open beside it.

## Directory.jsx

### The imports
- `import { useEffect, useState } from 'react'` gives us state (values the page remembers and reacts to) and effects (code that runs when the page opens or when something changes).
- `import { useSearchParams } from 'react-router-dom'` lets the page read the address bar, so /directory?day=sat arrives with the day already chosen.
- `import markets from '../data/markets.json'` and `import produce from '../data/produce.json'` load the two data files. Vite turns JSON into a normal JavaScript list, so `markets` is an array of eight market objects.
- `import { DAY_KEYS, isOpenNow } from '../utils/schedule'` brings two shared helpers: DAY_KEYS maps the clock's day number to the schedule keys, isOpenNow tells us if a market is open at this moment.
- `import { distanceKm } from '../utils/geo'` measures kilometres between two points on the map.
- `import useClock from '../hooks/useClock'` gives the current time, ticking every second.
- `import useGeolocation from '../hooks/useGeolocation'` asks the browser where the visitor is.
- `import Breadcrumbs from '../components/Breadcrumbs'` and `import MarketCard from '../components/MarketCard'` are shared components built by Gerald. You use them, you do not edit them.
- `import '../styles/directory.css'` attaches your stylesheet.

### Before the component
- `const days = [ ... ]` is the list behind the day dropdown. Each entry has a `value` (the key used in the schedule, like sat) and a `label` (what the visitor reads, like Saturday). Values match markets.json exactly, which is why the filter can look up `market.schedule[day]`.
- `const areas = [...new Set(markets.map((market) => market.area))].sort()` builds the area dropdown from the data. `map` pulls out every area name, `new Set` removes duplicates, the spread `[...]` turns the Set back into a list, `sort()` puts it in alphabetical order. If Gerald adds a market in a new area tomorrow, the dropdown grows on its own.
- `const produceOptions = [...produce].sort((a, b) => a.name.localeCompare(b.name))` copies the produce list and sorts it by name. We copy first because `sort` changes the list it is called on, and we never want to reorder the shared data.
- `function daysUntilOpen(schedule, now)` answers "how many days until this market next opens" for the next open day sort. The loop runs `offset` from 0 to 6. `now.getDay()` gives today as a number, Sunday is 0 and Saturday is 6, and DAY_KEYS is ordered the same way, so `DAY_KEYS[(now.getDay() + offset) % 7]` is the key for today, tomorrow and so on. The `% 7` wraps Saturday back round to Sunday. The first day whose schedule entry is not null returns its offset. If a market had no open day at all it returns 7 so it sorts last.
- `function locationLabel(status)` turns the five possible location statuses into the text on the button. It is a plain chain of ifs.

### Inside the component
- `const [searchParams] = useSearchParams()` reads the address. The hook returns a pair, we only need the first item.
- `const now = useClock()` makes the page re render every second, which keeps every OPEN NOW badge truthful without the visitor refreshing.
- `const { status, coords, request } = useGeolocation()` gives the location status, the coordinates once granted, and a function to ask for permission.
- The six `useState` lines are the page's memory: area, day, item (the chosen produce id), openOnly, query and sort. Each returns the current value and a function to change it. They start empty, except sort which starts as name.
- The `useEffect` runs when the page opens and again any time the address changes, because `[searchParams]` is its dependency list. Each line reads one parameter, for example `searchParams.get('area')`. When a parameter is missing, get returns null, and `|| ''` turns that into an empty string so the dropdown shows All areas. This effect is the bridge from the Home search panel, the search overlay and the chatbot into your page.
- `const hasLocation = status === 'granted' && coords` is true only after the visitor said yes and a position arrived.
- `const text = query.trim().toLowerCase()` cleans the search text once so every comparison below is simple.
- `const filtered = markets.filter((market) => { ... })` is step one. `filter` keeps a market only when the function returns true. Inside, each `if` returns false for a market that fails a switched on filter: `area && market.area !== area` (an area is chosen and this market is elsewhere), `day && !market.schedule[day]` (a day is chosen and the schedule has null for it), `item && !market.produce.includes(item)` (a produce is chosen and the market's produce id list does not contain it), `openOnly && !isOpenNow(market.schedule, now)` (open now is on and the helper says closed), and the text check that looks in the name and the area. If no if fires, `return true` keeps the market. Because every condition must pass, the filters combine as ands.
- `const withDistance = filtered.map((market) => ({ market, distance: ... }))` is step two. It wraps each market in an object with a distance, computed with distanceKm from the visitor's coords to the market's lat and lng, but only when hasLocation is true. Otherwise distance is undefined, and MarketCard hides the distance line when it is undefined.
- `const sorted = [...withDistance]` is step three. We copy again before sorting. Then three ifs: by name using `localeCompare` (correct alphabetical order for text), by `daysUntilOpen` (smaller number first, so open today comes before opens Saturday), or by distance when location is on. Only one runs because sort holds one value.
- `const hasFilters = Boolean(...)` is true if anything is switched on. It shows the Clear filters button.
- `function clearFilters()` sets all six pieces of state back to empty, which makes React redraw the full list.

### The JSX from top to bottom
- `<Breadcrumbs trail={[...]} />` draws Home › Market Directory. The last item has no `to`, so it is plain text.
- The head shows the title and `{markets.length} markets across Lagos`, a real count from the data.
- Each `<select>` is a controlled input: `value={area}` shows the state, `onChange={(event) => setArea(event.target.value)}` writes the visitor's choice back into state. The `<option value="">` line is the "nothing chosen" choice. The options are built with `.map` from the lists above, each with a `key` so React can track them.
- The Open now control is a `<button>` because a button is keyboard accessible and needs no form. `onClick={() => setOpenOnly(!openOnly)}` flips it. `aria-pressed` tells screen readers it is a toggle. The inner `<span className="directory-toggle-knob" />` is the little switch, drawn entirely in CSS.
- The location button calls `request` and is disabled while loading or once granted, so nobody spams the permission prompt. Its text comes from locationLabel.
- The sort `<select>` includes the Distance option only when `hasLocation` is true, using `{hasLocation && <option>...}`.
- The results row shows the count and, when hasFilters is true, the Clear filters button.
- `{sorted.length === 0 ? (...) : (...)}` is an if in JSX: empty state with a Show all markets button, or the grid. In the grid, `sorted.map(({ market, distance }) => <MarketCard key={market.id} market={market} distance={distance} now={now} />)` renders one shared card per result. The card does the photo, badge, bookmark and hours itself, which is why your page does not.

### directory.css in groups
- `.directory-filters` is a white card using flex with wrapping, so the controls line up on desktop and wrap on smaller screens. `.directory-filters-right` uses `margin-left: auto` to push the location button and sort to the right end.
- `.directory-select`, `.directory-toggle` and `.directory-location` share the same height (44px) and pill radius so the bar looks like one family.
- The toggle knob is a rounded track with a `::after` circle. When the button has `is-on`, the track turns green and `transform: translateX(18px)` slides the circle to the right; the `transition` lines animate it.
- `.directory-grid` is a CSS grid with three equal columns, two at 900px and one at 600px, matching the breakpoints in the team guide.
- `.directory-empty` is the dashed box for no results.
Every color, spacing and radius is a theme variable, which is what keeps your page looking like everyone else's.

### How it connects
- It reads markets.json and produce.json and never changes them.
- It uses four shared helpers and two shared hooks so open now, distances and time work exactly like on Home and the detail page.
- It renders MarketCard, which contains BookmarkButton, which talks to the BookmarksContext. That is why saving a market on your page updates the navbar badge and Gerald's Bookmarks page.
- It receives filters from the address bar, sent by Gerald's Home search, the search overlay and the chatbot links.
- Each card links to /market/ plus the id, which is Ibrahim's page.

### Why this way
Three plain steps, filter then decorate then sort, are easy to read and easy to explain. State plus controlled inputs is the standard React pattern. No extra libraries, because the brief wants frontend only and the judges want code we understand.

### Changes you can make yourself
- Change the default sort to next open day by editing `useState('name')` to `useState('next')`.
- Add a fourth quick filter, for example `weekend`, by adding a day value and handling it in the filter with `market.schedule.sat || market.schedule.sun`.
- Change the empty state wording.

## Contact.jsx

### The imports
- `useEffect` from react, to ask for location when the page opens.
- `pageImage` from the images helper, to load contact-basket.webp by name.
- `mapEmbedUrl` from the links helper, which builds a Google Maps address from a latitude and longitude with no API key.
- `useGeolocation`, `Breadcrumbs`, and the stylesheet.

### Before the component
- `const LAGOS = { lat: 6.5244, lng: 3.3792 }` is the centre of Lagos, used when we have no permission yet.
- The icon functions each return a small inline SVG. We draw icons this way rather than using an icon library because it keeps the project dependency free, and `stroke="currentColor"` makes each icon take the text color of its parent, so CSS controls it.

### Inside the component
- `const { status, coords, request } = useGeolocation()`.
- `const point = status === 'granted' && coords ? coords : LAGOS` decides what the map shows: the visitor when granted, Lagos otherwise.
- `useEffect(() => { request() }, [request])` asks for permission as soon as the page opens, which matches the You are here design. The dependency `[request]` means it only reruns if the request function itself changes, which it does not.

### The JSX from top to bottom
- The banner section holds the breadcrumb, the title and the two line subtitle (`<br />` forces the line break). Beside it, `.contact-banner-art` holds the basket image with an empty `alt=""` because it is decorative.
- The grid holds two cards. The left card is four `.contact-row` blocks, each with a round icon, a small uppercase label, the value (an `<a href="mailto:...">` for email and `<a href="tel:...">` for phone, which open the visitor's mail or phone app) and a note. The social row is four icon links.
- The right card is the map card: a header, then `<iframe src={mapEmbedUrl(point.lat, point.lng)} ... />`. An iframe is a window into another page, here Google Maps. Then the note box whose text depends on status: each `{status === '...' && (...)}` line renders only when its status is true, so exactly one sentence shows. The denied sentence includes a Try again button that calls request again.

### contact.css in groups
- `.contact-banner` is `position: relative` with `overflow: hidden`; `.contact-banner-art` is absolutely positioned to the right edge, and its `::before` paints a gradient from cream to transparent so the photo fades into the banner instead of ending with a hard edge.
- `.contact-grid` is a two column grid, slightly wider on the right for the map, one column at 900px.
- `.contact-card:hover` sets `transform: none` so these cards do not lift like market cards; they are not clickable.
- `.contact-row` blocks are separated by a thin border, with the first and last losing their outer padding.
- The map is a fixed height iframe, smaller at each breakpoint. The art is hidden on phones to save space.

### How it connects
- Contact reads no data file. Its details are typed to match the Footer on purpose, so the site says one thing about how to reach us.
- It uses the same useGeolocation hook as Home and the Directory, so a visitor who allowed location on one page is already allowed here.
- It is reached from the Contact link in the navbar, from the footer and from the chatbot's contact answer.

### Changes you can make yourself
- Change the reply time sentence or business hours text.
- Adjust the map height in your CSS. The zoom level lives in the shared links helper, so ask Gerald before changing that.

## Questions judges may ask you
- How do the filters combine? They are all ands. A market must pass every switched on filter.
- Why does the Distance sort only appear sometimes? It needs the visitor's position, which the browser gives only after permission.
- Where does the areas list come from? From the data, deduplicated with a Set, so it stays in sync with markets.json.
- Why accept filters from the address bar? So the Home search, the search overlay and the chatbot can send visitors here with the right filters, and so a filtered link can be shared.
- What happens if I block location on Contact? The map shows Lagos, the note explains, and everything else works. The brief requires the site to work without it.
- Is the map a real Google map? Yes, an embed, which needs an internet connection but no API key and no backend.
