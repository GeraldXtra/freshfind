# Open now and nearby, the flowchart explained

Image: docs/diagrams/png/08-open-now-flowchart.png. Source: docs/diagrams/08-open-now-flowchart.md.

## What it shows
How the site decides whether a market is open at this moment, what the badge says otherwise, and how nearby markets are chosen. Two small flows on one picture: the clock flow on the left and the location flow on the right.

## The shapes
- Rectangles are steps.
- Diamonds are the two decisions in the clock flow.
- The location flow has no decisions because it only runs after permission.

## Reading it step by step
Clock flow:
1. useClock ticks every second and gives the current time.
2. From it we get today's key (mon to sun) and the minutes since midnight.
3. Read today's entry in the market's schedule.
4. Decision: is the entry null? Yes: the market is closed today, the badge shows the next open day.
5. No: decision, is now between open and close? Yes: the badge shows OPEN NOW. No: the badge shows the next open day.
Location flow:
6. The visitor allows location.
7. distanceKm measures from the visitor to each market.
8. Home shows the four nearest, and the Directory can sort by distance.

## The logic behind it
Because every schedule stores real open and close times, one function answers the question for every market on every page and the badge is always right for the current minute. The location flow is separate because it is optional and the site must work without it.

## Where it lives in the code
isOpenNow and openBadge in src/utils/schedule.js, useClock for the time, distanceKm in src/utils/geo.js, useGeolocation for the position, and the nearby list in Home.jsx and the distance sort in Directory.jsx.

## Questions judges may ask
- What if a market opens later today? The badge says OPENS TODAY with the time, because the second decision fails while the entry exists.
- How accurate is the distance? Straight line distance from the coordinates, rounded to one decimal, enough to order markets.
- Does it work on Sunday? Yes, Sunday is just another key in the schedule, null for markets that close.
