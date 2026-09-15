"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { BirthProfile, DailyHoroscope } from "@/lib/horoscope";
import { getZodiacSign } from "@/lib/zodiac";
import { Heart, Briefcase, HeartPulse, Sparkles, RefreshCw, Pencil } from "lucide-react";

type HoroscopeViewProps = {
  profile: BirthProfile;
  onEditProfile: () => void;
};

type ApiResponse = {
  sign: {
    name: string;
    symbol: string;
    element: string;
    rulingPlanet: string;
    dateRange: string;
  };
  dateLabel: string;
  horoscope: DailyHoroscope;
};

function isoDateToday() {
  return new Date().toISOString().slice(0, 10);
}

function prettyDateToday() {
  return new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function cacheKey(profile: BirthProfile, isoDate: string, variant: number) {
  return `astra:horoscope:${isoDate}:${variant}:${profile.birthDate}:${profile.birthTime ?? "?"}:${profile.birthLocation.toLowerCase()}`;
}

export function HoroscopeView({ profile, onEditProfile }: HoroscopeViewProps) {
  const sign = useMemo(() => getZodiacSign(profile.birthDate), [profile.birthDate]);
  const isoDate = useMemo(() => isoDateToday(), []);
  const prettyDate = useMemo(() => prettyDateToday(), []);

  const [variant, setVariant] = useState(0);
  const [result, setResult] = useState<ApiResponse | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const raw = window.localStorage.getItem(cacheKey(profile, isoDate, 0));
      return raw ? (JSON.parse(raw) as ApiResponse) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchHoroscope(nextVariant: number) {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/horoscope", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: profile.name,
          birthDate: profile.birthDate,
          birthTime: profile.birthTime,
          birthLocation: profile.birthLocation,
          todayLabel: isoDate,
          variant: nextVariant,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong.");
      }

      const data = (await response.json()) as ApiResponse;
      setResult(data);
      setVariant(nextVariant);
      try {
        window.localStorage.setItem(
          cacheKey(profile, isoDate, nextVariant),
          JSON.stringify(data)
        );
      } catch {
        // Storage might be full or unavailable; non-fatal.
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex w-full max-w-2xl flex-col gap-6">
      <Card className="border-white/10 bg-card/60 backdrop-blur-xl shadow-2xl shadow-black/40">
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary/15 text-4xl text-primary ring-1 ring-primary/30">
              {sign.symbol}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {profile.name ? `${profile.name}\u2019s sign` : "Your sign"}
              </p>
              <h2 className="text-2xl font-semibold tracking-tight">{sign.name}</h2>
              <p className="text-xs text-muted-foreground">
                {sign.dateRange} &middot; {sign.element} &middot; ruled by {sign.rulingPlanet}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onEditProfile}
            aria-label="Edit birth details"
            title="Edit birth details"
          >
            <Pencil className="size-4" />
          </Button>
        </CardHeader>
      </Card>

      <Card className="border-white/10 bg-card/60 backdrop-blur-xl shadow-2xl shadow-black/40">
        <CardHeader className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground">{prettyDate}</p>
          {result ? (
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              {result.horoscope.headline}
            </h3>
          ) : (
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              Your daily horoscope awaits
            </h3>
          )}
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {!result && !loading && (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <Sparkles className="size-8 text-primary" />
              <p className="max-w-sm text-sm text-muted-foreground">
                Tap the button below and Astra will read the sky for you, personalized
                to your exact birth date, time, and place.
              </p>
              <Button size="lg" onClick={() => fetchHoroscope(0)} className="font-medium">
                Reveal today&apos;s horoscope
              </Button>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center gap-3 py-10 text-center text-muted-foreground">
              <Sparkles className="size-8 animate-pulse text-primary" />
              <p className="text-sm">Reading the stars for you\u2026</p>
            </div>
          )}

          {error && !loading && (
            <div className="flex flex-col items-center gap-3 py-4 text-center">
              <p className="text-sm text-destructive">{error}</p>
              <Button variant="outline" onClick={() => fetchHoroscope(variant)}>
                Try again
              </Button>
            </div>
          )}

          {result && !loading && (
            <>
              <p className="text-base leading-relaxed text-foreground/90">
                {result.horoscope.body}
              </p>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="gap-1.5">
                  <Sparkles className="size-3.5" /> {result.horoscope.mood}
                </Badge>
                <Badge variant="outline" className="gap-1.5">
                  Lucky number {result.horoscope.luckyNumber}
                </Badge>
                <Badge variant="outline" className="gap-1.5">
                  Lucky color: {result.horoscope.luckyColor}
                </Badge>
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex flex-col gap-2 rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    <Heart className="size-4" /> Love
                  </div>
                  <p className="text-sm text-muted-foreground">{result.horoscope.love}</p>
                </div>
                <div className="flex flex-col gap-2 rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    <Briefcase className="size-4" /> Career
                  </div>
                  <p className="text-sm text-muted-foreground">{result.horoscope.career}</p>
                </div>
                <div className="flex flex-col gap-2 rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    <HeartPulse className="size-4" /> Wellness
                  </div>
                  <p className="text-sm text-muted-foreground">{result.horoscope.wellness}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <p className="text-xs text-muted-foreground">
                  {result.horoscope.source === "openai"
                    ? "Generated by Astra's AI"
                    : "Generated locally (add an OpenAI key for AI readings)"}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => fetchHoroscope(variant + 1)}
                  className="gap-1.5 text-xs"
                >
                  <RefreshCw className="size-3.5" /> New reading
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
