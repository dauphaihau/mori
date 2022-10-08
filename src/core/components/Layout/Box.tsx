import { forwardRef, ForwardRefRenderFunction, ReactNode } from "react";
import { clns } from "../../helpers";

interface BoxProps {
  // sx: number,
  // md: number,
  // lg: number,
  // gap: number,
  // justify: 'center' | 'between' | 'around',
  // align: 'center' | 'between' | 'around',
  // content: 'center' | 'between' | 'around',
  classes: string,
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
    // gap, justify, align = '',
    footer, nav, header, main, form, section, aside, blockquote,
    ...others
  } = props

  const allClass = clns(
    classes,
  )

  if (hideIf) return null

  if (header) return <header ref={ref} className={allClass} {...others}>{children}</header>
  if (nav) return <nav ref={ref} className={allClass} {...others}>{children}</nav>
  if (footer) return <footer ref={ref} className={allClass} {...others}>{children}</footer>
  if (main) return <main ref={ref} className={allClass} {...others}>{children}</main>
  if (form) return <form ref={ref} className={allClass} {...others}>{children}</form>
  if (aside) return <aside ref={ref} className={allClass} {...others}>{children}</aside>
  if (blockquote) return <blockquote ref={ref} className={allClass} {...others}>{children}</blockquote>
  return (<div ref={ref} className={allClass} {...others}>{children}</div>);
})

export default Box;
