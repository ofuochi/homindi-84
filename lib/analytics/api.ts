import axiosInstance from "@/lib/api/axios";
import type {
  AnalyticsOverview,
  SalesMetrics,
  CustomerAnalytics,
  PerformanceMetrics,
} from "./types";
import { z } from "zod";
import { ApiResponseSchema } from "@/lib/api/types";

class AnalyticsApiClient {
  private async request<T>(url: string, schema: z.ZodSchema<T>): Promise<T> {
    const response = await axiosInstance.get(url);
    return schema.parse(response.data);
  }

  getOverview() {
    return this.request(
      "/analytics/overview",
      ApiResponseSchema(z.any()).transform(
        (data) => data.data as AnalyticsOverview,
      ),
    );
  }

  getSalesMetrics() {
    return this.request(
      "/analytics/sales",
      ApiResponseSchema(z.any()).transform((data) => data.data as SalesMetrics),
    );
  }

  getCustomerAnalytics() {
    return this.request(
      "/analytics/customers",
      ApiResponseSchema(z.any()).transform(
        (data) => data.data as CustomerAnalytics,
      ),
    );
  }

  getPerformanceMetrics() {
    return this.request(
      "/analytics/performance",
      ApiResponseSchema(z.any()).transform(
        (data) => data.data as PerformanceMetrics,
      ),
    );
  }
}

export const analyticsApi = new AnalyticsApiClient();
