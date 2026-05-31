"use client"

import { PageWrapper } from "@/components/layout/PageWrapper"
import { WhyUsSection } from "@/components/sections/WhyUs"
import { ThreatCounter } from "@/components/sections/ThreatCounter"

export default function WhyUsPage() {
    return (
        <PageWrapper>
            <div className="py-12 sm:py-20 bg-background/50">
                <div className="container-base text-center">
                    <h1 className="text-4xl sm:text-6xl font-bold font-mono text-primary text-glow mb-6">WHY CYBERDUCE?</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto font-mono">
                        Discover the decisive edge that keeps our clients ahead of global threats.
                    </p>
                </div>
            </div>
            <WhyUsSection />
            <ThreatCounter />
        </PageWrapper>
    )
}
