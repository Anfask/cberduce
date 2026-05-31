"use client"

import { useEffect, useRef, useState } from "react"
import { AlertTriangle } from "lucide-react"

export function ThreatCounter() {
    const [count, setCount] = useState(2847392)
    const ref = useRef<HTMLElement>(null)

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => prev + Math.floor(Math.random() * 3 + 1))
        }, 800)
        return () => clearInterval(interval)
    }, [])

    return (
        <section ref={ref} className="threat-counter-section py-16 sm:py-20">
            <div className="container-base text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-primary animate-pulse" />
                    <span className="font-mono text-xs sm:text-sm text-muted-foreground uppercase tracking-widest">
                        Global Threats Blocked by Cyberduce — Live
                    </span>
                    <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-primary animate-pulse" />
                </div>
                <div className="threat-counter font-mono text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-primary text-glow tabular-nums">
                    {count.toLocaleString()}
                </div>
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mt-4">
                    threats neutralized and counting
                </p>
            </div>
        </section>
    )
}
