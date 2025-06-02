import { Card, Skeleton } from "antd"

export default function WishlistLoading() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <Skeleton.Button active size="large" className="w-48" />
        <div className="flex gap-2">
          <Skeleton.Button active size="default" className="w-24" />
          <Skeleton.Button active size="default" className="w-24" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, index) => (
          <Card key={index} className="w-full">
            <Skeleton.Image className="w-full h-48" active />
            <Skeleton active paragraph={{ rows: 2 }} />
            <div className="flex justify-between mt-4">
              <Skeleton.Button active size="small" className="w-16" />
              <Skeleton.Button active size="small" className="w-16" />
              <Skeleton.Button active size="small" className="w-16" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
