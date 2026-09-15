/**
 * Deterministic string-seeded PRNG so the same birth profile + calendar day
 * always produces the same fallback horoscope until the next day (or the
 * user explicitly asks for a new reading).
 */
function xmur3(str: string) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return h >>> 0;
  };
}

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createSeededRandom(seed: string) {
  const seedFn = xmur3(seed);
  const rand = mulberry32(seedFn());
  return {
    next: () => rand(),
    pick<T>(items: readonly T[]): T {
      return items[Math.floor(rand() * items.length)];
    },
    int(min: number, max: number): number {
      return Math.floor(rand() * (max - min + 1)) + min;
    },
  };
}
