import HomeSection from "@/app/_components/home-section";
import AboutSection from "@/app/_components/about-section";
import ProjectsSection from "@/app/_components/projects-section";
import WritingSection from "@/app/_components/writing-section";
import ContactSection from "@/app/_components/contact-section";
import { getAllPosts } from "@/lib/posts";

export default function Index() {
  return (
    <main>
      <HomeSection />
      <ProjectsSection />
      <WritingSection posts={getAllPosts().slice(0, 3)} />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
