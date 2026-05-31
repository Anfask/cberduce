"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Bell, ShieldCheck, Box, ArrowRight, ExternalLink, Zap } from "lucide-react"
import { ScrambleText } from "@/components/ui/ScrambleText"

export function ProductsSection() {
    const ref = useRef<HTMLElement>(null)
    const titleRef = useRef<HTMLDivElement>(null)
    const [titleVisible, setTitleVisible] = useState(false)

    const products = [
        {
            icon: Bell,
            name: "CyberNotify",
            tagline: "Intelligent Alerting System",
            desc: "A mission-critical notification engine designed for high-availability environments. Broadcast emergency alerts across all channels with sub-second latency.",
            url: "https://notify.cyberduce.com",
            color: "from-blue-500/20 to-cyan-500/20",
            features: ["Multi-channel Delivery", "Audit Logging", "Rate Limiting"]
        },
        {
            icon: ShieldCheck,
            name: "Sentinel Guard",
            tagline: "Zero-Trust API Gateway",
            desc: "Secure your entire microservices architecture with our AI-powered gateway. Automatic threat detection, dynamic IAM, and unbreakable encryption.",
            url: "#",
            color: "from-purple-500/20 to-pink-500/20",
            features: ["AI WAF", "Identity Bridge", "Traffic Shaping"]
        },
        {
            icon: Box,
            name: "CoreForge",
            tagline: "Secure Dev-Ops Engine",
            desc: "The heartbeat of secure development. A unified platform for building, deploying, and monitoring enterprise applications with compliance baked in.",
            url: "#",
            color: "from-orange-500/20 to-yellow-500/20",
            features: ["CI/CD Security", "Secret Scanning", "Health Analytics"]
        }
    ]

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: titleRef.current,
                start: "top 80%",
                onEnter: () => setTitleVisible(true),
            })

            gsap.fromTo(
                ".product-card",
                { y: 60, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power4.out",
                    scrollTrigger: { trigger: ".product-card", start: "top 85%" },
                }
            )
        }, ref)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={ref} id="products" className="section-padding relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container-base relative z-10">
                <div ref={titleRef} className="text-center mb-16 sm:mb-24">
                    <p className="section-eyebrow font-mono text-primary uppercase tracking-[0.2em] text-xs sm:text-sm mb-4">
                        — Pro-Grade Solutions —
                    </p>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-mono">
                        {titleVisible ? (
                            <ScrambleText text="OUR PRODUCT LINEUP" as="span" className="text-glow" speed={30} />
                        ) : (
                            <span>OUR PRODUCT LINEUP</span>
                        )}
                    </h2>
                    <p className="text-muted-foreground mt-6 max-w-2xl mx-auto text-base sm:text-lg font-mono">
                        Battle-tested software products engineered by Cyberduce to solve the most complex infrastructure and security challenges.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div key={product.name} className="product-card group relative">
                            <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-none border border-primary/20`} />

                            <div className="relative p-8 border border-border bg-card/40 backdrop-blur-sm h-full flex flex-col">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="p-3 bg-primary/10 text-primary">
                                        <product.icon className="w-8 h-8" />
                                    </div>
                                    <div className="flex items-center gap-1.5 px-2 py-1 bg-background/80 border border-border text-[10px] font-mono text-primary uppercase tracking-tighter">
                                        <Zap className="w-3 h-3 fill-primary" />
                                        Enterprise Ready
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold font-mono text-foreground group-hover:text-primary transition-colors mb-2">
                                        {product.name}
                                    </h3>
                                    <p className="text-xs font-mono text-primary/70 uppercase tracking-widest">
                                        {product.tagline}
                                    </p>
                                </div>

                                <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow">
                                    {product.desc}
                                </p>

                                <div className="space-y-3 mb-8">
                                    {product.features.map((feature) => (
                                        <div key={feature} className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
                                            <div className="w-1.5 h-1.5 bg-primary/40 rounded-full" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-auto">
                                    <a
                                        href={product.url}
                                        target={product.url.startsWith('http') ? "_blank" : "_self"}
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary hover:gap-3 transition-all"
                                    >
                                        Explore {product.name}
                                        {product.url.startsWith('http') ? <ExternalLink className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
