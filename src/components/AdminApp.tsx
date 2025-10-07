"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Shield, LogOut, Eye, Mail, Clock, MapPin, Server, ExternalLink, Info } from "lucide-react"
import { auth, db } from "@/lib/firebase"
import { signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged, User as FirebaseUser } from "firebase/auth"
import { collection, query, orderBy, onSnapshot, getDocs } from "firebase/firestore"

interface VisitorData {
  id: string
  email: string
  ip: string
  country: string
  city?: string
  region?: string
  timezone?: string
  latitude?: string
  longitude?: string
  timestamp: any
  subscribedAt?: string
  host: string
  path: string
  userAgent: string
  referer?: string
  acceptLanguage?: string
  cfRay?: string
  cfVisitor?: string
  source?: string
}

// Auth hook
const useAuth = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const signOut = async () => {
    await firebaseSignOut(auth)
  }

  return { user, loading, signIn, signOut }
}

// Login Component
function AdminLogin({ onLogin }: { onLogin: (email: string, password: string) => Promise<void> }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    setError("")
    setIsLoading(true)

    try {
      await onLogin(email, password)
    } catch (err: any) {
      setError(err.message || "Authentication failed. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-primary/20 rounded-lg p-8 shadow-xl">
          <div className="flex items-center justify-center mb-8">
            <Shield className="w-12 h-12 text-primary mr-3" />
            <h1 className="text-2xl font-bold text-primary font-mono">ADMIN ACCESS</h1>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-mono text-muted-foreground mb-2 block">
                EMAIL ADDRESS
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="admin@domain.com"
                className="bg-input/50 border-primary/30 focus:border-primary font-mono"
              />
            </div>

            <div>
              <label className="text-sm font-mono text-muted-foreground mb-2 block">
                PASSWORD
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="••••••••"
                className="bg-input/50 border-primary/30 focus:border-primary font-mono"
              />
            </div>

            {error && (
              <div className="text-destructive text-sm font-mono bg-destructive/10 p-3 rounded">
                {error}
              </div>
            )}

            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-semibold font-mono"
            >
              {isLoading ? "AUTHENTICATING..." : "ACCESS SYSTEM"}
            </Button>
          </div>

          <div className="mt-6 text-center text-xs text-muted-foreground font-mono">
            <p>SECURE CONNECTION ESTABLISHED</p>
            <p className="text-primary mt-1">256-BIT ENCRYPTION ACTIVE</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Admin Dashboard Component
function AdminDashboard({ user, onLogout }: { user: FirebaseUser; onLogout: () => void }) {
  const [visitors, setVisitors] = useState<VisitorData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, "subscribers"), orderBy("timestamp", "desc"))
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const visitorsData: VisitorData[] = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        visitorsData.push({
          id: doc.id,
          email: data.email || "N/A",
          ip: data.ip || "Unknown",
          country: data.country || "Unknown",
          city: data.city || "Unknown",
          region: data.region || "Unknown",
          timezone: data.timezone || "Unknown",
          latitude: data.latitude || "Unknown",
          longitude: data.longitude || "Unknown",
          timestamp: data.timestamp,
          subscribedAt: data.subscribedAt,
          host: data.host || "Unknown",
          path: data.path || "/",
          userAgent: data.userAgent || "Unknown",
          referer: data.referer || "Direct",
          acceptLanguage: data.acceptLanguage || "Unknown",
          cfRay: data.cfRay || "Unknown",
          cfVisitor: data.cfVisitor || "Unknown",
          source: data.source || "Unknown"
        })
      })
      setVisitors(visitorsData)
      setLoading(false)
    }, (error) => {
      console.error("Error fetching visitors:", error)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A"
    
    let date: Date
    if (timestamp.toDate) {
      date = timestamp.toDate()
    } else if (timestamp instanceof Date) {
      date = timestamp
    } else {
      date = new Date(timestamp)
    }

    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const uniqueCountries = new Set(visitors.map((v) => v.country)).size

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-primary/20 bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-primary font-mono">ADMIN DASHBOARD</h1>
                <p className="text-xs text-muted-foreground font-mono">SYSTEM MONITORING ACTIVE</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-mono text-foreground">{user.email}</p>
                <p className="text-xs text-muted-foreground font-mono">Administrator</p>
              </div>
              <Button
                onClick={onLogout}
                variant="outline"
                className="border-primary/30 hover:bg-primary/10 font-mono"
              >
                <LogOut className="w-4 h-4 mr-2" />
                LOGOUT
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-primary/20 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-mono text-muted-foreground">TOTAL VISITORS</p>
                <p className="text-3xl font-bold text-primary font-mono mt-1">{visitors.length}</p>
              </div>
              <Eye className="w-10 h-10 text-primary/50" />
            </div>
          </div>

          <div className="bg-card border border-primary/20 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-mono text-muted-foreground">PRIORITY LIST</p>
                <p className="text-3xl font-bold text-primary font-mono mt-1">{visitors.length}</p>
              </div>
              <Mail className="w-10 h-10 text-primary/50" />
            </div>
          </div>

          <div className="bg-card border border-primary/20 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-mono text-muted-foreground">COUNTRIES</p>
                <p className="text-3xl font-bold text-primary font-mono mt-1">{uniqueCountries}</p>
              </div>
              <MapPin className="w-10 h-10 text-primary/50" />
            </div>
          </div>
        </div>

        {/* Visitors Table */}
        <div className="bg-card border border-primary/20 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-primary/20">
            <h2 className="text-lg font-bold text-primary font-mono">VISITOR ANALYTICS</h2>
            <p className="text-sm text-muted-foreground font-mono mt-1">
              Real-time visitor tracking with Cloudflare integration
            </p>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-muted-foreground font-mono mt-4">LOADING DATA...</p>
            </div>
          ) : visitors.length === 0 ? (
            <div className="p-8 text-center">
              <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground font-mono">NO VISITORS YET</p>
              <p className="text-sm text-muted-foreground font-mono mt-2">Waiting for first subscriber...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-primary/20">
                    <TableHead className="font-mono text-primary">EMAIL</TableHead>
                    <TableHead className="font-mono text-primary">SOURCE IP</TableHead>
                    <TableHead className="font-mono text-primary">LOCATION</TableHead>
                    <TableHead className="font-mono text-primary">COORDINATES</TableHead>
                    <TableHead className="font-mono text-primary">TIMEZONE</TableHead>
                    <TableHead className="font-mono text-primary">TIME</TableHead>
                    <TableHead className="font-mono text-primary">HOST</TableHead>
                    <TableHead className="font-mono text-primary">REFERER</TableHead>
                    <TableHead className="font-mono text-primary">CF-RAY</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visitors.map((visitor) => (
                    <TableRow key={visitor.id} className="border-primary/20 hover:bg-primary/5">
                      <TableCell className="font-mono text-sm">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-primary" />
                          <span>{visitor.email}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        <div className="flex items-center space-x-2">
                          <Server className="w-4 h-4 text-muted-foreground" />
                          <span>{visitor.ip || "N/A"}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <div className="flex flex-col">
                            <span>{visitor.city || "Unknown"}, {visitor.region || ""}</span>
                            <span className="text-xs text-muted-foreground">{visitor.country || "N/A"}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {visitor.latitude && visitor.longitude 
                          ? `${visitor.latitude}, ${visitor.longitude}`
                          : "N/A"}
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {visitor.timezone || "N/A"}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{formatDate(visitor.timestamp)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm text-muted-foreground">
                        {visitor.host || "N/A"}
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground max-w-xs truncate">
                        {visitor.referer || "Direct"}
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {visitor.cfRay || "N/A"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Main App Component
export default function AdminApp() {
  const { user, loading, signIn, signOut } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground font-mono">INITIALIZING...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <AdminLogin onLogin={signIn} />
  }

  return <AdminDashboard user={user} onLogout={signOut} />
}