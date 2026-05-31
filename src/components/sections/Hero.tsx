"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Link from "next/link"
import { Shield, Eye, Lock, Zap, ArrowRight, Code, Layout, Smartphone } from "lucide-react"
import { ScrambleText } from "@/components/ui/ScrambleText"

export function HeroSection() {
    const heroRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLDivElement>(null)
    const subtitleRef = useRef<HTMLParagraphElement>(null)
    const badgesRef = useRef<HTMLDivElement>(null)
    const ctaRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.5 })

            tl.fromTo(
                titleRef.current,
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
            )
                .fromTo(
                    subtitleRef.current,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                    "-=0.6"
                )
                .fromTo(
                    badgesRef.current?.children ?? [],
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power2.out" },
                    "-=0.4"
                )
                .fromTo(
                    ctaRef.current,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
                    "-=0.3"
                )
        }, heroRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={heroRef}
            id="hero"
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
        >

            {/* Grid overlay */}
            <div className="absolute inset-0 cyber-grid pointer-events-none" aria-hidden="true" />

            {/* Radial glow */}
            <div className="absolute inset-0 bg-radial-glow pointer-events-none" aria-hidden="true" />

            <div className="relative z-10 container-base text-center">
                {/* Status badge */}
                <div className="inline-flex items-center gap-2 status-badge mb-8 font-mono text-xs sm:text-sm uppercase tracking-widest">
                    <span className="status-dot" />
                    <span className="text-primary">Systems Online — Threat Level: Secured</span>
                </div>

                {/* Headline */}
                <div ref={titleRef} className="mb-6">
                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-mono leading-[1.05] tracking-tight whitespace-nowrap overflow-hidden">
                        <ScrambleText
                            text="DEFEND"
                            as="span"
                            className="text-primary text-glow mr-4"
                            speed={35}
                            delay={600}
                        />
                        <ScrambleText
                            text="DETECT"
                            as="span"
                            className="text-foreground mr-4"
                            speed={35}
                            delay={1000}
                        />
                        <ScrambleText
                            text="DOMINATE"
                            as="span"
                            className="text-primary text-glow"
                            speed={35}
                            delay={1400}
                        />
                    </h1>
                </div>

                <p
                    ref={subtitleRef}
                    className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto font-mono leading-relaxed mb-10"
                >
                    Enterprise-grade Development and Cyber Security services powered by AI —
                    building robust applications and protecting infrastructure with world-class expertise.
                </p>

                {/* Feature badges */}
                <div ref={badgesRef} className="flex flex-wrap justify-center gap-3 mb-12">
                    {[
                        { icon: Code, label: "Development" },
                        { icon: Shield, label: "Cyber Security" },
                        { icon: Smartphone, label: "Mobile Apps" },
                        { icon: Layout, label: "Web Apps" },
                        { icon: Zap, label: "AI-Powered" },
                    ].map(({ icon: Icon, label }) => (
                        <div key={label} className="feature-badge font-mono text-xs sm:text-sm">
                            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                            <span>{label}</span>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        href="/contact"
                        className="cyber-btn font-mono text-sm sm:text-base uppercase tracking-wider"
                    >
                        Get a Free Assessment
                        <ArrowRight className="w-4 h-4 ml-2 inline" />
                    </Link>
                    <Link
                        href="/services"
                        className="ghost-btn font-mono text-sm sm:text-base uppercase tracking-wider"
                    >
                        Explore Services
                    </Link>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-indicator">
                    <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
                    <div className="scroll-line" />
                </div>
            </div>
        </section>
    )
}
