import { cn } from "core/helpers";

interface SkeletonProps {
  classes: string
  classesWrapper: string
  height: number,
  width: number,
  quantity: number,
  circle: boolean,
}

export const Skeleton = ({
  classes, classesWrapper, height, circle, width, quantity
}: Partial<SkeletonProps>) => {

  const Main = () => (
    // <div className="animate-pulse">
      <div
        style={{ height, width }}
        className={cn('bg-[#dbdbdb]',
          circle ? 'rounded-full' : '',
          classes
        )}
      ></div>
    // </div>
  )

  if (quantity > 1) {
    return (
      <div className={cn("animate-pulse", classesWrapper)}>
        {Array(quantity).fill('').map((_, index) => <Main key={index}/>)}
      </div>
    )
  }

  return (
    <div className={cn("animate-pulse", classesWrapper)}>
      <Main/>
    </div>
  )
}
