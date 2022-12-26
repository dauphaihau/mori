import { ComponentPropsWithoutRef } from "react";
import { cn } from "core/helpers";
import { ClassValue } from "clsx";

enum COL {
  FIRST = 1,
  SECOND ,
  THIRD ,
  FOUR ,
  FIVE ,
  SIX ,
  SEVEN
}

enum GAP {
  FIRST = 1,
  SECOND ,
  THIRD ,
  FOUR ,
  EIGHT = 8,
}

const COL_SX_MAPS: Record<COL, string> = {
  [COL.FIRST]: 'grid-cols-1',
  [COL.SECOND]: 'grid-cols-2',
  [COL.THIRD]: 'grid-cols-3',
  [COL.FOUR]: 'grid-cols-4',
  [COL.FIVE]: 'grid-cols-5',
  [COL.SIX]: 'grid-cols-6',
  [COL.SEVEN]: 'grid-cols-7',
};
const COL_MD_MAPS: Record<COL, string> = {
  [COL.FIRST]: 'md:grid-cols-1',
  [COL.SECOND]: 'md:grid-cols-2',
  [COL.THIRD]: 'md:grid-cols-3',
  [COL.FOUR]: 'md:grid-cols-4',
  [COL.FIVE]: 'md:grid-cols-5',
  [COL.SIX]: 'md:grid-cols-6',
  [COL.SEVEN]: 'md:grid-cols-7',
};
const COL_LG_MAPS: Record<COL, string> = {
  [COL.FIRST]: 'lg:grid-cols-1',
  [COL.SECOND]: 'lg:grid-cols-2',
  [COL.THIRD]: 'lg:grid-cols-3',
  [COL.FOUR]: 'lg:grid-cols-4',
  [COL.FIVE]: 'lg:grid-cols-5',
  [COL.SIX]: 'lg:grid-cols-6',
  [COL.SEVEN]: 'lg:grid-cols-7',
};
const COL_XL_MAPS: Record<COL, string> = {
  [COL.FIRST]: 'xl:grid-cols-1',
  [COL.SECOND]: 'xl:grid-cols-2',
  [COL.THIRD]: 'xl:grid-cols-3',
  [COL.FOUR]: 'xl:grid-cols-4',
  [COL.FIVE]: 'xl:grid-cols-5',
  [COL.SIX]: 'xl:grid-cols-6',
  [COL.SEVEN]: 'xl:grid-cols-7',
};
const GAP_MAPS: Record<GAP, string> = {
  [GAP.FIRST]: 'gap-1',
  [GAP.SECOND]: 'gap-2',
  [GAP.THIRD]: 'gap-3',
  [GAP.FOUR]: 'gap-4',
  [GAP.EIGHT]: 'gap-8',
};
const GAP_X_MAPS: Record<GAP, string> = {
  [GAP.FIRST]: 'gap-x-1',
  [GAP.SECOND]: 'gap-x-2',
  [GAP.THIRD]: 'gap-x-3',
  [GAP.FOUR]: 'gap-x-4',
  [GAP.EIGHT]: 'gap-x-8',
};
const GAP_Y_MAPS: Record<GAP, string> = {
  [GAP.FIRST]: 'gap-y-1',
  [GAP.SECOND]: 'gap-y-2',
  [GAP.THIRD]: 'gap-y-3',
  [GAP.FOUR]: 'gap-y-4',
  [GAP.EIGHT]: 'gap-y-8',
};

type GridProps = {
  sx: number,
  md: number,
  lg: number,
  xl: number,
  gap: number,
  gapx: number,
  gapy: number,
  classes: string | ClassValue[],
} & ComponentPropsWithoutRef<'div'>

const Grid = ({
  gap, classes, children,
  sx, md, lg, xl, gapx, gapy,
  ...others
}: Partial<GridProps>) => {

  return (
    <div
      className={cn('grid',
        GAP_MAPS[gap],
        COL_SX_MAPS[sx],
        COL_MD_MAPS[md],
        COL_LG_MAPS[lg],
        COL_XL_MAPS[xl],
        GAP_X_MAPS[gapx],
        GAP_Y_MAPS[gapy],
        cn(classes)
      )}
      {...others}
    >
      {children}
    </div>
  );
}

Grid.displayName = 'Grid';
export default Grid;
