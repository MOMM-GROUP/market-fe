'use client'

import { AuthProvider } from '@/context/AuthContext'
import type { ServerSession } from '@/lib/types'
import type React from 'react'

export function Providers({ children, serverSession }: { children: React.ReactNode, serverSession: ServerSession | null }) {
  return (
    <AuthProvider serverSession={serverSession}>
      {children}
    </AuthProvider>
  )
}
}
