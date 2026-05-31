"use client"

import { PageWrapper } from "@/components/layout/PageWrapper"
import { ClientsSection } from "@/components/sections/Clients"

export default function ClientsPage() {
    return (
        <PageWrapper>
            <div className="py-12 sm:py-20 bg-background/50">
                <div className="container-base text-center">
                    <h1 className="text-4xl sm:text-6xl font-bold font-mono text-primary text-glow mb-6">OUR CLIENTS</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto font-mono">
                        Trusted by industry leaders worldwide to secure their most critical assets.
                    </p>
                </div>
            </div>
            <ClientsSection />
        </PageWrapper>
    )
}
