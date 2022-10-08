import {
  forwardRef,
  useState
} from 'react';
import { EyeIcon, EyeOffIcon, XCircleIcon } from '@heroicons/react/outline';

import { clns, isEmpty } from 'core/helpers';
import { InputType } from "./Input";

const InputPassword = forwardRef<HTMLInputElement, InputType>((props: InputType) => {

  const {
    label, name = '',
    register = () => {},
    onChange = (name, value) => {},
    errors, clearable,
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
      <div className={clns('input group', classesSpace)}>
        {label && <label htmlFor={name}>{label}</label>}
        {
          <span
            className={`input__contentLeft ${isEmpty(errors) ? 'top-[18px]' : 'top-[-5px]'} `}
          >
            {contentLeft}
          </span> ?? ''
        }
        {
          clearable ?
            <button
              type='button'
              onClick={() => {
              }}
              className={clns('input__contentRight', isEmpty(errors) ? 'top-[18px]' : 'top-[-5px]')}
            >
              <XCircleIcon
                className='clear-icon'
                onClick={() => setValue('')}
              />
            </button> : ''
        }
        {
          <span className={clns('input__contentRight', isEmpty(errors) ? 'top-[18px]' : 'top-[-5px]')}>
            {
              !showPassword ? (
                <EyeIcon
                  onClick={() => setShowPassword(true)}
                  className='h-6 w-6 mt-[25px] cursor-pointer'
                />
              ) : (
                <EyeOffIcon
                  onClick={() => setShowPassword(false)}
                  className='h-6 w-6 mt-[25px] cursor-pointer'
                />
              )
            }
          </span> ?? ''
        }
        <input
          autoFocus={false}
          type={showPassword ? '' : 'password'}
          // onChange={handleOnChange}
          className={clns('peer p-4', className, classes,
            contentLeft && '!pl-7'
          )}
          {...others}
        />
        {errors && <p className='text-red-500 text-[0.9rem] mt-2'>{errors[name]?.message}</p>}
      </div>
    </div>
  );
})

export default InputPassword
