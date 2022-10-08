import { ReactNode } from "react";
import { clns } from "../helpers";

// enum Transforms {
//   'uppercase',
//   'lowercase',
// }

enum Transforms {
  UPPERCASE = 'uppercase',
  LOWERCASE = 'lowercase',
}

enum FONT_WEIGHT {
  BOLD = 'bold',
  LIGHT = 'light',
  SEMIBOLD = 'semibold',
}

const FONT_WEIGHT_MAP: Record<FONT_WEIGHT, string> = {
  [FONT_WEIGHT.BOLD]: 'font-bold',
  [FONT_WEIGHT.LIGHT]: 'font-light',
  [FONT_WEIGHT.SEMIBOLD]: 'font-semibold',
};

interface TextType {
  children: ReactNode,
  classes: string
  transforms: 'uppercase' | 'lowercase',
  color: string,
  weight: string
  noDarkMode: boolean,
  h1: boolean,
  h2: boolean,
  h3: boolean,
  h4: boolean,
  h5: boolean,
  h6: boolean,
  b: boolean,
  label: boolean,
  hideIf: boolean,
  i: boolean,
  span: boolean,
  size: string | number,
  as: 'button',
  text: string | number | ReactNode,
  onClick: () => any,
  noSelect: boolean
}

const Text = (props: Partial<TextType>) => {

  const {
    children, classes, color, as, transforms = '', b, noDarkMode, size, hideIf,
    noSelect,
    weight, h1, h2, h3, h4, h5, h6, span, label, i, text, ...others
  } = props

  const allClass = clns(
    noDarkMode ? 'dark:text-black' : 'dark:text-white',
    Transforms[transforms.toUpperCase()],
    FONT_WEIGHT_MAP[weight],
    as === 'button' && 'cursor-pointer',
    noSelect && 'select-none',
    classes
  )

  if (hideIf) return null

  if (h1) return <h1 style={{ fontSize: size }} className={allClass} {...others}>{children || text}</h1>
  if (h2) return <h2 style={{ fontSize: size }} className={allClass} {...others}>{children || text}</h2>
  if (h3) return <h3 style={{ fontSize: size }} className={allClass} {...others}>{children || text}</h3>
  if (h4) return <h4 style={{ fontSize: size }} className={allClass} {...others}>{children || text}</h4>
  if (h5) return <h5 style={{ fontSize: size }} className={allClass} {...others}>{children || text}</h5>
  if (h6) return <h6 style={{ fontSize: size }} className={allClass} {...others}>{children || text}</h6>
  if (i) return <i style={{ fontSize: size }} className={allClass} {...others}>{children || text}</i>
  if (label) return <label style={{ fontSize: size }} className={allClass} {...others}>{children || text}</label>
  if (span) return <span style={{ fontSize: size }} className={allClass} {...others}>{children || text}</span>
  if (b) return <b style={{ fontSize: size }} className={allClass} {...others}>{children || text}</b>
  return (<p style={{ fontSize: size }} className={allClass} {...others}>{children || text}</p>);
}

export default Text;
