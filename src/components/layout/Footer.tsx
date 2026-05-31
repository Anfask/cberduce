"use client"

import Image from "next/image"
import Link from "next/link"

export function Footer() {
    const footerLinks = [
        {
            category: "Solutions",
            items: [
                { name: "Our Products", href: "/products" },
                { name: "Cyber Security", href: "/services" },
                { name: "Cloud Security", href: "/services" },
                { name: "Compliance", href: "/services" },
            ],
        },
        {
            category: "Development",
            items: [
                { name: "Software Dev", href: "/services" },
                { name: "Web Dev", href: "/services" },
                { name: "Mobile App Dev", href: "/services" },
            ],
        },
        {
            category: "Company",
            items: [
                { name: "About Us", href: "/about" },
                { name: "Work With Us", href: "/contact" },
                { name: "Blog", href: "/blog" },
                { name: "Privacy Policy", href: "/privacy" },
            ],
        },
    ]

    return (
        <footer className="footer-section">
            <div className="container-base py-14 sm:py-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link href="/">
                            <Image src="/logo.png" alt="Cyberduce" width={160} height={60} className="w-28 h-auto object-contain mb-4" />
                        </Link>
                        <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-4">
                            Pioneering excellence in Development and Cyber Security — building and defending the digital future.
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="status-dot" />
                            <span className="font-mono text-xs text-primary">All Systems Operational</span>
                        </div>
                    </div>

                    {/* Links */}
                    {footerLinks.map((section) => (
                        <div key={section.category}>
                            <h4 className="font-mono font-bold text-sm text-foreground uppercase tracking-wider mb-4">{section.category}</h4>
                            <ul className="space-y-2">
                                {section.items.map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.href} className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="footer-divider" />

                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="font-mono text-xs text-muted-foreground">
                        © {new Date().getFullYear()} Cyberduce Informations Technology LLP. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                        <span className="text-primary">▶</span>
                        <span>ISO 27001 Certified</span>
                        <span className="mx-2">|</span>
                        <span className="text-primary">▶</span>
                        <span>SOC 2 Type II</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
