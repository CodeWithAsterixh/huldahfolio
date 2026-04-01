import BackgroundWatermark from "~/components/ui/BackgroundWatermark";
import { HomeExpertise } from "../components/home/HomeExpertise";
import { HomeHero } from "../components/home/HomeHero";
import { HomeProjects } from "../components/home/HomeProjects";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { PageContainer } from "../components/layout/Section";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  const baseUrl = "https://huldahfolio.vercel.app"; // Production URL
  const title = "Huldah Peter | Videographer & Video Editor";
  const description = "Professional Videographer and Video Editor in Lagos. Specializing in cinematic dance, commercials, and high-impact social media content.";
  const ogImage = `${baseUrl}/og-home.png`;

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: ogImage },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:type", content: "image/png" },
    { property: "og:image:alt", content: "Huldah Peter - Professional Videographer & Video Editor Portfolio" },
    { property: "og:url", content: baseUrl },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },
  ];
}

export default function Home() {
  return (
    <main className="bg-[#050505] min-h-screen">
      <Header />
      <PageContainer>
        <BackgroundWatermark divAttr={{
          className: "fixed top-1/2! -translate-x-1/2!"
        }} />
        <HomeHero />
        <HomeProjects />
        <HomeExpertise />
        <Footer />
      </PageContainer>
    </main>
  );
}
