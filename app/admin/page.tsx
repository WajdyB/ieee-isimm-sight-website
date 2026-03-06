"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Upload, Eye, EyeOff, Loader2, Users, Award, Mail, Download, RefreshCw } from "lucide-react"
import Image from "next/image"
import {
  loginAdmin,
  getEvents,
  createEvent,
  deleteEvent,
  uploadImages,
  getMandates,
  createMandate,
  getExcom,
  createExcomMember,
  updateExcomMember,
  deleteExcomMember,
  uploadExcomImage,
  getAwards,
  createAward,
  deleteAward,
  uploadAwardImage,
  getNewsletterSubscribers,
  type EventData,
} from "@/lib/api"
import { EXCOM_POSITIONS } from "@/lib/excom"
import { ConfirmDialog } from "@/components/admin/ConfirmDialog"

// Add local Event type for MongoDB
interface Event {
  _id: string
  title: string
  description: string
  date: string
  location: string
  attendees: number
  images: string[]
  created_at: string
  updated_at: string
}

interface Mandate {
  _id: string
  name: string
  startYear: number
  endYear: number
  isCurrent: boolean
}

interface ExcomMember {
  _id: string
  mandateId: string
  name: string
  position: string
  customPosition?: string
  displayPosition?: string
  email: string
  facebook?: string
  linkedin?: string
  imageUrl?: string
  order?: number
}

interface AwardItem {
  _id: string
  title: string
  year: number
  description: string
  imageUrl?: string
}

interface NewsletterSubscriber {
  _id: string
  email: string
  subscribedAt: string
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [events, setEvents] = useState<Event[]>([])
  const [newEvent, setNewEvent] = useState<EventData>({
    title: "",
    description: "",
    date: "",
    location: "",
    attendees: 0,
    images: [],
  })

  // Mandates & Excom state
  const [mandates, setMandates] = useState<Mandate[]>([])
  const [excomMembers, setExcomMembers] = useState<ExcomMember[]>([])
  const [selectedMandateId, setSelectedMandateId] = useState<string>("")
  const [newMandate, setNewMandate] = useState<{ name: string; startYear: number | ""; endYear: number | ""; isCurrent: boolean }>({ name: "", startYear: "", endYear: "", isCurrent: false })
  const [newMember, setNewMember] = useState({
    name: "",
    position: "Chairman" as string,
    customPosition: "",
    email: "",
    facebook: "",
    linkedin: "",
    imageUrl: "",
    order: 0,
  })
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null)
  const [editMemberForm, setEditMemberForm] = useState<Partial<ExcomMember>>({})

  // Awards state
  const [awards, setAwards] = useState<AwardItem[]>([])
  const [newAward, setNewAward] = useState({ title: "", year: new Date().getFullYear(), description: "", imageUrl: "" })

  // Newsletter subscribers state
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([])

  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean
    title: string
    description?: string
    confirmLabel?: string
    variant?: "default" | "destructive"
    onConfirm: () => void | Promise<void>
  }>({ open: false, title: "", onConfirm: () => {} })
  const [confirmLoading, setConfirmLoading] = useState(false)

  // Load events on authentication
  useEffect(() => {
    if (isAuthenticated) {
      loadEvents()
      loadMandates()
      loadAwards()
      loadSubscribers()
    }
  }, [isAuthenticated])

  const loadSubscribers = async () => {
    try {
      const res = await getNewsletterSubscribers()
      if (res.success) setSubscribers(res.data ?? [])
    } catch (e) {
      console.error(e)
    }
  }


  useEffect(() => {
    if (isAuthenticated && selectedMandateId) {
      loadExcom(selectedMandateId)
    }
  }, [isAuthenticated, selectedMandateId])

  const loadMandates = async () => {
    try {
      const res = await getMandates()
      if (res.success) setMandates(res.data)
    } catch (e) {
      console.error(e)
    }
  }

  const loadAwards = async () => {
    try {
      const res = await getAwards()
      if (res.success) setAwards(res.data ?? [])
    } catch (e) {
      console.error(e)
    }
  }

  const loadExcom = async (mandateId: string) => {
    try {
      setLoading(true)
      const res = await getExcom(mandateId)
      if (res.success) setExcomMembers(res.data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const loadEvents = async () => {
    try {
      setLoading(true)
      const response = await getEvents()
      if (response.success) {
        setEvents(response.data)
      } else {
        console.error('Failed to load events:', response.message)
      }
    } catch (error) {
      console.error('Error loading events:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter both email and password")
      return
    }

    try {
      setLoading(true)
      const response = await loginAdmin({ email, password })
      
      if (response.success) {
        setIsAuthenticated(true)
        setEmail("")
        setPassword("")
        toast.success("Logged in successfully")
      } else {
        toast.error(response.message || "Login failed")
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error("Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setEvents([])
  }

  const handleAddEvent = async () => {
    if (!newEvent.title || !newEvent.description || !newEvent.date || !newEvent.location) {
      toast.error("Please fill in all required fields")
      return
    }

    try {
      setLoading(true)
      const response = await createEvent(newEvent)
      
      if (response.success) {
        setEvents([response.data, ...events])
        setNewEvent({
          title: "",
          description: "",
          date: "",
          location: "",
          attendees: 0,
          images: [],
        })
        toast.success("Event created successfully!")
      } else {
        toast.error(response.message || "Failed to create event")
      }
    } catch (error) {
      console.error('Error creating event:', error)
      toast.error("Failed to create event. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const openDeleteEventDialog = (id: string) => {
    setConfirmDialog({
      open: true,
      title: "Delete event",
      description: "Are you sure you want to delete this event?",
      confirmLabel: "Delete",
      variant: "destructive",
      onConfirm: async () => {
        try {
          setConfirmLoading(true)
          const response = await deleteEvent(id)
          if (response.success) {
            setEvents(events.filter((e) => e._id !== id))
            toast.success("Event deleted successfully!")
          } else {
            toast.error(response.message || "Failed to delete event")
          }
        } catch (error) {
          console.error('Error deleting event:', error)
          toast.error("Failed to delete event. Please try again.")
        } finally {
          setConfirmLoading(false)
        }
      },
    })
  }

  const handleDeleteEvent = (id: string) => openDeleteEventDialog(id)

  const handleAddMandate = async () => {
    const startYear = newMandate.startYear === "" ? undefined : Number(newMandate.startYear)
    const endYear = newMandate.endYear === "" ? undefined : Number(newMandate.endYear)
    if (!newMandate.name || startYear === undefined || endYear === undefined) {
      toast.error("Please fill name, start year, and end year")
      return
    }
    try {
      setLoading(true)
      const res = await createMandate({ name: newMandate.name, startYear, endYear, isCurrent: newMandate.isCurrent })
      if (res.success) {
        setMandates([...mandates, res.data])
        setSelectedMandateId(res.data._id)
        setNewMandate({ name: "", startYear: "", endYear: "", isCurrent: false })
        toast.success("Mandate created successfully!")
      } else toast.error(res.message || "Failed to create mandate")
    } catch (e) {
      console.error(e)
      toast.error("Failed to create mandate")
    } finally {
      setLoading(false)
    }
  }

  const handleAddMember = async () => {
    if (!selectedMandateId || !newMember.name || !newMember.position || !newMember.email) {
      toast.error("Please fill name, position, and email")
      return
    }
    if (newMember.position === "Other" && !newMember.customPosition) {
      toast.error("Please enter custom position when selecting Other")
      return
    }
    try {
      setLoading(true)
      const res = await createExcomMember({
        mandateId: selectedMandateId,
        name: newMember.name,
        position: newMember.position,
        customPosition: newMember.position === "Other" ? newMember.customPosition : undefined,
        email: newMember.email,
        facebook: newMember.facebook,
        linkedin: newMember.linkedin,
        imageUrl: newMember.imageUrl,
        order: newMember.order,
      })
      if (res.success) {
        setExcomMembers([...excomMembers, res.data])
        setNewMember({ name: "", position: "Chairman", customPosition: "", email: "", facebook: "", linkedin: "", imageUrl: "", order: excomMembers.length })
        toast.success("Member added successfully!")
      } else toast.error(res.message || "Failed to add member")
    } catch (e) {
      console.error(e)
      toast.error("Failed to add member")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateMember = async () => {
    if (!editingMemberId) return
    try {
      setLoading(true)
      const res = await updateExcomMember(editingMemberId, editMemberForm)
      if (res.success) {
        setExcomMembers(excomMembers.map((m) => (m._id === editingMemberId ? { ...m, ...res.data } : m)))
        setEditingMemberId(null)
        setEditMemberForm({})
        toast.success("Member updated!")
      } else toast.error(res.message || "Failed to update")
    } catch (e) {
      console.error(e)
      toast.error("Failed to update")
    } finally {
      setLoading(false)
    }
  }

  const openDeleteMemberDialog = (id: string) => {
    setConfirmDialog({
      open: true,
      title: "Delete member",
      description: "Are you sure you want to remove this member from the excom?",
      confirmLabel: "Delete",
      variant: "destructive",
      onConfirm: async () => {
        try {
          setConfirmLoading(true)
          const res = await deleteExcomMember(id)
          if (res.success) {
            setExcomMembers(excomMembers.filter((m) => m._id !== id))
            toast.success("Member deleted!")
          } else toast.error(res.message || "Failed to delete")
        } catch (e) {
          console.error(e)
          toast.error("Failed to delete")
        } finally {
          setConfirmLoading(false)
        }
      },
    })
  }

  const handleDeleteMember = (id: string) => openDeleteMemberDialog(id)

  const handleAddAward = async () => {
    if (!newAward.title || !newAward.year) {
      toast.error("Please fill title and year")
      return
    }
    try {
      setLoading(true)
      const res = await createAward({
        title: newAward.title,
        year: Number(newAward.year),
        description: newAward.description,
        imageUrl: newAward.imageUrl,
      })
      if (res.success) {
        setAwards([res.data, ...awards])
        setNewAward({ title: "", year: new Date().getFullYear(), description: "", imageUrl: "" })
        toast.success("Award added successfully!")
      } else toast.error(res.message || "Failed to add award")
    } catch (e) {
      console.error(e)
      toast.error("Failed to add award")
    } finally {
      setLoading(false)
    }
  }

  const openDeleteAwardDialog = (id: string) => {
    setConfirmDialog({
      open: true,
      title: "Delete award",
      description: "Are you sure you want to delete this award?",
      confirmLabel: "Delete",
      variant: "destructive",
      onConfirm: async () => {
        try {
          setConfirmLoading(true)
          const res = await deleteAward(id)
          if (res.success) {
            setAwards(awards.filter((a) => a._id !== id))
            toast.success("Award deleted!")
          } else toast.error(res.message || "Failed to delete")
        } catch (e) {
          console.error(e)
          toast.error("Failed to delete")
        } finally {
          setConfirmLoading(false)
        }
      },
    })
  }

  const handleAwardImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      setLoading(true)
      const res = await uploadAwardImage(file)
      if (res.success) {
        setNewAward({ ...newAward, imageUrl: res.url })
        toast.success("Image uploaded")
      } else toast.error(res.message || "Upload failed")
    } catch (err) {
      console.error(err)
      toast.error("Upload failed")
    } finally {
      setLoading(false)
    }
  }

  const handleExcomImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, forEdit = false) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      setLoading(true)
      const res = await uploadExcomImage(file)
      if (res.success) {
        if (forEdit) setEditMemberForm((prev) => ({ ...prev, imageUrl: res.url }))
        else setNewMember({ ...newMember, imageUrl: res.url })
        toast.success("Image uploaded")
      } else toast.error(res.message || "Upload failed")
    } catch (err) {
      console.error(err)
      toast.error("Upload failed")
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (files: FileList | null, isEditing = false) => {
    if (!files || files.length === 0) return

    try {
      setLoading(true)
      
      // Convert FileList to Array
      const fileArray = Array.from(files)
      
      // Upload images to server
      const uploadResponse = await uploadImages(fileArray)
      
      if (uploadResponse.success) {
        // Extract URLs from the response
        const uploadedUrls = uploadResponse.files.map((file: { url: string; path: string }) => file.url)
        
        setNewEvent({
          ...newEvent,
          images: [...(newEvent.images || []), ...uploadedUrls],
        })
      } else {
        toast.error('Failed to upload images: ' + uploadResponse.message)
      }
    } catch (error) {
      console.error('Error uploading images:', error)
      toast.error('Failed to upload images. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const removeImage = (index: number) => {
    setNewEvent({
      ...newEvent,
      images: (newEvent.images || []).filter((_, i) => i !== index),
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the admin dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sight-isimm.org"
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="Enter admin password"
                  disabled={loading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <Button onClick={handleLogin} className="w-full" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        <Tabs defaultValue="events" className="space-y-6">
          <TabsList className="flex flex-wrap gap-2">
            <TabsTrigger value="events">Manage Events</TabsTrigger>
            <TabsTrigger value="add-event">Add New Event</TabsTrigger>
            <TabsTrigger value="excom">Manage Excom</TabsTrigger>
            <TabsTrigger value="awards">Manage Awards</TabsTrigger>
            <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Events</CardTitle>
                <CardDescription>Manage your existing events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event._id} className="border rounded-lg p-4 flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{event.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                        <div className="text-sm text-gray-500">
                          <span>
                            {event.date} • {event.location} • {event.attendees} attendees
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={() => handleDeleteEvent(event._id)} size="sm" variant="destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add-event">
            <Card>
              <CardHeader>
                <CardTitle>Add New Event</CardTitle>
                <CardDescription>Create a new event for the SIGHT community</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    placeholder="Enter event title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    placeholder="Enter event description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                      placeholder="Enter event location"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="attendees">Number of Attendees</Label>
                  <Input
                    id="attendees"
                    type="number"
                    value={newEvent.attendees}
                    onChange={(e) => setNewEvent({ ...newEvent, attendees: Number.parseInt(e.target.value) || 0 })}
                    placeholder="Enter number of attendees"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Event Images</Label>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {(newEvent.images || []).map((image, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`New event image ${index + 1}`}
                          width={200}
                          height={150}
                          className="w-full h-24 object-cover rounded"
                        />
                        <Button
                          onClick={() => removeImage(index)}
                          size="sm"
                          variant="destructive"
                          className="absolute top-1 right-1 h-6 w-6 p-0"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files)}
                      className="flex-1"
                      disabled={loading}
                    />
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin text-red-700" />
                    ) : (
                      <Upload className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {loading ? 'Uploading images...' : 'Upload multiple images for your event gallery'}
                  </p>
                </div>
                <Button onClick={handleAddEvent} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="excom" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Mandate</CardTitle>
                <CardDescription>Choose the mandate when adding or viewing excom members</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mandates.length === 0 ? (
                  <p className="text-sm text-gray-600">
                    No mandates yet. Add a new mandate below.
                  </p>
                ) : (
                  <Select value={selectedMandateId} onValueChange={(v) => setSelectedMandateId(v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select mandate" />
                    </SelectTrigger>
                    <SelectContent>
                      {mandates.map((m) => (
                        <SelectItem key={m._id} value={m._id}>
                          {m.name} ({m.startYear}-{m.endYear}) {m.isCurrent && "★ Current"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                <div className="border-t pt-4 mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Add new mandate</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <Input
                      placeholder="e.g., 2024-2025"
                      value={newMandate.name}
                      onChange={(e) => setNewMandate({ ...newMandate, name: e.target.value })}
                    />
                    <Input
                      type="number"
                      placeholder="Start year"
                      value={newMandate.startYear === "" ? "" : newMandate.startYear}
                      onChange={(e) => setNewMandate({ ...newMandate, startYear: e.target.value === "" ? "" : Number(e.target.value) })}
                    />
                    <Input
                      type="number"
                      placeholder="End year"
                      value={newMandate.endYear === "" ? "" : newMandate.endYear}
                      onChange={(e) => setNewMandate({ ...newMandate, endYear: e.target.value === "" ? "" : Number(e.target.value) })}
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="mandate-current"
                        checked={newMandate.isCurrent}
                        onChange={(e) => setNewMandate({ ...newMandate, isCurrent: e.target.checked })}
                      />
                      <Label htmlFor="mandate-current" className="text-sm">Current</Label>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="mt-2"
                    onClick={handleAddMandate}
                    disabled={loading || !newMandate.name}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add mandate
                  </Button>
                </div>
              </CardContent>
            </Card>

            {selectedMandateId && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Add Excom Member</CardTitle>
                    <CardDescription>Add a new member to the selected mandate</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Full Name *</Label>
                        <Input
                          value={newMember.name}
                          onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Email *</Label>
                        <Input
                          type="email"
                          value={newMember.email}
                          onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                          placeholder="john@ieee.org"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Position *</Label>
                      <Select value={newMember.position} onValueChange={(v) => setNewMember({ ...newMember, position: v })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {EXCOM_POSITIONS.map((p) => (
                            <SelectItem key={p} value={p}>
                              {p}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {newMember.position === "Other" && (
                      <div className="space-y-2">
                        <Label>Custom Position *</Label>
                        <Input
                          value={newMember.customPosition}
                          onChange={(e) => setNewMember({ ...newMember, customPosition: e.target.value })}
                          placeholder="e.g., PR Manager"
                        />
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Facebook URL</Label>
                        <Input
                          value={newMember.facebook}
                          onChange={(e) => setNewMember({ ...newMember, facebook: e.target.value })}
                          placeholder="https://facebook.com/..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>LinkedIn URL</Label>
                        <Input
                          value={newMember.linkedin}
                          onChange={(e) => setNewMember({ ...newMember, linkedin: e.target.value })}
                          placeholder="https://linkedin.com/in/..."
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Profile Picture</Label>
                      <div className="flex items-center gap-4">
                        {newMember.imageUrl ? (
                          <div className="relative">
                            <Image src={newMember.imageUrl} alt="Preview" width={80} height={80} className="rounded object-cover" />
                            <Button
                              size="sm"
                              variant="destructive"
                              className="absolute -top-2 -right-2 h-6 w-6 p-0"
                              onClick={() => setNewMember({ ...newMember, imageUrl: "" })}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : null}
                        <div className="flex items-center gap-2">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleExcomImageUpload}
                            disabled={loading}
                          />
                          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Display Order (lower = first)</Label>
                      <Input
                        type="number"
                        value={newMember.order}
                        onChange={(e) => setNewMember({ ...newMember, order: Number(e.target.value) })}
                      />
                    </div>
                    <Button onClick={handleAddMember} disabled={loading}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Member
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Excom Members</CardTitle>
                    <CardDescription>Members for this mandate</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {excomMembers.map((member) => (
                        <div key={member._id} className="border rounded-lg p-4 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            {member.imageUrl ? (
                              <Image src={member.imageUrl} alt={member.name} width={48} height={48} className="rounded-full object-cover" />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                <Users className="h-6 w-6 text-gray-400" />
                              </div>
                            )}
                            <div>
                              <p className="font-semibold">{member.name}</p>
                              <p className="text-sm text-red-700">
                                {member.displayPosition || member.customPosition || member.position}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditingMemberId(member._id)
                                setEditMemberForm({
                                  name: member.name,
                                  position: member.position,
                                  customPosition: member.customPosition,
                                  email: member.email,
                                  facebook: member.facebook,
                                  linkedin: member.linkedin,
                                  imageUrl: member.imageUrl,
                                })
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteMember(member._id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {editingMemberId && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Edit Member</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Name</Label>
                          <Input
                            value={editMemberForm.name ?? ""}
                            onChange={(e) => setEditMemberForm({ ...editMemberForm, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input
                            value={editMemberForm.email ?? ""}
                            onChange={(e) => setEditMemberForm({ ...editMemberForm, email: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Position</Label>
                        <Select
                          value={editMemberForm.position ?? ""}
                          onValueChange={(v) => setEditMemberForm({ ...editMemberForm, position: v })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {EXCOM_POSITIONS.map((p) => (
                              <SelectItem key={p} value={p}>
                                {p}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {editMemberForm.position === "Other" && (
                        <div className="space-y-2">
                          <Label>Custom Position</Label>
                          <Input
                            value={editMemberForm.customPosition ?? ""}
                            onChange={(e) => setEditMemberForm({ ...editMemberForm, customPosition: e.target.value })}
                          />
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Facebook</Label>
                          <Input
                            value={editMemberForm.facebook ?? ""}
                            onChange={(e) => setEditMemberForm({ ...editMemberForm, facebook: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>LinkedIn</Label>
                          <Input
                            value={editMemberForm.linkedin ?? ""}
                            onChange={(e) => setEditMemberForm({ ...editMemberForm, linkedin: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Profile Picture</Label>
                        <div className="flex items-center gap-4">
                          {editMemberForm.imageUrl ? (
                            <div className="relative">
                              <Image src={editMemberForm.imageUrl} alt="Preview" width={80} height={80} className="rounded object-cover" />
                              <Button
                                size="sm"
                                variant="destructive"
                                className="absolute -top-2 -right-2 h-6 w-6 p-0"
                                onClick={() => setEditMemberForm({ ...editMemberForm, imageUrl: "" })}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          ) : null}
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleExcomImageUpload(e, true)}
                            disabled={loading}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleUpdateMember} disabled={loading}>
                          Save
                        </Button>
                        <Button variant="outline" onClick={() => setEditingMemberId(null)}>
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="awards" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Award</CardTitle>
                <CardDescription>Add awards won by IEEE SIGHT ISIMM</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title *</Label>
                    <Input
                      value={newAward.title}
                      onChange={(e) => setNewAward({ ...newAward, title: e.target.value })}
                      placeholder="e.g., Best SIGHT Creative April 2025"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Year *</Label>
                    <Input
                      type="number"
                      value={newAward.year}
                      onChange={(e) => setNewAward({ ...newAward, year: Number(e.target.value) })}
                      placeholder="2025"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={newAward.description}
                    onChange={(e) => setNewAward({ ...newAward, description: e.target.value })}
                    placeholder="Brief description of the award..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Award Picture</Label>
                  <div className="flex items-center gap-4">
                    {newAward.imageUrl ? (
                      <div className="relative">
                        <Image src={newAward.imageUrl} alt="Preview" width={100} height={100} className="rounded object-cover" />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute -top-2 -right-2 h-6 w-6 p-0"
                          onClick={() => setNewAward({ ...newAward, imageUrl: "" })}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : null}
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleAwardImageUpload}
                      disabled={loading}
                    />
                  </div>
                </div>
                <Button onClick={handleAddAward} disabled={loading}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Award
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>All Awards</CardTitle>
                <CardDescription>Awards displayed on the Awards page</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {awards.map((award) => (
                    <div key={award._id} className="border rounded-lg p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        {award.imageUrl ? (
                          <Image src={award.imageUrl} alt={award.title} width={60} height={60} className="rounded object-cover" />
                        ) : (
                          <div className="w-16 h-16 rounded bg-gray-200 flex items-center justify-center p-4">
                            <Award className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold">{award.title}</p>
                          <p className="text-sm text-red-700">{award.year}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="destructive" onClick={() => openDeleteAwardDialog(award._id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="newsletter" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Newsletter Subscribers
                    </CardTitle>
                    <CardDescription>
                      Export this list to CSV to send event reminders. Use your email client&apos;s BCC field with the exported emails.
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      try {
                        const res = await getNewsletterSubscribers()
                        if (res.success) setSubscribers(res.data ?? [])
                        toast.success("List refreshed")
                      } catch (e) {
                        toast.error("Failed to refresh")
                      }
                    }}
                  >
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Refresh
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const headers = ["Email", "Subscribed At"]
                      const rows = subscribers.map((s) => [s.email, s.subscribedAt])
                      const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))].join("\n")
                      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
                      const url = URL.createObjectURL(blob)
                      const a = document.createElement("a")
                      a.href = url
                      a.download = `newsletter-subscribers-${new Date().toISOString().slice(0, 10)}.csv`
                      a.click()
                      URL.revokeObjectURL(url)
                      toast.success("CSV exported successfully!")
                    }}
                    disabled={subscribers.length === 0}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export to CSV
                  </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {subscribers.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No subscribers yet.</p>
                  ) : (
                    subscribers.map((s) => (
                      <div key={s._id} className="flex items-center justify-between border rounded-lg px-4 py-2">
                        <span className="font-mono text-sm">{s.email}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(s.subscribedAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <ConfirmDialog
        open={confirmDialog.open}
        onOpenChange={(open) => {
          setConfirmDialog((prev) => ({ ...prev, open }))
          if (!open) setConfirmLoading(false)
        }}
        title={confirmDialog.title}
        description={confirmDialog.description}
        confirmLabel={confirmDialog.confirmLabel}
        variant={confirmDialog.variant}
        onConfirm={confirmDialog.onConfirm}
        loading={confirmLoading}
      />
    </div>
  )
}
