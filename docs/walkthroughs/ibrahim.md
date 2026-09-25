# Ibrahim's walkthrough, line by line

You own four files: src/pages/MarketDetail.jsx, src/styles/market-detail.css, src/pages/About.jsx and src/styles/about.css.

## MarketDetail.jsx

### The imports
- `import { Link, useParams } from 'react-router-dom'`. Link makes clickable links that change the page without reloading. useParams reads the changing part of the address, the id in /market/:id.
- `markets` and `produce` from the data files.
- `import { DAY_KEYS, formatTime, openBadge } from '../utils/schedule'`. DAY_KEYS maps the clock's day number to schedule keys, formatTime turns 06:00 into 6am, openBadge returns the OPEN NOW or OPENS SAT badge for a schedule.
- `import { mapEmbedUrl, directionsUrl } from '../utils/links'` build the map address and the Google Maps directions address from coordinates.
- `useClock`, `useBookmarks` (the hook that talks to the shared bookmarks store), `Breadcrumbs`, and `NotFound` (Gerald's 404 page, which you render when the id does not exist).
- Your stylesheet.

### Before the component
- `const weekDays = [...]` is the table order, Monday first, each with the schedule `key` and the display `label`.
- `const dayNames = {...}` maps a key to its full name, used by the next opening text.
- `function toMinutes(time)` turns "06:00" into 360 minutes so times can be compared as numbers. `split(':')` cuts the text at the colon, `map(Number)` turns both halves into numbers.
- `function nextOpenLabel(schedule, now)` finds the next opening. `nowMinutes` is the current time in minutes. The loop goes from offset 0 to 7 so it can wrap through a full week. For each day it takes the schedule entry; `continue` skips closed days. On offset 0 (today) it also skips if the market already opened earlier today, `toMinutes(entry.open) <= nowMinutes`, because that opening has passed. The first surviving entry returns Today at, Tomorrow at, or the day name with the opening time. If the loop finishes, nothing was found.
- The icon functions are inline SVGs, no library, colored by `currentColor`. BookmarkIcon takes a `filled` prop and switches `fill` between currentColor and none so the same icon shows saved or not saved.

### Inside the component
- `const { id } = useParams()` reads the id from the address.
- `const now = useClock()` and `const { isSaved, toggle } = useBookmarks()` are called before anything else on purpose: React requires hooks to run in the same order every time, so they must come before the early return below.
- `const market = markets.find((entry) => entry.id === id)` finds the one record whose id matches. `find` returns the first match or undefined.
- `if (!market) return <NotFound />` handles a wrong or old link by showing the Not Found page instead of crashing.
- `const badge = openBadge(market.schedule, now)` gives `{ open, text }`.
- `const todayKey = DAY_KEYS[now.getDay()]` is the schedule key for today.
- `const saved = isSaved('market', market.id)` asks the bookmarks store whether this market is saved.
- `const items = market.produce.map((produceId) => produce.find(...)).filter(Boolean)` turns the market's list of produce ids into full produce records, then `filter(Boolean)` drops any undefined in case an id has no record, so a typo in data can never break the page.

### The JSX from top to bottom
- Breadcrumbs with three steps, the last being the real market name.
- The banner section sets its background with an inline style, `style={{ backgroundImage: ... }}`, because the image is different per market and comes from data, which CSS cannot know. Inside it, the badge span takes the class `is-open` when `badge.open` is true, the save button calls `toggle('market', market.id)` and shows Saved or Save this market based on `saved`, and the title is the market name.
- The grid has two children. The main card holds three sections. About prints `market.about`. Weekly Schedule is a `<table>`; `weekDays.map` returns one `<tr>` per day, with `entry` being that day's schedule and `isToday` comparing the key to todayKey. The row gets the `is-today` class when true, the first cell is a `<th scope="row">` (a row heading, good for screen readers), the second prints the times with formatTime or the word Closed, the third shows a Today tag only on today's row. Typical Produce maps `items` into tiles, each a Link to the Produce Guide with the round image and name.
- The aside is the side card. The iframe shows the map at the market's coordinates. Three info blocks show the address and area from the record and the next opening, which prints Open right now when the badge is open, otherwise nextOpenLabel. The Get Directions link opens `directionsUrl` in a new tab; `rel="noreferrer"` is the safe way to open new tabs.

### market-detail.css in groups
- `.detail-banner` is `position: relative` with the photo as background and a `::before` gradient that darkens the bottom so the white title stays readable. The badge and save button are absolutely positioned in the corners.
- `.detail-grid` is a two column grid, 1.7fr for the main card and 1fr for the side card, with `align-items: start` so the side card does not stretch.
- `.detail-side` is `position: sticky` with a top offset just below the navbar height, so on desktop the map stays in view while the visitor scrolls the schedule. At 900px it becomes static and stacks underneath.
- `.detail-section + .detail-section` adds a top border and spacing only between sections, not above the first.
- The schedule table uses `border-collapse` and thin row borders; `tr.is-today` gets the soft green background; the Today tag is a small white pill.
- `.detail-produce` is a four column grid, three at 900px, two at 600px, with tiles that lift on hover.
- `.detail-directions` is the full width amber button built on the shared `.btn-primary` class.

### How it connects
- The id in the address comes from every market card on Home, the Directory and Bookmarks (`/market/` plus the id), from the search overlay, and from chatbot answers.
- It reads one record from markets.json and turns its produce ids into records from produce.json. That link between the two files is the whole reason ids exist.
- openBadge, formatTime and useClock are the same helpers the cards use, so the badge on your banner always agrees with the badge on the card the visitor just clicked.
- The save button talks to the same bookmarks store as every BookmarkButton, so saving here shows up in the navbar badge and on the Bookmarks page.

### Why this way
One record drives the whole page, so there is nothing to keep in sync. The table is built by looping over a fixed day list, so it is always seven rows in the right order. Missing data (a wrong id, a missing produce record) is handled before it can break anything.

### Changes you can make yourself
- Change the wording of Open right now or the Closed text in the table.
- Show the number of produce items in the Typical Produce heading, for example `Typical Produce ({items.length})`.
- Adjust the sticky offset or the map height in your CSS.

## About.jsx

### The imports
`pageImage` for the mission photo and team photos, `Breadcrumbs`, and the stylesheet.

### Before the component
- `const team = [...]` holds the four members: name, role, the image name in src/assets/images/pages, and initials shown while a photo is missing. The names match the README.
- Three inline SVG icons for the reasons section.

### The JSX from top to bottom
- The hero section holds the breadcrumb, the title Fresh All Along and the mission paragraph on the left, and the photo on the right with its fade.
- Why FreshFind is a three column grid; each item is an icon in a green circle, a heading and one sentence.
- Meet the team maps `team` into cards. Inside each `.about-photo` there is first a span with the initials, then the `<img>`. If the image loads it covers the initials. If the file is missing, `onError` runs and hides the image with `style.display = 'none'`, so the initials show instead. This is how the page looks fine before the real photos are added.

### about.css in groups
- The hero uses the same absolute art with a gradient fade as the Contact banner. On phones the art becomes a normal block under the text.
- `.about-why-grid` is three columns with a thin left border between items as dividers; on tablets it becomes one column and the borders go.
- `.about-team-grid` is four columns, two at 900px, one at 600px. `.about-photo` is a round green circle with `overflow: hidden` so the photo is clipped round.

### How it connects
About reads no data file. It links to nothing but the shared frame. It is reached from the navbar and footer.

### Changes you can make yourself
- Update roles or wording in the team list, or add a short quote under each name.
- Change the three reasons' text.

## Questions judges may ask you
- Where does the schedule come from? The market's schedule object in markets.json, seven keys, each null or open and close times.
- How is today highlighted? The clock gives the day number, DAY_KEYS turns it into the key, that row gets a class.
- What if the address has an id that does not exist? The page renders Not Found.
- Why call the hooks before checking the market exists? React requires hooks to run in the same order on every render, so they come before the early return.
- Does the map need an API key? No, it is a Google Maps embed address built from the coordinates.
- Why is the side card sticky? So the map and directions stay visible while reading the schedule on a desktop.
