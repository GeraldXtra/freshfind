# Images Guide

Every image in this project has a fixed name and a fixed home. Do not rename image files and do not put images anywhere else. The pages and the JSON files depend on these exact names. All photos are WebP, converted from the original png files with scripts/convert-images.mjs. Use the helpers in src/utils/images.js instead of typing paths.

## Where images live
- src/assets/images/brand holds the logo and the chatbot avatar.
- src/assets/images/markets holds the eight market photos.
- src/assets/images/produce holds the produce photos.
- src/assets/images/pages holds the hero, the banners and the team photos.
- public holds favicon.png, the same mark as the logo.

## Brand
- logo.webp is the FreshFind mark, a green leaf with an orange dot, shown in the navbar and the footer.
- chatbot-avatar.webp is the friendly leaf mascot shown in the chat window header.
- favicon.png in the public folder is the same logo mark used as the browser tab icon.

## Market photos
Eight photos, one per market. The file name matches the image field of that market inside markets.json.
mile12.webp, lekki-fresh.webp, ogba-green.webp, ajah-coastal.webp, surulere.webp, ikeja-city.webp, oyingbo.webp, epe-fish.webp

## Produce photos
One square photo per produce item. The file name matches the image field in produce.json. The circle look on cards comes from CSS, the files stay square.
tomatoes.webp, peppers.webp, onions.webp, ugu.webp, ewedu.webp, okra.webp, spinach.webp, carrots.webp, garden-eggs.webp, cucumber.webp, mango.webp, banana.webp, plantain.webp, pineapple.webp, watermelon.webp, pawpaw.webp, oranges.webp, yam.webp, sweet-corn.webp, beans.webp, sweet-potato.webp, scent-leaf.webp, ginger.webp, fresh-eggs.webp, honey.webp, smoked-fish.webp

## Page images
- hero.webp is the big landing page photo behind the headline and the search panel.
- seasonal-left.webp is the mango photo on the left edge of the Seasonal Picks banner.
- seasonal-right.webp is the corn and tomato photo on the right edge of the Seasonal Picks banner.
- contact-basket.webp is the produce basket on the Contact page.
- about-mission.webp is the market trader photo on the About page.
- team-gerald.webp, team-amanda.webp, team-ibrahim.webp and team-osakue.webp are our real photos for the About page, cropped square. The CSS makes them round.

## Rules for using images
1. Every img tag gets a real alt text describing the picture. Lighthouse and the judges check this.
2. If an image file is missing, your page must not break. Show a plain colored box instead.
3. Market and produce photos were generated with AI and that is acknowledged in AI_TOOLS.md. Do not pull random pictures from the internet, they can carry copyright problems.
4. To add an image, drop the png into its folder, run npm install --no-save sharp and then node scripts/convert-images.mjs. The script creates the WebP file and removes the png.
