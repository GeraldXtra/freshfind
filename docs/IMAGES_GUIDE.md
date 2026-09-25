# Images Guide

Every image in this project has a fixed name and a fixed home. Do not rename image files and do not put images anywhere else. The pages and the JSON files depend on these exact names. All files are png for now. Use the helpers in src/utils/images.js instead of typing paths.

## Where images live
- src/assets/images/brand holds the logo and the chatbot avatar.
- src/assets/images/markets holds the eight market photos.
- src/assets/images/produce holds the produce photos.
- src/assets/images/pages holds the hero, the banners and the team photos.
- public holds favicon.png, the same mark as the logo.

## Brand
- logo.png is the FreshFind mark, a green leaf with an orange dot, shown in the navbar and the footer.
- chatbot-avatar.png is the friendly leaf mascot shown in the chat window header.
- favicon.png in the public folder is the same logo mark used as the browser tab icon.

## Market photos
Eight photos, one per market. The file name matches the image field of that market inside markets.json.
mile12.png, lekki-fresh.png, ogba-green.png, ajah-coastal.png, surulere.png, ikeja-city.png, oyingbo.png, epe-fish.png

## Produce photos
One square photo per produce item. The file name matches the image field in produce.json. The circle look on cards comes from CSS, the files stay square.
tomatoes.png, peppers.png, onions.png, ugu.png, ewedu.png, okra.png, spinach.png, carrots.png, garden-eggs.png, cucumber.png, mango.png, banana.png, plantain.png, pineapple.png, watermelon.png, pawpaw.png, oranges.png, yam.png, sweet-corn.png, beans.png, sweet-potato.png, scent-leaf.png, ginger.png, fresh-eggs.png, honey.png, smoked-fish.png

## Page images
- hero.png is the big landing page photo behind the headline and the search panel.
- seasonal-left.png is the mango photo on the left edge of the Seasonal Picks banner.
- seasonal-right.png is the corn and tomato photo on the right edge of the Seasonal Picks banner.
- contact-basket.png is the produce basket on the Contact page.
- about-mission.png is the market trader photo on the About page.
- team-gerald.png, team-amanda.png, team-ibrahim.png and team-osakue.png are our real photos for the About page, cropped square. The CSS makes them round.

## Rules for using images
1. Every img tag gets a real alt text describing the picture. Lighthouse and the judges check this.
2. If an image file is missing, your page must not break. Show a plain colored box instead.
3. Market and produce photos were generated with AI and that is acknowledged in AI_TOOLS.md. Do not pull random pictures from the internet, they can carry copyright problems.
4. Near the end we convert the photos to WebP in one pass to make the site fast. Until then use the files as they are and keep the base names.
