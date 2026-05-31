"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Shield, Eye, Lock, Globe, Database, Cpu, CodeXml, Layout, Smartphone } from "lucide-react"
import { ScrambleText } from "@/components/ui/ScrambleText"

export function ServicesSection() {
    const ref = useRef<HTMLElement>(null)
    const titleRef = useRef<HTMLDivElement>(null)
    const [titleVisible, setTitleVisible] = useState(false)

    const securityServices = [
        {
            icon: Shield,
            title: "Threat Detection & Response",
            desc: "AI-driven real-time detection of advanced persistent threats, zero-days, and ransomware with automated containment and forensic analysis.",
            tags: ["EDR", "SIEM", "SOAR"],
        },
        {
            icon: Eye,
            title: "Security Operations Center",
            desc: "24/7 SOC staffed by elite analysts monitoring your entire attack surface — networks, endpoints, cloud, and identities.",
            tags: ["24/7 Monitoring", "Incident Response", "Threat Hunting"],
        },
        {
            icon: Lock,
            title: "Zero-Trust Architecture",
            desc: "Design and implement a zero-trust framework: never trust, always verify — securing every user, device, and application.",
            tags: ["IAM", "Microsegmentation", "ZTNA"],
        },
        {
            icon: Globe,
            title: "Cloud & Network Security",
            desc: "Secure your AWS, Azure, and GCP environments with CSPM, workload protection, and identity governance tailored for the cloud.",
            tags: ["CSPM", "CWPP", "DevSecOps"],
        },
        {
            icon: Database,
            title: "Data Protection & Compliance",
            desc: "Ensure data privacy, encryption at rest and transit, and compliance with GDPR, ISO 27001, SOC2, and local regulations.",
            tags: ["DLP", "Encryption", "ISO 27001"],
        },
    ]

    const developmentServices = [
        {
            icon: Layout,
            title: "Website Development",
            desc: "High-performance, secure, and scalable web applications designed to elevate your digital presence with cutting-edge technologies.",
            tags: ["React", "Next.js", "Web Security"],
        },
        {
            icon: Smartphone,
            title: "Mobile App Development",
            desc: "Premium cross-platform mobile apps built with Flutter, ensuring seamless performance and robust security for all your users.",
            tags: ["Flutter", "iOS", "Android"],
        },
        {
            icon: CodeXml,
            title: "Software Development",
            desc: "Custom enterprise-grade software solutions built with security-first architecture and modern, scalable tech stacks.",
            tags: ["Java", "Python", "Node.js"],
        },
        {
            icon: Cpu,
            title: "AI & Innovation Labs",
            desc: "Harness the power of AI to build smarter, more secure applications and automate complex enterprise-grade workflows.",
            tags: ["AI/ML", "Innovation", "Development"],
        },
    ]

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: titleRef.current,
                start: "top 80%",
                onEnter: () => setTitleVisible(true),
            })

            gsap.fromTo(
                ".service-card",
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
                    scrollTrigger: { trigger: ".service-card", start: "top 85%" },
                }
            )
        }, ref)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={ref} id="services" className="section-padding relative">
            <div className="absolute inset-0 cyber-grid-subtle pointer-events-none" aria-hidden="true" />

            <div className="container-base relative z-10">
                <div ref={titleRef} className="text-center mb-16 sm:mb-24">
                    <p className="section-eyebrow font-mono text-primary uppercase tracking-widest text-xs sm:text-sm mb-4">
                        — Our Capabilities —
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold font-mono">
                        {titleVisible ? (
                            <ScrambleText text="ELITE SOLUTIONS" as="span" className="text-glow" speed={30} />
                        ) : (
                            <span>ELITE SOLUTIONS</span>
                        )}
                    </h2>
                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-base sm:text-lg font-mono">
                        High-performance engineering meets unbreakable security. We build for the future and protect what matters most.
                    </p>
                </div>

                {/* Security Section */}
                <div className="mb-20">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="h-px flex-grow bg-primary/20" />
                        <h3 className="font-mono text-xl sm:text-2xl font-bold text-primary flex items-center gap-3">
                            <Shield className="w-6 h-6" />
                            CYBER SECURITY
                        </h3>
                        <div className="h-px flex-grow bg-primary/20" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {securityServices.map(({ icon: Icon, title, desc, tags }) => (
                            <div key={title} className="service-card group">
                                <div className="service-icon-wrap mb-5">
                                    <Icon className="w-7 h-7 text-primary" />
                                </div>
                                <h3 className="font-mono font-bold text-lg sm:text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                                    {title}
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{desc}</p>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag) => (
                                        <span key={tag} className="service-tag font-mono text-[10px]">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="service-hover-line" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Development Section */}
                <div>
                    <div className="flex items-center gap-4 mb-10">
                        <div className="h-px flex-grow bg-primary/20" />
                        <h3 className="font-mono text-xl sm:text-2xl font-bold text-primary flex items-center gap-3">
                            <CodeXml className="w-6 h-6" />
                            DEVELOPMENT
                        </h3>
                        <div className="h-px flex-grow bg-primary/20" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {developmentServices.map(({ icon: Icon, title, desc, tags }) => (
                            <div key={title} className="service-card group">
                                <div className="service-icon-wrap mb-5">
                                    <Icon className="w-7 h-7 text-primary" />
                                </div>
                                <h3 className="font-mono font-bold text-lg sm:text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                                    {title}
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{desc}</p>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag) => (
                                        <span key={tag} className="service-tag font-mono text-[10px]">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="service-hover-line" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
