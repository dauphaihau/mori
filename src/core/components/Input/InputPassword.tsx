import {
  forwardRef,
  useState
} from 'react';
import { EyeIcon, EyeOffIcon, XCircleIcon } from '@heroicons/react/outline';

import { cn, isFalsy } from 'core/helpers';
import { InputType } from "./Input";

const InputPassword = forwardRef<HTMLInputElement, InputType>((props: InputType, ref) => {

  const {
    label, name = '',
    register = () => {},
    onChange = (name, value) => {},
    helperText, clearable,
    className, classes,
    classesSpace, contentLeft,

    // contentRight,
    ...others
  } = props;

  const [showPassword, setShowPassword] = useState(false)
  const [value, setValue] = useState<string | null>('')

  const handleOnChange = (e) => {
    try {
      const val = e.target.value;
      const n = e.target.name;
      setValue(val)
      onChange(n, val);
    } catch (e) {
      onChange(name, '');
    }
  };

  return (
    <div className='form-input'>
      {label && <label htmlFor={name} className='font-bold'>{label}</label>}
      <div className={cn('input group', classesSpace)}>
        <div className='input__contentLeft'>{contentLeft}</div>
        <input
          ref={ref}
          type={showPassword ? '' : 'password'}
          // onChange={handleOnChange}
          className={cn('p-2.5 md:pr-5',
            { 'pl-10': contentLeft },
            className, classes
          )}

          {...register(name, {
            onChange: (e) => handleOnChange(e),
            // onBlur: (e) => {},
          })}
          {...others}
        />
        {helperText && <p className='text-red-500 text-sm mt-2'>{helperText}</p>}
      </div>
    </div>
  );
})

export default InputPassword
