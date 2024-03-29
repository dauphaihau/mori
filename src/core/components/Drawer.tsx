import { ComponentPropsWithoutRef, ReactNode, useEffect } from "react";
import { XIcon } from "@heroicons/react/solid";

import Portal from "./Portal";
import { cn } from "core/helpers";

let blackTheme = false;

type DrawerProps = {
  show: boolean,
  children: ReactNode,
  theme?: string,
  zIndex?: number,
  classes?: string,
  onClose?: () => void
} & ComponentPropsWithoutRef<'aside'>

const Drawer = ({
  children,
  classes = '',
  theme = '',
  show,
  onClose = () => {},
  ...others
}: DrawerProps) => {
  blackTheme = theme === 'black';

  useEffect(() => {
    if (show) {
      document.getElementsByTagName('body')[0].style.overflow = "hidden";
    }
    return () => {
      document.getElementsByTagName('body')[0].style.overflow = "auto";
    }
  }, [show])

  // if (!show) return null;
  return (
    <Portal>
      <div
        // onClick={onClose}
        onClick={() => onClose()}
        className={cn('backdrop',
          { 'hidden': !show },
        )}
      />
      <aside
        className={cn('drawer',
          {
            'open': show,
            'bg-primary-black': blackTheme
          },
          classes,
        )}
        {...others}
      >
        <div className='drawer__container'>
          {children}
        </div>
      </aside>
    </Portal>
  )
}

interface HeadProps {
  title: string,
  classes: string,
  children: ReactNode,
  onClose: () => void
}

const Head = ({ title, children, classes, onClose }: Partial<HeadProps>) => {
  if (children) return <>{children}</>;
  return (
    <>
      <div className={cn('drawer__header', classes)}>
        <h1 className={blackTheme ? 'text-white' : ''}>{title}</h1>
        <XIcon
          className={`${blackTheme ? 'text-white' : ''} btn-icon`}
          onClick={() => onClose()}
        />
      </div>
      <div className={cn('border-b', { 'border-gray-200': blackTheme })}></div>
    </>
  );
}

interface FooterProps {
  classes?: string,
  children?: ReactNode,
}

const Body = ({ children, classes }: FooterProps) => {
  return <div className={cn('drawer__body', classes)}>{children}</div>;
}
const Footer = ({ children, classes }: FooterProps) => {
  return <div className={cn('drawer__footer border-t p-4', classes)}>{children}</div>;
}

Drawer.Head = Head;
Drawer.Body = Body;
Drawer.Footer = Footer;

export default Drawer
