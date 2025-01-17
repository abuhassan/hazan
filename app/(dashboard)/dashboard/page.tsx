// app/(dashboard)/dashboard/page.tsx
"use client"

import { signOut } from "next-auth/react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button 
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      {/* Dashboard content will go here */}
    </div>
  )
}
