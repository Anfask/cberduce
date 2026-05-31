"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { Calendar, User, ArrowRight, Search, Tag } from "lucide-react"
import { ScrambleText } from "@/components/ui/ScrambleText"

export function BlogSection() {
    const ref = useRef<HTMLElement>(null)
    const [titleVisible, setTitleVisible] = useState(false)

    const posts = [
        {
            id: 1,
            title: "The Rise of AI-Powered Ransomware: What You Need to Know",
            excerpt: "Attackers are now using Large Language Models to craft localized phishing at scale and automate exploit discovery. Learn how to defend your infrastructure.",
            date: "Feb 24, 2026",
            author: "Alex Rivers",
            category: "Threat Intelligence",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
            readTime: "6 min read"
        },
        {
            id: 2,
            title: "Implementing Zero Trust in Legacy Environments",
            excerpt: "Transitioning to a Zero Trust architecture doesn't have to be a rip-and-replace nightmare. Our experts share a phased approach for maximum security.",
            date: "Feb 20, 2026",
            author: "Sarah Chen",
            category: "Architecture",
            image: "https://images.unsplash.com/photo-1558494949-ef01091557d4?auto=format&fit=crop&q=80&w=800",
            readTime: "8 min read"
        },
        {
            id: 3,
            title: "SOC 2 Type II: Beyond the Checklist",
            excerpt: "Compliance is more than a badge. Discover how to leverage SOC 2 controls to actually improve your security posture and build client trust.",
            date: "Feb 15, 2026",
            author: "Michael Vance",
            category: "Compliance",
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
            readTime: "5 min read"
        },
        {
            id: 4,
            title: "Post-Quantum Cryptography: Preparing for the Future",
            excerpt: "Quantum computers threaten traditional encryption. Start your transition to quantum-resistant algorithms before it's too late.",
            date: "Feb 10, 2026",
            author: "Dr. Elena Volkov",
            category: "Cryptography",
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800",
            readTime: "10 min read"
        },
        {
            id: 5,
            title: "Cloud Misconfigurations: The $5 Million Mistake",
            excerpt: "Over 80% of cloud breaches are caused by simple user errors. We've compiled the top 10 most common mistakes and how to fix them instantly.",
            date: "Feb 05, 2026",
            author: "David Knight",
            category: "Cloud Security",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
            readTime: "7 min read"
        },
        {
            id: 6,
            title: "The Human Firewall: Modern Security Awareness",
            excerpt: "Phishing remains the #1 entry point. Learn why traditional training fails and how to build a security-first culture in your organization.",
            date: "Jan 30, 2026",
            author: "Justin Case",
            category: "Security Culture",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
            readTime: "5 min read"
        }
    ]

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: ref.current,
                start: "top 75%",
                onEnter: () => setTitleVisible(true),
            })

            gsap.fromTo(
                ".blog-card",
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
                    scrollTrigger: { trigger: ".blog-card", start: "top 85%" },
                }
            )
        }, ref)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={ref} className="section-padding relative">
            <div className="absolute inset-0 cyber-grid-subtle pointer-events-none" aria-hidden="true" />

            <div className="container-base relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-2xl">
                        <p className="section-eyebrow font-mono text-primary uppercase tracking-widest text-xs sm:text-sm mb-4">
                            — Threat Intelligence —
                        </p>
                        <h2 className="text-3xl sm:text-5xl font-bold font-mono">
                            {titleVisible ? (
                                <ScrambleText text="SECURITY INSIGHTS" as="span" className="text-glow" speed={30} />
                            ) : (
                                "SECURITY INSIGHTS"
                            )}
                        </h2>
                    </div>

                    <div className="relative group min-w-[300px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Search intelligence..."
                            className="w-full bg-card/50 border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/20 rounded-none outline-none py-3 pl-10 pr-4 font-mono text-sm transition-all"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <article key={post.id} className="blog-card group flex flex-col bg-card/40 border border-border hover:border-primary/30 transition-all duration-300">
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-primary/90 text-primary-foreground font-mono text-[10px] uppercase tracking-wider px-2 py-1 flex items-center gap-1">
                                        <Tag className="w-3 h-3" />
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 text-muted-foreground font-mono text-xs mb-4">
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {post.date}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <User className="w-3.5 h-3.5" />
                                        {post.author}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold font-mono mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                                    {post.title}
                                </h3>

                                <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-grow">
                                    {post.excerpt}
                                </p>

                                <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between">
                                    <span className="font-mono text-xs text-muted-foreground">{post.readTime}</span>
                                    <Link
                                        href={`/blog/${post.id}`}
                                        className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest hover:gap-3 transition-all"
                                    >
                                        Read Analysis
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button className="cyber-btn-outline font-mono text-sm uppercase tracking-wider px-10">
                        Load More Intel
                    </button>
                </div>
            </div>
        </section>
    )
}
