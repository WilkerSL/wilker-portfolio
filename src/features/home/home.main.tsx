import { AboutMain } from "@/features/about/about.main";
import { CastMain } from "@/features/cast/cast.main";
import { ContactMain } from "@/features/contact/contact.main";
import { HeroMain } from "@/features/hero/hero.main";
import { ProjectsMain } from "@/features/projects/projects.main";
import { TimelineMain } from "@/features/timeline/timeline.main";

export function HomeMain() {
  return (
    <>
      <HeroMain />
      <AboutMain />
      <CastMain />
      <ProjectsMain />
      <TimelineMain />
      <ContactMain />
    </>
  );
}
