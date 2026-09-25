# The assistant, the flowchart explained

Image: docs/diagrams/png/06-chatbot-flowchart.png. Source: docs/diagrams/06-chatbot-flowchart.md.

## What it shows
How one question typed into the chat becomes one answer, decision by decision. This is the exact logic of src/utils/chatbot.js.

## The shapes
- Rounded box: the start, a visitor sends text or taps a chip.
- Rectangles: steps the engine takes.
- Diamonds: decisions, each with Yes and No arrows, or the list of possible best intents.
- All paths end at one rectangle, Show answer, link button and quick replies, which is what the widget draws.

## Reading it step by step
1. Start: text or a chip. A chip is treated exactly like typed text.
2. Clean the text: lowercase, remove apostrophes, tidy spaces. This is why "what's" and "whats" behave the same.
3. Look for market, produce and day words from chatbot.json. These are the entities.
4. Decision: market named? Yes: fill the market info template from markets.json, and add that day's hours if a day was mentioned too. Go to the end.
5. No: decision, produce named? Yes: fill the produce info template from produce.json. Go to the end.
6. No: decision, the word today? Yes: list markets open right now using the clock. Go to the end.
7. No: score every intent by its matched keywords. The best score wins.
8. Decision, which intent won? Seasonal: list produce in season this month. Open now: the open right now list. Open on a day: the markets open that day or the weekend. Near me: another decision, is location allowed? Yes: the three nearest markets with distance. No: ask to allow location. A static intent: return the answer as written. Nothing matched: the fallback message and its chips.
9. End: show the answer, the link button if the intent has one, and the quick replies.

## The logic behind it
Entities come before intents on purpose: if someone names Mile 12, they want Mile 12, whatever else they typed. Today goes straight to open now because "open today" means right now. Scoring by keyword length means "which markets are open" beats the short word "open". Every branch ends in an answer, so the bot never stays silent.

## Where it lives in the code
answerQuestion in src/utils/chatbot.js is the diagram in code, with the helper functions marketInfo, produceInfo, seasonal, openNow, openDay and nearMe as the rectangles. The chips, the typing delay and the link buttons are in ChatbotWidget.jsx. The words and answers are in chatbot.json.

## Questions judges may ask
- Is this artificial intelligence? No. Every sentence the bot can say is written in chatbot.json. The engine only matches words and fills blanks from the data files.
- What if I ask something it does not know? The Nothing matched branch shows the fallback and suggestion chips.
- Why check the market name before anything else? A named market is the clearest signal of what the visitor wants.
