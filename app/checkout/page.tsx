"use client"
import { Form, Input, Button, Card, Typography, Select, Row, Col, Divider, message } from "antd"
import { CreditCardOutlined, UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined } from "@ant-design/icons"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { useCartStore } from "@/store/useCartStore"
import { useOrderStore } from "@/store/useOrderStore"
import { formatCurrency } from "@/lib/utils"
import { COUNTRIES } from "@/lib/constants"

const { Title, Text } = Typography
const { TextArea } = Input
const { Option } = Select

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore()
  const { createOrder, isLoading } = useOrderStore()
  const router = useRouter()
  const total = getTotal()

  const onFinish = async (values: any) => {
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
      }

      const order = await createOrder({
        items,
        shippingAddress,
        total,
      })

      message.success("Order placed successfully!")
      clearCart()
      router.push(`/dashboard/orders`)
    } catch (error) {
      message.error("Failed to place order. Please try again.")
    }
  }

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Title level={2} className="mb-8">
          Checkout
        </Title>

        <Row gutter={32}>
          {/* Checkout Form */}
          <Col xs={24} lg={16}>
            <Card title="Shipping Information" className="mb-6">
              <Form name="checkout" onFinish={onFinish} layout="vertical" size="large">
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="firstName"
                      label="First Name"
                      rules={[{ required: true, message: "Please input your first name!" }]}
                    >
                      <Input prefix={<UserOutlined />} placeholder="First name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="lastName"
                      label="Last Name"
                      rules={[{ required: true, message: "Please input your last name!" }]}
                    >
                      <Input prefix={<UserOutlined />} placeholder="Last name" />
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
                  <Input prefix={<MailOutlined />} placeholder="Email address" />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[{ required: true, message: "Please input your phone number!" }]}
                >
                  <Input prefix={<PhoneOutlined />} placeholder="Phone number" />
                </Form.Item>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="country"
                      label="Country"
                      rules={[{ required: true, message: "Please select your country!" }]}
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
                      rules={[{ required: true, message: "Please input your city!" }]}
                    >
                      <Input placeholder="City" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="address"
                  label="Street Address"
                  rules={[{ required: true, message: "Please input your address!" }]}
                >
                  <Input prefix={<HomeOutlined />} placeholder="Street address" />
                </Form.Item>

                <Form.Item
                  name="postalCode"
                  label="Postal Code"
                  rules={[{ required: true, message: "Please input your postal code!" }]}
                >
                  <Input placeholder="Postal code" />
                </Form.Item>

                <Form.Item name="deliveryNotes" label="Delivery Notes (Optional)">
                  <TextArea rows={3} placeholder="Any special delivery instructions..." />
                </Form.Item>

                <Divider />

                <div className="text-center">
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={isLoading}
                    icon={<CreditCardOutlined />}
                    className="w-full sm:w-auto px-12"
                  >
                    Place Order - {formatCurrency(total)}
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>

          {/* Order Summary */}
          <Col xs={24} lg={8}>
            <Card title="Order Summary" className="sticky top-8">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-start">
                    <div className="flex-1">
                      <Text strong className="block">
                        {item.product.name}
                      </Text>
                      <Text type="secondary" className="text-sm">
                        Qty: {item.quantity} × {formatCurrency(item.product.price)}
                      </Text>
                    </div>
                    <Text strong>{formatCurrency(item.product.price * item.quantity)}</Text>
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
                  <Text className="text-green-800 text-sm">🔒 Secure checkout powered by Stripe</Text>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <Footer />
    </div>
  )
}
