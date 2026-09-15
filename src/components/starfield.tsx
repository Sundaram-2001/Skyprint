import { createSeededRandom } from "@/lib/seededRandom";

type Star = {
  top: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
};

function buildStars(count: number, seed: string): Star[] {
  const rng = createSeededRandom(seed);
  return Array.from({ length: count }, () => ({
    top: `${rng.next() * 100}%`,
    left: `${rng.next() * 100}%`,
    size: rng.next() * 2 + 1,
    duration: rng.next() * 4 + 2,
    delay: rng.next() * 5,
    opacity: rng.next() * 0.5 + 0.3,
  }));
}

const STARS = buildStars(140, "astra-starfield-v1");

export function Starfield() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      <div className="cosmic-bg absolute inset-0" />
      {STARS.map((star, i) => (
        <span
          key={i}
          className="star"
          style={
            {
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              "--star-duration": `${star.duration}s`,
              "--star-delay": `${star.delay}s`,
              "--star-opacity": star.opacity,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
