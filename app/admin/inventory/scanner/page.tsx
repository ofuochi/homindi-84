"use client"

import { useState, useRef } from "react"
import { Card, Button, Input, Table, Space, Typography, Alert, Row, Col, Statistic, Tag } from "antd"
import {
  ScanOutlined,
  CameraOutlined,
  PlusOutlined,
  MinusOutlined,
  SaveOutlined,
  HistoryOutlined,
  BarcodeOutlined,
} from "@ant-design/icons"

const { Title, Text } = Typography

export default function BarcodeScannerPage() {
  const [scanning, setScanning] = useState(false)
  const [manualBarcode, setManualBarcode] = useState("")
  const [scannedItems, setScannedItems] = useState<any[]>([])
  const videoRef = useRef<HTMLVideoElement>(null)

  // Mock product database
  const productDatabase = {
    "123456789012": {
      id: "PRD-001",
      name: "Jollof Rice Mix",
      category: "Spices",
      currentStock: 45,
      price: 12.99,
    },
    "123456789013": {
      id: "PRD-002",
      name: "Palm Oil 500ml",
      category: "Oils",
      currentStock: 23,
      price: 8.99,
    },
    "123456789014": {
      id: "PRD-003",
      name: "Plantain Chips",
      category: "Snacks",
      currentStock: 67,
      price: 4.99,
    },
  }

  const handleStartScanning = async () => {
    setScanning(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      setScanning(false)
    }
  }

  const handleStopScanning = () => {
    setScanning(false)
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
    }
  }

  const handleManualEntry = () => {
    if (manualBarcode && productDatabase[manualBarcode as keyof typeof productDatabase]) {
      const product = productDatabase[manualBarcode as keyof typeof productDatabase]
      addScannedItem(manualBarcode, product)
      setManualBarcode("")
    }
  }

  const addScannedItem = (barcode: string, product: any) => {
    const existingItem = scannedItems.find((item) => item.barcode === barcode)
    if (existingItem) {
      setScannedItems((items) =>
        items.map((item) => (item.barcode === barcode ? { ...item, quantity: item.quantity + 1 } : item)),
      )
    } else {
      setScannedItems((items) => [
        ...items,
        {
          key: barcode,
          barcode,
          ...product,
          quantity: 1,
          timestamp: new Date().toLocaleTimeString(),
        },
      ])
    }
  }

  const updateQuantity = (barcode: string, change: number) => {
    setScannedItems((items) =>
      items
        .map((item) => (item.barcode === barcode ? { ...item, quantity: Math.max(0, item.quantity + change) } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const columns = [
    {
      title: "Product",
      key: "product",
      render: (record: any) => (
        <div>
          <div className="font-medium">{record.name}</div>
          <div className="text-xs text-gray-500">{record.id}</div>
        </div>
      ),
    },
    {
      title: "Barcode",
      dataIndex: "barcode",
      key: "barcode",
      render: (barcode: string) => <Text code>{barcode}</Text>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: string) => <Tag>{category}</Tag>,
    },
    {
      title: "Current Stock",
      dataIndex: "currentStock",
      key: "currentStock",
    },
    {
      title: "Scanned Qty",
      key: "quantity",
      render: (record: any) => (
        <Space>
          <Button size="small" icon={<MinusOutlined />} onClick={() => updateQuantity(record.barcode, -1)} />
          <span className="mx-2 font-medium">{record.quantity}</span>
          <Button size="small" icon={<PlusOutlined />} onClick={() => updateQuantity(record.barcode, 1)} />
        </Space>
      ),
    },
    {
      title: "Time Scanned",
      dataIndex: "timestamp",
      key: "timestamp",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: any) => (
        <Button
          size="small"
          danger
          onClick={() => setScannedItems((items) => items.filter((item) => item.barcode !== record.barcode))}
        >
          Remove
        </Button>
      ),
    },
  ]

  const totalItems = scannedItems.reduce((sum, item) => sum + item.quantity, 0)
  const uniqueProducts = scannedItems.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Title level={2} className="mb-2 font-roboto">
          <ScanOutlined className="text-blue-500 mr-2" />
          Barcode Scanner
        </Title>
        <p className="text-gray-600 font-roboto">
          Scan product barcodes to quickly update inventory or process stock movements
        </p>
      </div>

      {/* Scanner Section */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Camera Scanner" className="h-full">
            <div className="text-center space-y-4">
              {!scanning ? (
                <div>
                  <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <CameraOutlined className="text-4xl text-gray-400 mb-2" />
                      <p className="text-gray-500">Camera preview will appear here</p>
                    </div>
                  </div>
                  <Button type="primary" size="large" icon={<CameraOutlined />} onClick={handleStartScanning}>
                    Start Camera Scanner
                  </Button>
                </div>
              ) : (
                <div>
                  <video ref={videoRef} autoPlay playsInline className="w-full h-64 bg-black rounded-lg" />
                  <div className="mt-4 space-x-2">
                    <Button onClick={handleStopScanning}>Stop Scanner</Button>
                    <Button type="primary">Capture Barcode</Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Manual Entry" className="h-full">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Enter Barcode Manually</label>
                <Input
                  size="large"
                  placeholder="Scan or type barcode..."
                  value={manualBarcode}
                  onChange={(e) => setManualBarcode(e.target.value)}
                  prefix={<BarcodeOutlined />}
                  onPressEnter={handleManualEntry}
                />
              </div>
              <Button type="primary" block size="large" onClick={handleManualEntry} disabled={!manualBarcode}>
                Add Product
              </Button>

              <Alert
                message="Quick Test Barcodes"
                description={
                  <div className="space-y-1 mt-2">
                    <div>123456789012 - Jollof Rice Mix</div>
                    <div>123456789013 - Palm Oil 500ml</div>
                    <div>123456789014 - Plantain Chips</div>
                  </div>
                }
                type="info"
                showIcon
              />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Stats */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Total Items Scanned"
              value={totalItems}
              prefix={<ScanOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Unique Products"
              value={uniqueProducts}
              prefix={<BarcodeOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Session Time"
              value="00:05:23"
              prefix={<HistoryOutlined />}
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Scanned Items */}
      <Card
        title="Scanned Items"
        extra={
          <Space>
            <Button icon={<SaveOutlined />} type="primary" disabled={scannedItems.length === 0}>
              Save Session
            </Button>
            <Button onClick={() => setScannedItems([])} disabled={scannedItems.length === 0}>
              Clear All
            </Button>
          </Space>
        }
      >
        {scannedItems.length === 0 ? (
          <div className="text-center py-8">
            <ScanOutlined className="text-4xl text-gray-300 mb-4" />
            <p className="text-gray-500">No items scanned yet. Start scanning to see results here.</p>
          </div>
        ) : (
          <Table columns={columns} dataSource={scannedItems} pagination={false} scroll={{ x: 800 }} />
        )}
      </Card>
    </div>
  )
}
