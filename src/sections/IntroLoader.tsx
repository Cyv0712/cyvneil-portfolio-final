import { motion, AnimatePresence } from "motion/react";

interface IntroLoaderProps {
  initialLoading: boolean;
  loaderActive: boolean;
}

export default function IntroLoader({ initialLoading, loaderActive }: IntroLoaderProps) {
  return (
    <AnimatePresence>
      {initialLoading && (
        <motion.div
          key="global-initial-loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 w-full h-full z-[9999] overflow-hidden flex items-center justify-center bg-transparent"
        >
          <div className="absolute inset-0 grid grid-cols-7 w-full h-full gap-0 pointer-events-none z-10 font-display">
            {Array.from({ length: 7 }).map((_, index) => {
              const panelDelay = index * 0.16;

              return (
                <div key={index} className="relative w-full h-full overflow-hidden">
                  <div
                    className={`loader-shutter flex items-center justify-center ${!loaderActive ? "exit" : ""}`}
                    style={{
                      transitionDelay: `${panelDelay}s`,
                    }}
                  >
                    <div
                      className="absolute top-0 h-full flex items-center justify-center select-none px-6"
                      style={{
                        width: "100vw",
                        left: `${index * (-100 / 7)}vw`,
                      }}
                    >
                      <div className="flex items-center justify-center gap-3 sm:gap-5 md:gap-7">
                        {Array.from("CYVNEIL").map((letter, letterIndex) => {
                          const letterDelay = letterIndex * 0.16;

                          return (
                            <span
                              key={letterIndex}
                              className="inline-block text-[clamp(3.75rem,12vw,9rem)] font-bold leading-none text-white drop-shadow-[0_15px_45px_rgba(0,0,0,0.6)] loader-letter"
                              style={{
                                animationDelay: `${letterDelay}s`,
                              }}
                            >
                              {letter}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
