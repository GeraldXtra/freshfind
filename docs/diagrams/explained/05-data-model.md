# Data model, explained

Image: docs/diagrams/png/05-data-model.png. Source: docs/diagrams/05-data-model.md.

## What it shows
The four kinds of record in the system and how they relate: markets, produce, chatbot entities and bookmarks. It is an entity relationship diagram, the standard way to draw a data model.

## The shapes
- Each box is an entity, a kind of record. Inside it are the fields with their types. PK marks the primary key, the field that identifies a record, which is id. FK marks a foreign key, a field that holds another record's id.
- The lines between boxes are relationships. The symbols at the ends say how many: a double bar means exactly one, a circle with a crow's foot means zero or many. So MARKET to MARKET_PRODUCE reads "one market sells zero or many produce links", and the same from the produce side.
- MARKET_PRODUCE is the link between markets and produce. In the JSON it is not a separate file; it is the produce list inside each market and the markets list inside each produce item, which are the same links written from both sides.

## Reading it record by record
- MARKET: id, name, area, address, lat, lng, description, about, image, schedule (an object with seven days), produce (a list of produce ids), featured.
- PRODUCE: id, name, category, season (a list of month numbers), description, markets (a list of market ids), image.
- CHATBOT_ENTITY: an id that is a market or produce id, and the words that name it. It points to one market or one produce record.
- BOOKMARK: a type (market or produce), the id it saves, and an optional note. Each bookmark points to one market or one produce record. Bookmarks live in sessionStorage, not in a file.

## The logic behind it
Everything joins on ids. A market lists what it sells by id, a produce item lists where it is sold by id, the assistant names things by id, a bookmark saves an id. No name or fact is typed twice, so a change in one record shows everywhere. Ids never change, which is why they are short lowercase words.

## Where it lives in the code
markets.json and produce.json in src/data, the entities object in chatbot.json, and the object BookmarksContext.jsx keeps in sessionStorage.

## Questions judges may ask
- Is this a database? No, three JSON files with the same structure a database table would have.
- Why store the link on both sides? So the market page can list its produce and the produce page can list its markets without searching the other file. We keep both sides in sync by hand, it is sample data.
- Why ids and not names? Names have spaces and can change; ids are stable and safe in URLs.
