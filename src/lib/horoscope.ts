import OpenAI from "openai";
import { ZodiacSign } from "./zodiac";
import { createSeededRandom } from "./seededRandom";
import {
  OPENERS,
  MIDDLES,
  CLOSERS,
  LOVE_LINES,
  CAREER_LINES,
  WELLNESS_LINES,
  MOODS,
  COLORS,
} from "./horoscopeTemplates";

export type BirthProfile = {
  name: string;
  birthDate: string; // YYYY-MM-DD
  birthTime: string | null; // HH:MM or null if unknown
  birthLocation: string;
};

export type DailyHoroscope = {
  headline: string;
  body: string;
  love: string;
  career: string;
  wellness: string;
  mood: string;
  luckyNumber: number;
  luckyColor: string;
  source: "openai" | "template";
};

function buildSeed(profile: BirthProfile, sign: ZodiacSign, dateLabel: string, variant: number) {
  return [
    profile.birthDate,
    profile.birthTime ?? "unknown",
    profile.birthLocation.trim().toLowerCase(),
    sign.name,
    dateLabel,
    variant,
  ].join("|");
}

function generateTemplateHoroscope(
  profile: BirthProfile,
  sign: ZodiacSign,
  dateLabel: string,
  variant: number
): DailyHoroscope {
  const rng = createSeededRandom(buildSeed(profile, sign, dateLabel, variant));

  const opener = rng.pick(OPENERS);
  const middle = rng.pick(MIDDLES);
  const closer = rng.pick(CLOSERS);
  const trait = rng.pick(sign.traits);

  const body = `${opener}, ${sign.name} \u2014 especially with your naturally ${trait} streak. Today, ${middle}. ${closer}`;

  return {
    headline: `A ${rng.pick(MOODS).toLowerCase()} day for ${sign.name}`,
    body,
    love: rng.pick(LOVE_LINES),
    career: rng.pick(CAREER_LINES),
    wellness: rng.pick(WELLNESS_LINES),
    mood: rng.pick(MOODS),
    luckyNumber: rng.int(1, 99),
    luckyColor: rng.pick(COLORS),
    source: "template",
  };
}

const SYSTEM_PROMPT = `You are Astra, a warm, emotionally intelligent astrologer AI who writes short, specific, encouraging daily horoscopes.
You never hedge with "the stars might suggest" language, you speak with the confident, poetic voice of a professional astrologer.
You always ground the reading in the person's actual sun sign, and, when available, weave in a light nod to their birth time and location without inventing fake precise astronomical claims (like exact rising sign degrees).
You always respond with strict JSON matching this TypeScript type, and nothing else:
{
  "headline": string, // 4-8 word evocative title for the day
  "body": string, // 2-4 sentence horoscope narrative, second person
  "love": string, // one sentence about relationships/connection
  "career": string, // one sentence about work/ambition
  "wellness": string, // one sentence about health/energy
  "mood": string, // a single evocative one-or-two word mood, e.g. "Quietly Bold"
  "luckyNumber": number, // integer between 1 and 99
  "luckyColor": string // a single color name, can be poetic e.g. "Sea Green"
}`;

async function generateOpenAIHoroscope(
  profile: BirthProfile,
  sign: ZodiacSign,
  dateLabel: string,
  variant: number
): Promise<DailyHoroscope> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY not configured");
  }

  const client = new OpenAI({ apiKey });
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const userPrompt = `Write today's (${dateLabel}) personalized horoscope.
Name: ${profile.name || "Friend"}
Sun sign: ${sign.name} (${sign.element} sign, ruled by ${sign.rulingPlanet})
Birth date: ${profile.birthDate}
Birth time: ${profile.birthTime ?? "unknown"}
Birth location: ${profile.birthLocation || "unknown"}
${variant > 0 ? "The reader asked for a fresh alternate reading, make it meaningfully different in tone from a typical first draft." : ""}
Respond with JSON only, matching the required schema exactly.`;

  const completion = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.9,
    response_format: { type: "json_object" },
  });

  const raw = completion.choices[0]?.message?.content;
  if (!raw) {
    throw new Error("Empty response from OpenAI");
  }

  const parsed = JSON.parse(raw) as Omit<DailyHoroscope, "source">;

  if (
    typeof parsed.headline !== "string" ||
    typeof parsed.body !== "string" ||
    typeof parsed.love !== "string" ||
    typeof parsed.career !== "string" ||
    typeof parsed.wellness !== "string" ||
    typeof parsed.mood !== "string" ||
    typeof parsed.luckyNumber !== "number" ||
    typeof parsed.luckyColor !== "string"
  ) {
    throw new Error("Malformed JSON from OpenAI");
  }

  return { ...parsed, source: "openai" };
}

export async function generateHoroscope(
  profile: BirthProfile,
  sign: ZodiacSign,
  dateLabel: string,
  variant: number = 0
): Promise<DailyHoroscope> {
  if (process.env.OPENAI_API_KEY) {
    try {
      return await generateOpenAIHoroscope(profile, sign, dateLabel, variant);
    } catch (error) {
      console.error("Falling back to template horoscope generator:", error);
    }
  }

  return generateTemplateHoroscope(profile, sign, dateLabel, variant);
}
