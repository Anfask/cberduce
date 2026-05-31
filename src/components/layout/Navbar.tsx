"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { gsap } from "gsap"
import { Menu, X } from "lucide-react"

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const navRef = useRef<HTMLElement>(null)
    const pathname = usePathname()

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    useEffect(() => {
        if (!navRef.current) return
        gsap.fromTo(
            navRef.current,
            { y: -80, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
        )
    }, [])

    const links = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Products", href: "/products" },
        { name: "Services", href: "/services" },
        { name: "Blog", href: "/blog" },
    ]

    return (
        <nav
            ref={navRef}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "nav-scrolled" : "nav-transparent"}`}
        >
            <div className="container-base">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    <Link href="/" className="flex items-center">
                        <Image src="/logo.png" alt="Cyberduce Logo" width={160} height={60} className="w-28 sm:w-36 h-auto object-contain" priority />
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`nav-link font-mono text-sm uppercase tracking-wider ${pathname === link.href ? "text-primary text-glow" : ""}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center">
                        <Link
                            href="/contact"
                            className="cyber-btn-sm font-mono text-sm uppercase tracking-wider"
                        >
                            Get Protected
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-primary p-2"
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? "max-h-96" : "max-h-0"}`}>
                <div className="mobile-menu px-4 pb-4 space-y-3">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={`block w-full text-left nav-link font-mono text-sm uppercase tracking-wider py-2 ${pathname === link.href ? "text-primary text-glow" : ""}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        onClick={() => setIsOpen(false)}
                        className="block text-center cyber-btn-sm w-full font-mono text-sm uppercase tracking-wider mt-2"
                    >
                        Get Protected
                    </Link>
                </div>
            </div>
        </nav>
    )
}
