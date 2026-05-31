"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function StatsBar() {
    const ref = useRef<HTMLDivElement>(null)
    const stats = [
        { value: "500+", label: "Clients Protected" },
        { value: "99.9%", label: "Uptime SLA" },
        { value: "< 5min", label: "Avg Response Time" },
        { value: "24/7", label: "SOC Monitoring" },
        { value: "0", label: "Successful Breaches" },
    ]

    useEffect(() => {
        if (!ref.current) return
        gsap.fromTo(
            ref.current.querySelectorAll(".stat-item"),
            { y: 30, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out",
                scrollTrigger: { trigger: ref.current, start: "top 85%" },
            }
        )
    }, [])

    return (
        <section ref={ref} className="stats-bar py-12 sm:py-16">
            <div className="container-base">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
                    {stats.map((stat) => (
                        <div key={stat.label} className="stat-item text-center">
                            <div className="stat-value font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
                                {stat.value}
                            </div>
                            <div className="stat-label font-mono text-xs sm:text-sm text-muted-foreground uppercase tracking-wider mt-1">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
