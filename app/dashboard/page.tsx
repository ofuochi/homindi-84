"use client";

import { useEffect } from "react";
import {
  Card,
  Button,
  Typography,
  Row,
  Col,
  Tag,
  Statistic,
  List,
  Avatar,
} from "antd";
import {
  ShoppingOutlined,
  ReloadOutlined,
  TruckOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useOrderStore } from "@/store/useOrderStore";
import { useAuthStore } from "@/store/useAuthStore";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ORDER_STATUSES } from "@/lib/constants";

const { Title, Text } = Typography;

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { orders, isLoading, fetchOrders, reorder } = useOrderStore();

  useEffect(() => {
    if (orders.length === 0) {
      fetchOrders();
    }
  }, [orders.length, fetchOrders]);

  const recentOrders = orders.slice(0, 3);
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(
    (order) => order.status === "pending" || order.status === "processing"
  ).length;
  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered"
  ).length;

  const getStatusColor = (status: string) => {
    const statusConfig = ORDER_STATUSES.find((s) => s.value === status);
    return statusConfig?.color || "default";
  };

  return (
    <div className="space-y-6">
      <div>
        <Title level={2}>Welcome back, {user?.name}!</Title>
        <Text type="secondary">Here's what's happening with your orders</Text>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Orders"
              value={orders.length}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: "#0B8457" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Spent"
              value={totalSpent}
              formatter={(value) => formatCurrency(Number(value))}
              valueStyle={{ color: "#0B8457" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Pending Orders"
              value={pendingOrders}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: "#F9A826" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Delivered"
              value={deliveredOrders}
              prefix={<TruckOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        {/* Recent Orders */}
        <Col xs={24} lg={16}>
          <Card
            title="Recent Orders"
            extra={
              <Link href="/dashboard/orders">
                <Button type="link">View All</Button>
              </Link>
            }
            loading={isLoading}
          >
            {recentOrders.length > 0 ? (
              <List
                itemLayout="horizontal"
                dataSource={recentOrders}
                renderItem={(order) => (
                  <List.Item
                    actions={[
                      <Button
                        key="reorder"
                        type="text"
                        icon={<ReloadOutlined />}
                        onClick={() => reorder(order.id)}
                        size="small"
                      >
                        Reorder
                      </Button>,
                      <Link key="view" href="/dashboard/orders">
                        <Button type="primary" size="small">
                          View Details
                        </Button>
                      </Link>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{ backgroundColor: "#0B8457" }}
                          icon={<ShoppingCartOutlined />}
                        />
                      }
                      title={
                        <div className="flex items-center gap-2">
                          <Text strong>{order.id}</Text>
                          <Tag
                            color={getStatusColor(order.status)}
                            size="small"
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </Tag>
                        </div>
                      }
                      description={
                        <div>
                          <Text type="secondary">
                            {order.items.length} item(s) •{" "}
                            {formatCurrency(order.total)}
                          </Text>
                          <br />
                          <Text type="secondary" className="text-xs">
                            {formatDate(order.createdAt)}
                          </Text>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            ) : (
              <div className="text-center py-8">
                <Text type="secondary">No recent orders</Text>
                <br />
                <Link href="/products">
                  <Button type="primary" className="mt-4">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            )}
          </Card>
        </Col>

        {/* Quick Actions */}
        <Col xs={24} lg={8}>
          <Card title="Quick Actions">
            <div className="space-y-4">
              <Link href="/products">
                <Button type="primary" block icon={<ShoppingOutlined />}>
                  Browse Products
                </Button>
              </Link>
              <Link href="/dashboard/orders">
                <Button block icon={<TruckOutlined />}>
                  Track Orders
                </Button>
              </Link>
              <Link href="/dashboard/settings">
                <Button block>Account Settings</Button>
              </Link>
              <Button
                block
                icon={<ReloadOutlined />}
                onClick={fetchOrders}
                loading={isLoading}
              >
                Refresh Orders
              </Button>
            </div>
          </Card>

          {/* Order Status Summary */}
          <Card title="Order Status Summary" className="mt-6">
            <div className="space-y-3">
              {ORDER_STATUSES.map((status) => {
                const count = orders.filter(
                  (order) => order.status === status.value
                ).length;
                return (
                  <div
                    key={status.value}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-2">
                      <Tag color={status.color} size="small">
                        {status.label}
                      </Tag>
                    </div>
                    <Text strong>{count}</Text>
                  </div>
                );
              })}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
