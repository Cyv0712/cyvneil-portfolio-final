interface LiveProjectButtonProps {
  href: string;
  label?: string;
  /** Smaller padding and text below the sm breakpoint, for tight rows on phones. */
  compact?: boolean;
  className?: string;
}

export default function LiveProjectButton({ href, label = "Live Project", compact = false, className = "" }: LiveProjectButtonProps) {
  const size = compact ? "px-5 py-2 text-xs tracking-wider" : "px-8 py-3 text-sm tracking-widest";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block whitespace-nowrap rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase ${size} sm:px-10 sm:py-3.5 sm:text-base sm:tracking-widest transition-colors duration-200 hover:bg-[#D7E2EA]/10 ${className}`}
    >
      {label}
    </a>
  );
}
