"use client"

import { useParams } from "next/navigation"
import { PageWrapper } from "@/components/layout/PageWrapper"
import { Calendar, User, Clock, ArrowLeft, Tag, Share2, Shield } from "lucide-react"
import Link from "next/link"
import { ScrambleText } from "@/components/ui/ScrambleText"

export default function BlogPostPage() {
    const { id } = useParams()

    // Mock data - in a real app, this would be fetched based on id
    const post = {
        title: "The Rise of AI-Powered Ransomware: What You Need to Know",
        excerpt: "Attackers are now using Large Language Models to craft localized phishing at scale and automate exploit discovery. Learn how to defend your infrastructure.",
        date: "Feb 24, 2026",
        author: "Alex Rivers",
        role: "Senior Threat Researcher",
        category: "Threat Intelligence",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
        readTime: "6 min read",
        content: `
      <p>The cybersecurity landscape is shifting beneath our feet. As we enter 2026, the primary threat vector has evolved from simple automated scripts to sophisticated, LLM-driven offensive operations. AI-powered ransomware isn't just a buzzword anymore—it's a clinical reality that enterprise security teams are facing daily.</p>
      
      <h3>The Evolution of the Attack Surface</h3>
      <p>Traditional signature-based detection is becoming increasingly obsolete. Attackers are using generative models to create polymorphic code that changes its structure every time it executes, making it nearly invisible to legacy antivirus solutions.</p>
      
      <blockquote>
        "The speed at which an AI-driven exploit can pivot across a network is order of magnitude faster than a human operator. We are no longer fighting hackers; we are fighting algorithms."
      </blockquote>
      
      <h3>Key Defensive Strategies</h3>
      <p>How can SOC teams keep up? The answer lies in asymmetric defense. By leveraging AI ourselves, we can create a defensive perimeter that learns and adapts in real-time.</p>
      <ul>
        <li>Implement Behavioral Analytics: Look for anomalies in user behavior and data flow rather than specific malware signatures.</li>
        <li>Automated Containment: Use SOAR platforms to instantly isolate affected endpoints before the ransomware can begin its encryption phase.</li>
        <li>Continuous Red Teaming: Use AI agents to constantly probe your own defenses for the same vulnerabilities attackers are looking for.</li>
      </ul>
      
      <p>At Cyberduce, our Cyber Shield Suite is built with these exact challenges in mind. We provide the AI-powered tools and human expertise needed to dominate the digital battlefield.</p>
    `
    }

    return (
        <PageWrapper>
            <div className="relative min-h-[60vh] flex items-end">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                    <div className="absolute inset-0 cyber-grid-subtle opacity-30" />
                </div>

                <div className="container-base relative z-10 pb-12 sm:pb-20">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 font-mono text-xs text-primary uppercase tracking-widest mb-8 hover:gap-3 transition-all"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Back to Intel Hub
                    </Link>

                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <span className="bg-primary/20 text-primary border border-primary/30 font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            {post.category}
                        </span>
                        <span className="flex items-center gap-1.5 text-muted-foreground font-mono text-xs">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readTime}
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-mono text-foreground leading-[1.1] mb-8 max-w-4xl">
                        <ScrambleText text={post.title} speed={25} />
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-none bg-primary/20 flex items-center justify-center border border-primary/30 text-primary font-mono font-bold">
                                {post.author.charAt(0)}
                            </div>
                            <div>
                                <div className="font-mono text-sm font-bold text-foreground">{post.author}</div>
                                <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">{post.role}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground font-mono text-xs">
                            <Calendar className="w-3.5 h-3.5" />
                            {post.date}
                        </div>
                        <div className="ml-auto flex items-center gap-4">
                            <button className="text-muted-foreground hover:text-primary transition-colors" aria-label="Share">
                                <Share2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section-padding">
                <div className="container-base">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                        {/* Main Content */}
                        <div className="lg:col-span-8">
                            <div
                                className="prose prose-invert prose-cyber max-w-none"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            <div className="mt-16 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-2 group cursor-pointer">
                                    <span className="text-muted-foreground text-sm font-mono">Found this useful?</span>
                                    <button className="cyber-btn-sm font-mono text-xs uppercase rounded-none">
                                        Share Intelligence
                                    </button>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">Tagged:</span>
                                    <div className="flex gap-2">
                                        <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 border border-primary/20 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all">AI</span>
                                        <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 border border-primary/20 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all">RANSOMWARE</span>
                                        <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 border border-primary/20 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all">DEFENSE</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="lg:col-span-4 space-y-12">
                            <div className="bg-card/30 border border-white/5 p-8">
                                <div className="flex items-center gap-2 text-primary mb-6">
                                    <Shield className="w-5 h-5" />
                                    <h3 className="font-mono font-bold text-sm uppercase tracking-wider">Secure Your Org</h3>
                                </div>
                                <p className="font-mono text-sm text-muted-foreground mb-6 leading-relaxed">
                                    Cyberduce specialists are available 24/7 to analyze your infrastructure and prepare you for AI-driven threats.
                                </p>
                                <Link href="/contact" className="cyber-btn-outline w-full text-center font-mono text-xs uppercase tracking-widest py-3">
                                    Book a Deep-Dive
                                </Link>
                            </div>

                            <div>
                                <h3 className="font-mono font-bold text-sm text-foreground uppercase tracking-widest mb-6 pb-2 border-b border-primary/30">
                                    Related Reports
                                </h3>
                                <div className="space-y-6">
                                    {[1, 2, 3].map((i) => (
                                        <Link href={`/blog/${i}`} key={i} className="group flex gap-4">
                                            <div className="w-20 h-20 bg-card border border-white/10 flex-shrink-0 group-hover:border-primary/50 transition-colors" />
                                            <div>
                                                <h4 className="font-mono text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                                                    {i === 1 ? "Zero Trust Architecture Paradigms" : i === 2 ? "Cloud Misconfiguration Epidemic" : "Quantum-Ready Encryption"}
                                                </h4>
                                                <span className="font-mono text-[10px] text-muted-foreground uppercase">Feb {10 + i}, 2026</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}
