"use client";

import type React from "react";
import { Result, Button, Alert, Typography } from "antd";
import {
  CloseCircleOutlined,
  ReloadOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import type { PaymentError as PaymentErrorType } from "@/lib/stripe/types";

const { Title, Paragraph, Text } = Typography;

interface PaymentErrorProps {
  error: PaymentErrorType;
  onRetry?: () => void;
  showRetry?: boolean;
}

export const PaymentError: React.FC<PaymentErrorProps> = ({
  error,
  onRetry,
  showRetry = true,
}) => {
  const router = useRouter();

  const getErrorTitle = (errorType: string) => {
    switch (errorType) {
      case "card_error":
        return "Card Payment Failed";
      case "validation_error":
        return "Invalid Payment Information";
      case "authentication_error":
        return "Authentication Failed";
      case "rate_limit_error":
        return "Too Many Requests";
      case "api_error":
        return "Payment Processing Error";
      default:
        return "Payment Failed";
    }
  };

  const getErrorDescription = (error: PaymentErrorType) => {
    if (error.code === "card_declined") {
      return "Your card was declined. Please try a different payment method or contact your bank.";
    }

    if (error.code === "insufficient_funds") {
      return "Your card has insufficient funds. Please try a different payment method.";
    }

    if (error.code === "expired_card") {
      return "Your card has expired. Please use a different payment method.";
    }

    if (error.code === "incorrect_cvc") {
      return "The security code (CVC) you entered is incorrect. Please check and try again.";
    }

    return (
      error.message ||
      "An unexpected error occurred while processing your payment."
    );
  };

  const getErrorSeverity = (errorType: string) => {
    switch (errorType) {
      case "card_error":
        return "warning";
      case "validation_error":
        return "error";
      case "authentication_error":
        return "error";
      case "rate_limit_error":
        return "info";
      default:
        return "error";
    }
  };

  const handleGoHome = () => {
    router.push("/");
  };

  const handleGoToCart = () => {
    router.push("/cart");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Result
          icon={<CloseCircleOutlined className="text-red-500" />}
          status="error"
          title={
            <Title level={2} className="!text-red-600">
              {getErrorTitle(error.type)}
            </Title>
          }
          subTitle={
            <Paragraph className="text-lg">
              We encountered an issue while processing your payment.
            </Paragraph>
          }
        />

        <div className="mb-6">
          <Alert
            type={getErrorSeverity(error.type) as any}
            message="Payment Error Details"
            description={<Text copyable>{getErrorDescription(error)}</Text>}
            showIcon
          />
        </div>

        {error.code && (
          <div className="mb-6 text-center">
            <Text type="secondary" copyable>
              Error Code: <Text code>{error.code}</Text>
            </Text>
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <Title level={5} className="mb-3">
            What you can do:
          </Title>
          <ul className="space-y-2">
            <li>• Check your card details and try again</li>
            <li>• Try a different payment method</li>
            <li>• Contact your bank if the issue persists</li>
            <li>• Ensure you have sufficient funds</li>
            {error.type === "rate_limit_error" && (
              <li>• Wait a few minutes before trying again</li>
            )}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {showRetry && onRetry && (
            <Button
              type="primary"
              size="large"
              icon={<ReloadOutlined />}
              onClick={onRetry}
            >
              Try Again
            </Button>
          )}
          <Button size="large" onClick={handleGoToCart}>
            Back to Cart
          </Button>
          <Button size="large" icon={<HomeOutlined />} onClick={handleGoHome}>
            Go Home
          </Button>
        </div>

        <div className="mt-6 text-center">
          <Text type="secondary" className="text-sm">
            If you continue to experience issues, please contact our support
            team.
          </Text>
        </div>
      </div>
    </div>
  );
};
