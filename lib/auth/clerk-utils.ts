import type { UserRole, ClerkUserMetadata, ExtendedUser } from "@/lib/types"
import { createClerkClient } from '@clerk/backend'

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

export const updateUserRole = async (userId: string, role: UserRole, assignedBy: string) => {
  try {
    const metadata: ClerkUserMetadata = {
      role,
      isActive: true,
      lastRoleChange: new Date().toISOString(),
      assignedBy,
    }

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {...metadata}
    })

    return { success: true }
  } catch (error) {
    console.error("Error updating user role:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export const updateUserStatus = async (userId: string, isActive: boolean) => {
  try {
    const user = await clerkClient.users.getUser(userId)
    const currentMetadata = user.publicMetadata

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        ...currentMetadata,
        isActive,
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Error updating user status:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export const getUserRole = (user: any): UserRole => {
  const metadata = user?.publicMetadata as ClerkUserMetadata
  return metadata?.role || "user"
}

export const getUserMetadata = (user: any): ClerkUserMetadata => {
  return (user?.publicMetadata as ClerkUserMetadata) || { role: "user", isActive: true }
}

export const formatClerkUser = (user: any): ExtendedUser => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddresses: user.emailAddresses,
    phoneNumbers: user.phoneNumbers,
    imageUrl: user.imageUrl,
    createdAt: user.createdAt,
    lastSignInAt: user.lastSignInAt,
    publicMetadata: getUserMetadata(user),
    privateMetadata: user.privateMetadata || {},
    unsafeMetadata: user.unsafeMetadata || {},
  }
}

export const createAuditLog = async (
  userId: string,
  action: string,
  resource: string,
  details: Record<string, any>,
) => {
  try {
    // In a real app, this would save to your database
    const auditLog = {
      id: `audit_${Date.now()}`,
      userId,
      userEmail: details.userEmail || "unknown",
      action,
      resource,
      details,
      timestamp: new Date().toISOString(),
      ipAddress: details.ipAddress,
      userAgent: details.userAgent,
    }

    console.log("Audit Log:", auditLog)
    return auditLog
  } catch (error) {
    console.error("Error creating audit log:", error)
  }
}
