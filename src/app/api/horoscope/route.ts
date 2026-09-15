import { NextRequest, NextResponse } from "next/server";
import { getZodiacSign } from "@/lib/zodiac";
import { generateHoroscope, BirthProfile } from "@/lib/horoscope";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}$/;

export async function POST(request: NextRequest) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (typeof payload !== "object" || payload === null) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const body = payload as Record<string, unknown>;
  const name = typeof body.name === "string" ? body.name.trim().slice(0, 80) : "";
  const birthDate = typeof body.birthDate === "string" ? body.birthDate : "";
  const birthTimeRaw = typeof body.birthTime === "string" ? body.birthTime : "";
  const birthLocation =
    typeof body.birthLocation === "string" ? body.birthLocation.trim().slice(0, 120) : "";
  const todayLabel = typeof body.todayLabel === "string" ? body.todayLabel.slice(0, 40) : "";
  const variant = typeof body.variant === "number" && Number.isFinite(body.variant) ? body.variant : 0;

  if (!DATE_RE.test(birthDate)) {
    return NextResponse.json(
      { error: "birthDate is required in YYYY-MM-DD format." },
      { status: 400 }
    );
  }

  if (!birthLocation) {
    return NextResponse.json(
      { error: "birthLocation is required." },
      { status: 400 }
    );
  }

  if (!todayLabel) {
    return NextResponse.json({ error: "todayLabel is required." }, { status: 400 });
  }

  const birthTime = TIME_RE.test(birthTimeRaw) ? birthTimeRaw : null;

  const profile: BirthProfile = { name, birthDate, birthTime, birthLocation };
  const sign = getZodiacSign(birthDate);

  try {
    const horoscope = await generateHoroscope(profile, sign, todayLabel, variant);
    return NextResponse.json({
      sign: {
        name: sign.name,
        symbol: sign.symbol,
        element: sign.element,
        rulingPlanet: sign.rulingPlanet,
        dateRange: sign.dateRange,
      },
      dateLabel: todayLabel,
      horoscope,
    });
  } catch (error) {
    console.error("Failed to generate horoscope:", error);
    return NextResponse.json(
      { error: "Failed to generate horoscope. Please try again." },
      { status: 500 }
    );
  }
}
