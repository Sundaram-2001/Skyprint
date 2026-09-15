export type ZodiacSign = {
  name: string;
  symbol: string;
  element: "Fire" | "Earth" | "Air" | "Water";
  rulingPlanet: string;
  dateRange: string;
  traits: string[];
};

export const ZODIAC_SIGNS: ZodiacSign[] = [
  {
    name: "Aries",
    symbol: "\u2648",
    element: "Fire",
    rulingPlanet: "Mars",
    dateRange: "Mar 21 - Apr 19",
    traits: ["bold", "energetic", "impulsive", "competitive"],
  },
  {
    name: "Taurus",
    symbol: "\u2649",
    element: "Earth",
    rulingPlanet: "Venus",
    dateRange: "Apr 20 - May 20",
    traits: ["steady", "sensual", "stubborn", "loyal"],
  },
  {
    name: "Gemini",
    symbol: "\u264A",
    element: "Air",
    rulingPlanet: "Mercury",
    dateRange: "May 21 - Jun 20",
    traits: ["curious", "witty", "adaptable", "restless"],
  },
  {
    name: "Cancer",
    symbol: "\u264B",
    element: "Water",
    rulingPlanet: "Moon",
    dateRange: "Jun 21 - Jul 22",
    traits: ["nurturing", "intuitive", "protective", "moody"],
  },
  {
    name: "Leo",
    symbol: "\u264C",
    element: "Fire",
    rulingPlanet: "Sun",
    dateRange: "Jul 23 - Aug 22",
    traits: ["confident", "generous", "dramatic", "warm"],
  },
  {
    name: "Virgo",
    symbol: "\u264D",
    element: "Earth",
    rulingPlanet: "Mercury",
    dateRange: "Aug 23 - Sep 22",
    traits: ["precise", "practical", "helpful", "critical"],
  },
  {
    name: "Libra",
    symbol: "\u264E",
    element: "Air",
    rulingPlanet: "Venus",
    dateRange: "Sep 23 - Oct 22",
    traits: ["diplomatic", "charming", "indecisive", "fair-minded"],
  },
  {
    name: "Scorpio",
    symbol: "\u264F",
    element: "Water",
    rulingPlanet: "Pluto",
    dateRange: "Oct 23 - Nov 21",
    traits: ["intense", "passionate", "secretive", "resilient"],
  },
  {
    name: "Sagittarius",
    symbol: "\u2650",
    element: "Fire",
    rulingPlanet: "Jupiter",
    dateRange: "Nov 22 - Dec 21",
    traits: ["adventurous", "optimistic", "blunt", "philosophical"],
  },
  {
    name: "Capricorn",
    symbol: "\u2651",
    element: "Earth",
    rulingPlanet: "Saturn",
    dateRange: "Dec 22 - Jan 19",
    traits: ["disciplined", "ambitious", "patient", "reserved"],
  },
  {
    name: "Aquarius",
    symbol: "\u2652",
    element: "Air",
    rulingPlanet: "Uranus",
    dateRange: "Jan 20 - Feb 18",
    traits: ["independent", "inventive", "detached", "humanitarian"],
  },
  {
    name: "Pisces",
    symbol: "\u2653",
    element: "Water",
    rulingPlanet: "Neptune",
    dateRange: "Feb 19 - Mar 20",
    traits: ["dreamy", "empathetic", "artistic", "escapist"],
  },
];

/**
 * Computes the western sun sign from a birth date string (YYYY-MM-DD).
 * Boundary dates use the conventional cutoffs found in most almanacs.
 */
export function getZodiacSign(birthDate: string): ZodiacSign {
  const [, monthStr, dayStr] = birthDate.split("-");
  const month = Number(monthStr);
  const day = Number(dayStr);

  const inRange = (
    startMonth: number,
    startDay: number,
    endMonth: number,
    endDay: number
  ) => {
    if (startMonth === endMonth) {
      return month === startMonth && day >= startDay && day <= endDay;
    }
    return (
      (month === startMonth && day >= startDay) ||
      (month === endMonth && day <= endDay)
    );
  };

  if (inRange(3, 21, 4, 19)) return ZODIAC_SIGNS[0];
  if (inRange(4, 20, 5, 20)) return ZODIAC_SIGNS[1];
  if (inRange(5, 21, 6, 20)) return ZODIAC_SIGNS[2];
  if (inRange(6, 21, 7, 22)) return ZODIAC_SIGNS[3];
  if (inRange(7, 23, 8, 22)) return ZODIAC_SIGNS[4];
  if (inRange(8, 23, 9, 22)) return ZODIAC_SIGNS[5];
  if (inRange(9, 23, 10, 22)) return ZODIAC_SIGNS[6];
  if (inRange(10, 23, 11, 21)) return ZODIAC_SIGNS[7];
  if (inRange(11, 22, 12, 21)) return ZODIAC_SIGNS[8];
  if (inRange(12, 22, 1, 19)) return ZODIAC_SIGNS[9];
  if (inRange(1, 20, 2, 18)) return ZODIAC_SIGNS[10];
  return ZODIAC_SIGNS[11];
}
