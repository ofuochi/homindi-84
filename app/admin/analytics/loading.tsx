import { Spin } from "antd"

export default function AnalyticsLoading() {
  return (
    <div className="flex justify-center items-center h-64">
      <Spin size="large" />
    </div>
  )
}
