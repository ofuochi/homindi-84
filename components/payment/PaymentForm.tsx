"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button, Alert, Spin, Card, Typography, Space } from "antd";
import { CreditCardOutlined, LockOutlined } from "@ant-design/icons";
import { getStripe } from "@/lib/stripe/utils";
import { STRIPE_APPEARANCE } from "@/lib/stripe/config";
import { usePaymentStore } from "@/store/usePaymentStore";
import { formatCurrency } from "@/lib/utils";

const { Title, Text } = Typography;

interface PaymentFormProps {
  orderId: string;
  amount: number;
  currency?: string;
  onSuccess: (paymentIntent: any) => void;
  onError: (error: any) => void;
}

const PaymentFormContent: React.FC<PaymentFormProps> = ({
  orderId,
  amount,
  currency = "usd",
  onSuccess,
  onError,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);

  const {
    currentPaymentIntent,
    isProcessing,
    error,
    createPaymentIntent,
    confirmPayment,
    clearError,
  } = usePaymentStore();

  useEffect(() => {
    // Create payment intent when component mounts
    if (!currentPaymentIntent) {
      createPaymentIntent(orderId, amount, currency);
    }
  }, [orderId, amount, currency, currentPaymentIntent, createPaymentIntent]);

  useEffect(() => {
    if (error) {
      onError(error);
    }
  }, [error, onError]);

  const handleCardChange = (event: any) => {
    setCardComplete(event.complete);
    setCardError(event.error ? event.error.message : null);
    if (event.error) clearError();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !currentPaymentIntent) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }

    setIsSubmitting(true);
    clearError();

    try {
      // Create payment method
      const { error: paymentMethodError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: {
            name: "Customer Name", // This would come from the form
          },
        });

      if (paymentMethodError) {
        setCardError(paymentMethodError.message || "An error occurred");
        setIsSubmitting(false);
        return;
      }

      // Confirm payment
      const result = await confirmPayment(
        currentPaymentIntent.id,
        paymentMethod.id
      );

      if (result.success && result.paymentIntent) {
        if (result.requiresAction) {
          // Handle 3D Secure or other authentication
          const { error: confirmError } = await stripe.confirmCardPayment(
            result.clientSecret!,
            {
              payment_method: paymentMethod.id,
            }
          );

          if (confirmError) {
            onError(confirmError);
          } else {
            onSuccess(result.paymentIntent);
          }
        } else {
          onSuccess(result.paymentIntent);
        }
      } else {
        onError(result.error);
      }
    } catch (err) {
      onError(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: STRIPE_APPEARANCE.variables.colorText,
        fontFamily: STRIPE_APPEARANCE.variables.fontFamily,
        "::placeholder": {
          color: "#9ca3af",
        },
      },
      invalid: {
        color: STRIPE_APPEARANCE.variables.colorDanger,
      },
    },
    hidePostalCode: false,
  };

  if (!currentPaymentIntent && isProcessing) {
    return (
      <div className="flex justify-center items-center py-8">
        <Spin size="large" />
        <Text className="ml-4">Preparing payment...</Text>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <Title level={4} className="mb-2">
          <CreditCardOutlined className="mr-2" />
          Payment Details
        </Title>
        <Text type="secondary">
          Total: <strong>{formatCurrency(amount)}</strong>
        </Text>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Card Information
          </label>
          <div className="border border-gray-300 rounded-lg p-3 bg-white">
            <CardElement
              options={cardElementOptions}
              onChange={handleCardChange}
            />
          </div>
          {cardError && (
            <Text type="danger" className="text-sm mt-1">
              {cardError}
            </Text>
          )}
        </div>

        {error && (
          <Alert
            type="error"
            message="Payment Error"
            description={error.message}
            className="mb-4"
            closable
            onClose={clearError}
          />
        )}

        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={isSubmitting || isProcessing}
          disabled={!stripe || !cardComplete || isSubmitting || isProcessing}
          className="w-full"
          icon={<LockOutlined />}
        >
          {isSubmitting || isProcessing
            ? "Processing..."
            : `Pay ${formatCurrency(amount)}`}
        </Button>

        <div className="mt-4 text-center">
          <Space direction="vertical" size="small">
            <Text type="secondary" className="text-xs">
              <LockOutlined className="mr-1" />
              Your payment information is secure and encrypted
            </Text>
            <Text type="secondary" className="text-xs">
              Powered by Stripe
            </Text>
          </Space>
        </div>
      </form>
    </Card>
  );
};

export const PaymentForm: React.FC<PaymentFormProps> = (props) => {
  const stripePromise = getStripe();

  return (
    <Elements
      stripe={stripePromise}
      options={{
        appearance: STRIPE_APPEARANCE,
        locale: "en",
      }}
    >
      <PaymentFormContent {...props} />
    </Elements>
  );
};
