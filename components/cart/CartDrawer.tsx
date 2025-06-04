"use client";

import { Drawer, Button, Empty, InputNumber, List, Typography } from "antd";
import { DeleteOutlined, ShoppingOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { formatCurrency } from "@/lib/utils";
import { MINIMUM_ORDER_AMOUNT } from "@/lib/constants";
import MinOrderBanner from "@/components/cart/MinOrderBanner";

const { Text } = Typography;

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, getTotal } =
    useCartStore();
  const total = getTotal();
  const isMinimumMet = total >= MINIMUM_ORDER_AMOUNT;

  const handleClose = () => {
    setIsOpen(false);
  };

  if (items.length === 0) {
    return (
      <Drawer
        title="Shopping Cart"
        placement="right"
        onClose={handleClose}
        open={isOpen}
        width={400}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Your cart is empty"
          />
          <Link href="/products" onClick={handleClose}>
            <Button type="primary" icon={<ShoppingOutlined />} className="mt-4">
              Start Shopping
            </Button>
          </Link>
        </div>
      </Drawer>
    );
  }

  return (
    <Drawer
      title="Shopping Cart"
      placement="right"
      onClose={handleClose}
      open={isOpen}
      width={400}
      footer={
        <div className="space-y-4">
          {!isMinimumMet && <MinOrderBanner currentTotal={total} />}
          <div className="flex justify-between items-center">
            <Text strong className="text-lg mb-5">
              Total: {formatCurrency(total)}
            </Text>
          </div>
          <Link href="/checkout" onClick={handleClose}>
            <Button type="primary" size="large" block disabled={!isMinimumMet}>
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      }
    >
      <List
        dataSource={items}
        renderItem={(item) => (
          <List.Item className="px-0">
            <div className="flex w-full space-x-3">
              <Image
                src={item.product.image || "/placeholder.svg"}
                alt={item.product.name}
                width={60}
                height={60}
                className="rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <Text strong className="block truncate">
                  {item.product.name}
                </Text>
                <Text type="secondary" className="text-sm">
                  {item.product.unit}
                </Text>
                <div className="flex items-center justify-between mt-2">
                  <InputNumber
                    min={1}
                    value={item.quantity}
                    onChange={(value) =>
                      updateQuantity(item.product.id, value || 1)
                    }
                    size="small"
                    className="w-16"
                  />
                  <div className="flex items-center space-x-2">
                    <Text strong>
                      {formatCurrency(item.product.price * item.quantity)}
                    </Text>
                    <Button
                      type="text"
                      danger
                      size="small"
                      icon={<DeleteOutlined />}
                      onClick={() => removeItem(item.product.id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </List.Item>
        )}
      />
    </Drawer>
  );
}
