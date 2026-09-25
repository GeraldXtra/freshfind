# Osakue's walkthrough, line by line

You own four files: src/pages/ProduceGuide.jsx, src/styles/produce-guide.css, src/pages/Seasonal.jsx and src/styles/seasonal.css.

## ProduceGuide.jsx

### The imports
- `useState` from react for the chosen tab and the search text.
- `Link` from react router for the Found at links.
- `produce` and `markets` from the data files.
- `import { produceImage } from '../utils/images'` loads a produce photo by the name stored in the data.
- `import { currentMonth, inSeason, seasonLabel } from '../utils/season'`. currentMonth gives 1 to 12 for now, inSeason checks a month against an item's season list, seasonLabel turns that list into text like Jun–Aug.
- `useClock`, `Breadcrumbs`, `BookmarkButton` (the shared save button), and your stylesheet.

### Before the component
- `const categories = [...]` is the tab list. Each `id` matches the category field in produce.json exactly, and `all` is a special tab that means no category filter. The labels are what the visitor reads.
- LeafIcon and PinIcon are inline SVGs.
- `function marketName(id)` finds a market by id in markets.json and returns a shortened name for the small Found at line: `replace(' Farmers Market', '')` and `replace(' Market', '')` turn Mile 12 Farmers Market into Mile 12. If the id is not found it returns the id itself so nothing crashes.

### Inside the component
- `const now = useClock()` and `const month = currentMonth(now)` give the current month, and because the clock ticks, the page would update itself at midnight on the first of a month.
- `const [category, setCategory] = useState('all')` and `const [query, setQuery] = useState('')` are the two pieces of state.
- `const text = query.trim().toLowerCase()` cleans the search text.
- `const items = produce.filter(...)` keeps an item unless a chosen category does not match it or a search text is not in its name. Both conditions are plain ifs returning false.

### The JSX from top to bottom
- Breadcrumbs, then the head with the title, subtitle and a `<input type="search">` bound to `query` (a controlled input: value from state, onChange writes state).
- The tabs are buttons made with `categories.map`. `aria-selected` and `role="tab"` tell screen readers which tab is active; the class `is-active` is added when `category === entry.id`; clicking calls `setCategory(entry.id)`.
- `{items.length === 0 ? (...) : (...)}` shows an empty message or the grid.
- Inside the grid, for each item we first compute a few values: `found` is all its market names, `more` is how many beyond the first two, and `inSeasonNow` asks inSeason with the current month. Then the card: a BookmarkButton in the corner with `type="produce"`, the round image, the name, a badge that gets `is-now` (amber) when inSeasonNow is true and shows `seasonLabel(item.season)`, the description, and Found at. Found at maps the first two market ids to Links to `/market/` plus the id (Ibrahim's page), separated by a comma from the second one onward (`index > 0 && ', '`), and if `more` is above zero adds a +N more link to the Directory filtered by this produce (`/directory?produce=` plus the id, Amanda's page).

### produce-guide.css in groups
- `.guide-tabs` is a flex row with a bottom border; each `.guide-tab` has a transparent 3px bottom border that turns green when `is-active`, and `margin-bottom: -1px` makes the active line sit on top of the row border.
- `.guide-grid` is four columns, two at 900px, one at 600px.
- `.guide-card` is a flex column; `.guide-card-found` uses `margin-top: auto` so it always sits at the bottom of the card, which keeps cards aligned even when descriptions differ in length.
- `.guide-badge` is a small pill, green by default, amber with `is-now`.

### How it connects
- Reads produce.json for everything on the card and markets.json only to turn ids into names.
- The Found at links land on Ibrahim's detail page and Amanda's Directory.
- BookmarkButton talks to the shared bookmarks store, so a saved item shows in the navbar badge and under the Produce tab on Gerald's Bookmarks page.
- The chatbot's produce answers and the Home page's In season strip link to this page.

### Why this way
The category ids in the data and the tab ids are the same words, so there is no translation table to keep in sync. The season is computed from the clock rather than typed, so the amber badge is always right for the current month.

### Changes you can make yourself
- Remove the unused `shown` line inside the card loop; the JSX uses `item.markets.slice(0, 2)` directly. This is a real cleanup and a good first commit.
- Change the default tab from `all` to `vegetables`.
- Show the item count in the empty message or beside the tabs, for example `{items.length} items`.

## Seasonal.jsx

### The imports
`Link`, the two data files, `pageImage` and `produceImage`, `MONTHS` (the twelve short month names), `currentMonth` and `inSeason` from the season helper, `useClock`, `Breadcrumbs`, `BookmarkButton`, and your stylesheet.

### Before the component
Two inline icons and the same `marketName` shortener as the guide.

### Inside the component
- `now`, `month`, and `const monthName = now.toLocaleString('en-US', { month: 'long' })`, which gives September in full for the subtitle.
- `const picks = produce.filter((item) => inSeason(item, month)).sort((a, b) => a.season.length - b.season.length).slice(0, 4)`: keep items in season this month, sort by how short their season is (a four month item is more of a special pick than a year round item), and take the first four.
- `const calendar = [...produce].sort((a, b) => { ... })` orders the calendar rows. `aNow` and `bNow` are 0 when the item is in season now and 1 when not, so in season items come first. `return aNow - bNow || a.season.length - b.season.length` means: sort by that first; if the two are equal (the subtraction gives 0), the `||` falls through to the second rule, shorter seasons first.

### The JSX from top to bottom
- The banner section places two images absolutely at the left and right edges (`seasonal-left`, `seasonal-right`), with empty alt because they are decorative, and the breadcrumb, headline and month subtitle in the middle.
- This week's top picks maps `picks` into cards: image with a BookmarkButton over it, a Peak season badge, the name, the description and Best at with the first two markets as links.
- Season calendar is a `<table>`. The `<thead>` row has a Produce heading then `MONTHS.map` for the twelve month headings, adding `is-current` to this month's heading. The `<tbody>` maps `calendar` into rows; the row heading holds the small photo and name; then `MONTHS.map` again for the twelve cells, where `active` is `item.season.includes(number)` and a green bar span is drawn only when active. The bar has an `aria-label` so screen readers can read which months an item is in season. The current month's cells also get `is-current`.

### seasonal.css in groups
- `.seasonal-art` images use `mask-image` gradients so they fade into the cream banner instead of ending with a hard edge. They shrink at 900px and hide at 600px.
- `.seasonal-grid` is four columns, two, then one.
- `.seasonal-card-best` uses `margin: auto 0 0` to sit at the bottom of every card.
- `.seasonal-table-wrap` has `overflow-x: auto` and the table has `min-width: 760px`, so on a phone the table scrolls sideways inside its own box and the page never scrolls sideways, which is a team rule.
- `.seasonal-table .is-current` tints the current month column; `.seasonal-bar` is the rounded green bar.

### How it connects
- Reads produce.json for the picks and the calendar and markets.json for names.
- Best at links to Ibrahim's page. The Home page's In season this week strip and the chatbot's seasonal answer both link here.
- BookmarkButton connects to the shared bookmarks store.

### Why this way
Seasons are month number lists in the data, so the calendar is just twelve includes checks per row and the picks are one filter. No dates are typed anywhere in the page.

### Changes you can make yourself
- Show only in season items in the calendar by filtering `calendar` with inSeason.
- Change how many picks show, the number in `slice(0, 4)`.
- Change the Peak season badge text.

## Questions judges may ask you
- Where do the seasons come from? Each produce record has a season list of month numbers based on Nigerian growing seasons.
- Why does the badge change color? inSeason checks the current month from the clock against the list.
- How do you know which markets sell an item? produce.json stores market ids for each item and the page looks up their names in markets.json.
- Why sort the picks by season length? A short season means the item is special right now; year round items are never a pick of the week.
- Why is the calendar a table? Twelve months across and one row per item is exactly what a table is for, and it scrolls cleanly on phones.
