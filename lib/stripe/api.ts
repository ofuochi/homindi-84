import { z } from "zod"
import type {
  PaymentIntent,
  PaymentRecord,
  CreatePaymentIntentRequest,
  ConfirmPaymentRequest,
  RefundRequest,
  PaymentResult,
  PaymentError,
} from "./types"
import {
  PaymentIntentSchema,
  PaymentRecordSchema,
  CreatePaymentIntentRequestSchema,
  ConfirmPaymentRequestSchema,
  RefundRequestSchema,
} from "./types"
import { formatAmountForStripe, validatePaymentAmount } from "./utils"
import { ApiResponseSchema } from "../api/types"

// Mock payment data
const mockPaymentIntents: PaymentIntent[] = []
const mockPaymentRecords: PaymentRecord[] = []

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

class StripeApiClient {
  private baseUrl = "/api/payments"

  private async request<T>(endpoint: string, options: RequestInit = {}, schema: z.ZodSchema<T>): Promise<T> {
    await delay(Math.random() * 1000 + 500) // Simulate network delay

    try {
      const mockResponse = this.getMockResponse(endpoint, options)
      const validatedResponse = schema.parse(mockResponse)
      return validatedResponse
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(`Payment API validation error: ${error.message}`)
      }
      throw error
    }
  }

  private getMockResponse(endpoint: string, options: RequestInit) {
    const method = options.method || "GET"
    const body = options.body ? JSON.parse(options.body as string) : null

    // Create Payment Intent
    if (method === "POST" && endpoint === "/create-payment-intent") {
      const request = body as CreatePaymentIntentRequest

      if (!validatePaymentAmount(request.amount)) {
        return {
          success: false,
          error: {
            type: "validation_error",
            message: "Amount must be at least $0.50",
            param: "amount",
          },
        }
      }

      const paymentIntent: PaymentIntent = {
        id: `pi_mock_${Date.now()}`,
        client_secret: `pi_mock_${Date.now()}_secret_mock`,
        amount: formatAmountForStripe(request.amount),
        currency: request.currency,
        status: "requires_payment_method",
        created: Math.floor(Date.now() / 1000),
        description: `Payment for order ${request.orderId}`,
      }

      mockPaymentIntents.push(paymentIntent)

      const paymentRecord: PaymentRecord = {
        id: `payment_${Date.now()}`,
        orderId: request.orderId,
        userId: "user_mock",
        paymentIntentId: paymentIntent.id,
        amount: request.amount,
        currency: request.currency,
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        metadata: request.metadata,
      }

      mockPaymentRecords.push(paymentRecord)

      return {
        success: true,
        data: {
          paymentIntent,
          clientSecret: paymentIntent.client_secret,
        },
      }
    }

    // Confirm Payment
    if (method === "POST" && endpoint === "/confirm-payment") {
      const request = body as ConfirmPaymentRequest
      const paymentIntent = mockPaymentIntents.find((pi) => pi.id === request.paymentIntentId)

      if (!paymentIntent) {
        return {
          success: false,
          error: {
            type: "api_error",
            message: "Payment intent not found",
          },
        }
      }

      // Simulate random payment outcomes
      const outcomes = ["succeeded", "requires_action", "failed"]
      const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)]

      if (randomOutcome === "failed") {
        paymentIntent.status = "canceled"
        const paymentRecord = mockPaymentRecords.find((pr) => pr.paymentIntentId === paymentIntent.id)
        if (paymentRecord) {
          paymentRecord.status = "failed"
          paymentRecord.failureReason = "Your card was declined."
          paymentRecord.updatedAt = new Date().toISOString()
        }

        return {
          success: false,
          error: {
            type: "card_error",
            code: "card_declined",
            message: "Your card was declined.",
            decline_code: "generic_decline",
          },
        }
      }

      if (randomOutcome === "requires_action") {
        paymentIntent.status = "requires_action"
        return {
          success: true,
          data: {
            paymentIntent,
            requiresAction: true,
            clientSecret: paymentIntent.client_secret,
          },
        }
      }

      // Success case
      paymentIntent.status = "succeeded"
      paymentIntent.payment_method = request.paymentMethodId

      const paymentRecord = mockPaymentRecords.find((pr) => pr.paymentIntentId === paymentIntent.id)
      if (paymentRecord) {
        paymentRecord.status = "succeeded"
        paymentRecord.paymentMethod = {
          id: request.paymentMethodId,
          type: "card",
          card: {
            brand: "visa",
            last4: "4242",
            exp_month: 12,
            exp_year: 2025,
          },
          billing_details: {
            name: "John Doe",
            email: "john@example.com",
          },
        }
        paymentRecord.updatedAt = new Date().toISOString()
      }

      return {
        success: true,
        data: {
          paymentIntent,
          paymentRecord,
        },
      }
    }

    // Get Payment Record
    if (method === "GET" && endpoint.startsWith("/payment-record/")) {
      const paymentIntentId = endpoint.split("/").pop()
      const paymentRecord = mockPaymentRecords.find((pr) => pr.paymentIntentId === paymentIntentId)

      return {
        success: !!paymentRecord,
        data: paymentRecord,
        error: paymentRecord ? undefined : "Payment record not found",
      }
    }

    // Refund Payment
    if (method === "POST" && endpoint === "/refund") {
      const request = body as RefundRequest
      const paymentIntent = mockPaymentIntents.find((pi) => pi.id === request.paymentIntentId)

      if (!paymentIntent || paymentIntent.status !== "succeeded") {
        return {
          success: false,
          error: {
            type: "api_error",
            message: "Payment intent not found or not eligible for refund",
          },
        }
      }

      const paymentRecord = mockPaymentRecords.find((pr) => pr.paymentIntentId === paymentIntent.id)
      if (paymentRecord) {
        paymentRecord.status = "refunded"
        paymentRecord.refundAmount = request.amount || paymentRecord.amount
        paymentRecord.updatedAt = new Date().toISOString()
      }

      return {
        success: true,
        data: {
          refundId: `re_mock_${Date.now()}`,
          amount: request.amount || paymentIntent.amount,
          status: "succeeded",
        },
      }
    }

    return {
      success: false,
      error: "Endpoint not found",
    }
  }

  async createPaymentIntent(data: CreatePaymentIntentRequest): Promise<PaymentResult> {
    try {
      const validatedData = CreatePaymentIntentRequestSchema.parse(data)
      const response = await this.request(
        "/create-payment-intent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(validatedData),
        },
        ApiResponseSchema(
          z.object({
            paymentIntent: PaymentIntentSchema,
            clientSecret: z.string(),
          }),
        ),
      )

      if (!response.success) {
        return {
          success: false,
          error: response.error as PaymentError,
        }
      }

      return {
        success: true,
        paymentIntent: response.data.paymentIntent,
        clientSecret: response.data.clientSecret,
      }
    } catch (error) {
      return {
        success: false,
        error: {
          type: "api_error",
          message: error instanceof Error ? error.message : "Unknown error occurred",
        },
      }
    }
  }

  async confirmPayment(data: ConfirmPaymentRequest): Promise<PaymentResult> {
    try {
      const validatedData = ConfirmPaymentRequestSchema.parse(data)
      const response = await this.request(
        "/confirm-payment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(validatedData),
        },
        ApiResponseSchema(
          z.object({
            paymentIntent: PaymentIntentSchema,
            paymentRecord: PaymentRecordSchema.optional(),
            requiresAction: z.boolean().optional(),
            clientSecret: z.string().optional(),
          }),
        ),
      )

      if (!response.success) {
        return {
          success: false,
          error: response.error as PaymentError,
        }
      }

      return {
        success: true,
        paymentIntent: response.data.paymentIntent,
        requiresAction: response.data.requiresAction,
        clientSecret: response.data.clientSecret,
      }
    } catch (error) {
      return {
        success: false,
        error: {
          type: "api_error",
          message: error instanceof Error ? error.message : "Unknown error occurred",
        },
      }
    }
  }

  async getPaymentRecord(paymentIntentId: string): Promise<{ success: boolean; data?: PaymentRecord; error?: string }> {
    return this.request(`/payment-record/${paymentIntentId}`, {}, ApiResponseSchema(PaymentRecordSchema))
  }

  async refundPayment(data: RefundRequest): Promise<{ success: boolean; data?: any; error?: PaymentError }> {
    try {
      const validatedData = RefundRequestSchema.parse(data)
      const response = await this.request(
        "/refund",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(validatedData),
        },
        ApiResponseSchema(
          z.object({
            refundId: z.string(),
            amount: z.number(),
            status: z.string(),
          }),
        ),
      )

      return response
    } catch (error) {
      return {
        success: false,
        error: {
          type: "api_error",
          message: error instanceof Error ? error.message : "Unknown error occurred",
        },
      }
    }
  }
}

export const stripeApiClient = new StripeApiClient()
