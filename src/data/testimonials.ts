export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorRole?: string;
  businessName: string;
  businessUrl: string;
  /** Business mark / site preview — prefer brand over personal photo when no headshot exists */
  image: string;
  projectSlug?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "katingin-bikes",
    quote:
      "Super helpful! Since we have so much inventory, it's hard to send available units to buyers one by one—especially because we can't post every available unit at the same time, so having a website really helped us. When buyers ask what's available, we just send them the website and they pick from there. We no longer need to dig through our old postings. For financing, buyers sometimes struggle to check email and everything else. On the website we can reach them directly by email. It's also easier for our clients to see whether a unit is still available or not.",
    authorName: "Owner",
    businessName: "Katingin Bikes",
    businessUrl: "https://katinginbikes.com",
    image: "https://www.katinginbikes.com/static_data/Katingin_logo.webp",
    projectSlug: "katingin-bikes",
  },
];
