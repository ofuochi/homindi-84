"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Row, Col, Button, InputNumber, Tag, Typography, Divider, Card, message } from "antd"
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons"
import Image from "next/image"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import ProductCard from "@/components/product/ProductCard"
import { mockProducts } from "@/lib/mockData"
import { formatCurrency } from "@/lib/utils"
import { useCartStore } from "@/store/useCartStore"

const { Title, Paragraph, Text } = Typography

export default function ProductDetailPage() {
  const params = useParams()
  const { addItem } = useCartStore()
  const [quantity, setQuantity] = useState(1)

  const product = mockProducts.find((p) => p.id === params.id)
  const relatedProducts = mockProducts.filter((p) => p.id !== params.id && p.category === product?.category).slice(0, 4)

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Title level={2}>Product Not Found</Title>
          <Paragraph>The product you're looking for doesn't exist.</Paragraph>
        </div>
        <Footer />
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem(product, quantity)
    message.success(`${quantity}x ${product.name} added to cart!`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Row gutter={[32, 32]}>
          {/* Product Images */}
          <Col xs={24} lg={12}>
            <div className="sticky top-8">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-white">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Tag color="red" className="text-lg px-4 py-2">
                      Out of Stock
                    </Tag>
                  </div>
                )}
              </div>
            </div>
          </Col>

          {/* Product Info */}
          <Col xs={24} lg={12}>
            <div className="space-y-6">
              <div>
                <Tag color="green" className="mb-2">
                  {product.category}
                </Tag>
                <Title level={1} className="mb-2">
                  {product.name}
                </Title>
                <Text type="secondary" className="text-lg">
                  Origin: {product.origin}
                </Text>
              </div>

              <div>
                <Title level={2} className="text-[#0B8457] mb-2">
                  {formatCurrency(product.price)}
                </Title>
                <Text className="text-lg text-gray-600">{product.unit}</Text>
                {product.weight && <Text className="text-sm text-gray-500 ml-2">({product.weight})</Text>}
              </div>

              <Divider />

              <div>
                <Title level={4} className="mb-2">
                  Description
                </Title>
                <Paragraph className="text-gray-600 text-lg leading-relaxed">{product.description}</Paragraph>
              </div>

              <div>
                <Title level={4} className="mb-2">
                  Stock Status
                </Title>
                <Tag color={product.inStock ? "green" : "red"} className="text-sm">
                  {product.inStock ? `In Stock (${product.stockQuantity} available)` : "Out of Stock"}
                </Tag>
              </div>

              {product.inStock && (
                <div className="space-y-4">
                  <div>
                    <Title level={4} className="mb-2">
                      Quantity
                    </Title>
                    <InputNumber
                      min={1}
                      max={product.stockQuantity}
                      value={quantity}
                      onChange={(value) => setQuantity(value || 1)}
                      size="large"
                      className="w-24"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      type="primary"
                      size="large"
                      icon={<ShoppingCartOutlined />}
                      onClick={handleAddToCart}
                      className="flex-1"
                    >
                      Add to Cart - {formatCurrency(product.price * quantity)}
                    </Button>
                    <Button size="large" icon={<HeartOutlined />} className="sm:w-auto">
                      Add to Wishlist
                    </Button>
                  </div>
                </div>
              )}

              <Card className="bg-green-50 border-green-200">
                <div className="space-y-2">
                  <Text strong className="text-green-800">
                    ✓ Authentic Nigerian Product
                  </Text>
                  <br />
                  <Text strong className="text-green-800">
                    ✓ Fresh & Quality Guaranteed
                  </Text>
                  <br />
                  <Text strong className="text-green-800">
                    ✓ Worldwide Shipping Available
                  </Text>
                  <br />
                  <Text strong className="text-green-800">
                    ✓ Secure Packaging
                  </Text>
                </div>
              </Card>
            </div>
          </Col>
        </Row>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <Title level={3} className="mb-8">
              Related Products
            </Title>
            <Row gutter={[24, 24]}>
              {relatedProducts.map((relatedProduct) => (
                <Col key={relatedProduct.id} xs={24} sm={12} lg={6}>
                  <ProductCard product={relatedProduct} />
                </Col>
              ))}
            </Row>
          </div>
        )}
      </div>

      {/* Sticky Add to Cart for Mobile */}
      {product.inStock && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 lg:hidden z-30">
          <Button type="primary" size="large" block icon={<ShoppingCartOutlined />} onClick={handleAddToCart}>
            Add to Cart - {formatCurrency(product.price * quantity)}
          </Button>
        </div>
      )}

      <Footer />
    </div>
  )
}
