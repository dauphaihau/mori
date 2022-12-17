import { ReactNode } from "react";
import { cn, createMaps } from "core/helpers";

const FONT_WEIGHT_MAP = createMaps({
  bold: 'font-bold',
  light: 'font-light',
  semibold: 'font-semibold',
})

interface TextProps {
  children: ReactNode
  classes: string
  transforms: 'uppercase' | 'lowercase' | 'capitalize'
  color: string
  weight: keyof typeof FONT_WEIGHT_MAP
  h1: boolean
  h2: boolean
  h3: boolean
  h4: boolean
  h5: boolean
  h6: boolean
  b: boolean
  label: boolean
  hideIf: boolean
  i: boolean
  span: boolean
  size: string | number
  as: 'button'
  text: string | number | ReactNode
  onClick: () => any
  noSelect: boolean
}

const Text = (props: Partial<TextProps>) => {

  const {
    children, classes, color, as, transforms = '', b, size, hideIf,
    noSelect,
    weight = '', h1, h2, h3, h4, h5, h6, span, label, i, text, ...others
  } = props

  const className = cn(
    transforms,
    FONT_WEIGHT_MAP[weight],
    {
      'cursor-pointer': as === 'button',
      'select-none': noSelect
    },
    classes
  )

  if (hideIf) return null

  if (h1) return <h1 style={{ fontSize: size }} className={className} {...others}>{children || text}</h1>
  if (h2) return <h2 style={{ fontSize: size }} className={className} {...others}>{children || text}</h2>
  if (h3) return <h3 style={{ fontSize: size }} className={className} {...others}>{children || text}</h3>
  if (h4) return <h4 style={{ fontSize: size }} className={className} {...others}>{children || text}</h4>
  if (h5) return <h5 style={{ fontSize: size }} className={className} {...others}>{children || text}</h5>
  if (h6) return <h6 style={{ fontSize: size }} className={className} {...others}>{children || text}</h6>
  if (i) return <i style={{ fontSize: size }} className={className} {...others}>{children || text}</i>
  if (label) return <label style={{ fontSize: size }} className={className} {...others}>{children || text}</label>
  if (span) return <span style={{ fontSize: size }} className={className} {...others}>{children || text}</span>
  if (b) return <b style={{ fontSize: size }} className={className} {...others}>{children || text}</b>
  return (<p style={{ fontSize: size, display: "block" }} className={className} {...others}>{children || text}</p>);
}

export default Text;
