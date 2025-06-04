import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import type { PaymentIntent, PaymentRecord, PaymentError, PaymentResult } from "@/lib/stripe/types"
import { stripeApiClient } from "@/lib/stripe/api"

interface PaymentState {
  // State
  currentPaymentIntent: PaymentIntent | null
  paymentRecord: PaymentRecord | null
  isProcessing: boolean
  error: PaymentError | null

  // Actions
  createPaymentIntent: (orderId: string, amount: number, currency?: string) => Promise<PaymentResult>
  confirmPayment: (paymentIntentId: string, paymentMethodId: string) => Promise<PaymentResult>
  getPaymentRecord: (paymentIntentId: string) => Promise<void>
  refundPayment: (paymentIntentId: string, amount?: number) => Promise<boolean>
  clearError: () => void
  reset: () => void
}

export const usePaymentStore = create<PaymentState>()(
  immer((set, get) => ({
    // Initial state
    currentPaymentIntent: null,
    paymentRecord: null,
    isProcessing: false,
    error: null,

    // Actions
    createPaymentIntent: async (orderId: string, amount: number, currency = "usd") => {
      set((state) => {
        state.isProcessing = true
        state.error = null
      })

      try {
        const result = await stripeApiClient.createPaymentIntent({
          orderId,
          amount,
          currency,
          paymentMethodTypes: ["card", "apple_pay", "google_pay"],
          metadata: {
            orderId,
            source: "homindi_checkout",
          },
        })

        set((state) => {
          state.isProcessing = false
          if (result.success && result.paymentIntent) {
            state.currentPaymentIntent = result.paymentIntent
          } else {
            state.error = result.error || null
          }
        })

        return result
      } catch (error) {
        const paymentError: PaymentError = {
          type: "api_error",
          message: error instanceof Error ? error.message : "Failed to create payment intent",
        }

        set((state) => {
          state.isProcessing = false
          state.error = paymentError
        })

        return { success: false, error: paymentError }
      }
    },

    confirmPayment: async (paymentIntentId: string, paymentMethodId: string) => {
      set((state) => {
        state.isProcessing = true
        state.error = null
      })

      try {
        const result = await stripeApiClient.confirmPayment({
          paymentIntentId,
          paymentMethodId,
          returnUrl: `${window.location.origin}/payment/success`,
        })

        set((state) => {
          state.isProcessing = false
          if (result.success && result.paymentIntent) {
            state.currentPaymentIntent = result.paymentIntent
          } else {
            state.error = result.error || null
          }
        })

        return result
      } catch (error) {
        const paymentError: PaymentError = {
          type: "api_error",
          message: error instanceof Error ? error.message : "Failed to confirm payment",
        }

        set((state) => {
          state.isProcessing = false
          state.error = paymentError
        })

        return { success: false, error: paymentError }
      }
    },

    getPaymentRecord: async (paymentIntentId: string) => {
      try {
        const response = await stripeApiClient.getPaymentRecord(paymentIntentId)

        set((state) => {
          if (response.success && response.data) {
            state.paymentRecord = response.data
          }
        })
      } catch (error) {
        console.error("Failed to fetch payment record:", error)
      }
    },

    refundPayment: async (paymentIntentId: string, amount?: number) => {
      set((state) => {
        state.isProcessing = true
        state.error = null
      })

      try {
        const response = await stripeApiClient.refundPayment({
          paymentIntentId,
          amount,
          reason: "requested_by_customer",
        })

        set((state) => {
          state.isProcessing = false
          if (!response.success) {
            state.error = response.error || null
          }
        })

        return response.success
      } catch (error) {
        set((state) => {
          state.isProcessing = false
          state.error = {
            type: "api_error",
            message: error instanceof Error ? error.message : "Failed to process refund",
          }
        })

        return false
      }
    },

    clearError: () => {
      set((state) => {
        state.error = null
      })
    },

    reset: () => {
      set((state) => {
        state.currentPaymentIntent = null
        state.paymentRecord = null
        state.isProcessing = false
        state.error = null
      })
    },
  })),
)
