"use client"

import { Card, Button, Tag, Typography, message } from "antd"
import { ShoppingCartOutlined } from "@ant-design/icons"
import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"
import { useCartStore } from "@/store/useCartStore"

const { Text, Title } = Typography

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore()

  const handleAddToCart = () => {
    addItem(product)
    message.success(`${product.name} added to cart!`)
  }

  return (
    <Card
      hoverable
      className="card-shadow h-full"
      cover={
        <Link href={`/products/${product.id}`}>
          <div className="relative h-48 overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
            {!product.inStock && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <Tag color="red" className="text-sm">
                  Out of Stock
                </Tag>
              </div>
            )}
          </div>
        </Link>
      }
      actions={[
        <Button
          key="add-to-cart"
          type="primary"
          icon={<ShoppingCartOutlined />}
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full mx-4"
        >
          Add to Cart
        </Button>,
      ]}
    >
      <div className="space-y-2">
        <Link href={`/products/${product.id}`}>
          <Title level={5} className="mb-1 hover:text-[#0B8457] transition-colors">
            {product.name}
          </Title>
        </Link>

        <Text type="secondary" className="text-sm line-clamp-2">
          {product.description}
        </Text>

        <div className="flex items-center justify-between">
          <div>
            <Text strong className="text-lg text-[#0B8457]">
              {formatCurrency(product.price)}
            </Text>
            <Text type="secondary" className="text-sm ml-1">
              {product.unit}
            </Text>
          </div>

          <Tag color={product.inStock ? "green" : "red"}>{product.inStock ? "In Stock" : "Out of Stock"}</Tag>
        </div>

        <Text type="secondary" className="text-xs">
          Origin: {product.origin}
        </Text>
      </div>
    </Card>
  )
}
