# Osakue's walkthrough

## What I own
src/pages/ProduceGuide.jsx with src/styles/produce-guide.css, and src/pages/Seasonal.jsx with src/styles/seasonal.css.

## Produce Guide, how it works
The page keeps two pieces of state: the chosen category and the search text. The tabs come from a small categories list where each id matches the category field in produce.json. items is produce.json run through one filter that drops anything not in the chosen category or not matching the search text.

Each card shows produceImage, the name, a badge with seasonLabel, which turns the season month numbers into text like Jun–Aug, and the badge turns amber when inSeason says the current month from the clock is in that list. Found at turns the item's markets ids into short names by looking them up in markets.json, links the first two to their market pages, and links +N more to the Directory filtered by that produce. Every card has the shared BookmarkButton.

## Seasonal Picks, how it works
The banner places seasonal-left.webp and seasonal-right.webp at the edges with the headline between them, and the subtitle shows the current month name from the clock.

picks is produce.json filtered with inSeason for the current month, sorted by season length so the shortest seasons come first, and cut to four. Each pick shows a Peak season badge and Best at with the first two markets.

The season calendar is a plain table. The rows are all produce items, with the ones in season this month first. The twelve columns are the months. For every cell the page checks whether that month number is in the item's season list and draws a green bar if it is. The current month's column is tinted. On phones the table scrolls sideways inside its own container.

## Questions judges may ask
- Where do the seasons come from? Each produce record has a season list of month numbers based on Nigerian growing seasons.
- Why does the badge change color? inSeason checks the current month from the clock against the season list.
- How does Found at know the markets? produce.json stores market ids for each item and the page looks up the names in markets.json.
- Why is the calendar a table? It is the clearest way to show twelve months for every item and it stays readable when it scrolls on a phone.
