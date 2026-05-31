"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrambleText } from "@/components/ui/ScrambleText"

export function WhyUsSection() {
    const ref = useRef<HTMLElement>(null)
    const [titleVisible, setTitleVisible] = useState(false)

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: ref.current,
                start: "top 75%",
                onEnter: () => setTitleVisible(true),
            })

            gsap.fromTo(
                ".why-card",
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out",
                    scrollTrigger: { trigger: ".why-card", start: "top 85%" },
                }
            )
        }, ref)

        return () => ctx.revert()
    }, [])

    const reasons = [
        {
            num: "01",
            title: "Battle-Proven Expertise",
            desc: "Our team consists of ex-government cyber operators, red team specialists, and CREST-certified analysts with decades of combined experience.",
        },
        {
            num: "02",
            title: "AI-First Approach",
            desc: "Our proprietary AI threat intelligence platform processes millions of indicators per second, giving you a decisive edge over attackers.",
        },
        {
            num: "03",
            title: "Guaranteed Response SLA",
            desc: "Critical incidents responded to in under 5 minutes. We back it up with contractual SLAs and dedicated incident commanders.",
        },
        {
            num: "04",
            title: "Deep Compliance Expertise",
            desc: "ISO 27001, SOC 2, GDPR, NIST, and regional compliance handled end-to-end — from gap analysis to certification.",
        },
        {
            num: "05",
            title: "Transparent Reporting",
            desc: "Real-time dashboards, weekly threat briefs, and executive-ready reports that give you full visibility without the noise.",
        },
        {
            num: "06",
            title: "Zero Vendor Lock-in",
            desc: "We integrate with your existing stack and tooling. No costly rip-and-replace — just powerful security layered on what you have.",
        },
    ]

    return (
        <section ref={ref} id="why-us" className="section-padding relative overflow-hidden">
            <div className="absolute inset-0 why-bg pointer-events-none" aria-hidden="true" />

            <div className="container-base relative z-10">
                <div className="text-center mb-16 sm:mb-20">
                    <p className="section-eyebrow font-mono text-primary uppercase tracking-widest text-xs sm:text-sm mb-4">
                        — Why Cyberduce —
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-mono">
                        {titleVisible ? (
                            <ScrambleText text="THE CYBERDUCE EDGE" as="span" className="text-glow" speed={30} />
                        ) : (
                            "THE CYBERDUCE EDGE"
                        )}
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {reasons.map(({ num, title, desc }) => (
                        <div key={num} className="why-card group">
                            <div className="why-num font-mono text-5xl sm:text-6xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors duration-500 mb-4">
                                {num}
                            </div>
                            <h3 className="font-mono font-bold text-lg sm:text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                                {title}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
