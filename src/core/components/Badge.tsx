import React from 'react';
import { clns } from "core/helpers";

const Badge = ({ children, classes, hideIf }) => {
  return (
    <div
      className={clns(
        hideIf && 'hidden'
      )}
    >
     <span
       className={clns(
         'bg-primary-black text-white text-sm font-bold rounded',
         'px-[8px] py-[2px] md:px-[10px] md:py-[5px]',
         // 'px-[8px] py-[2px] rounded',
         classes,
       )}
     >
       {children}
     </span>
    </div>
  );
}

export default Badge;
