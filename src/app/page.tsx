"use client"

import { PageWrapper } from "@/components/layout/PageWrapper"

// Section Components
import { HeroSection } from "@/components/sections/Hero"
import { StatsBar } from "@/components/sections/Stats"
import { ServicesSection } from "@/components/sections/Services"
import { ProductsSection } from "@/components/sections/Products"
import { AboutSection } from "@/components/sections/About"
import { ThreatCounter } from "@/components/sections/ThreatCounter"
import { WhyUsSection } from "@/components/sections/WhyUs"
import { ClientsSection } from "@/components/sections/Clients"
import { ContactSection } from "@/components/sections/Contact"

export default function CyberducePage() {
  return (
    <PageWrapper>
      <HeroSection />
      <StatsBar />
      <ServicesSection />
      <ProductsSection />
      <AboutSection />
      <ThreatCounter />
      <WhyUsSection />
      <ClientsSection />
      <ContactSection />
    </PageWrapper>
  )
}
