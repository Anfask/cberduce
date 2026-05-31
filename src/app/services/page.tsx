"use client"

import { PageWrapper } from "@/components/layout/PageWrapper"
import { ServicesSection } from "@/components/sections/Services"
import { ThreatCounter } from "@/components/sections/ThreatCounter"

export default function ServicesPage() {
    return (
        <PageWrapper>
            <ServicesSection />
            <ThreatCounter />
        </PageWrapper>
    )
}
