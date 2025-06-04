import { z } from "zod"

export const PaymentIntentSchema = z.object({
  id: z.string(),
  client_secret: z.string(),
  amount: z.number(),
  currency: z.string(),
  status: z.enum([
    "requires_payment_method",
    "requires_confirmation",
    "requires_action",
    "processing",
    "succeeded",
    "canceled",
  ]),
  payment_method: z.string().optional(),
  created: z.number(),
  description: z.string().optional(),
})

export const PaymentMethodSchema = z.object({
  id: z.string(),
  type: z.string(),
  card: z
    .object({
      brand: z.string(),
      last4: z.string(),
      exp_month: z.number(),
      exp_year: z.number(),
    })
    .optional(),
  billing_details: z
    .object({
      name: z.string().optional(),
      email: z.string().optional(),
      phone: z.string().optional(),
      address: z
        .object({
          line1: z.string().optional(),
          line2: z.string().optional(),
          city: z.string().optional(),
          state: z.string().optional(),
          postal_code: z.string().optional(),
          country: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
})

export const PaymentRecordSchema = z.object({
  id: z.string(),
  orderId: z.string(),
  userId: z.string(),
  paymentIntentId: z.string(),
  amount: z.number(),
  currency: z.string(),
  status: z.enum(["pending", "processing", "succeeded", "failed", "canceled", "refunded"]),
  paymentMethod: PaymentMethodSchema.optional(),
  failureReason: z.string().optional(),
  refundAmount: z.number().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  metadata: z.record(z.string()).optional(),
})

export const CreatePaymentIntentRequestSchema = z.object({
  orderId: z.string(),
  amount: z.number().positive(),
  currency: z.string().default("usd"),
  paymentMethodTypes: z.array(z.string()).default(["card"]),
  metadata: z.record(z.string()).optional(),
})

export const ConfirmPaymentRequestSchema = z.object({
  paymentIntentId: z.string(),
  paymentMethodId: z.string(),
  returnUrl: z.string().optional(),
})

export const RefundRequestSchema = z.object({
  paymentIntentId: z.string(),
  amount: z.number().positive().optional(),
  reason: z.enum(["duplicate", "fraudulent", "requested_by_customer"]).default("requested_by_customer"),
})

// Type exports
export type PaymentIntent = z.infer<typeof PaymentIntentSchema>
export type PaymentMethod = z.infer<typeof PaymentMethodSchema>
export type PaymentRecord = z.infer<typeof PaymentRecordSchema>
export type CreatePaymentIntentRequest = z.infer<typeof CreatePaymentIntentRequestSchema>
export type ConfirmPaymentRequest = z.infer<typeof ConfirmPaymentRequestSchema>
export type RefundRequest = z.infer<typeof RefundRequestSchema>

export interface PaymentError {
  type:
    | "card_error"
    | "validation_error"
    | "api_error"
    | "authentication_error"
    | "rate_limit_error"
    | "idempotency_error"
  code?: string
  message: string
  param?: string
  decline_code?: string
}

export interface PaymentResult {
  success: boolean
  paymentIntent?: PaymentIntent
  error?: PaymentError
  requiresAction?: boolean
  clientSecret?: string
}
