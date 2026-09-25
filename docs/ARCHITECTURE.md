# How FreshFind Works

This is the plan for the whole project. Read it once before you write any code and things will make sense.

## What we are building
A website that helps people in Lagos find farmers markets. Where each market is, the days and hours it opens, and what produce is in season. It is our entry for TechWiz 7 and the judges will mark us against the SRS document, so every feature in that document must exist and work.

## How the app is put together
The site is built with React using Vite. It is a single page application. That means the browser loads once and React Router swaps the pages in and out without reloading. The pages live in src/pages and there are nine of them plus a not found page. Every page renders inside the same frame. Navbar on top, footer at the bottom, and the floating chatbot button in the corner. Those shared parts live in src/components and only Gerald touches them.

Styling comes from one place, src/styles/theme.css. It holds our colors, fonts, spacing and corner sizes as variables. The THEME_GUIDE file in this folder explains each one. No raw hex codes inside pages, ever.

## The data is the center
There is no backend and no database. Our database is three JSON files inside src/data. markets.json holds every market. produce.json holds every produce item and its season. chatbot.json holds the questions and answers the assistant knows. Every page reads from these files and displays what it finds. Nothing is ever written back and nothing is sent to a server. That is a rule from the SRS, not a choice. Bookmarks and notes live inside the browser session only, so they disappear when the tab closes, and that is correct behaviour.

Only Gerald edits the JSON files. If your page needs a field that does not exist, ask and it gets added properly so nobody breaks anyone else.

## The small helpers
There are hooks in src/hooks. useClock gives you the current time ticking every second. useGeolocation asks the browser for the user location after the user allows it. useBookmarks will manage saving and removing bookmarks for the session. Use them instead of writing your own timers or location code.

## The order we build in
1. Gerald fills the three JSON files with real sample data. Everyone is blocked until this is done, so it happens first.
2. Everyone builds their two pages from the mockups in design/mockups, reading from the JSON files.
3. Gerald builds the chatbot logic, the bookmarks system and the search.
4. We wire the extras. Markets open right now using the clock and location, and the chatbot linking to market and produce pages.
5. Polish. Mobile widths, hover effects, animations, accessibility.
6. Testing with Lighthouse, then diagrams, the report, and the demo video.

## What we are achieving
When we submit, a judge should be able to open the site, find a market, check its hours, browse produce, ask the assistant a question, bookmark things and export the list, all without anything breaking. And when they ask any of us why the code looks the way it does, we can answer, because we wrote it. That last part matters. The rules say judges can question us on our own work, so do not paste in code you cannot explain.
