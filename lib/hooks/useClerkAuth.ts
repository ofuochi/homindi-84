"use client"

import { useUser, useAuth } from "@clerk/nextjs"
import { getUserRole, getUserMetadata } from "@/lib/auth/clerk-utils"
import { hasPermission, canAccessAdminPanel, getRoleInfo } from "@/lib/auth/roles"
import type { UserRole } from "@/lib/types"

export const useClerkAuth = () => {
  const { user, isLoaded: userLoaded } = useUser()
  const { isSignedIn, isLoaded: authLoaded } = useAuth()

  const userRole: UserRole = user ? getUserRole(user) : "user"
  const userMetadata = user ? getUserMetadata(user) : null
  const roleInfo = getRoleInfo(userRole)

  const checkPermission = (permission: string): boolean => {
    if (!user || !isSignedIn) return false
    return hasPermission(userRole, permission)
  }

  const checkAdminAccess = (): boolean => {
    if (!user || !isSignedIn) return false
    return canAccessAdminPanel(userRole)
  }

  const isActive = userMetadata?.isActive !== false

  return {
    user,
    isSignedIn: isSignedIn && isActive,
    isLoaded: userLoaded && authLoaded,
    userRole,
    userMetadata,
    roleInfo,
    hasPermission: checkPermission,
    canAccessAdminPanel: checkAdminAccess,
    isActive,
  }
}
