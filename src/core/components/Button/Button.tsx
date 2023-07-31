import { ComponentPropsWithoutRef, forwardRef, ReactNode } from "react";
import { Loading } from "core/components";
import { cn, createMaps } from "core/helpers";
import { ClassValue } from "clsx";

const VARIANT_MAPS = createMaps({
  gray: 'bg-gray-custom-50 text-primary-black hover:bg-gray-custom-52 animate hover:text-primary-black',
  warning: 'bg-red-custom-500 text-white hover:opacity-80 animate',
  info: 'bg-[#3177ce] text-white hover:opacity-80 animate',
  text: 'bg-transparent text-primary-black hover:text-primary-black hover:opacity-70',
  primary: 'bg-primary-black text-white dark:text-white dark:hover:text-white hover:text-white hover:opacity-80 ',
  secondary: 'bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 font-semibold'
})

const SIZE_MAPS = createMaps({
  sm: 'px-3 min-h-[36px] leading-7 text-sm',
  md: 'p-3 h-[42px]',
  lg: 'p-4 h-[48px]',
  xl: 'p-6',
})

type ButtonProps = {
  classes: string | ClassValue[],
  shadow: boolean
  size: keyof typeof SIZE_MAPS
  variant: keyof typeof VARIANT_MAPS
  light: boolean
  icon: ReactNode
  iconRight: ReactNode
  width: 'full' | 'fit'
  isLoading: boolean
  text: string | number | ReactNode
  as: string
} & ComponentPropsWithoutRef<'button'>

const Button = forwardRef((props: Partial<ButtonProps>, ref: any) => {
  const {
    classes = '',
    width = '', icon = '', iconRight = '',
    children, size = 'sm', light = '',
    text, shadow = '', variant = 'primary',
    isLoading = false,
    disabled: buttonDisabled, as, type,
    ...others
  } = props

  const disabled = isLoading || buttonDisabled

  return (
    <button
      ref={ref}
      disabled={disabled}
      type={type}
      className={cn('btn',
        SIZE_MAPS[size],
        VARIANT_MAPS[variant],
        {
          'bg-transparent text-primary-black hover:text-primary-black hover:opacity-70': light,
          'opacity-30 hover:opacity-30': disabled || isLoading,
          'cursor-wait': isLoading,
          'cursor-not-allow': buttonDisabled,
          'drop-shadow-xl': shadow,
          [`w-${width}`]: width
        },
        cn(classes),
      )}
      {...others}
    >
      {icon && <span className='btn__icon'>{icon}</span>}
      {isLoading && <Loading classes='mr-3'/>}
      {children || text}
    </button>
  )
})

Button.displayName = 'Button';
export default Button;
