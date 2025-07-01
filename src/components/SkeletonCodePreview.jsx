import { Card, CardContent, CardHeader } from './ui/card'

const SkeletonCodePreview = () => (
  <Card className="modern-card animate-slide-up">
    <CardHeader className="pb-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 skeleton rounded-xl"></div>
        <div className="w-40 h-6 skeleton rounded"></div>
        <div className="w-20 h-6 skeleton rounded-full"></div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="bg-gray-900 rounded-xl p-4 border border-gray-700 max-h-48">
        <div className="space-y-2">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`h-4 skeleton rounded ${i % 3 === 0 ? 'w-3/4' : i % 2 === 0 ? 'w-5/6' : 'w-2/3'}`}
            ></div>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
)

export default SkeletonCodePreview
