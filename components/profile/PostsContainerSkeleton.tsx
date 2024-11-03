import { Skeleton } from "../ui/skeleton";

const PostsContainerSkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-1 sm:gap-4 w-full">
      <Skeleton className="w-[275px] h-[275px] border" />
      <Skeleton className="w-[275px] h-[275px] border" />
      <Skeleton className="w-[275px] h-[275px] border" />
      <Skeleton className="w-[275px] h-[275px] border" />
      <Skeleton className="w-[275px] h-[275px] border" />
      <Skeleton className="w-[275px] h-[275px] border" />
    </div>
  );
};

export default PostsContainerSkeleton;
