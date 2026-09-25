# Images Guide

Every image in this project has a fixed name and a fixed home. Do not rename image files and do not put images anywhere else. The pages and the JSON files depend on these exact names.

## Where images live
- src/assets/images/brand is for the logo and the chatbot avatar.
- src/assets/images/markets is for the eight market photos.
- src/assets/images/produce is for the produce photos.
- src/assets/images/pages is for the hero and the page banners.
- public holds favicon.png, which is the same mark as the logo.

## Brand
- logo.png is the FreshFind mark, a green leaf with an orange dot. It appears in the navbar and the footer.
- chatbot-avatar.png is the friendly leaf mascot shown in the chat window header.
- favicon.png in the public folder is the same logo mark, used as the browser tab icon.

## Market photos
Eight photos, one per market. The file name matches the image field of that market inside markets.json, so a market card and its detail banner both show the right photo automatically.
- mile12.jpg
- lekki-fresh.jpg
- ogba-green.jpg
- ajah-coastal.jpg
- surulere.jpg
- ikeja-city.jpg
- oyingbo.jpg
- epe-fish.jpg

## Produce photos
One square photo per produce item, file name matching the image field in produce.json. The circle look on cards comes from CSS, the files themselves stay square. The first batch:
tomatoes, peppers, onions, ugwu, ewedu, okra, spinach, carrots, garden-eggs, mango, sweet-corn, yam, plantain, watermelon, oranges, fresh-eggs.
More items can be added later the same way. New file, new entry in produce.json, same folder.

## Page images
- hero.jpg is the big landing page photo behind the headline and search panel.
- seasonal-banner.jpg is the strip at the top of the Seasonal Picks page.
- contact-basket.jpg is the produce basket on the Contact page.
- about-mission.jpg is the market trader photo on the About page.
- Team photos on the About page are our real photos, not generated. Crop them square and the CSS makes them round.

## Rules for using images
1. Every img tag gets a real alt text describing the picture. Lighthouse and the judges check this.
2. If an image file is missing, your page must not break. Show a plain colored box instead.
3. The photos were generated with AI and that is acknowledged in AI_TOOLS.md. Do not pull random pictures from the internet, they can carry copyright problems.
4. Near the end we convert the photos to WebP in one pass to make the site fast. Until then, use the files as they are and keep the base names.
