"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Clock, AlertCircle, ExternalLink, Zap, Store, ShoppingBag, Package, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

interface PlatformConnection {
  id: string
  platform_type: string
  store_name: string
  is_active: boolean
  last_sync_at: string | null
  sync_status: string
  created_at: string
}

interface ConnectionManagerProps {
  vendorId: string
}

const PLATFORM_CONFIG = {
  shopify: {
    name: "Shopify",
    icon: Store,
    color: "bg-green-100 text-green-700 border-green-200",
    description: "Connect your Shopify store to sync orders automatically",
    available: true,
  },
  etsy: {
    name: "Etsy",
    icon: ShoppingBag,
    color: "bg-orange-100 text-orange-700 border-orange-200",
    description: "Sync orders from your Etsy shop",
    available: false,
  },
  amazon: {
    name: "Amazon",
    icon: Package,
    color: "bg-blue-100 text-blue-700 border-blue-200",
    description: "Connect Amazon Seller Central",
    available: false,
  },
  woocommerce: {
    name: "WooCommerce",
    icon: Globe,
    color: "bg-purple-100 text-purple-700 border-purple-200",
    description: "Connect your WooCommerce store",
    available: false,
  },
}

export function ConnectionManager({ vendorId }: ConnectionManagerProps) {
  const [connections, setConnections] = useState<PlatformConnection[]>([])
  const [loading, setLoading] = useState(true)
  const [connecting, setConnecting] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchConnections()
  }, [vendorId])

  const fetchConnections = async () => {
    try {
      const { data, error } = await supabase
        .from("platform_connections")
        .select("*")
        .eq("vendor_id", vendorId)
        .order("created_at", { ascending: false })

      if (error) throw error
      setConnections(data || [])
    } catch (error) {
      console.error("Error fetching connections:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleConnect = async (platformType: string) => {
    setConnecting(platformType)

    try {
      // For now, we'll simulate the connection process
      // In a real implementation, this would redirect to OAuth flow
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create a sample connection
      const { error } = await supabase.from("platform_connections").insert({
        vendor_id: vendorId,
        platform_type: platformType,
        platform_store_id: `demo-store-${Date.now()}`,
        store_name: `Demo ${PLATFORM_CONFIG[platformType as keyof typeof PLATFORM_CONFIG].name} Store`,
        is_active: true,
        sync_status: "success",
        last_sync_at: new Date().toISOString(),
      })

      if (error) throw error

      await fetchConnections()
    } catch (error) {
      console.error("Error connecting platform:", error)
    } finally {
      setConnecting(null)
    }
  }

  const handleDisconnect = async (connectionId: string) => {
    try {
      const { error } = await supabase.from("platform_connections").update({ is_active: false }).eq("id", connectionId)

      if (error) throw error
      await fetchConnections()
    } catch (error) {
      console.error("Error disconnecting platform:", error)
    }
  }

  const getSyncStatusBadge = (status: string, lastSync: string | null) => {
    switch (status) {
      case "success":
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            <CheckCircle className="h-3 w-3 mr-1" />
            Connected
          </Badge>
        )
      case "syncing":
        return (
          <Badge variant="outline" className="text-blue-600 border-blue-600">
            <Zap className="h-3 w-3 mr-1" />
            Syncing
          </Badge>
        )
      case "error":
        return (
          <Badge variant="outline" className="text-red-600 border-red-600">
            <AlertCircle className="h-3 w-3 mr-1" />
            Error
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="text-gray-600 border-gray-600">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
    }
  }

  const getLastSyncText = (lastSync: string | null) => {
    if (!lastSync) return "Never synced"

    const syncDate = new Date(lastSync)
    const now = new Date()
    const diffMinutes = Math.floor((now.getTime() - syncDate.getTime()) / (1000 * 60))

    if (diffMinutes < 1) return "Just now"
    if (diffMinutes < 60) return `${diffMinutes} minutes ago`
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)} hours ago`
    return `${Math.floor(diffMinutes / 1440)} days ago`
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Connected Stores</CardTitle>
          <CardDescription>Loading your platform connections...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  const connectedPlatforms = connections.filter((c) => c.is_active)
  const availablePlatforms = Object.entries(PLATFORM_CONFIG).filter(
    ([key]) => !connectedPlatforms.some((c) => c.platform_type === key),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected Stores</CardTitle>
        <CardDescription>Manage your e-commerce platform connections to sync orders automatically</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Connected Platforms */}
        {connectedPlatforms.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Active Connections</h4>
            {connectedPlatforms.map((connection) => {
              const config = PLATFORM_CONFIG[connection.platform_type as keyof typeof PLATFORM_CONFIG]
              const Icon = config.icon

              return (
                <div key={connection.id} className="flex items-center justify-between p-4 border rounded-lg bg-card">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", config.color)}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{connection.store_name}</p>
                        {getSyncStatusBadge(connection.sync_status, connection.last_sync_at)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Last sync: {getLastSyncText(connection.last_sync_at)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      View Store
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDisconnect(connection.id)}>
                      Disconnect
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Available Platforms */}
        {availablePlatforms.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Available Connections</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availablePlatforms.map(([key, config]) => {
                const Icon = config.icon
                const isConnecting = connecting === key

                return (
                  <div
                    key={key}
                    className={cn(
                      "flex items-center justify-between p-4 border rounded-lg transition-colors",
                      config.available
                        ? "bg-card hover:bg-muted/50 cursor-pointer"
                        : "bg-muted/30 cursor-not-allowed opacity-60",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", config.color)}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{config.name}</p>
                          {!config.available && (
                            <Badge variant="secondary" className="text-xs">
                              Coming Soon
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{config.description}</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => config.available && handleConnect(key)}
                      disabled={!config.available || isConnecting}
                      size="sm"
                    >
                      {isConnecting ? (
                        <>
                          <Zap className="h-4 w-4 mr-1 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        `Connect ${config.name}`
                      )}
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Help Text */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Once connected, your orders will automatically sync every 15 minutes. You can also manually trigger a sync
            from the orders dashboard.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}
