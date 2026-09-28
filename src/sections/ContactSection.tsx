import { useState } from "react";
import { Github, Linkedin, Facebook, Check, Copy, MapPin } from "lucide-react";
import FadeIn from "../components/FadeIn";
import ContactButton from "../components/ContactButton";
import { site } from "../data/site";

const SOCIALS = [
  { label: "LinkedIn", href: site.social.linkedin, Icon: Linkedin },
  { label: "GitHub", href: site.social.github, Icon: Github },
  { label: "Facebook", href: site.social.facebook, Icon: Facebook },
];

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(site.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section
      id="contact"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-10 text-[#0C0C0C]"
    >
      <FadeIn
        as="h2"
        y={40}
        className="font-black uppercase leading-none tracking-tight text-center mb-10 sm:mb-14"
        style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
      >
        Let&apos;s talk
      </FadeIn>

      <FadeIn delay={0.1} className="flex flex-col items-center gap-8 sm:gap-10 text-center">
        <p className="font-light opacity-60 max-w-xl" style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.25rem)" }}>
          Need a web developer? Send me a message and I&apos;ll get back to you within a day.
        </p>

        <a
          href={`mailto:${site.email}`}
          className="font-medium break-all transition-opacity duration-200 hover:opacity-70"
          style={{ fontSize: "clamp(1.25rem, 4vw, 3.25rem)" }}
        >
          {site.email}
        </a>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <ContactButton href={`mailto:${site.email}`} label="Email Me" />
          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#0C0C0C] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:py-4 text-xs sm:text-sm md:text-base transition-colors duration-200 hover:bg-[#0C0C0C]/5 cursor-pointer"
          >
            {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copiedEmail ? "Copied!" : "Copy Email"}
          </button>
        </div>
      </FadeIn>

      <div
        className="max-w-5xl mx-auto mt-20 sm:mt-24 md:mt-32 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        style={{ borderTop: "1px solid rgba(12, 12, 12, 0.15)" }}
      >
        <span className="inline-flex items-center gap-2 font-light opacity-60 text-sm uppercase tracking-wider">
          <MapPin className="w-4 h-4" />
          {site.location}
        </span>
        <div className="flex items-center gap-6">
          {SOCIALS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-medium uppercase tracking-wider text-sm transition-opacity duration-200 hover:opacity-60"
            >
              <Icon className="w-4 h-4" />
              {label}
            </a>
          ))}
        </div>
      </div>

      <p className="text-center font-light opacity-40 text-xs uppercase tracking-widest mt-10">
        © {new Date().getFullYear()} {site.fullName}
      </p>
    </section>
  );
}
