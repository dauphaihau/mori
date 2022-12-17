import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from 'core/helpers';
import { ClassValue } from "clsx";

enum GAP {
  FIRST = 1,
  SECOND,
  THIRD,
  FOUR,
  EIGHT = 8,
}

enum SPACE {
  START = 'start',
  END = 'end',
  CENTER = 'center',
  BETWEEN = 'between',
  AROUND = 'around',
}

const GAP_MAPS: Record<GAP, string> = {
  [GAP.FIRST]: 'gap-1',
  [GAP.SECOND]: 'gap-2',
  [GAP.THIRD]: 'gap-3',
  [GAP.FOUR]: 'gap-4',
  [GAP.EIGHT]: 'gap-8',
};

const JUSTIFY_MAPS: Record<SPACE, string> = {
  [SPACE.CENTER]: 'justify-center',
  [SPACE.BETWEEN]: 'justify-between',
  [SPACE.AROUND]: 'justify-around',
  [SPACE.END]: 'justify-end',
  [SPACE.START]: 'justify-start',
};

const ALIGN_ITEM_MAPS: Record<SPACE, string> = {
  [SPACE.CENTER]: 'items-center',
  [SPACE.BETWEEN]: 'items-between',
  [SPACE.AROUND]: 'items-around',
  [SPACE.END]: 'items-end',
  [SPACE.START]: 'items-start',
};

const ALIGN_SELF_MAPS: Record<SPACE, string> = {
  [SPACE.START]: 'self-start',
  [SPACE.END]: 'self-end',
  [SPACE.CENTER]: 'self-center',
  [SPACE.BETWEEN]: '',
  [SPACE.AROUND]: '',
};

type ColType = {
  gap: number,
  justify: 'center' | 'between' | 'around',
  align: 'center' | 'between' | 'around',
  content: 'center' | 'between' | 'around',
  self: 'center' | 'start' | 'end',
  wrap: 'wrap' | 'reverse' | 'around',
  reverse: boolean
  classes: string | ClassValue[],
} & ComponentPropsWithoutRef<'div'>

const Col = ({
  children, classes, gap, justify, align, content, wrap, reverse, self, ...others
}: Partial<ColType>) => {
  return (
    <div
      className={cn('flex flex-col',
        GAP_MAPS[gap],
        JUSTIFY_MAPS[justify],
        ALIGN_ITEM_MAPS[align],
        ALIGN_SELF_MAPS[self],
        reverse && 'flex-col-reverse',
        cn(classes)
      )}
      {...others}
    >
      {children}
    </div>
  );
}

export default Col;
