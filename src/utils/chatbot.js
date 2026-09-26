import data from "../data/chatbot.json";
import markets from "../data/markets.json";
import produce from "../data/produce.json";
import { DAY_KEYS, formatTime, hoursLabel, isOpenNow } from "./schedule";
import { currentMonth, inSeason, seasonLabel } from "./season";
import { distanceKm } from "./geo";

const dayNames = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

function normalize(text) {
  return String(text)
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function hasWord(text, word) {
  return new RegExp(`\\b${escapeRegex(word)}\\b`).test(text);
}

function findEntity(text, table) {
  let best = null;
  Object.entries(table).forEach(([id, words]) => {
    words.forEach((word) => {
      const clean = normalize(word);
      if (hasWord(text, clean) && (!best || clean.length > best.length)) {
        best = { id, length: clean.length };
      }
    });
  });
  return best ? best.id : null;
}

function scoreIntent(text, intent) {
  return intent.keywords.reduce((score, keyword) => {
    const clean = normalize(keyword);
    return hasWord(text, clean) ? score + clean.length : score;
  }, 0);
}

function getIntent(id) {
  return data.intents.find((intent) => intent.id === id);
}

function fill(template, values) {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.split(`{${key}}`).join(value),
    template,
  );
}

function listNames(names, limit = 6) {
  const shown = names.slice(0, limit);
  const rest = names.length - shown.length;
  return rest > 0 ? `${shown.join(", ")} and ${rest} more` : shown.join(", ");
}

function toMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function marketName(id) {
  const market = markets.find((entry) => entry.id === id);
  return market ? market.name : id;
}

function produceName(id) {
  const item = produce.find((entry) => entry.id === id);
  return item ? item.name : id;
}

function nextOpen(schedule, now) {
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  for (let offset = 0; offset < 8; offset += 1) {
    const key = DAY_KEYS[(now.getDay() + offset) % 7];
    const entry = schedule[key];
    if (!entry) continue;
    if (offset === 0 && toMinutes(entry.open) <= nowMinutes) continue;
    return { offset, key, entry };
  }
  return null;
}

function reply(text, extra = {}) {
  return {
    text,
    link: extra.link || null,
    quickReplies: extra.quickReplies || data.quickReplies,
    action: extra.action || null,
  };
}

function fallback() {
  return reply(data.fallback, { quickReplies: data.fallbackQuickReplies });
}

function staticAnswer(intent) {
  return reply(intent.answer, {
    link: intent.link,
    quickReplies: intent.quickReplies,
  });
}

function marketInfo(marketId, dayKey, now) {
  const intent = getIntent("market-info");
  const market = markets.find((entry) => entry.id === marketId);
  const names = market.produce.map(produceName);
  let text = fill(intent.answer, {
    marketName: market.name,
    area: market.area,
    hours: hoursLabel(market.schedule),
    marketProduce: listNames(names, 5),
  });
  if (dayKey && dayNames[dayKey]) {
    const entry = market.schedule[dayKey];
    text += entry
      ? ` On ${dayNames[dayKey]} it opens ${formatTime(entry.open)} to ${formatTime(entry.close)}.`
      : ` It is closed on ${dayNames[dayKey]}.`;
  }
  if (isOpenNow(market.schedule, now)) text += " It is open right now.";
  return reply(text, {
    link: {
      label: fill(intent.link.label, { marketName: market.name }),
      to: fill(intent.link.to, { marketId: market.id }),
    },
  });
}

function produceInfo(produceId) {
  const intent = getIntent("produce-info");
  const item = produce.find((entry) => entry.id === produceId);
  const text = fill(intent.answer, {
    produceName: item.name,
    season: seasonLabel(item.season),
    foundAt: listNames(item.markets.map(marketName)),
  });
  return reply(text, { link: intent.link });
}

function seasonal(now) {
  const intent = getIntent("seasonal");
  const month = currentMonth(now);
  const items = produce
    .filter((entry) => inSeason(entry, month))
    .sort((a, b) => a.season.length - b.season.length)
    .map((entry) => entry.name);
  if (!items.length) return fallback();
  const text = fill(intent.answer, {
    month: now.toLocaleString("en-US", { month: "long" }),
    produce: listNames(items, 8),
  });
  return reply(text, { link: intent.link });
}

function openNow(now) {
  const intent = getIntent("open-now");
  const openMarkets = markets.filter((market) =>
    isOpenNow(market.schedule, now),
  );
  if (openMarkets.length) {
    const list = openMarkets.map((market) => {
      const entry = market.schedule[DAY_KEYS[now.getDay()]];
      return `${market.name} (until ${formatTime(entry.close)})`;
    });
    return reply(fill(intent.answer, { markets: listNames(list, 8) }), {
      link: intent.link,
    });
  }
  const upcoming = markets
    .map((market) => ({ market, next: nextOpen(market.schedule, now) }))
    .filter((entry) => entry.next)
    .sort(
      (a, b) =>
        a.next.offset - b.next.offset ||
        toMinutes(a.next.entry.open) - toMinutes(b.next.entry.open),
    );
  if (!upcoming.length) return fallback();
  const { market, next } = upcoming[0];
  let nextTime = `${formatTime(next.entry.open)} today`;
  if (next.offset === 1)
    nextTime = `tomorrow at ${formatTime(next.entry.open)}`;
  if (next.offset > 1)
    nextTime = `${dayNames[next.key]} at ${formatTime(next.entry.open)}`;
  return reply(fill(intent.noResults, { nextMarket: market.name, nextTime }), {
    link: intent.link,
  });
}

function openDay(dayKey, now) {
  const intent = getIntent("open-day");
  let keys = [dayKey];
  let label = dayNames[dayKey];
  let linkDay = dayKey;
  if (dayKey === "weekend") {
    keys = ["sat", "sun"];
    label = "the weekend";
    linkDay = "sat";
  }
  if (dayKey === "tomorrow") {
    const key = DAY_KEYS[(now.getDay() + 1) % 7];
    keys = [key];
    label = "tomorrow";
    linkDay = key;
  }
  const openMarkets = markets.filter((market) =>
    keys.some((key) => market.schedule[key]),
  );
  if (!openMarkets.length) {
    return reply(fill(intent.noResults, { day: label }), { link: intent.link });
  }
  const list = openMarkets.map((market) => {
    const key = keys.find((entry) => market.schedule[entry]);
    const entry = market.schedule[key];
    return `${market.name} (${formatTime(entry.open)}–${formatTime(entry.close)})`;
  });
  return reply(
    fill(intent.answer, { day: label, markets: listNames(list, 8) }),
    {
      link: { label: `View ${label} markets`, to: `/directory?day=${linkDay}` },
    },
  );
}

function nearMe(coords) {
  const intent = getIntent("near-me");
  if (!coords)
    return reply(intent.noResults, { link: intent.link, action: "near-me" });
  const nearest = markets
    .map((market) => ({
      market,
      km: distanceKm(coords.lat, coords.lng, market.lat, market.lng),
    }))
    .sort((a, b) => a.km - b.km)
    .slice(0, 3)
    .map((entry) => `${entry.market.name} (${entry.km} km)`);
  return reply(fill(intent.answer, { markets: listNames(nearest) }), {
    link: intent.link,
  });
}

export function answerQuestion(input, options = {}) {
  const now = options.now || new Date();
  const coords = options.coords || null;
  const text = normalize(input);
  if (!text) return fallback();

  const marketId = findEntity(text, data.entities.markets);
  const produceId = findEntity(text, data.entities.produce);
  const dayKey = findEntity(text, data.entities.days);

  if (marketId) return marketInfo(marketId, dayKey, now);
  if (produceId) return produceInfo(produceId);
  if (dayKey === "today") return openNow(now);

  const scored = data.intents
    .filter((intent) => intent.keywords.length)
    .map((intent) => ({ intent, score: scoreIntent(text, intent) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);
  const best = scored.length ? scored[0].intent : null;

  if (
    dayKey &&
    (!best || ["open-now", "open-day", "hours", "help"].includes(best.id))
  ) {
    return openDay(dayKey, now);
  }
  if (!best) return fallback();

  if (best.action === "seasonal") return seasonal(now);
  if (best.action === "open-now") return openNow(now);
  if (best.action === "near-me") return nearMe(coords);
  if (best.action === "open-day") {
    if (/\bnow\b|\bcurrently\b|\bright now\b/.test(text)) return openNow(now);
    return reply("Which day do you mean? Pick one below or type it.", {
      quickReplies: ["Saturday", "Sunday", "Weekend", "Tomorrow"],
    });
  }
  return staticAnswer(best);
}
