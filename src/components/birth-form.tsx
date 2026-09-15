"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BirthProfile } from "@/lib/horoscope";
import { getZodiacSign } from "@/lib/zodiac";

type BirthFormProps = {
  onSubmit: (profile: BirthProfile) => void;
  initialProfile?: BirthProfile | null;
};

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function formatDisplayDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function BirthForm({ onSubmit, initialProfile }: BirthFormProps) {
  const [name, setName] = useState(initialProfile?.name ?? "");
  const [birthDate, setBirthDate] = useState(initialProfile?.birthDate ?? "");
  const [birthTime, setBirthTime] = useState(initialProfile?.birthTime ?? "");
  const [timeUnknown, setTimeUnknown] = useState(
    initialProfile ? initialProfile.birthTime === null : false
  );
  const [birthLocation, setBirthLocation] = useState(
    initialProfile?.birthLocation ?? ""
  );
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    if (!birthDate) {
      setError("Please enter your date of birth.");
      return;
    }

    if (birthDate > todayIsoDate()) {
      setError("Birth date can't be in the future.");
      return;
    }

    if (!timeUnknown && birthTime && !/^\d{2}:\d{2}$/.test(birthTime)) {
      setError("Please enter a valid birth time.");
      return;
    }

    if (!birthLocation.trim()) {
      setError("Please enter your place of birth.");
      return;
    }

    onSubmit({
      name: name.trim(),
      birthDate,
      birthTime: timeUnknown ? null : birthTime || null,
      birthLocation: birthLocation.trim(),
    });
  }

  return (
    <Card className="w-full max-w-md border-white/10 bg-card/60 backdrop-blur-xl shadow-2xl shadow-black/40">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold tracking-tight text-foreground">
          Chart your cosmic profile
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Share your birth details once and unlock a new personalized reading every day.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name (optional)</Label>
            <Input
              id="name"
              placeholder="What should we call you?"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={80}
              autoComplete="name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="birthDate">Date of birth</Label>
            <Input
              id="birthDate"
              type="date"
              value={birthDate}
              max={todayIsoDate()}
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />
            {ISO_DATE_RE.test(birthDate) && (
              <p className="text-xs text-muted-foreground">
                {formatDisplayDate(birthDate)} &middot; {getZodiacSign(birthDate).symbol}{" "}
                {getZodiacSign(birthDate).name} &mdash; double-check this is the date you
                meant to enter.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="birthTime">Time of birth</Label>
              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                <input
                  type="checkbox"
                  className="size-3.5 rounded border-white/20 bg-transparent accent-primary"
                  checked={timeUnknown}
                  onChange={(e) => setTimeUnknown(e.target.checked)}
                />
                I don&apos;t know
              </label>
            </div>
            <Input
              id="birthTime"
              type="time"
              value={birthTime}
              disabled={timeUnknown}
              onChange={(e) => setBirthTime(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="birthLocation">Place of birth</Label>
            <Input
              id="birthLocation"
              placeholder="City, Country"
              value={birthLocation}
              onChange={(e) => setBirthLocation(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}

          <Button type="submit" size="lg" className="mt-1 w-full font-medium">
            Reveal my cosmic profile
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
