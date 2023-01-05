import { ComponentPropsWithoutRef, ReactNode } from 'react';
import NextLink, { LinkProps } from 'next/link';
import { cn } from 'core/helpers';
import { ClassValue } from "clsx";

type LinkType = {
  href: string,
  classes?: string | ClassValue[],
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
          {
            'underline underline-offset-2 hover:opacity-80': underline,
            'hidden': hideIf,
          },
          cn(classes),
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
      <a
        target={target}
        className={cn(
          {
            'hover:underline underline-offset-2 decoration-1 hover:opacity-80': underline,
            'hidden': hideIf,
          },
          cn(classes)
        )}
        {...others}
      >
        {children || text}
      </a>
    </NextLink>
  );
}

export default Link
