"use client"

import { Button, Table, InputNumber, Typography, Empty, Card } from "antd"
import { DeleteOutlined, ShoppingOutlined } from "@ant-design/icons"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { useCartStore } from "@/store/useCartStore"
import { formatCurrency } from "@/lib/utils"
import { MINIMUM_ORDER_AMOUNT } from "@/lib/constants"
import MinOrderBanner from "@/components/cart/MinOrderBanner"

const { Title, Text } = Typography

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore()
  const total = getTotal()
  const isMinimumMet = total >= MINIMUM_ORDER_AMOUNT

  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (product: any) => (
        <div className="flex items-center space-x-4">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={60}
            height={60}
            className="rounded-lg object-cover"
          />
          <div>
            <Text strong>{product.name}</Text>
            <br />
            <Text type="secondary" className="text-sm">
              {product.unit}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "product",
      key: "price",
      render: (product: any) => formatCurrency(product.price),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity: number, record: any) => (
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) => updateQuantity(record.product.id, value || 1)}
          className="w-20"
        />
      ),
    },
    {
      title: "Subtotal",
      key: "subtotal",
      render: (record: any) => formatCurrency(record.product.price * record.quantity),
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Button type="text" danger icon={<DeleteOutlined />} onClick={() => removeItem(record.product.id)}>
          Remove
        </Button>
      ),
    },
  ]

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Your cart is empty" />
            <Link href="/products">
              <Button type="primary" size="large" icon={<ShoppingOutlined />} className="mt-4">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Title level={2} className="mb-8">
          Shopping Cart
        </Title>

        {!isMinimumMet && <MinOrderBanner currentTotal={total} />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <Table
                dataSource={items}
                columns={columns}
                rowKey={(record) => record.product.id}
                pagination={false}
                scroll={{ x: 600 }}
              />
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card title="Order Summary" className="sticky top-8">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Text>Subtotal:</Text>
                  <Text strong>{formatCurrency(total)}</Text>
                </div>

                <div className="flex justify-between text-sm text-gray-500">
                  <Text>Shipping:</Text>
                  <Text>Calculated at checkout</Text>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <Text strong className="text-lg">
                      Total:
                    </Text>
                    <Text strong className="text-lg text-[#0B8457]">
                      {formatCurrency(total)}
                    </Text>
                  </div>
                </div>

                <Link href="/checkout">
                  <Button type="primary" size="large" block disabled={!isMinimumMet} className="mt-6">
                    Proceed to Checkout
                  </Button>
                </Link>

                <Link href="/products">
                  <Button size="large" block ghost>
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
