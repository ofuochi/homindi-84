import { loadStripe, type Stripe } from "@stripe/stripe-js"
import { STRIPE_CONFIG } from "./config"

let stripePromise: Promise<Stripe | null>

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_CONFIG.publishableKey)
  }
  return stripePromise
}

export const formatAmountForStripe = (amount: number, currency: string = STRIPE_CONFIG.currency): number => {
  // Stripe expects amounts in cents for USD
  const currencyMultipliers: Record<string, number> = {
    usd: 100,
    eur: 100,
    gbp: 100,
    jpy: 1, // Japanese Yen doesn't use decimal places
  }

  const multiplier = currencyMultipliers[currency.toLowerCase()] || 100
  return Math.round(amount * multiplier)
}

export const formatAmountFromStripe = (amount: number, currency: string = STRIPE_CONFIG.currency): number => {
  const currencyMultipliers: Record<string, number> = {
    usd: 100,
    eur: 100,
    gbp: 100,
    jpy: 1,
  }

  const multiplier = currencyMultipliers[currency.toLowerCase()] || 100
  return amount / multiplier
}

export const validatePaymentAmount = (amount: number): boolean => {
  // Minimum charge amount for USD is $0.50
  return amount >= 0.5
}

export const getPaymentMethodIcon = (type: string): string => {
  const icons: Record<string, string> = {
    card: "💳",
    apple_pay: "🍎",
    google_pay: "🟢",
    us_bank_account: "🏦",
    sepa_debit: "🏛️",
    ideal: "🇳🇱",
    sofort: "🇩🇪",
  }

  return icons[type] || "💳"
}
