import { cn } from "../helpers";

interface SkeletonProps {
  classes: string
  height: number,
  width: number,
  quantity: number,
  circle: boolean,
}

export const Skeleton = ({
  classes, height, circle, width, quantity
}: Partial<SkeletonProps>) => {

  const Main = () => (
    <div className="animate-pulse">
      <div
        style={{ height, width }}
        className={cn('bg-[#dbdbdb]',
          circle ? 'rounded-full' : '',
          classes
        )}
      ></div>
    </div>
  )

  if (quantity > 1) {
    return (
      <div className="animate-pulse">
        {Array(quantity).fill('').map((_, index) => <Main key={index}/>)}
      </div>
    )
  }

  return (
    <div className="animate-pulse">
      <Main/>
    </div>
  )
}
