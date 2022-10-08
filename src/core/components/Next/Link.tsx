import NextLink, { LinkProps } from 'next/link';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { clns } from 'core/helpers';

type LinkType = {
  href: string,
  classes?: string,
  className?: string,
  children: ReactNode,
  openNewTab?: boolean;
  disabled?: boolean,
  underline?: boolean,
  hideIf?: boolean,
} & ComponentPropsWithoutRef<'a'> & LinkProps

const Link = (props: LinkType) => {
  const {
    href, children, underline, scroll, openNewTab, hideIf,
    target, classes, className, disabled, ...others
  } = props;

  const isNewTab =
    openNewTab !== undefined
      ? openNewTab
      : href && !href.startsWith('/') && !href.startsWith('#');

  if (disabled) {
    return <>{children}</>
  }

  if (isNewTab) {
    return (
      <a
        target='_blank'
        rel='noopener noreferrer'
        href={href}
        className={clns('cursor-newTab',
          underline && 'underline underline-offset-4 hover:opacity-80',
          classes,
        )}
        {...others}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink
      // className={clns(hideIf && 'hidden')}
      href={href}
      scroll={scroll}
    >
      <a {...others} target={target}
         className={clns(
           underline && 'hover:underline underline-offset-4 decoration-1 hover:opacity-80',
           hideIf && 'hidden',
           classes || className
         )}
      >
        {children}
      </a>
    </NextLink>
  );
}

export default Link
