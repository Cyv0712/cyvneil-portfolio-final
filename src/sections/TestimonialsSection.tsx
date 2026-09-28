import { ExternalLink } from "lucide-react";
import FadeIn from "../components/FadeIn";
import { testimonials } from "../data/testimonials";

export default function TestimonialsSection() {
  const isSingle = testimonials.length === 1;

  return (
    <section id="testimonials" className="px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <FadeIn
        as="h2"
        y={40}
        className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-24"
        style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
      >
        Client Testimonies
      </FadeIn>

      <div className={isSingle ? "max-w-4xl mx-auto" : "max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"}>
        {testimonials.map((item, index) => (
          <FadeIn
            key={item.id}
            as="blockquote"
            delay={index * 0.1}
            className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] p-8 sm:p-10 md:p-14 flex flex-col gap-8"
          >
            <p
              className="text-[#D7E2EA] font-light leading-relaxed"
              style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.25rem)" }}
            >
              &ldquo;{item.quote}&rdquo;
            </p>

            <footer className="flex flex-wrap items-center justify-between gap-5 pt-6 border-t border-[#D7E2EA]/20">
              <cite className="not-italic flex items-center gap-4">
                <img
                  src={item.image}
                  alt={`${item.businessName} logo`}
                  loading="lazy"
                  decoding="async"
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full object-contain bg-black border border-[#D7E2EA]/30"
                />
                <div className="flex flex-col">
                  <span className="text-[#D7E2EA] font-medium uppercase tracking-wider">{item.businessName}</span>
                  <span className="text-[#D7E2EA]/60 font-light text-sm">
                    {item.authorName}
                    {item.authorRole ? ` · ${item.authorRole}` : null}
                  </span>
                </div>
              </cite>
              <a
                href={item.businessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-6 py-2.5 text-xs sm:text-sm transition-colors duration-200 hover:bg-[#D7E2EA]/10"
              >
                Visit site
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </footer>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
