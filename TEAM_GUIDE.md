# FreshFind Team Guide

Read this whole file before you write a line of code. It tells you what you are building, where the data comes from, and how we work so the final site looks like one product.

## The deadline
We submit on Sunday at 10am. Pages must be finished and merged into dev by Saturday 6pm. Saturday evening is for testing everything together, fixing bugs, running Lighthouse and recording the demo video. Nothing new starts after Saturday 6pm.

## The team
- Eberechukwu Uchechukwu Gerald, Team Leader. Owns the data files in src/data, the shared layout and helpers, the Home page, the Chatbot, the Bookmarks page and the search. Also runs the docs, the video and the submission. Branch: feature/gerald-home-chatbot-bookmarks
- Chukwujekwu Chimdiuso Amanda. Builds the Market Directory page and the Contact Us page. Branch: feature/amanda-directory-contact
- Ibrahim Ogunsola Kelvin. Builds the Market Detail page and the About Us page. Branch: feature/ibrahim-detail-about
- Uyi Osakue Uhunwa. Builds the Produce Guide page and the Seasonal Picks page. Branch: feature/osakue-produce-seasonal

## Getting started
1. git clone https://github.com/GeraldXtra/freshfind.git
2. cd freshfind and run npm install
3. git checkout your branch, then git pull origin dev to get the latest shared work
4. npm run dev and open the address it prints
5. Read docs/ARCHITECTURE.md, docs/DATA_GUIDE.md, docs/THEME_GUIDE.md and docs/IMAGES_GUIDE.md
6. Open your two mockups in design/mockups and keep them beside your editor

## How the pieces fit
Every page sits inside the same frame: Navbar on top, Footer at the bottom, the floating chatbot in the corner. You never touch those. You build only the content of your pages between them. Data comes from three JSON files in src/data and is explained in docs/DATA_GUIDE.md. Shared helpers in src/utils do the tricky bits for you: opening hours, open now badges, season labels, distances, map links and image paths. The bookmark button is a shared component, so every card on the site saves the same way.

## Reading data in your page
Import a JSON file like any module:

import markets from '../data/markets.json'
import produce from '../data/produce.json'

Then map over it to build your cards. For images use the helpers:

import { marketImage, produceImage } from '../utils/images'
<img src={marketImage(market.image)} alt={market.name} />

For hours and badges:

import { hoursLabel, openBadge } from '../utils/schedule'
hoursLabel(market.schedule) gives 'Mon–Sat · 6am–4pm'
openBadge(market.schedule) gives { open: true, text: 'OPEN NOW' }

For seasons:

import { seasonLabel, inSeason } from '../utils/season'

For the bookmark button on a card:

import BookmarkButton from '../components/BookmarkButton'
<BookmarkButton type="market" id={market.id} label={market.name} />

For breadcrumbs at the top of your page:

import Breadcrumbs from '../components/Breadcrumbs'
<Breadcrumbs trail={[{ label: 'Home', to: '/' }, { label: 'Market Directory' }]} />

## Styling
Create one CSS file per page in src/styles, for example src/styles/directory.css, and import it in your page. Start every class name with your page name, like .directory-card, so nobody's styles clash. Use only the variables from theme.css for colors, fonts, spacing and radius. Use the .container class to center your content and the .card class for cards so hover effects come free. Two breakpoints only: 900px for tablet and 600px for phone.

## Directory URL parameters
The Directory page reads filters from the address so other pages can send visitors to it with filters applied. Parameters: area (an area name), day (mon to sun), produce (a produce id), open (1 for open now), q (free text that matches market names and areas). Example: /directory?day=sat&produce=tomatoes. The Home search panel, the search overlay and the chatbot all link to the Directory this way.

## Page by page

### Home, Gerald. Mockups 01-home.png and 06-chatbot-open.png
- Hero with hero.png behind, logo, headline, subtitle and the three field search panel (area, day, produce type) that navigates to the Directory with URL parameters.
- Markets near you: the four markets with featured true, as cards with photo, open badge, bookmark button, name, area, hours line and description. If the visitor allows location, sort them by distance instead.
- In season this week: the first four produce items whose season includes the current month, with round photo, name and description, linking to the Produce Guide.
- Visitor counter and live clock are already in the footer.

### Market Directory, Amanda. Mockup 02-directory.png
- Breadcrumb Home > Market Directory. Title All Farmers Markets and a subtitle showing the real count, for example 8 markets across Lagos.
- Filter bar: area dropdown (built from the unique areas in markets.json), day of week dropdown, produce type dropdown (built from produce.json names), an open now toggle, and a sort dropdown with Name, Next open day and Distance (Distance appears only after the visitor allows location through useGeolocation).
- Read the URL parameters described above on load and apply them.
- Grid of market cards, three per row on desktop, two on tablet, one on phone. Each card: photo, open badge from openBadge, bookmark button, name, pin icon with area, clock icon with hoursLabel, description. The whole card links to /market/ plus the id.
- An empty state message when no market matches the filters.

### Market Detail, Ibrahim. Mockup 03-market-detail.png
- Read the id from the URL with useParams and find the market. If it does not exist show the Not Found content.
- Breadcrumb Home > Market Directory > market name.
- Banner with the market photo, the name, the open badge and a bookmark button labelled Save this market.
- Left column: About this market using the about field. Weekly Schedule as a seven row table using the schedule field, showing Closed for null days and highlighting today's row with a Today tag. Typical Produce as a grid of tiles built by looking up each id in market.produce inside produce.json, showing the round photo and name, each linking to the Produce Guide.
- Right column, sticky on desktop: an iframe map from mapEmbedUrl(market.lat, market.lng), the address, the area, Next open from nextOpening, and a Get Directions button opening directionsUrl in a new tab.
- Stacks into one column at 900px.

### Produce Guide, Osakue. Mockup 04-produce-guide.png
- Breadcrumb Home > Produce Guide. Title and subtitle.
- Category tabs: All, Fruits, Vegetables, Herbs & Spices, Grains & Tubers, Dairy & Protein mapping to the category ids in produce.json. The active tab has a green underline.
- Grid of produce cards, four per row on desktop, two on tablet, one on phone. Each card: round photo, bookmark button, name, an amber badge In season plus seasonLabel, the description, and Found at listing up to two market names from the markets field plus +N more, each name linking to that market page.
- An optional search box that filters by name.

### Seasonal Picks, Osakue. Mockup 05-seasonal.png
- Breadcrumb Home > Seasonal Picks. Banner using seasonal-left.png on the left edge and seasonal-right.png on the right edge with the headline What's fresh right now and a subtitle showing the current month name from the clock.
- This week's top picks: the produce items in season this month, up to four, as cards with photo, PEAK SEASON badge, name, description and Best at with the first two markets.
- Season calendar: a table with one row per produce item and twelve month columns, drawing a green bar in each month found in the item's season list. On phone the table scrolls sideways inside its own container.

### Bookmarks, Gerald. Mockup 09-bookmarks.png
- Breadcrumb, title, subtitle Saved for this session. Tabs Markets and Produce with counts from useBookmarks.
- A card per saved item looked up in the JSON files, with a note field saved through setNote, and a remove button.
- Export list builds a plain text list of saved markets and produce with their hours and copies it to the clipboard, with a download as text file option.
- Share buttons using the share helpers. An empty state with a link to the Directory.

### Contact Us, Amanda. Mockup 07-contact.png
- Breadcrumb Home > Contact Us. Banner with the title, subtitle and contact-basket.png on the right.
- Left card: email, phone, business hours and social icons with the same details as the footer.
- Right card You are here: a Show my location button that calls useGeolocation request; once granted show an iframe map from mapEmbedUrl with the visitor's coordinates, otherwise show a map of Lagos centered on 6.5244, 3.3792 and the note that we use the browser location to show markets near you. Handle denied and unsupported states with a friendly message.

### About Us, Ibrahim. Mockup 08-about.png
- Breadcrumb Home > About. Hero with Fresh All Along, the mission paragraph and about-mission.png.
- Why FreshFind: three columns with line icons. Every market in one place. Real days and hours. Know what's in season.
- Meet the team: four cards with our real photos from src/assets/images/pages (team-gerald.png, team-amanda.png, team-ibrahim.png, team-osakue.png), full names as in the README, and roles: Team Leader and Data, Directory and Contact, Market Detail and About, Produce Guide and Seasonal Picks. Until a photo exists show a plain circle with the person's initials.

### Chatbot, Gerald
Built inside ChatbotWidget using chatbot.json exactly as described in docs/DATA_GUIDE.md. Answers can link to pages.

### Not Found, Gerald
A friendly message and a link back to Home.

## Rules
1. Only touch the files you own. If you need a change in a shared file, tell Gerald.
2. Only Gerald edits src/data. Every page reads from those JSON files, nobody hardcodes market or produce info inside a page.
3. All colors, fonts, spacing and radius come from theme.css. Read docs/THEME_GUIDE.md. Never type a raw hex code inside a page.
4. Read docs/ARCHITECTURE.md and docs/DATA_GUIDE.md before writing any code.
5. Images have fixed names and folders. Read docs/IMAGES_GUIDE.md and never rename an image file. Every image gets a real alt text.
6. Every page except Home renders the shared Breadcrumbs component at the top with its own trail.
7. No code comments. Names should explain themselves.
8. Commit small and often on your branch. Push at least twice a day. Open a pull request into dev when a page works. Nobody pushes to main.
9. Every morning run git pull origin dev on your branch so you have everyone's latest shared work.
10. Stuck for more than 30 minutes means ask in the group.

## Definition of done for a page
- Matches its mockup on desktop
- Works at 600px width with no sideways scrolling
- Reads everything from the JSON files, nothing hardcoded
- Uses the shared helpers, the shared bookmark button and the shared breadcrumbs
- Has hover effects on cards and buttons
- Every image has alt text
- No errors in the browser console
- You can explain every line to a judge

## Judge preparation
The judges can question any of us about any part of the project, not only our own pages. Saturday evening each person walks the others through their pages in ten minutes. Read the pull requests of your teammates. Know the answers to these: why React, why JSON files instead of a database, how open now works, how the chatbot matches questions, why bookmarks disappear when the tab closes, and which AI tools we used and for what.
