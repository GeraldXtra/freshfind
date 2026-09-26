# Team Roles and Challenges

## Roles

### Eberechukwu Uchechukwu Gerald, Team Leader
Planned the project from the SRS, chose the stack and the design direction, set up the repository, the branches and the working rules, and wrote the team documentation. Owns the data files and the shared frame: the theme, Navbar, Footer, search overlay, market card, bookmark button, breadcrumbs, helpers and the bookmarks context. Built the Home page, the chatbot and its rule engine, the Bookmarks page and the Not Found page. Reviews every pull request, runs the integration testing, Lighthouse, the report and the demo video.

### Chukwujekwu Chimdiuso Amanda
Built the Market Directory, the biggest list page on the site: filtering by area, day, produce type and open now, three sort orders including distance after location is allowed, filters arriving from the address bar, the results count and the empty state. Built the Contact page with the live location map that handles allowed, blocked and unsupported states.

### Ibrahim Ogunsola Kelvin
Built the Market Detail page, the deepest page on the site: one market loaded from the id in the address, the banner with the live open badge and save button, the weekly schedule table with today highlighted, the typical produce tiles pulled from the produce data, the map, the next opening time and the directions link. Built the About page with the mission, the three reasons and the team cards.

### Uyi Osakue Uhunwa
Built the Produce Guide with the five category tabs, the search box, the season badges and the Found at links into market pages. Built the Seasonal Picks page: the banner, this week's top picks computed from the current month, and the season calendar that draws a bar for every month each item is in season.

## Challenges we faced and how we handled them

1. Reading the SRS the right way. At first everything looked like a page. We learned to separate pages from features. The visitor counter, the live clock, breadcrumbs, the dummy login and the chatbot launcher are features that live inside the shared frame, so they were built once and every page inherited them.

2. Getting a consistent design out of AI image tools. Our first mockups came out as the same layout with different colors, then as different layouts with different navbars. We fixed it by writing one prompt per page that carried the same navbar, footer and style rules, generating full page views, and then editing every page against one reference so all nine matched.

3. Market photos that all looked the same. The first batch shared one camera angle and one time of day and a judge would have called them identical. We regenerated each market with its own angle, light, setting and mood so eight markets read as eight different places.

4. Running a repository for four people who were not in one room. We agreed a simple rule set: main is protected, dev is where work meets, everyone builds on their own branch and merges by pull request, only Gerald edits the data and shared files. We hit real problems on the way: a commit history that needed cleaning, a terminal that does not accept command chaining, login prompts that swallowed commands and pushes of large image folders that looked frozen. Each one taught us something we wrote into the team guide.

5. Matching the coded layout to the design. The first navbar and footer were close but not the same: text too large, logo too small, spacing off, the footer too tall. We measured against the mockup, moved the styles into proper CSS files so media queries could work, and added the phone layout at the same time.

6. Everything looked too big at 100 percent on a laptop. Our mockups were 1024 pixels wide and looked smaller than the real thing. We tightened the type scale, the spacing tokens and the card sizes, capped descriptions at two lines and widened the content area a little, then checked every page at 100 percent instead of zoomed out.

7. Keeping the chatbot inside the rules. The brief forbids a live AI service, but a chatbot that only repeats canned lines is weak. We built a rule engine that recognises market names, produce names and days, scores intents by keywords, and fills pre written answer templates from the data files. It answers real questions and it never leaves the browser.

8. Time. The whole build happened in under two days with people working remotely. What made it possible was doing the foundations first: the data files, the theme, the shared components and a team guide precise enough that each person could build their pages without waiting for anyone.

9. Understanding each other's code. The judges can ask any of us about any part. Each member has a walkthrough of their own pages in docs/members, and we read each other's pull requests before merging.
