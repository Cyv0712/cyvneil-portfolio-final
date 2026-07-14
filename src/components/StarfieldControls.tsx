import { motion, AnimatePresence } from "motion/react";
import { Sliders, RotateCcw, Stars } from "lucide-react";
import { THEME_PRESETS, type ThemeConfig } from "../data/themes";
import type { StarfieldConfig } from "./StarfieldCanvas";

interface StarfieldControlsProps {
  showConfig: boolean;
  onToggleConfig: () => void;
  activeTheme: ThemeConfig;
  onThemeChange: (theme: ThemeConfig) => void;
  config: StarfieldConfig;
  onConfigChange: (patch: Partial<StarfieldConfig>) => void;
  onResetDefaults: () => void;
}

export default function StarfieldControls({
  showConfig,
  onToggleConfig,
  activeTheme,
  onThemeChange,
  config,
  onConfigChange,
  onResetDefaults,
}: StarfieldControlsProps) {
  const { starCount, twinkleSpeedFactor, parallaxStrength, shootingStarRate } = config;

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-20 flex flex-col items-end">
      <AnimatePresence>
        {showConfig && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 w-[calc(100vw-2rem)] sm:w-80 max-w-sm max-h-[75vh] overflow-y-auto bg-black/90 backdrop-blur-md border border-white/10 rounded-xl p-5 text-white shadow-2xl custom-scrollbar"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-semibold font-mono uppercase tracking-wider">Starfield Playground</span>
              </div>
              <button
                onClick={onResetDefaults}
                className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors"
                title="Reset to Defaults"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-mono uppercase text-gray-400 tracking-wider block mb-2">Space Theme Nebula</label>
                <div className="grid grid-cols-2 gap-2">
                  {THEME_PRESETS.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => onThemeChange(theme)}
                      className={`text-left p-2 rounded-lg text-xs transition-all border ${
                        activeTheme.id === theme.id
                          ? "bg-white/10 border-white/30 text-white font-medium"
                          : "bg-white/5 border-transparent text-gray-400 hover:bg-white/5 hover:border-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full block border border-white/10"
                          style={{ backgroundImage: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})` }}
                        />
                        <span className="truncate">{theme.name.split(" ")[0]}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Star Density</label>
                  <span className="text-[10px] font-mono text-purple-300">{starCount} stars</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="25"
                  value={starCount}
                  onChange={(e) => onConfigChange({ starCount: parseInt(e.target.value) })}
                  className="w-full accent-purple-500 h-1 bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Twinkle Sparkle Speed</label>
                  <span className="text-[10px] font-mono text-purple-300">{twinkleSpeedFactor.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="3.0"
                  step="0.1"
                  value={twinkleSpeedFactor}
                  onChange={(e) => onConfigChange({ twinkleSpeedFactor: parseFloat(e.target.value) })}
                  className="w-full accent-purple-500 h-1 bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Parallax Depth Drift</label>
                  <span className="text-[10px] font-mono text-purple-300">{parallaxStrength}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="45"
                  step="5"
                  value={parallaxStrength}
                  onChange={(e) => onConfigChange({ parallaxStrength: parseInt(e.target.value) })}
                  className="w-full accent-purple-500 h-1 bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              <div className="border-b border-white/10 pb-4">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Comet Frequency</label>
                  <span className="text-[10px] font-mono text-purple-300">
                    {shootingStarRate === 0 ? "Disabled" : `Rate ${shootingStarRate}`}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={shootingStarRate}
                  onChange={(e) => onConfigChange({ shootingStarRate: parseInt(e.target.value) })}
                  className="w-full accent-purple-500 h-1 bg-white/10 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="rainbow-border-button rounded-full p-[1.5px] shadow-lg">
        <button
          onClick={onToggleConfig}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
            showConfig
              ? "bg-purple-600 text-white"
              : "bg-[#0b0b0f] text-gray-300 hover:text-white hover:bg-[#14141b]"
          }`}
        >
          {showConfig ? (
            <>
              <Stars className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "6s" }} />
              <span>Close Options</span>
            </>
          ) : (
            <>
              <Sliders className="w-3.5 h-3.5" />
              <span>Customize Scene</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
