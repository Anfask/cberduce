import { type NextRequest, NextResponse } from "next/server"
import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore, collection, addDoc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD2-4jj1LnzVQsiyiEpdbtITWrPWHp69HM",
  authDomain: "cyberduce-fddd5.firebaseapp.com",
  projectId: "cyberduce-fddd5",
  storageBucket: "cyberduce-fddd5.firebasestorage.app",
  messagingSenderId: "757636976825",
  appId: "1:757636976825:web:da8c9bee037d4821380b68",
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app)

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

    await addDoc(collection(db, "subscribers"), {
      email,
      subscribedAt: new Date(),
      source: "coming-soon-page",
    })

    console.log("✅ Email subscription:", email)

    return NextResponse.json({ message: "Successfully subscribed!" }, { status: 200 })
  } catch (error) {
    console.error("❌ Subscription error:", error)
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 })
  }
}
