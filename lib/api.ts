// API service functions for admin operations

export interface LoginCredentials {
  email: string
  password: string
}

export interface EventData {
  title: string
  description: string
  date: string
  location: string
  attendees?: number
  images?: string[] // URLs returned from /api/upload, now served from MongoDB GridFS
}

// Authentication
export async function loginAdmin(credentials: LoginCredentials) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })

  return response.json()
}

// Image Upload
export async function uploadImages(files: File[]) {
  const formData = new FormData()
  
  files.forEach((file) => {
    formData.append('files', file)
  })

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  })

  const result = await response.json()
  
  // Extract URLs from the response for backward compatibility
  if (result.success && result.files) {
    result.urls = result.files.map((file: { url: string; id: string; filename: string }) => file.url)
  }
  
  return result
}

// Events API
export async function getEvents() {
  const response = await fetch('/api/events')
  const data = await response.json()
  return data
}

export async function createEvent(eventData: EventData) {
  const response = await fetch('/api/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  })

  return response.json()
}

export async function deleteEvent(id: string) {
  const response = await fetch(`/api/events/${id}`, {
    method: 'DELETE',
  })

  return response.json()
}

// Mandates API
export async function getMandates() {
  const response = await fetch('/api/mandates')
  return response.json()
}

export async function createMandate(data: { name: string; startYear: number; endYear: number; isCurrent: boolean }) {
  const response = await fetch('/api/mandates', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return response.json()
}

// Excom API
export async function getExcom(mandateId?: string) {
  const url = mandateId ? `/api/excom?mandate=${mandateId}` : '/api/excom'
  const response = await fetch(url)
  return response.json()
}

export async function createExcomMember(data: {
  mandateId: string
  name: string
  position: string
  customPosition?: string
  email: string
  facebook?: string
  linkedin?: string
  imageUrl?: string
  order?: number
}) {
  const response = await fetch('/api/excom', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return response.json()
}

export async function updateExcomMember(
  id: string,
  data: Partial<{
    name: string
    position: string
    customPosition: string
    email: string
    facebook: string
    linkedin: string
    imageUrl: string
    order: number
  }>
) {
  const response = await fetch(`/api/excom/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return response.json()
}

export async function deleteExcomMember(id: string) {
  const response = await fetch(`/api/excom/${id}`, { method: 'DELETE' })
  return response.json()
}

export async function uploadExcomImage(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  const response = await fetch('/api/excom/upload', {
    method: 'POST',
    body: formData,
  })
  return response.json()
}

// Awards API
export async function getAwards() {
  const response = await fetch('/api/awards')
  return response.json()
}

export async function createAward(data: { title: string; year: number; description?: string; imageUrl?: string }) {
  const response = await fetch('/api/awards', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return response.json()
}

export async function updateAward(id: string, data: Partial<{ title: string; year: number; description: string; imageUrl: string }>) {
  const response = await fetch(`/api/awards/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return response.json()
}

export async function deleteAward(id: string) {
  const response = await fetch(`/api/awards/${id}`, { method: 'DELETE' })
  return response.json()
}

export async function uploadAwardImage(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  const response = await fetch('/api/awards/upload', {
    method: 'POST',
    body: formData,
  })
  return response.json()
}

// Newsletter API
export async function subscribeNewsletter(email: string) {
  const response = await fetch('/api/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
  return response.json()
}

export async function getNewsletterSubscribers() {
  const response = await fetch('/api/newsletter')
  return response.json()
} 