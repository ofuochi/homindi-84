export const STRIPE_CONFIG = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_mock_key",
  secretKey: process.env.STRIPE_SECRET_KEY || "sk_test_mock_key",
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || "whsec_mock_secret",
  currency: "usd",
  country: "US",
} as const

export const PAYMENT_METHODS = {
  CARD: "card",
  APPLE_PAY: "apple_pay",
  GOOGLE_PAY: "google_pay",
  BANK_TRANSFER: "us_bank_account",
} as const

export const STRIPE_APPEARANCE = {
  theme: "stripe" as const,
  variables: {
    colorPrimary: "#0B8457",
    colorBackground: "#ffffff",
    colorText: "#1f2937",
    colorDanger: "#dc2626",
    fontFamily: "Inter, system-ui, sans-serif",
    spacingUnit: "4px",
    borderRadius: "8px",
  },
}
