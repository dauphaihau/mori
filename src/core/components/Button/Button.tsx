import { ComponentPropsWithoutRef, forwardRef, ReactNode } from "react";
import { Loading } from "../Loading";
import { cn, createMaps } from "core/helpers";

const VARIANT_MAPS = createMaps({
  gray: 'bg-gray-custom-50 text-primary-black hover:bg-gray-custom-52 animate hover:text-primary-black',
  warning: 'bg-red-custom-500 text-white hover:opacity-80 animate',
  info: 'bg-[#3177ce] text-white hover:opacity-80 animate',
})

const SIZE_MAPS = createMaps({
  sm: 'lg:py-2 lg:px-2',
  md: '',
  lg: 'lg:py-4 lg:px-4',
  xl: 'lg:py-6 lg:px-6',
})

type ButtonProps = {
  classes: string
  shadow: boolean
  size: keyof typeof SIZE_MAPS
  variant: keyof typeof VARIANT_MAPS
  light: boolean
  icon: ReactNode
  iconRight: ReactNode
  width: 'full' | 'fit'
  isLoading: boolean
  text: string | number | ReactNode
} & ComponentPropsWithoutRef<'button'>

const Button = forwardRef((props: Partial<ButtonProps>, ref: any) => {
  const {
    type = 'button', classes = '',
    width = '', icon = '', iconRight = '',
    children, size = 'md', light = '',
    text, shadow = '', variant = '',
    isLoading = false,
    disabled: buttonDisabled,
    ...others
  } = props

  const disabled = isLoading || buttonDisabled

  return (
    <button
      disabled={disabled}
      className={cn('btn',
        shadow ? 'drop-shadow-xl' : '',
        width === 'fit' ? 'w-fit' : '' || width === 'full' ? 'w-full' : '',
        SIZE_MAPS[size],
        VARIANT_MAPS[variant],
        isLoading ? 'opacity-30 hover:opacity-30' : '',
        light && 'bg-transparent text-primary-black hover:text-primary-black hover:opacity-70',
        disabled ? 'opacity-30 hover:opacity-30' : '',
        classes,
      )}
      {...others}
      ref={ref}
    >
      {icon && <span className='btn__icon'>{icon}</span>}
      {isLoading && <Loading className='mr-4'/>}
      {children || text}
    </button>
  )
})

Button.displayName = 'Button';
export default Button;
