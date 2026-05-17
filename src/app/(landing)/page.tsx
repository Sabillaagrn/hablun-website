import { UmkmReminder } from "@/features/landing/components/sections"
import {
  HeroSection,
  AboutSection,
  VisionMissionSection,
  ProblemSolutionSection,
  CommunityAttractionSection
} from "../../features/landing"

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <UmkmReminder />
      <AboutSection />
      <VisionMissionSection />
      <ProblemSolutionSection />
      <CommunityAttractionSection />
    </>
  )
}
