"use client"

import { PageWrapper } from "@/components/layout/PageWrapper"
import { BlogSection } from "@/components/sections/BlogList"
import { ThreatCounter } from "@/components/sections/ThreatCounter"

export default function BlogPage() {
    return (
        <PageWrapper>
            <div className="py-12 sm:py-20 bg-background/50 border-b border-white/5">
                <div className="container-base text-center">
                    <h1 className="text-4xl sm:text-7xl font-bold font-mono text-primary text-glow mb-6">INTEL HUB</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto font-mono text-sm sm:text-base">
                        Deciphering the digital underground. Expert analysis, vulnerability disclosures, and strategic defensive research.
                    </p>
                </div>
            </div>
            <BlogSection />
            <ThreatCounter />
        </PageWrapper>
    )
}
