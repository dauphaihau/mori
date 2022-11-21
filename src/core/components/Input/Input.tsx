import {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useState
} from 'react';
import { XCircleIcon } from '@heroicons/react/outline';

import { cn } from 'core/helpers';
import Password from './InputPassword';
import { FieldError } from "react-hook-form";

export interface InputType extends InputHTMLAttributes<HTMLInputElement> {
  name: string,
  label?: string,
  classes?: string,
  classesSpace?: string,
  register?: any
  // onChange?: (name, value) => void;
  // onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  clearable?: boolean,
  defaultValue?: string,
  helperText?: string,
  contentLeft?: ReactNode,
  contentRight?: ReactNode,
  ref?: any,
  Password?: ReactNode
}

const InputDefault = forwardRef<HTMLInputElement, InputType>(
  (props, ref) => {
    const {
      type = 'text',
      label, name = '',
      register = () => {},
      onChange = (n, v) => {},
      helperText = '', clearable,
      defaultValue,
      className, classes,
      classesSpace, contentLeft, contentRight,
      ...others
    } = props;

    const [value, setValue] = useState<string | null>('')

    useEffect(() => setValue(defaultValue), [defaultValue]);

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

    const Clear = () => {
      if (clearable && value?.length > 0) {
        return <button
          onClick={() => setValue('')}
          className='input__contentRight !pointer-events-auto'
        >
          <XCircleIcon className='clear-icon'/>
        </button>
      }
      return null
    }

    return (
      <div className='form-input'>
        {label && <label htmlFor={name}>{label}</label>}
        <div className={cn('input group', classesSpace)}>
          <div className='input__contentLeft'>{contentLeft}</div>
          <div className='input__contentRight'>{contentRight}</div>
          <Clear/>
          <input
            // autoFocus={false}
            ref={ref}
            type={type}
            value={value}
            name={name}
            // onChange={handleOnChange}
            {...register(name, {
              onChange: (e) => handleOnChange(e),
              // onBlur: (e) => {},
            })}
            className={cn('p-2.5 md:pr-5',
              contentLeft ? 'pl-10' : '',
              classes
            )}
            {...others}
          />
        </div>
        {helperText && <p className='text-red-500 text-sm mt-2'>{helperText}</p>}
      </div>
    );
  }
)

const Input = Object.assign({}, InputDefault, { Password })
export default Input;
