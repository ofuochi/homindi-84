"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  Row,
  Col,
  Typography,
  Button,
  InputNumber,
  Divider,
  Tag,
  Tabs,
  Breadcrumb,
  Skeleton,
  message,
  Layout,
} from "antd";
import {
  ShoppingCartOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  TagOutlined,
  GlobalOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { mockProducts } from "@/lib/mockData";
import WishlistButton from "@/components/product/WishlistButton";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const { Title, Text } = Typography;

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useState(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  });

  // In a real app, this would be fetched from an API
  const product = mockProducts.find((p) => p.id === productId);

  if (!product && !loading) {
    return (
      <div className="text-center py-12">
        <Title level={3}>Product not found</Title>
        <Link href="/products">
          <Button type="primary" className="mt-4 bg-[#0B8457]">
            Back to Products
          </Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      message.success(`${quantity} ${product.name} added to cart!`);
    }
  };

  const handleQuantityChange = (value: number | null) => {
    if (value !== null) {
      setQuantity(value);
    }
  };

  return (
    <Layout>
      <Header />

      <Layout.Content className="container mx-auto px-4 py-8">
        <Breadcrumb 
          className="mb-6"
          items={[
            {
              title: <Link href="/">Home</Link>,
            },
            {
              title: <Link href="/products">Products</Link>,
            },
            {
              title: loading ? <Skeleton.Button active size="small" /> : product?.name,
            },
          ]}
        />

        <Row gutter={[32, 32]}>
          <Col xs={24} md={12}>
            {loading ? (
              <Skeleton.Image className="w-full h-96" active />
            ) : (
              <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={
                    product?.image || "/placeholder.svg?height=400&width=600"
                  }
                  alt={product?.name || "Product"}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </Col>

          <Col xs={24} md={12}>
            {loading ? (
              <>
                <Skeleton active paragraph={{ rows: 1 }} />
                <Skeleton active paragraph={{ rows: 3 }} />
                <Skeleton.Button active size="large" className="mt-4" />
                <Skeleton.Button active size="large" className="ml-4" />
              </>
            ) : (
              product && (
                <>
                  <div className="flex justify-between items-start">
                    <Title level={2}>{product.name}</Title>
                    <WishlistButton product={product} showText />
                  </div>

                  <div className="flex items-center mb-4">
                    <Text className="text-2xl font-bold mr-4">
                      ${product.price.toFixed(2)}
                    </Text>
                    {product.discount && (
                      <Tag color="red" className="text-sm">
                        {product.discount}% OFF
                      </Tag>
                    )}
                  </div>

                  <Text className="text-gray-600 block mb-6">
                    {product.description}
                  </Text>

                  <div className="flex items-center mb-4">
                    <Text strong className="mr-2">
                      Availability:
                    </Text>
                    {product.inStock ? (
                      <Tag
                        icon={<CheckCircleOutlined />}
                        color="success"
                        className="mr-4"
                      >
                        In Stock
                      </Tag>
                    ) : (
                      <Tag
                        icon={<CloseCircleOutlined />}
                        color="error"
                        className="mr-4"
                      >
                        Out of Stock
                      </Tag>
                    )}

                    <Text strong className="mr-2">
                      Category:
                    </Text>
                    <Tag icon={<TagOutlined />} color="default">
                      {product.category}
                    </Tag>
                  </div>

                  <div className="flex items-center mb-6">
                    <Text strong className="mr-2">
                      Origin:
                    </Text>
                    <Tag icon={<GlobalOutlined />} color="processing">
                      {product.origin}
                    </Tag>
                  </div>

                  <Divider />

                  <div className="flex items-center mb-6">
                    <Text strong className="mr-4">
                      Quantity:
                    </Text>
                    <InputNumber
                      min={1}
                      max={product.stockQuantity}
                      defaultValue={1}
                      onChange={handleQuantityChange}
                      disabled={!product.inStock}
                    />
                    <Text className="ml-4 text-gray-500">
                      {product.stockQuantity} available
                    </Text>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Button
                      type="primary"
                      icon={<ShoppingCartOutlined />}
                      size="large"
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                      className="bg-[#0B8457]"
                    >
                      Add to Cart
                    </Button>
                  </div>

                  {product.minOrderQuantity && (
                    <div className="mt-4 bg-blue-50 p-3 rounded-md">
                      <Text type="secondary">
                        <InfoCircleOutlined className="mr-2" />
                        Minimum order quantity: {product.minOrderQuantity}{" "}
                        {product.unit}
                      </Text>
                    </div>
                  )}
                </>
              )
            )}
          </Col>
        </Row>

        {!loading && product && (
          <div className="mt-12">
            <Tabs 
              defaultActiveKey="1"
              items={[
                {
                  key: "1",
                  label: "Details",
                  children: (
                    <div className="p-4">
                      <Title level={4}>Product Details</Title>
                      <Row gutter={[16, 16]} className="mt-4">
                        <Col xs={24} md={8}>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <Text strong>SKU:</Text>
                            <Text className="block">{product.sku || "N/A"}</Text>
                          </div>
                        </Col>
                        <Col xs={24} md={8}>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <Text strong>Weight:</Text>
                            <Text className="block">{product.weight || "N/A"}</Text>
                          </div>
                        </Col>
                        <Col xs={24} md={8}>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <Text strong>Unit:</Text>
                            <Text className="block">{product.unit}</Text>
                          </div>
                        </Col>
                      </Row>
                      <div className="mt-6">
                        <Text>{product.description}</Text>
                      </div>
                    </div>
                  )
                },
                {
                  key: "2",
                  label: "Shipping",
                  children: (
                    <div className="p-4">
                      <Title level={4}>Shipping Information</Title>
                      <Text>
                        We ship to most countries worldwide. Shipping costs are
                        calculated at checkout based on weight, dimensions, and
                        destination.
                      </Text>
                      <ul className="list-disc pl-6 mt-4">
                        <li>Standard Shipping: 5-7 business days</li>
                        <li>Express Shipping: 2-3 business days</li>
                      </ul>
                    </div>
                  )
                },
                {
                  key: "3",
                  label: "Reviews",
                  children: (
                    <div className="p-4">
                      <Title level={4}>Customer Reviews</Title>
                      <Text>
                        No reviews yet. Be the first to review this product!
                      </Text>
                    </div>
                  )
                }
              ]}
            />
          </div>
        )}
      </Layout.Content>

      <Footer />
    </Layout>
  );
}
