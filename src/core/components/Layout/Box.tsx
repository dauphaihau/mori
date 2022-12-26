import { forwardRef, ReactNode } from "react";
import { cn } from "core/helpers";
import { ClassValue } from "clsx";

interface BoxProps {
  classes: string | ClassValue[],
  children: ReactNode,
  footer: boolean,
  nav: boolean,
  header: boolean,
  main: boolean,
  form: boolean,
  section: boolean,
  aside: boolean,
  blockquote: boolean,
  hideIf: boolean,
  onClick: () => void,
  onSubmit: (event) => void,
  style: object
}

const Box = forwardRef((props: Partial<BoxProps>, ref: any) => {

  const {
    children, classes, hideIf = false,
    footer, nav, header, main, form, section, aside, blockquote,
    ...others
  } = props

  const className = cn(classes)

  if (hideIf) return null

  if (header) return <header ref={ref} className={className} {...others}>{children}</header>
  if (nav) return <nav ref={ref} className={className} {...others}>{children}</nav>
  if (footer) return <footer ref={ref} className={className} {...others}>{children}</footer>
  if (main) return <main ref={ref} className={className} {...others}>{children}</main>
  if (form) return <form ref={ref} className={className} {...others}>{children}</form>
  if (aside) return <aside ref={ref} className={className} {...others}>{children}</aside>
  if (blockquote) return <blockquote ref={ref} className={className} {...others}>{children}</blockquote>
  return (<div ref={ref} className={className} {...others}>{children}</div>);
})

export default Box;
