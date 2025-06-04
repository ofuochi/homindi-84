"use client";

import { Card, Button, Tag, Badge, message } from "antd";
import { ShoppingCartOutlined, EyeOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { useCartStore } from "@/store/useCartStore";
import WishlistButton from "./WishlistButton";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem: addToCart } = useCartStore();
  const [messageApi, contextHolder] = message.useMessage();

  const handleAddToCart = () => {
    addToCart(product, 1);
    messageApi.success({
      content: `${product.name} has been added to your cart!`,
      duration: 2.5,
      className: "notification-toast",
    });
  };

  return (
    <>
      {contextHolder}
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="h-full"
      >
        <Badge.Ribbon
          text={product.featured ? "Featured" : null}
          color="purple"
          placement="start"
          className="absolute top-3 left-3 z-10"
        >
          <Card
            hoverable
            className="h-full flex flex-col border-0 shadow-lg rounded-2xl overflow-hidden group"
            cover={
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg?height=200&width=300"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-semibold px-3 py-1 rounded-lg bg-red-500">
                      Out of Stock
                    </span>
                  </div>
                )}

                {/* Overlay with actions */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-2">
                    <Link href={`/products/${product.id}`}>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          type="primary"
                          shape="circle"
                          icon={<EyeOutlined />}
                          className="bg-white text-gray-700 border-white hover:bg-gray-50"
                        />
                      </motion.div>
                    </Link>
                  </div>
                </div>

                <WishlistButton
                  product={product}
                  className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg"
                  size="small"
                />

                {product.discount && (
                  <div className="absolute top-3 left-3">
                    <Tag color="red" className="font-semibold">
                      -{product.discount}% OFF
                    </Tag>
                  </div>
                )}
              </div>
            }
          >
            <div className="flex flex-col h-full p-2">
              <Link href={`/products/${product.id}`} className="block mb-3">
                <h3 className="font-semibold text-lg line-clamp-2 hover:text-[#0B8457] transition-colors font-poppins">
                  {product.name}
                </h3>
              </Link>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-xl text-[#0B8457] font-poppins">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.discount && (
                    <span className="text-sm text-gray-500 line-through">
                      $
                      {(product.price / (1 - product.discount / 100)).toFixed(
                        2
                      )}
                    </span>
                  )}
                </div>
                <Tag color="blue" className="text-xs">
                  {product.category}
                </Tag>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2 font-inter leading-relaxed flex-grow">
                {product.description}
              </p>

              <div className="flex items-center justify-between mb-4 text-xs text-gray-500 font-inter">
                <span>Origin: {product.origin}</span>
                <span>{product.stockQuantity} in stock</span>
              </div>

              <div className="mt-auto">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    block
                    size="large"
                    className="bg-[#0B8457] hover:bg-[#0a7249] border-[#0B8457] rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </motion.div>
              </div>
            </div>
          </Card>
        </Badge.Ribbon>
      </motion.div>
    </>
  );
}
