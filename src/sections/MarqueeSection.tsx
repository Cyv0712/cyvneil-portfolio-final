import { useEffect, useRef, useState } from "react";
import { projects } from "../data/projects";

interface Tile {
  src: string;
  alt: string;
}

const tiles: Tile[] = projects.flatMap((p) =>
  [p.image, ...(p.gallery ?? [])].map((src) => ({ src, alt: p.title })),
);

// Alternate screenshots between the two rows so one project's gallery doesn't
// fill a whole row, then repeat each row so it stays wider than the viewport.
const repeat = (arr: Tile[], times: number) => Array.from({ length: times }, () => arr).flat();
const ROW_1 = repeat(tiles.filter((_, i) => i % 2 === 0), 4);
const ROW_2 = repeat(tiles.filter((_, i) => i % 2 === 1), 4);

function MarqueeTile({ src, alt }: Tile) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="w-[420px] h-[270px] shrink-0 rounded-2xl object-cover object-top"
    />
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden">
      <div className="flex flex-col gap-3">
        {/* Row 1 starts shifted left so it has room to travel right */}
        <div className="flex gap-3 w-max -ml-[1800px]" style={{ transform: `translateX(${offset - 200}px)`, willChange: "transform" }}>
          {ROW_1.map((tile, i) => (
            <MarqueeTile key={i} {...tile} />
          ))}
        </div>
        <div className="flex gap-3 w-max" style={{ transform: `translateX(${-(offset - 200)}px)`, willChange: "transform" }}>
          {ROW_2.map((tile, i) => (
            <MarqueeTile key={i} {...tile} />
          ))}
        </div>
      </div>
    </section>
  );
}
