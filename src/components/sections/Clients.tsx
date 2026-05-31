"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function ClientsSection() {
    const ref = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".testimonial-card",
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
                    scrollTrigger: { trigger: ".testimonial-card", start: "top 85%" },
                }
            )
        }, ref)

        return () => ctx.revert()
    }, [])

    const testimonials = [
        {
            quote:
                "Cyberduce detected and contained a sophisticated APT attack within minutes. Their SOC team is exceptional — they're an extension of our internal security team.",
            name: "James R.",
            role: "CISO, Financial Services",
            initials: "JR",
        },
        {
            quote:
                "After a ransomware scare at a competitor, we brought in Cyberduce. Their zero-trust implementation and threat hunting gave our board complete confidence.",
            name: "Sarah M.",
            role: "CTO, Healthcare Enterprise",
            initials: "SM",
        },
        {
            quote:
                "The pen testing results were eye-opening. Cyberduce found critical vulnerabilities in systems we thought were secure for years. Invaluable expertise.",
            name: "David K.",
            role: "VP Engineering, SaaS Platform",
            initials: "DK",
        },
    ]

    const industries = [
        "Financial Services", "Healthcare", "Energy & Utilities",
        "Government", "SaaS & Tech", "Manufacturing", "Retail", "Legal"
    ]

    return (
        <section ref={ref} id="clients" className="section-padding relative bg-card/20">
            <div className="container-base">
                <div className="text-center mb-16">
                    <p className="section-eyebrow font-mono text-primary uppercase tracking-widest text-xs sm:text-sm mb-4">
                        — Trusted By —
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-mono">
                        Protecting Industry Leaders
                    </h2>
                </div>

                {/* Testimonials */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
                    {testimonials.map(({ quote, name, role, initials }) => (
                        <div key={name} className="testimonial-card">
                            <div className="testimonial-quote">&ldquo;</div>
                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">{quote}</p>
                            <div className="flex items-center gap-3">
                                <div className="testimonial-avatar font-mono font-bold text-sm">{initials}</div>
                                <div>
                                    <div className="font-mono font-semibold text-sm text-foreground">{name}</div>
                                    <div className="font-mono text-xs text-muted-foreground">{role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Industries */}
                <div className="text-center">
                    <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-6">Industries We Protect</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {industries.map((ind) => (
                            <span key={ind} className="industry-tag font-mono text-xs sm:text-sm">
                                {ind}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
