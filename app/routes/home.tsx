import BackgroundWatermark from "~/components/ui/BackgroundWatermark";
import { HomeExpertise } from "../components/home/HomeExpertise";
import { HomeHero } from "../components/home/HomeHero";
import { HomeProjects } from "../components/home/HomeProjects";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { PageContainer } from "../components/layout/Section";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Huldah Peter | Videographer & Video Editor" },
    { name: "description", content: "Professional Videographer and Video Editor in Lagos. Specializing in cinematic dance, commercials, and high-impact social media content." },
    { property: "og:title", content: "Huldah Peter | Videographer & Video Editor" },
    { property: "og:description", content: "Explore the creative portfolio of Huldah Peter. Premium videography and editing for brands, artists, and creators." },
    { property: "og:image", content: "/og-home.png" },
    { name: "twitter:title", content: "Huldah Peter | Videographer & Video Editor" },
    { name: "twitter:description", content: "Explore the creative portfolio of Huldah Peter." },
    { name: "twitter:image", content: "/og-home.png" },
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
