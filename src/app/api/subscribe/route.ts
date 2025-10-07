import { type NextRequest, NextResponse } from "next/server"
import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app)

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

    // Extract Cloudflare data from request headers
    const ip = request.headers.get("cf-connecting-ip") || 
               request.headers.get("x-forwarded-for") || 
               request.headers.get("x-real-ip") || 
               request.ip ||
               "Unknown"
    
    const country = request.headers.get("cf-ipcountry") || "Unknown"
    const city = request.headers.get("cf-ipcity") || "Unknown"
    const region = request.headers.get("cf-region") || "Unknown"
    const timezone = request.headers.get("cf-timezone") || "Unknown"
    const latitude = request.headers.get("cf-iplat") || "Unknown"
    const longitude = request.headers.get("cf-iplon") || "Unknown"
    
    // Additional request metadata
    const userAgent = request.headers.get("user-agent") || "Unknown"
    const host = request.headers.get("host") || "Unknown"
    const referer = request.headers.get("referer") || "Direct"
    const acceptLanguage = request.headers.get("accept-language") || "Unknown"
    
    // Cloudflare specific headers
    const cfRay = request.headers.get("cf-ray") || "Unknown"
    const cfVisitor = request.headers.get("cf-visitor") || "Unknown"
    
    // Get the full URL path
    const url = new URL(request.url)
    const path = url.pathname

    // Store comprehensive data in Firebase
    const subscriberData = {
      email,
      timestamp: Timestamp.now(),
      subscribedAt: new Date().toISOString(),
      
      // IP and Location Data
      ip,
      country,
      city,
      region,
      timezone,
      latitude,
      longitude,
      
      // Request Metadata
      host,
      path,
      referer,
      userAgent,
      acceptLanguage,
      
      // Cloudflare Specific
      cfRay,
      cfVisitor,
      
      // Source
      source: "coming-soon-page",
    }

    await addDoc(collection(db, "subscribers"), subscriberData)

    console.log("✅ Email subscription with full data:", {
      email,
      ip,
      country,
      city,
    })

    return NextResponse.json({ 
      message: "Successfully subscribed!",
      success: true 
    }, { status: 200 })
    
  } catch (error) {
    console.error("❌ Subscription error:", error)
    return NextResponse.json({ 
      error: "Failed to subscribe",
      success: false 
    }, { status: 500 })
  }
}