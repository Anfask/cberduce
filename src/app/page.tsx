"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, Terminal } from "lucide-react"
import Image from "next/image"

// Matrix rain effect component
function MatrixRain() {
  const [chars, setChars] = useState<Array<{ id: number; char: string; left: number; delay: number }>>([])

  useEffect(() => {
    const characters =
      "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
    const newChars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      char: characters[Math.floor(Math.random() * characters.length)],
      left: Math.random() * 100,
      delay: Math.random() * 8,
    }))
    setChars(newChars)
  }, [])

  return (
    <div className="matrix-bg">
      {chars.map((char) => (
        <div
          key={char.id}
          className="matrix-char"
          style={{
            left: `${char.left}%`,
            animationDelay: `${char.delay}s`,
          }}
        >
          {char.char}
        </div>
      ))}
    </div>
  )
}

function CyberLogo() {
  return (
    <div className="flex items-center justify-center mb-6 sm:mb-8">
      <Image
        src="/logo.png"
        alt="Cyber Security Company Logo"
        width={200}
        height={100}
        className="w-28 h-14 sm:w-40 sm:h-20 md:w-56 md:h-28 object-contain"
        priority
      />
    </div>
  )
}


// 🔹 Generic ScrambleText component
function ScrambleText({ text, speed = 50, className = "" }: { text: string; speed?: number; className?: string }) {
  const [display, setDisplay] = useState("")
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"

  useEffect(() => {
    let iteration = 0
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (i < iteration) return char
            return letters[Math.floor(Math.random() * letters.length)]
          })
          .join("")
      )

      if (iteration >= text.length) clearInterval(interval)
      iteration += 0.5
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return <h1 className={className}>{display}</h1>
}

// Subtitle animation
function BruteForceSubtitle() {
  const [phase, setPhase] = useState(0)
  const phases = ["Building the Next Generation of Enterprise Solutions. Launching soon."]

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => {
        if (prev < phases.length - 1) {
          return prev + 1
        }
        return prev
      })
    }, 300)

    return () => clearInterval(interval)
  }, [phases.length])

  return (
    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty font-mono">
      {phases[phase]}
    </p>
  )
}

// Email subscription component
function EmailSubscription() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
  if (!email) return
  setIsLoading(true)

  try {
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })

    if (!res.ok) {
      throw new Error("Failed to subscribe")
    }

    setIsSubmitted(true)
    setEmail("")
  } catch (error) {
    console.error("Error storing email:", error)
  } finally {
    setIsLoading(false)
  }
}


  if (isSubmitted) {
    return (
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 text-primary">
          <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="font-semibold text-sm sm:text-base">{"Access Granted!"}</span>
        </div>
        <p className="text-center text-muted-foreground mt-2 text-xs sm:text-sm">{"You're on the priority list."}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <Terminal className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-2" />
        <ScrambleText
          text="INITIALIZE ACCESS"
          speed={40}
          className="text-base sm:text-lg font-semibold font-mono text-primary"
        />
        <p className="text-xs sm:text-sm text-muted-foreground font-mono">{"Enter credentials for priority access"}</p>
      </div>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <Input
          type="email"
          placeholder="user@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-input/50 border-primary/30 focus:border-primary text-foreground placeholder:text-muted-foreground font-mono text-sm"
          required
        />
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-primary hover:bg-primary/80 text-primary-foreground font-semibold px-4 sm:px-6 font-mono text-sm"
        >
          {isLoading ? "ACCESSING..." : "EXECUTE"}
        </Button>
      </div>
    </div>
  )
}

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <MatrixRain />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(101,163,13,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(101,163,13,0.1)_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:50px_50px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-12">
          {/* Logo */}
          <CyberLogo />

          {/* 🔹 Main Heading */}
          <div className="space-y-4 sm:space-y-6">
            <ScrambleText
              text="Connecting the Future"
              speed={50}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-glow font-mono"
            />
            <BruteForceSubtitle />
          </div>

          {/* Email subscription */}
          <div className="max-w-sm sm:max-w-md mx-auto mt-20 sm:mt-24">
            <EmailSubscription />
          </div>

          {/* System status */}
          <div className="pt-8 sm:pt-10 space-y-2 sm:space-y-3">
            <div className="font-mono text-xs sm:text-sm text-primary">{">> SYSTEM STATUS: INITIALIZING..."}</div>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs text-muted-foreground font-mono">
              <span>{"[✓] AI-POWERED THREAT DETECTION"}</span>
              <span className="hidden sm:inline">{"[✓] ZERO-TRUST ARCHITECTURE"}</span>
              <span>{"[✓] 24/7 MONITORING"}</span>
            </div>
            <div className="sm:hidden flex flex-col items-center space-y-1 text-xs text-muted-foreground font-mono">
              <span>{"[✓] ZERO-TRUST ARCHITECTURE"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
    </div>
  )
}
