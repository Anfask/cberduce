"use client"

import { useEffect, useState } from "react"

export function MatrixRain() {
    const [chars, setChars] = useState<Array<{ id: number; char: string; left: number; delay: number; duration: number }>>([])

    useEffect(() => {
        const characters = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ"
        const newChars = Array.from({ length: 40 }, (_, i) => ({
            id: i,
            char: characters[Math.floor(Math.random() * characters.length)],
            left: Math.random() * 100,
            delay: Math.random() * 8,
            duration: 6 + Math.random() * 6,
        }))
        setChars(newChars)
    }, [])

    return (
        <div className="matrix-bg" aria-hidden="true">
            {chars.map((char) => (
                <div
                    key={char.id}
                    className="matrix-char"
                    style={{
                        left: `${char.left}%`,
                        animationDelay: `${char.delay}s`,
                        animationDuration: `${char.duration}s`,
                    } as React.CSSProperties}
                >
                    {char.char}
                </div>
            ))}
        </div>
    )
}
