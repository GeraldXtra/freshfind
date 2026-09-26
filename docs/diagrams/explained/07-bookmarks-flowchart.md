# Bookmarks, the flowchart explained

Image: docs/diagrams/png/07-bookmarks-flowchart.png. Source: docs/diagrams/07-bookmarks-flowchart.md.

## What it shows
What happens from the moment a visitor taps a bookmark icon until the tab closes, including notes, export, share and removal.

## The shapes
- Rectangles are actions by the visitor or the site.
- Diamonds are decisions: already saved? and which action?
- The rounded box Tab closed is a separate start, because closing the tab is an event that can happen at any time.

## Reading it step by step
1. The visitor taps the bookmark button on a card.
2. Decision: already saved? No: the id is added to the session list. Yes: the id is removed together with its note. Both lead to the same next step.
3. sessionStorage is updated and the navbar badge count changes, because every component reads the same store.
4. The Bookmarks page reads the saved ids.
5. It looks up the full records in markets.json and produce.json, because only ids are stored.
6. It shows cards under the Markets and Produce tabs.
7. Decision, which action? Type a note: the note is saved next to the id. Export: a text list is copied to the clipboard and downloaded as a file. Share: WhatsApp, X or Facebook opens with the list. Remove: back to the removal step. Clear all: the session list is emptied.
8. Separate path: the tab is closed, sessionStorage is cleared, nothing is kept.

## The logic behind it
Only ids are stored, so bookmarks stay tiny and always show current data. The same toggle handles saving and removing, which is why the diamond sends both answers to the same update step. The last path is the answer to "why did my bookmarks disappear": session only, by the brief.

## Where it lives in the code
BookmarkButton.jsx for the tap, BookmarksContext.jsx for the list, the badge in Navbar.jsx, and Bookmarks.jsx for the page, notes, export and share. The share addresses come from links.js.

## Questions judges may ask
- Where are bookmarks stored? In sessionStorage in the visitor's browser only.
- Why not save them permanently? The brief says notes are session only and nothing may be stored on a server.
- What does export produce? A plain text list with hours, seasons and notes, copied and downloaded.
