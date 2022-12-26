import React, { ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "core/helpers";
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

enum WRAP {
  DEFAULT = 'wrap',
  REVERSE = 'reverse',
  NOWRAP = 'nowrap',
}

const WRAP_MAPS: Record<WRAP, string> = {
  [WRAP.DEFAULT]: 'flex-wrap',
  [WRAP.REVERSE]: 'flex-wrap-reverse',
  [WRAP.NOWRAP]: 'flex-nowrap',
};

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

const ALIGN_CONTENT_MAPS: Record<SPACE, string> = {
  [SPACE.START]: 'content-start',
  [SPACE.END]: 'content-end',
  [SPACE.CENTER]: 'content-center',
  [SPACE.BETWEEN]: 'content-between',
  [SPACE.AROUND]: 'content-around',
};

type RowProps = {
  gap: number,
  justify: 'center' | 'between' | 'around' | 'start' | 'end'
  align: 'center' | 'between' | 'around' | 'start' | 'end'
  content: 'center' | 'between' | 'around'
  wrap: 'wrap' | 'reverse' | 'around'
  hideIf: boolean,
  reverse: boolean
  classes: string | ClassValue[],
} & ComponentPropsWithoutRef<'div'>

const Row = forwardRef(({
  children, classes, gap, hideIf, justify, align, content, wrap, reverse, ...others
}: Partial<RowProps>, ref: any) => {

  if (hideIf) return null

  return (
    <div
      ref={ref}
      className={cn('flex',
        GAP_MAPS[gap],
        JUSTIFY_MAPS[justify],
        ALIGN_ITEM_MAPS[align],
        ALIGN_CONTENT_MAPS[content],
        WRAP_MAPS[wrap],
        reverse && 'flex-row-reverse',
        cn(classes),
      )}
      {...others}
    >
      {children}
    </div>
  );
})

export default Row;
