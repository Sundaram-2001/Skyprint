"use client";

import { useState, useSyncExternalStore } from "react";
import { BirthForm } from "@/components/birth-form";
import { HoroscopeView } from "@/components/horoscope-view";
import { BirthProfile } from "@/lib/horoscope";
import {
  getProfileServerSnapshot,
  getProfileSnapshot,
  saveProfile,
  subscribeToProfile,
} from "@/lib/storage";

export default function Home() {
  const storedProfile = useSyncExternalStore(
    subscribeToProfile,
    getProfileSnapshot,
    getProfileServerSnapshot
  );
  const [editing, setEditing] = useState(false);

  function handleSubmit(newProfile: BirthProfile) {
    saveProfile(newProfile);
    setEditing(false);
  }

  return (
    <div className="relative flex min-h-screen flex-1 flex-col items-center justify-center px-4 py-16">
      <div className="flex w-full flex-col items-center gap-3 pb-10 text-center">
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-primary/80">
          Astra
        </span>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Your Daily Horoscope
        </h1>
        <p className="max-w-md text-sm text-muted-foreground sm:text-base">
          Enter your birth details once, then get a fresh, personalized reading
          every day at the click of a button.
        </p>
      </div>

      {storedProfile && !editing ? (
        <HoroscopeView profile={storedProfile} onEditProfile={() => setEditing(true)} />
      ) : (
        <BirthForm onSubmit={handleSubmit} initialProfile={storedProfile} />
      )}

      <footer className="mt-16 text-center text-xs text-muted-foreground/70">
        For entertainment purposes only &middot; your data stays on your device
      </footer>
    </div>
  );
}
