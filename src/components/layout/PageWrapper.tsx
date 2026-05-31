"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"

gsap.registerPlugin(ScrollTrigger)

export function PageWrapper({ children }: { children: React.ReactNode }) {
    const wrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.4,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        })

        const raf = (time: number) => {
            lenis.raf(time)
            ScrollTrigger.update()
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy()
        }
    }, [])

    return (
        <div ref={wrapperRef} className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="pt-20">
                {children}
            </main>
            <Footer />
        </div>
    )
}
