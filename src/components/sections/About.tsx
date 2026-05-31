"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { Shield, ChevronRight, Activity, Wifi, Server } from "lucide-react"
import { ScrambleText } from "@/components/ui/ScrambleText"

export function AboutSection() {
    const ref = useRef<HTMLElement>(null)
    const imgRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const [titleVisible, setTitleVisible] = useState(false)

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: ref.current,
                start: "top 75%",
                onEnter: () => setTitleVisible(true),
            })

            gsap.fromTo(
                imgRef.current,
                { x: -60, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: 1, ease: "power3.out",
                    scrollTrigger: { trigger: imgRef.current, start: "top 80%" },
                }
            )

            gsap.fromTo(
                contentRef.current,
                { x: 60, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: 1, ease: "power3.out",
                    scrollTrigger: { trigger: contentRef.current, start: "top 80%" },
                }
            )
        }, ref)

        return () => ctx.revert()
    }, [])

    const pillars = [
        { icon: Shield, text: "Zero Compromise Security" },
        { icon: Activity, text: "Real-Time Intelligence" },
        { icon: Wifi, text: "360° Attack Surface Coverage" },
        { icon: Server, text: "Enterprise-Grade Infrastructure" },
    ]

    return (
        <section ref={ref} id="about" className="section-padding relative bg-card/30">
            <div className="container-base">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Visual Side */}
                    <div ref={imgRef} className="relative order-2 lg:order-1">
                        <div className="about-visual">
                            {/* Central shield */}
                            <div className="about-shield">
                                <Shield className="w-16 h-16 sm:w-24 sm:h-24 text-primary" />
                            </div>
                            {/* Orbit rings */}
                            <div className="orbit-ring orbit-ring-1" />
                            <div className="orbit-ring orbit-ring-2" />
                            {/* Data points */}
                            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                                <div
                                    key={i}
                                    className="orbit-dot"
                                    style={{ transform: `rotate(${deg}deg) translateX(110px) rotate(-${deg}deg)` }}
                                >
                                    <div className="orbit-dot-inner" />
                                </div>
                            ))}
                            {/* Terminal window */}
                            <div className="terminal-widget">
                                <div className="terminal-header">
                                    <span className="dot bg-red-500" />
                                    <span className="dot bg-yellow-500" />
                                    <span className="dot bg-green-500" />
                                    <span className="font-mono text-xs text-muted-foreground ml-2">threat_scan.sh</span>
                                </div>
                                <div className="terminal-body font-mono text-xs space-y-1">
                                    <div className="text-primary">[+] Scanning network topology...</div>
                                    <div className="text-muted-foreground">[✓] 0 vulnerabilities found</div>
                                    <div className="text-primary">[+] Threat intel updated</div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-muted-foreground">Status:</span>
                                        <span className="text-primary animate-pulse">● SECURE</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div ref={contentRef} className="order-1 lg:order-2">
                        <p className="section-eyebrow font-mono text-primary uppercase tracking-widest text-xs sm:text-sm mb-4">
                            — About Cyberduce —
                        </p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-mono mb-6 leading-tight">
                            {titleVisible ? (
                                <ScrambleText text="YOUR LAST LINE OF DEFENSE" as="span" speed={30} />
                            ) : (
                                "YOUR LAST LINE OF DEFENSE"
                            )}
                        </h2>
                        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-6">
                            Cyberduce is an elite technology firm specializing in high-performance Development
                            and unbreakable Cyber Security. Built by industry veterans and security experts,
                            we bridge the gap between innovation and protection.
                        </p>
                        <p className="text-muted-foreground text-base leading-relaxed mb-8">
                            From custom software and mobile applications to enterprise-grade security
                            frameworks, our mission is simple: deliver excellence through cutting-edge
                            technology, human expertise, and battle-tested methodologies.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            {pillars.map(({ icon: Icon, text }) => (
                                <div key={text} className="pillar-item">
                                    <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                                    <span className="font-mono text-sm">{text}</span>
                                </div>
                            ))}
                        </div>

                        <Link
                            href="/contact"
                            className="cyber-btn inline-flex items-center font-mono text-sm uppercase tracking-wider"
                        >
                            Partner With Us
                            <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
