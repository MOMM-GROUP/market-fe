"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Users, Plus, Mail, MoreHorizontal, Shield, Package, Eye, Trash2, UserX } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface TeamMember {
  id: string
  user_id: string
  role: string
  permissions: {
    view_orders: boolean
    manage_products: boolean
    manage_team: boolean
  }
  joined_at: string
  profiles: {
    first_name: string
    last_name: string
    email: string
  } | null
}

interface TeamInvitation {
  id: string
  email: string
  role: string
  permissions: {
    view_orders: boolean
    manage_products: boolean
    manage_team: boolean
  }
  status: string
  expires_at: string
  created_at: string
}

export default function TeamManagementPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [invitations, setInvitations] = useState<TeamInvitation[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [vendor, setVendor] = useState<any>(null)
  const [showInviteDialog, setShowInviteDialog] = useState(false)
  const [inviteForm, setInviteForm] = useState({
    email: "",
    role: "employee",
    permissions: {
      view_orders: true,
      manage_products: false,
      manage_team: false,
    },
  })
  const [isInviting, setIsInviting] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuthAndLoadData = async () => {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()

      if (!authUser) {
        router.push("/auth/login")
        return
      }
      setUser(authUser)

      // --- START: NEW OWNER-BASED DATA FETCHING ---

      // Step 1: Find the current user in the team_members table to check their role.
      const { data: teamMember, error: teamMemberError } = await supabase
        .from("team_members")
        .select("vendor_id, role")
        .eq("user_id", authUser.id)
        .single()

      // Step 2: Check if they are an owner. If not, they cannot manage the team.
      if (teamMemberError || !teamMember || teamMember.role !== "owner") {
        console.error("Access Denied: User is not the vendor owner.", teamMemberError)
        // Redirect to the main vendor dashboard, as they don't have permission for this page.
        router.push("/vendor")
        return
      }

      const vendorId = teamMember.vendor_id

      // Step 3: Since they are the owner, fetch the main vendor data.
      const { data: vendorData } = await supabase.from("vendors").select("*").eq("id", vendorId).single()

      if (!vendorData) {
        console.error("Critical Error: Vendor record not found for owner's vendor_id:", vendorId)
        setError("Could not load your vendor information.")
        setLoading(false)
        return
      }

      setVendor(vendorData)

      // Step 4: Load all team members for the owner's vendor.
      const { data: members } = await supabase
        .from("team_members")
        .select(
          `
          *,
          profiles (
            first_name,
            last_name,
            email
          )
        `,
        )
        .eq("vendor_id", vendorId)
        .order("joined_at", { ascending: false })

      setTeamMembers(members || [])

      // Step 5: Load pending invitations for the owner's vendor.
      const { data: pendingInvitations } = await supabase
        .from("team_invitations")
        .select("*")
        .eq("vendor_id", vendorId)
        .eq("status", "pending")
        .order("created_at", { ascending: false })

      setInvitations(pendingInvitations || [])
      setLoading(false)

      // --- END: NEW OWNER-BASED DATA FETCHING ---
    }

    checkAuthAndLoadData()
  }, [supabase, router])

  const handleInviteTeamMember = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!vendor || !user) return

    setIsInviting(true)

    try {
      const { error } = await supabase.from("team_invitations").insert({
        vendor_id: vendor.id,
        email: inviteForm.email,
        role: inviteForm.role,
        permissions: inviteForm.permissions,
        invited_by: user.id,
      })

      if (error) throw error

      // Refresh invitations
      const { data: pendingInvitations } = await supabase
        .from("team_invitations")
        .select("*")
        .eq("vendor_id", vendor.id)
        .eq("status", "pending")
        .order("created_at", { ascending: false })

      setInvitations(pendingInvitations || [])
      setShowInviteDialog(false)
      setInviteForm({
        email: "",
        role: "employee",
        permissions: {
          view_orders: true,
          manage_products: false,
          manage_team: false,
        },
      })
    } catch (error) {
      console.error("Error inviting team member:", error)
    } finally {
      setIsInviting(false)
    }
  }

  const handleRemoveTeamMember = async (memberId: string) => {
    if (!confirm("Are you sure you want to remove this team member?")) return

    try {
      const { error } = await supabase.from("team_members").delete().eq("id", memberId)

      if (error) throw error

      setTeamMembers(teamMembers.filter((member) => member.id !== memberId))
    } catch (error) {
      console.error("Error removing team member:", error)
    }
  }

  const handleCancelInvitation = async (invitationId: string) => {
    try {
      const { error } = await supabase.from("team_invitations").delete().eq("id", invitationId)

      if (error) throw error

      setInvitations(invitations.filter((inv) => inv.id !== invitationId))
    } catch (error) {
      console.error("Error canceling invitation:", error)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background p-8">
        <div className="text-center">Loading...</div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-background p-8">
        <div className="text-center text-red-600">{error}</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Team Management</h1>
            <p className="text-muted-foreground">Manage your team members and their permissions</p>
          </div>
          <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Invite Team Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Team Member</DialogTitle>
                <DialogDescription>Send an invitation to join your team with specific permissions.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleInviteTeamMember}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={inviteForm.email}
                      onChange={(e) => setInviteForm((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="colleague@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select
                      value={inviteForm.role}
                      onValueChange={(value) => setInviteForm((prev) => ({ ...prev, role: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="employee">Employee</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label>Permissions</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="view_orders"
                          checked={inviteForm.permissions.view_orders}
                          onCheckedChange={(checked) =>
                            setInviteForm((prev) => ({
                              ...prev,
                              permissions: { ...prev.permissions, view_orders: !!checked },
                            }))
                          }
                        />
                        <Label htmlFor="view_orders" className="text-sm">
                          View Orders
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="manage_products"
                          checked={inviteForm.permissions.manage_products}
                          onCheckedChange={(checked) =>
                            setInviteForm((prev) => ({
                              ...prev,
                              permissions: { ...prev.permissions, manage_products: !!checked },
                            }))
                          }
                        />
                        <Label htmlFor="manage_products" className="text-sm">
                          Manage Products
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="manage_team"
                          checked={inviteForm.permissions.manage_team}
                          onCheckedChange={(checked) =>
                            setInviteForm((prev) => ({
                              ...prev,
                              permissions: { ...prev.permissions, manage_team: !!checked },
                            }))
                          }
                        />
                        <Label htmlFor="manage_team" className="text-sm">
                          Manage Team
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter className="mt-6">
                  <Button type="button" variant="outline" onClick={() => setShowInviteDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isInviting}>
                    {isInviting ? "Sending..." : "Send Invitation"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Team Members */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Members ({teamMembers.length})
            </CardTitle>
            <CardDescription>Current team members and their roles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {member.profiles?.first_name} {member.profiles?.last_name}
                      </p>
                      <p className="text-sm text-muted-foreground">{member.profiles?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant={member.role === "owner" ? "default" : "secondary"}>{member.role}</Badge>
                      <div className="flex gap-1">
                        {member.permissions.view_orders && (
                          <Badge variant="outline" className="text-xs">
                            <Eye className="h-3 w-3 mr-1" />
                            Orders
                          </Badge>
                        )}
                        {member.permissions.manage_products && (
                          <Badge variant="outline" className="text-xs">
                            <Package className="h-3 w-3 mr-1" />
                            Products
                          </Badge>
                        )}
                        {member.permissions.manage_team && (
                          <Badge variant="outline" className="text-xs">
                            <Shield className="h-3 w-3 mr-1" />
                            Team
                          </Badge>
                        )}
                      </div>
                    </div>
                    {member.role !== "owner" && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleRemoveTeamMember(member.id)} className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove Member
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Invitations */}
        {invitations.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Pending Invitations ({invitations.length})
              </CardTitle>
              <CardDescription>Invitations waiting for response</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invitations.map((invitation) => (
                  <div key={invitation.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                        <Mail className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium">{invitation.email}</p>
                        <p className="text-sm text-muted-foreground">
                          Invited {new Date(invitation.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-end gap-1">
                        <Badge variant="outline" className="text-amber-600 border-amber-600">
                          Pending
                        </Badge>
                        <Badge variant="secondary">{invitation.role}</Badge>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleCancelInvitation(invitation.id)}>
                        <UserX className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}
