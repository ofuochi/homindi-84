"use client"

import { Button, Tooltip, message } from "antd"
import { HeartOutlined, HeartFilled } from "@ant-design/icons"
import { useWishlistStore } from "@/store/useWishlistStore"
import type { Product } from "@/lib/types"
import { useState } from "react"

interface WishlistButtonProps {
  product: Product
  size?: "small" | "middle" | "large"
  showText?: boolean
  className?: string
}

export default function WishlistButton({
  product,
  size = "middle",
  showText = false,
  className = "",
}: WishlistButtonProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore()
  const [isHovering, setIsHovering] = useState(false)

  const inWishlist = isInWishlist(product.id)

  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
      message.success(`${product.name} removed from wishlist`)
    } else {
      addToWishlist(product)
      message.success(`${product.name} added to wishlist`)
    }
  }

  return (
    <Tooltip title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}>
      <Button
        icon={inWishlist ? <HeartFilled className="text-red-500" /> : <HeartOutlined />}
        onClick={handleToggleWishlist}
        size={size}
        className={`${className} ${inWishlist ? "border-red-200 hover:border-red-300" : ""}`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {showText && (inWishlist ? "Saved" : "Save")}
      </Button>
    </Tooltip>
  )
}
