# Theme Guide

This file explains every variable inside src/styles/theme.css. The rule is simple. If you are styling anything, you use these variables. Nobody types a raw hex code or a random pixel number inside a page. That is how all nine pages end up looking like one product built by one person.

## Colors
- --color-cream is the main page background. A soft warm tone, not pure white.
- --color-surface is pure white. Use it for cards, panels and the navbar.
- --color-green-900 is our deepest green. Big headings, the footer background and anything that needs to feel strong.
- --color-green-700 is a lighter green. Use it for links and hover states.
- --color-green-soft is a very light green. Use it for gentle backgrounds like a highlighted table row or the circle behind an icon.
- --color-amber is our yellow. Primary buttons and badges like PEAK SEASON.
- --color-text is the main body text color, close to black.
- --color-text-muted is for secondary text. Subtitles, captions and small meta lines like hours.
- --color-border is the light gray line around cards and inputs.
- --color-badge-open is the background of the OPEN NOW badge.

## Fonts
- --font-display is Fraunces, a serif. It is only for headings, h1 to h4. It gives us that premium market feel.
- --font-body is Plus Jakarta Sans. Everything else uses it. Paragraphs, buttons, labels, links.

## Corners
- --radius-sm is 8px for small things like inputs.
- --radius-md is 12px for buttons.
- --radius-lg is 16px for cards.
- --radius-pill is 999px for anything fully rounded like badges, filter pills and the chatbot button.

## Spacing
Use the spacing scale for every margin, padding and gap. Never invent your own number.
- --space-1 (4px) and --space-2 (8px) for tiny gaps like icon to text.
- --space-3 (12px) and --space-4 (16px) for gaps inside cards.
- --space-5 (24px) for padding inside cards and the page sides.
- --space-6 (32px) and --space-7 (48px) for space between sections.
- --space-8 (64px) for big breathing room around major sections.

## Shadows
- --shadow-card is the soft resting shadow on cards.
- --shadow-float is the stronger one for hover states and floating things like the chatbot button.

## Width
- --maxw-page is 1200px. It is the width of all page content, already applied by the .container class.

## Helper classes
- .container centers your content and adds side padding. Wrap every page section in it.
- .btn-primary is the yellow main button.
- .btn-outline is the secondary button with a border.
- .card is the standard card. It already has the hover lift built in, so use it for market cards and produce cards.

If you need a color or a size that does not exist here, do not create it inside your page. Tell Gerald and we add it to the theme so everyone gets it.

## Type scale
- --text-xs 12px for captions and the footer bottom bar.
- --text-sm 14px for links, badges and meta lines.
- --text-base 15px for body text.
- --text-lg 17px for card titles.
- --text-xl 20px, --text-2xl 26px and --text-3xl 34px for headings.
