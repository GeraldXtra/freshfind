# Test Data

## Sample data
- 8 markets in markets.json: Mile 12 Farmers Market (Ketu, Mon to Sat 6am to 4pm), Lekki Fresh Market (Lekki Phase 1, Sat and Sun 7am to 2pm), Ogba Green Market (Ogba, Thu and Sat 8am to 4pm), Ajah Coastal Market (Ajah, Tue to Sun 7am to 5pm), Surulere Community Market (Surulere, Sat 8am to 3pm), Ikeja City Market (Ikeja, Mon to Sat 7am to 6pm), Oyingbo Market (Ebute Metta, Mon to Sat 6am to 5pm), Epe Fish Market (Epe, every day 6am to 1pm).
- 26 produce items in produce.json across five categories, each with a season and the markets that sell it.
- 19 chatbot intents in chatbot.json plus entity lists for 8 markets, 26 produce items and the days of the week.

## Test scenarios
1. Home search: choose Ketu as area and press Search. Expected: Directory opens showing only Mile 12 Farmers Market.
2. Directory day filter: choose Sunday. Expected: Lekki Fresh, Ajah Coastal and Epe Fish only.
3. Directory produce filter: choose Honey. Expected: Lekki Fresh Market only.
4. Open now toggle at 10am on a Wednesday. Expected: Mile 12, Ajah Coastal, Ikeja City, Oyingbo and Epe Fish.
5. Open now toggle at 8pm on any day. Expected: no markets and the empty state message.
6. Sort by distance after allowing location. Expected: the nearest market appears first with distances shown.
7. Market Detail for Mile 12 on a Sunday. Expected: badge shows OPENS TOMORROW and the Sunday row shows Closed.
8. Market Detail for an unknown id such as /market/nothing. Expected: Not Found content.
9. Produce Guide, Fruits tab. Expected: Mango, Banana, Plantain, Pineapple, Watermelon, Pawpaw, Oranges.
10. Seasonal Picks in September. Expected: Tomatoes, Ugu, Ewedu, Okra, Spinach, Garden Eggs, Yam, Sweet Corn, Sweet Potato, Scent Leaf and the year round items appear as in season; Mango does not.
11. Bookmark a market and a produce item. Expected: navbar badge shows 2 and both appear on the Bookmarks page under their tabs.
12. Add a note to a bookmark, refresh the page. Expected: the note is still there.
13. Close the tab and open the site again. Expected: bookmarks and notes are gone.
14. Export the bookmark list. Expected: a text list is copied and can be downloaded.
15. Chatbot, type which markets are open on saturday. Expected: a list of Saturday markets with hours and a button to the Directory.
16. Chatbot, type where can i buy yam. Expected: the yam season and Mile 12, Ikeja City and Oyingbo, with a button to the Produce Guide.
17. Chatbot, type mile 12. Expected: Mile 12 area, hours and produce with a button to its page.
18. Chatbot, type something random. Expected: the fallback message with suggestion chips.
19. Contact page, allow location. Expected: the map centers on the visitor. Deny location. Expected: the Lagos map and a friendly message.
20. Resize the window to 390px. Expected: the menu button appears, no sideways scrolling, and the footer stacks on every page.
21. Click Login. Expected: nothing happens, by design.
