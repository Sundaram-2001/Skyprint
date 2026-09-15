import { BirthProfile } from "./horoscope";

const STORAGE_KEY = "astra:birth-profile";

function parseProfile(raw: string | null): BirthProfile | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      typeof parsed.birthDate === "string" &&
      typeof parsed.birthLocation === "string"
    ) {
      return {
        name: typeof parsed.name === "string" ? parsed.name : "",
        birthDate: parsed.birthDate,
        birthTime: typeof parsed.birthTime === "string" ? parsed.birthTime : null,
        birthLocation: parsed.birthLocation,
      };
    }
  } catch {
    // Ignore corrupted storage.
  }
  return null;
}

let cachedSnapshot: BirthProfile | null | undefined;
const listeners = new Set<() => void>();

function readFromStorage(): BirthProfile | null {
  if (typeof window === "undefined") return null;
  return parseProfile(window.localStorage.getItem(STORAGE_KEY));
}

/** Stable snapshot getter for useSyncExternalStore: only recomputes on explicit change. */
export function getProfileSnapshot(): BirthProfile | null {
  if (cachedSnapshot === undefined) {
    cachedSnapshot = readFromStorage();
  }
  return cachedSnapshot;
}

export function getProfileServerSnapshot(): BirthProfile | null {
  return null;
}

export function subscribeToProfile(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function notifyProfileChange() {
  listeners.forEach((listener) => listener());
}

export function saveProfile(profile: BirthProfile) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  cachedSnapshot = profile;
  notifyProfileChange();
}

export function clearProfile() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
  cachedSnapshot = null;
  notifyProfileChange();
}
