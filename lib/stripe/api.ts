import type {
  PaymentIntent,
  PaymentRecord,
  CreatePaymentIntentRequest,
  ConfirmPaymentRequest,
  RefundRequest,
  PaymentResult,
  PaymentError,
} from "./types";
import { z } from "zod";
import axiosInstance from "@/lib/api/axios";
import {
  ApiResponseSchema,
  PaymentIntentSchema,
  PaymentRecordSchema,
} from "./types";

class StripeApiClient {
  private async request<T>(
    url: string,
    options: any,
    schema: z.ZodSchema<T>,
  ): Promise<T> {
    const response = await axiosInstance.request({ url, ...options });
    return schema.parse(response.data);
  }

  async createPaymentIntent(
    data: CreatePaymentIntentRequest,
  ): Promise<PaymentResult> {
    const res = await this.request(
      "/payments/create-payment-intent",
      { method: "POST", data },
      ApiResponseSchema(
        z.object({
          paymentIntent: PaymentIntentSchema,
          clientSecret: z.string(),
        }),
      ),
    );
    if (!res.success) {
      return { success: false, error: res.error as PaymentError };
    }
    return {
      success: true,
      paymentIntent: res.data.paymentIntent,
      clientSecret: res.data.clientSecret,
    };
  }

  async confirmPayment(data: ConfirmPaymentRequest): Promise<PaymentResult> {
    const res = await this.request(
      "/payments/confirm-payment",
      { method: "POST", data },
      ApiResponseSchema(z.object({ paymentIntent: PaymentIntentSchema })),
    );
    if (!res.success) {
      return { success: false, error: res.error as PaymentError };
    }
    return { success: true, paymentIntent: res.data.paymentIntent };
  }

  async getPaymentRecord(
    paymentIntentId: string,
  ): Promise<{ success: boolean; data?: PaymentRecord }> {
    return this.request(
      `/payments/payment-record/${paymentIntentId}`,
      { method: "GET" },
      ApiResponseSchema(PaymentRecordSchema),
    );
  }

  async refundPayment(data: RefundRequest): Promise<{ success: boolean }> {
    const res = await this.request(
      "/payments/refund",
      { method: "POST", data },
      ApiResponseSchema(z.object({ refundId: z.string(), status: z.string() })),
    );
    return { success: res.success };
  }
}

export const stripeApiClient = new StripeApiClient();
