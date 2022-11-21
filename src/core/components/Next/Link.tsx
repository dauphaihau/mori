import NextLink, { LinkProps } from 'next/link';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from 'core/helpers';

type LinkType = {
  href: string,
  classes?: string,
  children?: ReactNode,
  openNewTab?: boolean;
  disabled?: boolean,
  underline?: boolean,
  hideIf?: boolean,
  text?: string | number | ReactNode,
} & ComponentPropsWithoutRef<'a'> & LinkProps

const Link = (props: LinkType) => {
  const {
    href, children, underline, scroll, openNewTab, hideIf, text,
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
        className={cn('cursor-newTab',
          underline && 'underline underline-offset-4 hover:opacity-80',
          classes,
        )}
        {...others}
      >

        {children || text}
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
         className={cn(
           underline && 'hover:underline underline-offset-4 decoration-1 hover:opacity-80',
           hideIf && 'hidden',
           classes || className
         )}
      >

        {children || text}
      </a>
    </NextLink>
  );
}

export default Link
