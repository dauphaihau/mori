import { ComponentPropsWithoutRef, forwardRef, ReactNode } from "react";
import { Loading } from "../Loading";
import { clns } from "core/helpers";

type ButtonProps = {
  classes: string,

  shadow: boolean,
  size: 'sx' | 'sm' | 'md' | 'lg' | 'xl',
  light: boolean,
  variant: 'gray' | 'warning' | 'info',
  icon: ReactNode,
  iconRight: ReactNode,
  width: 'full' | 'fit',
  isLoading: boolean,
  text: string | number | ReactNode,
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
      // type={type}
      disabled={disabled}
      className={clns('btn',
        shadow ? 'drop-shadow-xl' : '',
        width === 'fit' ? 'w-fit' : '' || width === 'full' ? 'w-full' : '',
        size === 'sm' ? 'lg:py-2 lg:px-2' : '',
        size === 'lg' ? 'lg:py-4 lg:px-4' : '',
        size === 'xl' ? 'lg:py-6 lg:px-6' : '',
        isLoading ? 'opacity-[0.3] hover:opacity-[0.3]' : '',
        light && 'bg-transparent text-primary-black hover:text-primary-black hover:opacity-70',
        variant === 'gray' ? 'bg-gray-custom-50 text-primary-black hover:bg-gray-custom-52 animate hover:text-primary-black' : '',
        variant === 'warning' ? 'bg-red-custom-500 text-white hover:opacity-80 animate' : '',
        variant === 'info' ? 'bg-[#3177ce] text-white hover:opacity-80 animate' : '',
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
