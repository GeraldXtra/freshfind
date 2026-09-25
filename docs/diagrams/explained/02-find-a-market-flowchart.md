# Finding a market, the flowchart explained

Image: docs/diagrams/png/02-find-a-market-flowchart.png. Source: docs/diagrams/02-find-a-market-flowchart.md.

## What it shows
The steps a visitor goes through from arriving on the site to finding a market, in every way the site allows, and what the site does at each step.

## The shapes
- A rounded box (a stadium shape) is a start or an end: Visitor opens FreshFind at the top, Done at the bottom.
- A diamond is a decision, a question with more than one answer. The words on the arrows leaving it are the answers.
- A plain rectangle is a step, something the site or the visitor does.
- Arrows show the order.

## Reading it step by step
1. Start: the visitor opens FreshFind.
2. First decision, how do they start? Three answers. The Home search panel: choose an area, a day or a produce type. The navbar search icon: type into the search overlay. Browse: open the Market Directory.
3. From the Home search panel two things happen at once, which is why the box has two arrows out. Matching markets appear on the Home page immediately (live filtering), and the Search button opens the Directory with the same filters in the address.
4. Typing in the overlay also leads to the Directory with the text as a filter.
5. In the Directory the visitor applies filters and sorting.
6. Second decision: does the visitor allow browser location? Yes: distances appear on the cards and sort by distance becomes available. No: they sort by name or by next open day. Either way they reach a list of cards.
7. Clicking a card opens Market Detail, which shows the schedule, the produce, the map and the directions.
8. Third decision: save it? Yes: the market is bookmarked for the session. No: done. Bookmarking also ends at Done.

## The logic behind it
There are three ways in and they all meet at the same Directory step, so the site has one list page, not three. Location is a decision, not a requirement: both branches continue. The last decision shows that bookmarking is optional and never blocks anything.

## Where it lives in the code
The Home search panel and live filtering are in Home.jsx. The overlay is SearchOverlay.jsx. The Directory filters, sorting and the location branch are Directory.jsx with useGeolocation. The card is MarketCard.jsx, the detail page is MarketDetail.jsx, and the save action is BookmarkButton.jsx writing to BookmarksContext.jsx.

## Questions judges may ask
- What if the visitor refuses location? The No branch: the list still works, sorted by name or next open day.
- Why do results appear on Home before pressing Search? The brief asks for results displayed dynamically when a filter is applied.
- Why does the overlay go to the Directory? So one page owns all the filtering logic.
