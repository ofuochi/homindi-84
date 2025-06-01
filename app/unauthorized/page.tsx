"use client"

import { Alert, Button } from "antd"
import { useRouter } from "next/navigation"
import { ArrowLeftOutlined } from "@ant-design/icons"

export default function UnauthorizedPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <span className="text-red-600 text-2xl">🚫</span>
        </div>

        <Alert
          message="Access Denied"
          description="You don't have permission to access this resource. Please contact your administrator if you believe this is an error."
          type="error"
          showIcon
          className="text-left"
        />

        <div className="space-y-3">
          <Button type="primary" icon={<ArrowLeftOutlined />} onClick={() => router.back()} className="w-full">
            Go Back
          </Button>

          <Button type="default" onClick={() => router.push("/dashboard")} className="w-full">
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}
