"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Globe, Server, MapPin, Monitor, Link2 } from "lucide-react"

interface VisitorData {
  email: string
  ip: string
  country: string
  city?: string
  region?: string
  timezone?: string
  latitude?: string
  longitude?: string
  timestamp: unknown
  host: string
  path: string
  userAgent: string
  referer?: string
  acceptLanguage?: string
  cfRay?: string
  source?: string
}

const formatDate = (timestamp: unknown) => {
  if (!timestamp) return "N/A"
  let date: Date
  if (timestamp && typeof timestamp === 'object' && 'toDate' in timestamp) {
    date = (timestamp as { toDate: () => Date }).toDate()
  } else if (timestamp instanceof Date) {
    date = timestamp
  } else {
    date = new Date(timestamp as string)
  }
  return date.toLocaleString()
}

export function VisitorDetailModal({ 
  visitor, 
  isOpen, 
  onClose 
}: { 
  visitor: VisitorData | null
  isOpen: boolean
  onClose: () => void
}) {
  if (!visitor) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-mono text-primary">VISITOR DETAILS</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 font-mono text-sm">
          {/* Contact Info */}
          <div>
            <h3 className="text-primary font-semibold mb-2 flex items-center">
              <Globe className="w-4 h-4 mr-2" />
              CONTACT INFORMATION
            </h3>
            <div className="space-y-1 text-muted-foreground">
              <p><span className="text-foreground">Email:</span> {visitor.email}</p>
              <p><span className="text-foreground">Subscribed:</span> {formatDate(visitor.timestamp)}</p>
            </div>
          </div>

          {/* Network Info */}
          <div>
            <h3 className="text-primary font-semibold mb-2 flex items-center">
              <Server className="w-4 h-4 mr-2" />
              NETWORK INFORMATION
            </h3>
            <div className="space-y-1 text-muted-foreground">
              <p><span className="text-foreground">IP Address:</span> {visitor.ip}</p>
              <p><span className="text-foreground">CF-Ray:</span> {visitor.cfRay || "N/A"}</p>
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-primary font-semibold mb-2 flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              LOCATION DATA
            </h3>
            <div className="space-y-1 text-muted-foreground">
              <p><span className="text-foreground">Country:</span> {visitor.country}</p>
              <p><span className="text-foreground">City:</span> {visitor.city || "N/A"}</p>
              <p><span className="text-foreground">Region:</span> {visitor.region || "N/A"}</p>
              <p><span className="text-foreground">Timezone:</span> {visitor.timezone || "N/A"}</p>
              <p><span className="text-foreground">Coordinates:</span> {visitor.latitude && visitor.longitude ? `${visitor.latitude}, ${visitor.longitude}` : "N/A"}</p>
            </div>
          </div>

          {/* Request Info */}
          <div>
            <h3 className="text-primary font-semibold mb-2 flex items-center">
              <Link2 className="w-4 h-4 mr-2" />
              REQUEST DETAILS
            </h3>
            <div className="space-y-1 text-muted-foreground">
              <p><span className="text-foreground">Host:</span> {visitor.host}</p>
              <p><span className="text-foreground">Path:</span> {visitor.path}</p>
              <p><span className="text-foreground">Referer:</span> {visitor.referer || "Direct"}</p>
              <p><span className="text-foreground">Language:</span> {visitor.acceptLanguage || "N/A"}</p>
            </div>
          </div>

          {/* Device Info */}
          <div>
            <h3 className="text-primary font-semibold mb-2 flex items-center">
              <Monitor className="w-4 h-4 mr-2" />
              DEVICE INFORMATION
            </h3>
            <div className="space-y-1 text-muted-foreground">
              <p className="break-all"><span className="text-foreground">User Agent:</span> {visitor.userAgent}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}