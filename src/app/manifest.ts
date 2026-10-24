import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "YatraSathi",
    short_name: "YatraSathi",
    description: "Go further. Feel closer. Honest travel companion for India.",
    start_url: "/",
    display: "standalone",
    background_color: "#f3e4cc",
    theme_color: "#b13216",
    icons: [
      {
        src: "/images/hero-jaipur.jpg",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
  };
}
