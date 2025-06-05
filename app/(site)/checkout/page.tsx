"use client";
import { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Select,
  Row,
  Col,
  Divider,
  message,
  Steps,
} from "antd";
import {
  CreditCardOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  CheckOutlined,
  LockFilled,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { PaymentForm } from "@/components/payment/PaymentForm";
import { PaymentSuccess } from "@/components/payment/PaymentSuccess";
import { PaymentError } from "@/components/payment/PaymentError";
import { useCartStore } from "@/store/useCartStore";
import { useOrderStore } from "@/store/useOrderStore";
import { usePaymentStore } from "@/store/usePaymentStore";
import { formatCurrency } from "@/lib/utils";
import { COUNTRIES } from "@/lib/constants";
import type { PaymentIntent } from "@/lib/stripe/types";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { Step } = Steps;

type CheckoutStep = "shipping" | "payment" | "success" | "error";

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const { createOrder, isLoading } = useOrderStore();
  const { reset: resetPayment } = usePaymentStore();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping");
  const [shippingForm] = Form.useForm();
  const [shippingData, setShippingData] = useState<any>(null);
  const [orderId, setOrderId] = useState<string>("");
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(
    null
  );
  const [paymentError, setPaymentError] = useState<any>(null);

  const total = getTotal();

  useEffect(() => {
    if (items.length || currentStep === "success") return;

    router.push("/cart");
  }, [items.length, router, currentStep]);

  useEffect(() => {
    // Reset payment state when component mounts
    resetPayment();
  }, [resetPayment]);

  const handleShippingSubmit = async (values: any) => {
    try {
      const shippingAddress = {
        fullName: `${values.firstName} ${values.lastName}`,
        email: values.email,
        phone: values.phone,
        country: values.country,
        city: values.city,
        streetAddress: values.address,
        postalCode: values.postalCode,
        deliveryNotes: values.deliveryNotes,
      };

      // Create order first
      const order = await createOrder({
        items,
        shippingAddress,
        total,
      });

      setShippingData(shippingAddress);
      setOrderId(order.id);
      setCurrentStep("payment");

      message.success("Shipping information saved!");
    } catch (error) {
      message.error("Failed to save shipping information. Please try again.");
    }
  };

  const handlePaymentSuccess = (paymentIntentResult: PaymentIntent) => {
    setPaymentIntent(paymentIntentResult);
    setCurrentStep("success");
    clearCart();
    message.success("Payment completed successfully!");
  };

  const handlePaymentError = (error: any) => {
    setPaymentError(error);
    setCurrentStep("error");
  };

  const handleRetryPayment = () => {
    setPaymentError(null);
    setCurrentStep("payment");
    resetPayment();
  };

  const getStepNumber = () => {
    switch (currentStep) {
      case "shipping":
        return 0;
      case "payment":
      case "error":
        return 1;
      case "success":
        return 2;
      default:
        return 0;
    }
  };

  if (items.length === 0 && currentStep === "shipping") return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <Title level={2} className="mb-8">
          Checkout
        </Title>

        {/* Progress Steps */}
        <div className="mb-8">
          <Steps
            current={getStepNumber()}
            className="max-w-2xl mx-auto"
            items={[
              {
                title: "Shipping",
                icon: <HomeOutlined />,
              },
              {
                title: "Payment",
                icon: <CreditCardOutlined />,
              },
              {
                title: "Complete",
                icon: <CheckOutlined />,
              },
            ]}
          ></Steps>
        </div>

        {/* Shipping Information Step */}
        {currentStep === "shipping" && (
          <Row gutter={32}>
            <Col xs={24} lg={16}>
              <Card title="Shipping Information" className="mb-6">
                <Form
                  form={shippingForm}
                  name="checkout"
                  onFinish={handleShippingSubmit}
                  layout="vertical"
                  size="large"
                >
                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="firstName"
                        label="First Name"
                        rules={[
                          {
                            required: true,
                            message: "Please input your first name!",
                          },
                        ]}
                      >
                        <Input
                          prefix={<UserOutlined />}
                          placeholder="First name"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="lastName"
                        label="Last Name"
                        rules={[
                          {
                            required: true,
                            message: "Please input your last name!",
                          },
                        ]}
                      >
                        <Input
                          prefix={<UserOutlined />}
                          placeholder="Last name"
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                      { type: "email", message: "Please enter a valid email!" },
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined />}
                      placeholder="Email address"
                    />
                  </Form.Item>

                  <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone number!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<PhoneOutlined />}
                      placeholder="Phone number"
                    />
                  </Form.Item>

                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="country"
                        label="Country"
                        rules={[
                          {
                            required: true,
                            message: "Please select your country!",
                          },
                        ]}
                      >
                        <Select placeholder="Select country">
                          {COUNTRIES.map((country) => (
                            <Option key={country} value={country}>
                              {country}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="city"
                        label="City"
                        rules={[
                          {
                            required: true,
                            message: "Please input your city!",
                          },
                        ]}
                      >
                        <Input placeholder="City" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="address"
                    label="Street Address"
                    rules={[
                      { required: true, message: "Please input your address!" },
                    ]}
                  >
                    <Input
                      prefix={<HomeOutlined />}
                      placeholder="Street address"
                    />
                  </Form.Item>

                  <Form.Item
                    name="postalCode"
                    label="Postal Code"
                    rules={[
                      {
                        required: true,
                        message: "Please input your postal code!",
                      },
                    ]}
                  >
                    <Input placeholder="Postal code" />
                  </Form.Item>

                  <Form.Item
                    name="deliveryNotes"
                    label="Delivery Notes (Optional)"
                  >
                    <TextArea
                      rows={3}
                      placeholder="Any special delivery instructions..."
                    />
                  </Form.Item>

                  <Divider />

                  <div className="text-center">
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      loading={isLoading}
                      className="w-full px-12"
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </Form>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card title="Order Summary" className="sticky top-8">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex justify-between items-start"
                    >
                      <div className="flex-1">
                        <Text strong className="block">
                          {item.product.name}
                        </Text>
                        <Text type="secondary" className="text-sm">
                          Qty: {item.quantity} ×{" "}
                          {formatCurrency(item.product.price)}
                        </Text>
                      </div>
                      <Text strong>
                        {formatCurrency(item.product.price * item.quantity)}
                      </Text>
                    </div>
                  ))}

                  <Divider />

                  <div className="flex justify-between">
                    <Text>Subtotal:</Text>
                    <Text>{formatCurrency(total)}</Text>
                  </div>

                  <div className="flex justify-between">
                    <Text>Shipping:</Text>
                    <Text>Calculated after order</Text>
                  </div>

                  <Divider />

                  <div className="flex justify-between">
                    <Text strong className="text-lg">
                      Total:
                    </Text>
                    <Text strong className="text-lg text-[#0B8457]">
                      {formatCurrency(total)}
                    </Text>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg mt-4">
                    <Text className="text-green-800 text-sm">
                      <LockFilled /> Secure checkout powered by Stripe
                    </Text>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        )}

        {/* Payment Step */}
        {currentStep === "payment" && (
          <div className="flex justify-center">
            <PaymentForm
              orderId={orderId}
              amount={total}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </div>
        )}

        {/* Success Step */}
        {currentStep === "success" && paymentIntent && (
          <PaymentSuccess
            paymentIntent={paymentIntent}
            orderDetails={{
              orderId,
              items: items.map((item) => ({
                name: item.product.name,
                quantity: item.quantity,
                price: item.product.price,
              })),
            }}
          />
        )}

        {/* Error Step */}
        {currentStep === "error" && paymentError && (
          <div className="-mt-36">
            <PaymentError error={paymentError} onRetry={handleRetryPayment} />
          </div>
        )}
      </div>
    </div>
  );
}
