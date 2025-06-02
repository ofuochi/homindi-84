"use client"

import { Card, Button, Tag, Badge } from "antd"
import { ShoppingCartOutlined } from "@ant-design/icons"
import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/lib/types"
import { useCartStore } from "@/store/useCartStore"
import WishlistButton from "./WishlistButton"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCartStore()

  const handleAddToCart = () => {
    addToCart(product, 1)
  }

  return (
    <Badge.Ribbon
      text={product.featured ? "Featured" : null}
      color="#0B8457"
      style={{ display: product.featured ? "block" : "none" }}
    >
      <Card
        hoverable
        className="h-full flex flex-col"
        cover={
          <div className="relative h-48 bg-gray-100">
            <Image
              src={product.image || "/placeholder.svg?height=200&width=300"}
              alt={product.name}
              fill
              className="object-cover"
            />
            {!product.inStock && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white font-semibold px-3 py-1 rounded">Out of Stock</span>
              </div>
            )}
            <WishlistButton product={product} className="absolute top-2 right-2 bg-white rounded-full" size="small" />
          </div>
        }
      >
        <div className="flex flex-col h-full">
          <Link href={`/products/${product.id}`} className="block mb-2">
            <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
          </Link>
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
            {product.discount && <Tag color="red">{product.discount}% OFF</Tag>}
          </div>
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
          <div className="mt-auto">
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              onClick={handleAddToCart}
              disabled={!product.inStock}
              block
              className="bg-[#0B8457]"
            >
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        </div>
      </Card>
    </Badge.Ribbon>
  )
}
