"use client";

import type React from "react";
import { Result, Button, Card, Typography, Divider } from "antd";
import {
  CheckCircleOutlined,
  DownloadOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils";
import type { PaymentIntent, PaymentRecord } from "@/lib/stripe/types";

const { Title, Text, Paragraph } = Typography;

interface PaymentSuccessProps {
  paymentIntent: PaymentIntent;
  paymentRecord?: PaymentRecord;
  orderDetails?: {
    orderId: string;
    items: Array<{
      name: string;
      quantity: number;
      price: number;
    }>;
  };
}

export const PaymentSuccess: React.FC<PaymentSuccessProps> = ({
  paymentIntent,
  paymentRecord,
  orderDetails,
}) => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  const handleViewOrders = () => {
    router.push("/dashboard/orders");
  };

  const handleDownloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    const receiptData = {
      transactionId: paymentIntent.id,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency.toUpperCase(),
      date: new Date(paymentIntent.created * 1000).toLocaleDateString(),
      orderId: orderDetails?.orderId,
    };

    console.log("Receipt data:", receiptData);
    // Mock download
    alert("Receipt download would start here");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <Result
          icon={<CheckCircleOutlined className="text-green-500" />}
          status="success"
          title={
            <Title level={2} className="!text-green-600">
              Payment Successful!
            </Title>
          }
          subTitle={
            <Paragraph className="text-lg">
              Your payment has been processed successfully. You will receive a
              confirmation email shortly.
            </Paragraph>
          }
        />

        <Divider />

        <div className="space-y-6">
          {/* Transaction Details */}
          <div>
            <Title level={4} className="mb-4">
              Transaction Details
            </Title>
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex justify-between">
                <Text strong>Transaction ID:</Text>
                <Text code copyable>
                  {paymentIntent.id}
                </Text>
              </div>
              <div className="flex justify-between">
                <Text strong>Amount Paid:</Text>
                <Text strong className="text-green-600">
                  {formatCurrency(paymentIntent.amount / 100)}{" "}
                  {paymentIntent.currency.toUpperCase()}
                </Text>
              </div>
              <div className="flex justify-between">
                <Text strong>Payment Date:</Text>
                <Text>
                  {new Date(paymentIntent.created * 1000).toLocaleString()}
                </Text>
              </div>
              {orderDetails?.orderId && (
                <div className="flex justify-between">
                  <Text strong>Order ID:</Text>
                  <Text code copyable>
                    {orderDetails.orderId}
                  </Text>
                </div>
              )}
              {paymentRecord?.paymentMethod?.card && (
                <div className="flex justify-between">
                  <Text strong>Payment Method:</Text>
                  <Text>
                    {paymentRecord.paymentMethod.card.brand.toUpperCase()} ****
                    {paymentRecord.paymentMethod.card.last4}
                  </Text>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          {orderDetails && (
            <div>
              <Title level={4} className="mb-4">
                Order Summary
              </Title>
              <div className="bg-gray-50 p-4 rounded-lg">
                {orderDetails.items.map((item, index) => (
                  <div key={index} className="flex justify-between py-2">
                    <div>
                      <Text>{item.name}</Text>
                      <Text type="secondary" className="ml-2">
                        × {item.quantity}
                      </Text>
                    </div>
                    <Text>{formatCurrency(item.price * item.quantity)}</Text>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div>
            <Title level={4} className="mb-4">
              What's Next?
            </Title>
            <div className="bg-blue-50 p-4 rounded-lg">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircleOutlined className="text-green-500 mt-1 mr-2" />
                  <Text>
                    You will receive an email confirmation within the next few
                    minutes
                  </Text>
                </li>
                <li className="flex items-start">
                  <CheckCircleOutlined className="text-green-500 mt-1 mr-2" />
                  <Text>
                    Your order will be processed and shipped within 1-2 business
                    days
                  </Text>
                </li>
                <li className="flex items-start">
                  <CheckCircleOutlined className="text-green-500 mt-1 mr-2" />
                  <Text>You can track your order status in your dashboard</Text>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Divider />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            type="primary"
            size="large"
            icon={<HomeOutlined />}
            onClick={handleViewOrders}
          >
            View My Orders
          </Button>
          <Button
            size="large"
            icon={<DownloadOutlined />}
            onClick={handleDownloadReceipt}
          >
            Download Receipt
          </Button>
          <Button size="large" onClick={handleGoHome}>
            Continue Shopping
          </Button>
        </div>
      </Card>
    </div>
  );
};
