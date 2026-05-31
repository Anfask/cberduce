"use client"

import { PageWrapper } from "@/components/layout/PageWrapper"
import { AboutSection } from "@/components/sections/About"
import { StatsBar } from "@/components/sections/Stats"

export default function AboutPage() {
    return (
        <PageWrapper>
            <div className="py-12 sm:py-20 bg-background/50">
                <div className="container-base text-center">
                    <h1 className="text-4xl sm:text-6xl font-bold font-mono text-primary text-glow mb-6">ABOUT CYBERDUCE</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto font-mono">
                        The experts behind your unbreakable defense.
                    </p>
                </div>
            </div>
            <AboutSection />
            <StatsBar />
        </PageWrapper>
    )
}
