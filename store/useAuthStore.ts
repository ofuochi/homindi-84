import { create } from "zustand"
import { persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
import type { User, UserRole } from "@/lib/types"

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: Partial<User>) => Promise<void>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
  hasPermission: (permission: string) => boolean
  canAccessAdminPanel: () => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    immer((set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set((state) => {
          state.isLoading = true
        })

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000))

          // Mock user data with role based on email
          let role: UserRole = "user"
          if (email.includes("god")) role = "god"
          else if (email.includes("admin")) role = "admin"
          else if (email.includes("exporter")) role = "exporter"
          else if (email.includes("supplier")) role = "supplier"
          else if (email.includes("moderator")) role = "moderator"

          const mockUser: User = {
            id: "user-1",
            name: "John Adebayo",
            email,
            phone: "+1-555-0123",
            preferredCountry: "United States",
            createdAt: new Date().toISOString(),
            addresses: [],
            role,
            isActive: true,
            emailVerified: true,
            phoneVerified: false,
            lastLoginAt: new Date().toISOString(),
          }

          set((state) => {
            state.user = mockUser
            state.isAuthenticated = true
            state.isLoading = false
          })
        } catch (error) {
          set((state) => {
            state.isLoading = false
          })
          throw error
        }
      },

      register: async (userData: Partial<User>) => {
        set((state) => {
          state.isLoading = true
        })

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000))

          const newUser: User = {
            id: `user-${Date.now()}`,
            name: userData.name || "",
            email: userData.email || "",
            phone: userData.phone || "",
            preferredCountry: userData.preferredCountry || "United States",
            createdAt: new Date().toISOString(),
            addresses: [],
            role: "user",
            isActive: true,
            emailVerified: false,
            phoneVerified: false,
          }

          set((state) => {
            state.user = newUser
            state.isAuthenticated = true
            state.isLoading = false
          })
        } catch (error) {
          set((state) => {
            state.isLoading = false
          })
          throw error
        }
      },

      logout: () => {
        set((state) => {
          state.user = null
          state.isAuthenticated = false
        })
      },

      updateUser: (userData: Partial<User>) => {
        set((state) => {
          if (state.user) {
            Object.assign(state.user, userData)
          }
        })
      },

      hasPermission: (permission: string) => {
        const { user } = get()
        if (!user) return false

        const { hasPermission } = require("@/lib/auth/roles")
        return hasPermission(user.role, permission)
      },

      canAccessAdminPanel: () => {
        const { user } = get()
        if (!user) return false

        const { canAccessAdminPanel } = require("@/lib/auth/roles")
        return canAccessAdminPanel(user.role)
      },
    })),
    {
      name: "diaspora-auth",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
