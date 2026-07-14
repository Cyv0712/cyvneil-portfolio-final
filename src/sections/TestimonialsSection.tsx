import { motion } from "motion/react";
import { ExternalLink, Quote } from "lucide-react";
import { testimonials } from "../data/testimonials";

export default function TestimonialsSection() {
  const isSingle = testimonials.length === 1;

  return (
    <section
      id="testimonials"
      className="relative w-full min-h-[70vh] flex flex-col justify-center py-24 md:py-32 px-6 md:px-12 z-10 overflow-hidden"
    >
      <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-orange-500/8 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/5 w-56 h-56 rounded-full bg-cyan-500/6 blur-[90px] pointer-events-none" />

      <div className="max-w-3xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center space-y-3 mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            What clients say
          </h2>
          <p className="text-sm text-gray-400 max-w-md">
            Feedback from people whose businesses live on the sites I build.
          </p>
          <div className="h-[2px] w-20 bg-gradient-to-r from-cyan-400 via-purple-500 to-transparent mt-1" />
        </motion.div>

        <div
          className={
            isSingle
              ? "flex flex-col items-center"
              : "grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12"
          }
        >
          {testimonials.map((item, index) => (
            <motion.blockquote
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.08 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className={`relative ${isSingle ? "w-full text-center" : "text-left"}`}
            >
              <Quote
                className={`w-7 h-7 text-cyan-400/40 mb-4 ${isSingle ? "mx-auto" : ""}`}
                aria-hidden
              />

              <p className="text-sm sm:text-base md:text-[1.05rem] text-white/85 leading-relaxed font-sans font-light">
                &ldquo;{item.quote}&rdquo;
              </p>

              <footer
                className={`mt-8 pt-6 border-t border-white/10 ${
                  isSingle ? "flex justify-center" : ""
                }`}
              >
                <cite className="not-italic flex items-center gap-4 text-left">
                  <div className="relative shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden ring-1 ring-white/15 shadow-[0_0_20px_rgba(249,115,22,0.15)]">
                    <img
                      src={item.image}
                      alt={`${item.businessName} logo`}
                      className="w-full h-full object-contain object-center bg-black"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="text-white font-semibold text-sm tracking-wide">
                      {item.authorName}
                      {item.authorRole ? (
                        <span className="text-gray-400 font-normal"> · {item.authorRole}</span>
                      ) : null}
                    </span>

                    <a
                      href={item.businessUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 group w-fit"
                    >
                      <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-400 group-hover:from-cyan-200 group-hover:to-purple-200 transition-all">
                        {item.businessName}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-cyan-300 transition-colors shrink-0" />
                    </a>
                  </div>
                </cite>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
