"use client"

import { PageWrapper } from "@/components/layout/PageWrapper"
import { ProductsSection } from "@/components/sections/Products"
import { ThreatCounter } from "@/components/sections/ThreatCounter"

export default function ProductsPage() {
    return (
        <PageWrapper>
            <ProductsSection />
            <ThreatCounter />
        </PageWrapper>
    )
}
