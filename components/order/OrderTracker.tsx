"use client"

import { useState } from "react"
import { Card, Timeline, Button, Modal, Spin, Typography, message } from "antd"
import { TruckOutlined, ClockCircleOutlined } from "@ant-design/icons"
import { useOrderStore } from "@/store/useOrderStore"
import { formatDate } from "@/lib/utils"
import { colors } from "@/lib/colors"

const { Text } = Typography

interface OrderTrackerProps {
  orderId: string
  trackingNumber?: string
}

export default function OrderTracker({ orderId, trackingNumber }: OrderTrackerProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [trackingData, setTrackingData] = useState<any>(null)
  const { trackOrder, isLoading } = useOrderStore()

  const handleTrackOrder = async () => {
    try {
      setModalOpen(true)
      const data = await trackOrder(orderId)
      setTrackingData(data)
    } catch (error) {
      message.error("Failed to fetch tracking information")
      setModalOpen(false)
    }
  }

  if (!trackingNumber) {
    return null
  }

  return (
    <>
      <Button type="primary" icon={<TruckOutlined />} onClick={handleTrackOrder} loading={isLoading}>
        Track Order
      </Button>

      <Modal
        title="Order Tracking"
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false)
          setTrackingData(null)
        }}
        footer={[
          <Button
            key="close"
            onClick={() => {
              setModalOpen(false)
              setTrackingData(null)
            }}
          >
            Close
          </Button>,
        ]}
        width={600}
      >
        {trackingData ? (
          <div className="space-y-6">
            <Card className="bg-green-50 border-green-200">
              <div className="text-center">
                <Text strong className="text-lg block">
                  Current Status: {trackingData.status}
                </Text>
                <Text type="secondary">Location: {trackingData.location}</Text>
                <br />
                <Text type="secondary">Estimated Delivery: {formatDate(trackingData.estimatedDelivery)}</Text>
              </div>
            </Card>

            <div>
              <Text strong className="text-lg mb-4 block">
                Tracking History
              </Text>
              <Timeline
                items={trackingData.updates.map((update: any, index: number) => ({
                  dot: index === 0 ? <ClockCircleOutlined className="text-primary-500" /> : undefined,
                  color: index === 0 ? colors.primary[500] : "gray",
                  children: (
                    <div>
                      <Text strong>{update.status}</Text>
                      <br />
                      <Text type="secondary">{formatDate(update.date)}</Text>
                      <br />
                      <Text type="secondary">{update.location}</Text>
                      <br />
                      <Text>{update.description}</Text>
                    </div>
                  ),
                }))}
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Spin size="large" />
            <br />
            <Text type="secondary">Loading tracking information...</Text>
          </div>
        )}
      </Modal>
    </>
  )
}
