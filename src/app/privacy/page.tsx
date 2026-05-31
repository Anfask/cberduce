"use client"

import { PageWrapper } from "@/components/layout/PageWrapper"
import { ScrambleText } from "@/components/ui/ScrambleText"
import { Shield, Lock, Eye } from "lucide-react"

export default function PrivacyPage() {
    return (
        <PageWrapper>
            <div className="py-12 sm:py-20 bg-background/50 border-b border-white/5">
                <div className="container-base text-center">
                    <h1 className="text-4xl sm:text-6xl font-bold font-mono text-primary text-glow mb-6 uppercase">
                        <ScrambleText text="Privacy Policy" speed={30} />
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto font-mono text-sm sm:text-base">
                        LAST UPDATED: FEBRUARY 27, 2026 — VERSION 2.4.0
                    </p>
                </div>
            </div>

            <div className="section-padding">
                <div className="container-base">
                    <div className="max-w-4xl mx-auto">
                        <div className="prose prose-cyber">
                            <h3>1. Data Collection Protocol</h3>
                            <p>
                                Cyberduce collects minimal data necessary to provide elite cybersecurity services. This includes infrastructure telemetry, endpoint status, and administrative contact information. We operate on a principle of data minimality.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
                                <div className="bg-card/30 border border-white/5 p-6 flex flex-col items-center text-center">
                                    <Shield className="w-8 h-8 text-primary mb-4" />
                                    <span className="font-mono text-xs font-bold uppercase tracking-wider">Secure Storage</span>
                                </div>
                                <div className="bg-card/30 border border-white/5 p-6 flex flex-col items-center text-center">
                                    <Lock className="w-8 h-8 text-primary mb-4" />
                                    <span className="font-mono text-xs font-bold uppercase tracking-wider">End-to-End Encrypted</span>
                                </div>
                                <div className="bg-card/30 border border-white/5 p-6 flex flex-col items-center text-center">
                                    <Eye className="w-8 h-8 text-primary mb-4" />
                                    <span className="font-mono text-xs font-bold uppercase tracking-wider">Zero Access</span>
                                </div>
                            </div>

                            <h3>2. Utilization of Intelligence</h3>
                            <p>
                                Metadata collected through our Cyber Shield Suite is used to improve threat detection algorithms and protect the global network. No client-identifiable data is shared with third parties.
                            </p>

                            <h3>3. Encryption Standards</h3>
                            <p>
                                All data at rest is encrypted using AES-256-GCM. Data in transit is secured via TLS 1.3 with Perfect Forward Secrecy. Key management is handled through FIPS 140-2 Level 3 HSMs.
                            </p>

                            <h3>4. Administrative Controls</h3>
                            <p>
                                Clients retain full lifecycle control over their data. Requests for data exports or permanent neutralization can be initiated through the Secure Operations Console.
                            </p>

                            <h3>5. Global Compliance</h3>
                            <p>
                                We maintain strict adherence to GDPR, CCPA, and ISO/IEC 27001:2022 standards. Data processing locations are selected based on jurisdictional security requirements.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}
