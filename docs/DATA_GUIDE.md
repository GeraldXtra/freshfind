# Data Guide

Three JSON files in src/data are the whole database of the site. Only Gerald edits them. If your page needs something that is not there, ask and it gets added properly.

## markets.json
A list of market records. Fields:
- id: short lowercase key with no spaces, for example mile12. Used in URLs (/market/mile12), in bookmarks and in produce.json. Never change an id.
- name: the full display name.
- area: the neighbourhood, used for the area filter and shown on cards.
- address: the full address shown on the detail page.
- lat and lng: coordinates for the map and for distance sorting.
- description: one short line for cards and the home showcase.
- about: a paragraph for the detail page.
- image: the photo file name without extension, used with marketImage().
- schedule: an object with keys mon to sun. Each is either null (closed) or { open, close } in 24 hour text like "06:00". Use hoursLabel, isOpenNow, openBadge and nextOpening from src/utils/schedule.js instead of reading this by hand.
- produce: a list of produce ids sold there. Look each id up in produce.json to get the name and photo.
- featured: true for the four markets shown on the Home page.

## produce.json
A list of produce records. Fields:
- id: short lowercase key matching the image file name, for example sweet-corn.
- name: display name.
- category: one of fruits, vegetables, herbs-spices, grains-tubers, dairy-protein. The Produce Guide maps these to the tab labels Fruits, Vegetables, Herbs & Spices, Grains & Tubers, Dairy & Protein.
- season: a list of month numbers from 1 to 12. Use seasonLabel and inSeason from src/utils/season.js. All twelve months means available all year.
- description: one short line for cards.
- markets: a list of market ids where it is sold. This mirrors the produce lists in markets.json. Look each id up in markets.json for the name.
- image: file name without extension, used with produceImage().

## chatbot.json
One object with:
- greeting: the first message shown.
- quickReplies: the default chips.
- fallback and fallbackQuickReplies: shown when nothing matches.
- placeholders: a list explaining every placeholder used in answers, for reference.
- entities: words that identify markets, produce items and days. Keys are the ids used in the other two files.
- intents: the list of things the assistant understands. Each has an id, keywords, an answer, and may have an action (seasonal, open-now, open-day, near-me, market-info, produce-info), a noResults text, a link with label and to, and quickReplies. Text inside curly braces is a placeholder filled from the data files.

## How the files connect
markets.produce holds produce ids. produce.markets holds market ids. chatbot entities hold both. Everything joins on ids, which is why ids never change and why nobody types market or produce facts inside a page.

## Sample data at a glance
8 markets: Mile 12 Farmers Market, Lekki Fresh Market, Ogba Green Market, Ajah Coastal Market, Surulere Community Market, Ikeja City Market, Oyingbo Market, Epe Fish Market. 26 produce items across five categories. Every produce item is sold in at least one market and every market sells between six and eight items.
