"use client"

import { useEffect, useState } from "react"

export function useScramble(text: string, trigger: boolean = true, speed: number = 40) {
    const [display, setDisplay] = useState("")
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>/\\|"

    useEffect(() => {
        if (!trigger) return
        let iteration = 0
        const interval = setInterval(() => {
            setDisplay(
                text
                    .split("")
                    .map((char, i) => {
                        if (char === " ") return " "
                        if (i < iteration) return char
                        return letters[Math.floor(Math.random() * letters.length)]
                    })
                    .join("")
            )
            if (iteration >= text.length) clearInterval(interval)
            iteration += 0.5
        }, speed)
        return () => clearInterval(interval)
    }, [text, trigger, speed])

    return display
}

interface ScrambleTextProps {
    text: string
    as?: React.ElementType
    className?: string
    speed?: number
    delay?: number
}

export function ScrambleText({
    text,
    as: Tag = "span",
    className = "",
    speed = 40,
    delay = 0,
}: ScrambleTextProps) {
    const [triggered, setTriggered] = useState(false)
    const display = useScramble(text, triggered, speed)

    useEffect(() => {
        const timer = setTimeout(() => setTriggered(true), delay)
        return () => clearTimeout(timer)
    }, [delay])

    return (
        <Tag className={className}>
            {triggered ? display || text : ""}
        </Tag>
    )
}
