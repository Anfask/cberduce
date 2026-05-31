"use client"

import { PageWrapper } from "@/components/layout/PageWrapper"
import { ScrambleText } from "@/components/ui/ScrambleText"
import { Database, Cookie, Settings } from "lucide-react"

export default function CookiesPage() {
    return (
        <PageWrapper>
            <div className="py-12 sm:py-20 bg-background/50 border-b border-white/5">
                <div className="container-base text-center">
                    <h1 className="text-4xl sm:text-6xl font-bold font-mono text-primary text-glow mb-6 uppercase">
                        <ScrambleText text="Cookie Policy" speed={30} />
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto font-mono text-sm sm:text-base">
                        SESSION PERSISTENCE & ANALYTICS TRANSPARENCY
                    </p>
                </div>
            </div>

            <div className="section-padding">
                <div className="container-base">
                    <div className="max-w-4xl mx-auto">
                        <div className="prose prose-cyber">
                            <h3>1. Technical Manifest</h3>
                            <p>
                                Cyberduce uses essential session cookies to maintain secure authentication and load balancing across our edge network. These are critical for the platform's functional integrity.
                            </p>

                            <div className="my-10 space-y-4">
                                <div className="bg-card/30 border border-white/5 p-6 font-mono text-sm">
                                    <div className="flex items-center gap-3 text-primary mb-2">
                                        <Cookie className="w-4 h-4" />
                                        <span className="font-bold uppercase tracking-wider">Essential Cookies</span>
                                    </div>
                                    <p className="text-muted-foreground m-0">Required for platform security and authentication persistence. Cannot be disabled.</p>
                                </div>
                                <div className="bg-card/30 border border-white/5 p-6 font-mono text-sm">
                                    <div className="flex items-center gap-3 text-primary mb-2">
                                        <Database className="w-4 h-4" />
                                        <span className="font-bold uppercase tracking-wider">Performance Analytics</span>
                                    </div>
                                    <p className="text-muted-foreground m-0">Anonymized telemetry to optimize delivery speeds and edge network routing.</p>
                                </div>
                                <div className="bg-card/30 border border-white/5 p-6 font-mono text-sm">
                                    <div className="flex items-center gap-3 text-primary mb-2">
                                        <Settings className="w-4 h-4" />
                                        <span className="font-bold uppercase tracking-wider">Interface Preferences</span>
                                    </div>
                                    <p className="text-muted-foreground m-0">Stores UI state such as dashboard themes and terminal visibility settings.</p>
                                </div>
                            </div>

                            <h3>2. Third-Party Telemetry</h3>
                            <p>
                                We do not utilize third-party tracking cookies or advertising scripts. Any performance monitoring is conducted through self-hosted analytics engines.
                            </p>

                            <h3>3. Control Procedures</h3>
                            <p>
                                Users can manage cookie preferences through their browser settings. However, disabling essential cookies will cause immediate logout and potential loss of secure session state.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}
