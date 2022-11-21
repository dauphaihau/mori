import { ReactNode } from "react";
import { cn } from "../helpers";

interface TooltipType {
  content: string,
  classes?: string,
  children: ReactNode,
}

const Tooltip = (props: TooltipType) => {
  const { content = '', children, classes } = props;
  return (
    <div className="relative flex flex-row group w-full">
      <div
        className={cn('hidden group-hover:block ',
          // 'z-10 absolute mx-auto left-0 right-0 text-center',
          'z-10 absolute top-0 left-0',
          // 'z-10 absolute right-[-6px] bottom-[110%]',
          'bg-black text-white text-xs rounded py-1 px-2',
        )}
      >
        {content}
        <svg className="absolute text-black h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255">
          <polygon className="fill-current" points="0,0 127.5,127.5 255,0"/>
        </svg>
      </div>
      {children}
    </div>
  );
}

export default Tooltip;
