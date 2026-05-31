"use client"

import { PageWrapper } from "@/components/layout/PageWrapper"
import { ScrambleText } from "@/components/ui/ScrambleText"
import { Terminal, Scale, AlertTriangle } from "lucide-react"

export default function TermsPage() {
    return (
        <PageWrapper>
            <div className="py-12 sm:py-20 bg-background/50 border-b border-white/5">
                <div className="container-base text-center">
                    <h1 className="text-4xl sm:text-6xl font-bold font-mono text-primary text-glow mb-6 uppercase">
                        <ScrambleText text="Terms of Service" speed={30} />
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto font-mono text-sm sm:text-base">
                        LEGAL FRAMEWORK FOR SECURE OPERATIONS — FEB 2026
                    </p>
                </div>
            </div>

            <div className="section-padding">
                <div className="container-base">
                    <div className="max-w-4xl mx-auto">
                        <div className="prose prose-cyber">
                            <div className="bg-primary/5 border border-primary/20 p-8 my-10 flex gap-6 items-start">
                                <AlertTriangle className="w-6 h-6 text-primary shrink-0 mt-1" />
                                <p className="m-0 text-sm font-mono text-primary">
                                    IMPORTANT: ENGAGEMENT WITH CYBERDUCE SERVICES CONSTITUTES AGREEMENT TO THESE LEGAL PROTOCOLS. ENSURE AUTHORIZED SIGNATORIES REVIEW ALL SECTIONS.
                                </p>
                            </div>

                            <h3>1. Scope of Engagement</h3>
                            <p>
                                Cyberduce provides cybersecurity monitoring, threat hunting, and incident response services. Service Level Agreements (SLAs) are defined in specific Statement of Work (SOW) documents.
                            </p>

                            <h3>2. Authorized Access</h3>
                            <p>
                                The client represents that they have all necessary authorizations for the networks and systems Cyberduce is contracted to monitor or test. Unauthorizated access attempts are strictly prohibited.
                            </p>

                            <h3>3. Operational Integrity</h3>
                            <p>
                                While we strive for unbreakable security, the client acknowledges that the threat landscape is dynamic. Cyberduce is not liable for data loss occurring despite implementation of agreed-upon security protocols.
                            </p>

                            <h3>4. Intellectual Property</h3>
                            <p>
                                Our proprietary AI models, detection logic, and custom scripts remain the exclusive property of Cyberduce. Clients are granted a non-exclusive license for internal use during the contract term.
                            </p>

                            <h3>5. Ethical Conduct</h3>
                            <p>
                                Use of Cyberduce tools or services for offensive operations, illegal activities, or unauthorized reconnaissance will result in immediate termination of services and reporting to relevant authorities.
                            </p>

                            <div className="mt-16 pt-10 border-t border-white/5 flex justify-center">
                                <div className="flex items-center gap-2">
                                    <Scale className="w-5 h-5 text-muted-foreground" />
                                    <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">Jurisdiction: Global Cyber Law Standards</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}
