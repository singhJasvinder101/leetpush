import { Card, CardContent, CardHeader } from "./ui/card"

const SkeletonCard = () => (
  <Card className="modern-card animate-slide-up">
    <CardHeader className="pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 skeleton rounded-xl"></div>
          <div className="w-48 h-6 skeleton rounded"></div>
        </div>
        <div className="w-16 h-6 skeleton rounded-full"></div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <div className="w-full h-4 skeleton rounded"></div>
        <div className="w-3/4 h-4 skeleton rounded"></div>
        <div className="w-5/6 h-4 skeleton rounded"></div>
        <div className="w-2/3 h-4 skeleton rounded"></div>
      </div>
    </CardContent>
  </Card>
)

export default SkeletonCard