import FadeIn from "../components/FadeIn";
import { site } from "../data/site";

const DIVIDER = "1px solid rgba(12, 12, 12, 0.15)";

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn
        as="h2"
        y={40}
        className="text-[#0C0C0C] font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
      >
        Services
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {site.services.map((service, i) => (
          <FadeIn
            key={service.name}
            delay={i * 0.1}
            className="flex items-center gap-6 sm:gap-10 md:gap-14 py-8 sm:py-10 md:py-12 text-[#0C0C0C]"
            style={{ borderTop: i === 0 ? DIVIDER : undefined, borderBottom: DIVIDER }}
          >
            <span className="font-black leading-none shrink-0 w-[1.3em]" style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-col gap-2 sm:gap-3">
              <h3 className="font-medium uppercase" style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}>
                {service.name}
              </h3>
              <p
                className="font-light leading-relaxed max-w-2xl opacity-60"
                style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}
              >
                {service.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
