import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const UserCardSkeleton = () => (
  <Card className="bg-background border-slate-600">
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
          </div>
        </div>
        <Skeleton className="w-5 h-5 rounded-full" />
      </div>
    </CardHeader>

    <CardContent className="space-y-3">
      <div className="flex items-center gap-2">
        <Skeleton className="w-4 h-4" />
        <Skeleton className="h-4 w-full" />
      </div>

      <div className="flex items-center gap-2">
        <Skeleton className="w-4 h-4" />
        <Skeleton className="h-6 w-20" />
      </div>

      <div className="pt-2 border-t border-slate-600">
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>

      <div className="pt-2">
        <Skeleton className="h-3 w-24" />
      </div>
    </CardContent>
  </Card>
);

export default UserCardSkeleton;
