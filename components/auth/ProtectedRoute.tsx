"use client"

import type React from "react"

import { useClerkAuth } from "@/lib/hooks/useClerkAuth"
import { Alert, Spin } from "antd"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredPermission?: string
  requiredRole?: string
  adminOnly?: boolean
  fallbackPath?: string
}

export default function ProtectedRoute({
  children,
  requiredPermission,
  requiredRole,
  adminOnly = false,
  fallbackPath = "/sign-in",
}: ProtectedRouteProps) {
  const { isSignedIn, isLoaded, hasPermission, canAccessAdminPanel, userRole } = useClerkAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoaded) return

    if (!isSignedIn) {
      router.push(fallbackPath)
      return
    }

    if (adminOnly && !canAccessAdminPanel()) {
      router.push("/dashboard")
      return
    }

    if (requiredPermission && !hasPermission(requiredPermission)) {
      router.push("/unauthorized")
      return
    }

    if (requiredRole && userRole !== requiredRole) {
      router.push("/unauthorized")
      return
    }
  }, [
    isLoaded,
    isSignedIn,
    adminOnly,
    requiredPermission,
    requiredRole,
    hasPermission,
    canAccessAdminPanel,
    userRole,
    router,
    fallbackPath,
  ])

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Alert
          message="Authentication Required"
          description="Please sign in to access this page."
          type="warning"
          showIcon
        />
      </div>
    )
  }

  if (adminOnly && !canAccessAdminPanel()) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Alert
          message="Access Denied"
          description="You don't have permission to access the admin panel."
          type="error"
          showIcon
        />
      </div>
    )
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Alert
          message="Insufficient Permissions"
          description={`You need the '${requiredPermission}' permission to access this page.`}
          type="error"
          showIcon
        />
      </div>
    )
  }

  return <>{children}</>
}
