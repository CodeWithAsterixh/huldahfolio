import { PageContainer } from "../components/layout/Section";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { HomeHero } from "../components/home/HomeHero";
import { HomeProjects } from "../components/home/HomeProjects";
import { HomeExpertise } from "../components/home/HomeExpertise";

export default function Home() {
  return (
    <main className="bg-[#050505] min-h-screen">
      <Header />
      <PageContainer>
        <HomeHero />
        <HomeProjects />
        <HomeExpertise />
        <Footer />
      </PageContainer>
    </main>
  );
}
