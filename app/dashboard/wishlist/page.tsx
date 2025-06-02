"use client";

import { useState, useEffect } from "react";
import {
  Card,
  Button,
  Empty,
  Skeleton,
  message,
  Tooltip,
  Pagination,
  Tag,
  Dropdown,
  Menu,
} from "antd";
import {
  HeartFilled,
  ShoppingCartOutlined,
  DeleteOutlined,
  ShareAltOutlined,
  EllipsisOutlined,
  FilterOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import type { Product } from "@/lib/types";
import { motion } from "framer-motion";

export default function WishlistPage() {
  const { addItem: addToCart } = useCartStore();
  const {
    wishlistItems,
    removeFromWishlist,
    clearWishlist,
    moveAllToCart,
    isLoading,
    fetchWishlist,
  } = useWishlistStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [sortBy, setSortBy] = useState<string>("dateAdded");
  const [filterBy, setFilterBy] = useState<string>("all");

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    message.success(`${product.name} added to cart!`);
  };

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlist(productId);
    message.success("Item removed from wishlist");
  };

  const handleShareItem = (product: Product) => {
    // In a real app, this would use the Web Share API or copy a link
    navigator.clipboard.writeText(
      `${window.location.origin}/products/${product.id}`
    );
    message.success("Product link copied to clipboard!");
  };

  const handleMoveAllToCart = () => {
    moveAllToCart();
    message.success("All items moved to cart!");
  };

  const handleClearWishlist = () => {
    clearWishlist();
    message.success("Wishlist cleared");
  };

  const filteredItems = wishlistItems.filter((item) => {
    if (filterBy === "all") return true;
    if (filterBy === "inStock") return item.inStock;
    if (filterBy === "outOfStock") return !item.inStock;
    return true;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "priceAsc") return a.price - b.price;
    if (sortBy === "priceDesc") return b.price - a.price;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    // Default: dateAdded (most recent first)
    return 0; // TODO: use actual timestamps
  });

  const paginatedItems = sortedItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const sortMenu = (
    <Menu
      onClick={({ key }) => setSortBy(key)}
      selectedKeys={[sortBy]}
      items={[
        { key: "dateAdded", label: "Date Added" },
        { key: "priceAsc", label: "Price: Low to High" },
        { key: "priceDesc", label: "Price: High to Low" },
        { key: "name", label: "Name" },
      ]}
    />
  );

  const filterMenu = (
    <Menu
      onClick={({ key }) => setFilterBy(key)}
      selectedKeys={[filterBy]}
      items={[
        { key: "all", label: "All Items" },
        { key: "inStock", label: "In Stock" },
        { key: "outOfStock", label: "Out of Stock" },
      ]}
    />
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Wishlist</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <Card key={index} className="w-full">
              <Skeleton.Image className="w-full h-48" active />
              <Skeleton active paragraph={{ rows: 2 }} />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Wishlist</h1>
        </div>
        <Card className="text-center py-8">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <span className="text-gray-500">
                Your wishlist is empty. Browse products and add items you like!
              </span>
            }
          >
            <Link href="/products">
              <Button type="primary" className="bg-[#0B8457]">
                Browse Products
              </Button>
            </Link>
          </Empty>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">
          My Wishlist ({wishlistItems.length})
        </h1>
        <div className="flex flex-wrap gap-2">
          <Dropdown overlay={sortMenu} trigger={["click"]}>
            <Button icon={<SortAscendingOutlined />}>
              Sort <EllipsisOutlined />
            </Button>
          </Dropdown>

          <Dropdown overlay={filterMenu} trigger={["click"]}>
            <Button icon={<FilterOutlined />}>
              Filter <EllipsisOutlined />
            </Button>
          </Dropdown>

          <Button
            onClick={handleMoveAllToCart}
            icon={<ShoppingCartOutlined />}
            className="bg-[#0B8457] text-white hover:bg-[#0a7249]"
          >
            Add All to Cart
          </Button>

          <Button
            onClick={handleClearWishlist}
            icon={<DeleteOutlined />}
            danger
          >
            Clear All
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {paginatedItems.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              hoverable
              className="h-full flex flex-col"
              cover={
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src={
                      product.image || "/placeholder.svg?height=200&width=300"
                    }
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-semibold px-3 py-1 rounded">
                        Out of Stock
                      </span>
                    </div>
                  )}
                  <Button
                    icon={<HeartFilled className="text-red-500" />}
                    className="absolute top-2 right-2 bg-white rounded-full"
                    onClick={() => handleRemoveFromWishlist(product.id)}
                    size="small"
                  />
                </div>
              }
              actions={[
                <Tooltip title="Add to Cart" key="add-to-cart">
                  <Button
                    icon={<ShoppingCartOutlined />}
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className={product.inStock ? "text-[#0B8457]" : ""}
                  />
                </Tooltip>,
                <Tooltip title="Remove from Wishlist" key="remove">
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemoveFromWishlist(product.id)}
                    danger
                  />
                </Tooltip>,
                <Tooltip title="Share Product" key="share">
                  <Button
                    icon={<ShareAltOutlined />}
                    onClick={() => handleShareItem(product)}
                  />
                </Tooltip>,
              ]}
            >
              <div className="flex flex-col h-full">
                <Link href={`/products/${product.id}`} className="block mb-2">
                  <h3 className="font-semibold text-lg line-clamp-2">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-lg">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.discount && (
                    <Tag color="red">{product.discount}% OFF</Tag>
                  )}
                </div>
                <div className="mt-auto">
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {wishlistItems.length > pageSize && (
        <div className="flex justify-center mt-8">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={wishlistItems.length}
            onChange={setCurrentPage}
            showSizeChanger
            onShowSizeChange={(current, size) => {
              setCurrentPage(1);
              setPageSize(size);
            }}
          />
        </div>
      )}
    </div>
  );
}
