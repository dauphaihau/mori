import {
  forwardRef,
  useState
} from 'react';
import { EyeIcon, EyeOffIcon, XCircleIcon } from '@heroicons/react/outline';

import { cn, isEmpty } from 'core/helpers';
import { InputType } from "./Input";

const InputPassword = forwardRef<HTMLInputElement, InputType>((props: InputType) => {

  const {
    label, name = '',
    register = () => {},
    onChange = (name, value) => {},
    helperText, clearable,
    className, classes, placeholder,
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
      {label && <label htmlFor={name}>{label}</label>}
      <div className={cn('input group', classesSpace)}>
        <div className='input__contentLeft'>{contentLeft}</div>
        <input
          type={showPassword ? '' : 'password'}
          // onChange={handleOnChange}
          className={cn('peer p-4', className, classes,
            contentLeft && '!pl-7'
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
