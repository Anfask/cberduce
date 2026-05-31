import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cyberduce | Development & Cyber Security Solutions",
  description:
    "Cyberduce delivers elite development and cyber security solutions — custom software, mobile apps with Flutter, and AI-powered enterprise protection.",
  keywords: "software development, website development, flutter apps, mobile app development, cyber security, threat detection, cyberduce",
  openGraph: {
    title: "Cyberduce | Development & Cyber Security Solutions",
    description: "Enterprise-grade development and cybersecurity services powered by AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
