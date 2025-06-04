"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Spin } from "antd"
import { PaymentSuccess } from "@/components/payment/PaymentSuccess"
import { PaymentError } from "@/components/payment/PaymentError"
import { usePaymentStore } from "@/store/usePaymentStore"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)

  const { currentPaymentIntent, paymentRecord, getPaymentRecord } = usePaymentStore()

  const paymentIntentId = searchParams.get("payment_intent")
  const paymentIntentClientSecret = searchParams.get("payment_intent_client_secret")

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      if (!paymentIntentId) {
        setError({ type: "api_error", message: "Payment intent ID not found" })
        setLoading(false)
        return
      }

      try {
        await getPaymentRecord(paymentIntentId)
        setLoading(false)
      } catch (err) {
        setError({ type: "api_error", message: "Failed to fetch payment details" })
        setLoading(false)
      }
    }

    fetchPaymentDetails()
  }, [paymentIntentId, getPaymentRecord])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex justify-center items-center py-20">
          <Spin size="large" />
          <span className="ml-4">Loading payment details...</span>
        </div>
      </div>
    )
  }

  if (error || !currentPaymentIntent) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PaymentError error={error || { type: "api_error", message: "Payment details not found" }} showRetry={false} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PaymentSuccess paymentIntent={currentPaymentIntent} paymentRecord={paymentRecord || undefined} />
    </div>
  )
}
