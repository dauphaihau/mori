import {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useState
} from 'react';
import { EyeIcon, EyeOffIcon, XCircleIcon } from '@heroicons/react/outline';
import { FieldErrors } from 'react-hook-form';

import { clns, isEmpty } from 'core/helpers';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string,
  label?: string,
  classes?: string,
  classesSpace?: string,
  register?: (name: string, others) => void,
  // onChange?: (name, value) => void;
  // onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  clearable?: boolean,
  defaultValue?: string,
  errors?: FieldErrors,
  contentLeft?: ReactNode,
  contentRight?: ReactNode,
  ref?: any,
  Password?: ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const {
      type = 'text',
      label, name = '',
      register = () => {},
      onChange = (n, v) => {},
      errors, clearable,
      defaultValue,
      className, classes, placeholder,
      classesSpace, contentLeft, contentRight,
      ...others
    } = props;

    const [value, setValue] = useState<string | null>('')
    // const [value, setValue] = useState<string | Dispatch<SetStateAction<string>>>('')

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

    return (
      <div className='form-input'>
        {label && <label htmlFor={name}>{label}</label>}
        <div className={clns('input group', classesSpace)}>
          {
            <span className='input__contentLeft'>
              {/*<Text span classes={`input__contentLeft ${isEmpty(errors) ? 'top-[18px]' : 'top-[-5px]'} `}>*/}
              {contentLeft}
            </span> ?? ''
          }

          {clearable && value?.length > 0 ?
            <button
              type='button'
              // onClick={() => {}}
              className={clns('input__contentRight animate', isEmpty(errors) ? '' : 'top-[-5px]')}
            >
              {/*}} className={clns('input__contentRight animate', isEmpty(errors) ? 'top-[18px]' : 'top-[-5px]')}>*/}
              <XCircleIcon
                className='clear-icon'
                onClick={() => setValue('')}
              />
            </button> : ''
          }

          {
            <span className={clns('input__contentRight', isEmpty(errors) ? 'top-[18px]' : 'top-[-5px]')}>
              {contentRight}
            </span> ?? ''
          }

          {/*{...register(name)}*/}
          <input
            autoFocus={false}
            ref={ref}
            type={type}
            value={value}
            name={name}
            onChange={handleOnChange}
            {...register(name, {
              onChange: (e) => handleOnChange(e),
              onBlur: (e) => {},
            })}
            // ${className}
            className={`peer  py-2.5 pr-2.5
            md:pr-5 
           ${contentLeft ? 'md:pl-8' : 'md:px-5'}
           ${classes}
          `}
            // ${contentLeft && '!pl-7'}
            placeholder={placeholder}
            {...others}
          />
        </div>
        {errors && <p className='text-red-500 text-[0.9rem] mt-2'>{errors[name]?.message}</p>}
      </div>
    );
  }
)

const Password = (props: InputProps) => {
  const {
    type = 'password',
    label, name = '',
    register = () => {
    },
    onChange = (name, value) => {
    },
    errors, clearable,
    className, classes, placeholder,
    classesSpace, contentLeft,

    // contentRight,
    ...others
  } = props;

  const [typeInput, setTypeInput] = useState(type)

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
        {clearable ?
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
              typeInput === 'password' ? (
                <EyeIcon
                  onClick={() => setTypeInput('text')}
                  className='h-6 w-6 mt-[25px] cursor-pointer'
                />
              ) : (
                <EyeOffIcon
                  onClick={() => setTypeInput('password')}
                  className='h-6 w-6 mt-[25px] cursor-pointer'
                />
              )
            }
          </span> ?? ''
        }
        <input
          autoFocus={false}
          // type={typeInput}
          value={value}
          // name={name}
          // placeholder={placeholder}
          onChange={handleOnChange}
          {...register(name, {
            onChange: (e) => handleOnChange(e),
            onBlur: (e) => {},
          })}
          className={clns('peer p-4', className, classes,
            contentLeft && '!pl-7'
          )}
          {...others}
        />
        {errors && <p className='text-red-500 text-[0.9rem] mt-2'>{errors[name]?.message}</p>}
      </div>
    </div>
  );
}

Input.displayName = 'Input';

Input.Password = Password;
export default Input;
