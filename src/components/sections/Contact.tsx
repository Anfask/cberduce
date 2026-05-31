"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Mail, Phone, MapPin, CheckCircle, Terminal, Activity, ArrowRight } from "lucide-react"
import { ScrambleText } from "@/components/ui/ScrambleText"

export function ContactSection() {
    const ref = useRef<HTMLElement>(null)
    const [formState, setFormState] = useState({ name: "", email: "", company: "", message: "" })
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".contact-form-wrap",
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: "power3.out",
                    scrollTrigger: { trigger: ".contact-form-wrap", start: "top 80%" },
                }
            )

            gsap.fromTo(
                ".contact-info-wrap",
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2,
                    scrollTrigger: { trigger: ".contact-info-wrap", start: "top 80%" },
                }
            )
        }, ref)

        return () => ctx.revert()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        await new Promise((r) => setTimeout(r, 1200))
        setLoading(false)
        setSubmitted(true)
    }

    return (
        <section ref={ref} id="contact" className="section-padding relative">
            <div className="absolute inset-0 cyber-grid-subtle pointer-events-none" aria-hidden="true" />

            <div className="container-base relative z-10">
                <div className="text-center mb-16">
                    <p className="section-eyebrow font-mono text-primary uppercase tracking-widest text-xs sm:text-sm mb-4">
                        — Get In Touch —
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-mono">
                        <ScrambleText text="SECURE YOUR FUTURE" as="span" className="text-glow" speed={30} delay={200} />
                    </h2>
                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto font-mono text-sm sm:text-base">
                        Book a free security assessment. Our experts will analyze your attack surface and deliver a tailored protection roadmap.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
                    {/* Form */}
                    <div className="contact-form-wrap lg:col-span-3">
                        {submitted ? (
                            <div className="contact-card h-full flex flex-col items-center justify-center text-center py-16">
                                <CheckCircle className="w-16 h-16 text-primary mb-6 animate-bounce" />
                                <h3 className="font-mono font-bold text-2xl text-foreground mb-3">Message Received</h3>
                                <p className="font-mono text-muted-foreground text-sm">
                                    Our security team will contact you within 2 hours. Watch your inbox.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="contact-card space-y-5">
                                <div className="form-header flex items-center gap-2 mb-6">
                                    <Terminal className="w-5 h-5 text-primary" />
                                    <span className="font-mono text-sm text-primary uppercase tracking-wider">
                                        <ScrambleText text="INITIALIZE CONTACT" speed={35} delay={300} />
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="form-group">
                                        <label className="form-label font-mono text-xs uppercase tracking-wider text-muted-foreground" htmlFor="contact-name">Name</label>
                                        <input
                                            id="contact-name"
                                            type="text"
                                            placeholder="John Smith"
                                            value={formState.name}
                                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                            className="form-input font-mono text-sm"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label font-mono text-xs uppercase tracking-wider text-muted-foreground" htmlFor="contact-email">Email</label>
                                        <input
                                            id="contact-email"
                                            type="email"
                                            placeholder="security@company.com"
                                            value={formState.email}
                                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                            className="form-input font-mono text-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label font-mono text-xs uppercase tracking-wider text-muted-foreground" htmlFor="contact-company">Company</label>
                                    <input
                                        id="contact-company"
                                        type="text"
                                        placeholder="Acme Corp"
                                        value={formState.company}
                                        onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                                        className="form-input font-mono text-sm"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label font-mono text-xs uppercase tracking-wider text-muted-foreground" htmlFor="contact-message">Message</label>
                                    <textarea
                                        id="contact-message"
                                        rows={4}
                                        placeholder="Describe your security needs or concerns..."
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        className="form-input form-textarea font-mono text-sm"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="cyber-btn w-full font-mono text-sm uppercase tracking-wider"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <Activity className="w-4 h-4 animate-spin" />
                                            Processing...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            Send Secure Message
                                            <ArrowRight className="w-4 h-4" />
                                        </span>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Contact Info */}
                    <div className="contact-info-wrap lg:col-span-2 space-y-6">
                        <div className="contact-card">
                            <h3 className="font-mono font-bold text-base text-primary uppercase tracking-wider mb-6">
                                Direct Channels
                            </h3>
                            <div className="space-y-5">
                                {[
                                    { icon: Mail, label: "Email", value: "security@cyberduce.com" },
                                    { icon: Phone, label: "Hotline", value: "+1 (800) CYBERDUCE" },
                                    { icon: MapPin, label: "HQ", value: "Global Operations" },
                                ].map(({ icon: Icon, label, value }) => (
                                    <div key={label} className="contact-info-item">
                                        <div className="contact-info-icon">
                                            <Icon className="w-4 h-4 text-primary" />
                                        </div>
                                        <div>
                                            <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{label}</div>
                                            <div className="font-mono text-sm text-foreground">{value}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
