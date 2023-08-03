import { FieldErrors } from "react-hook-form";
import { InputHTMLAttributes } from "react";

interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  name: string,
  classes?: string,
  required?: boolean,
  label?: string,
  register?: (name: string) => void | object,
  placeholder?: string,
  classNameLabel?: string,
  errors?: FieldErrors,
  type?: string,
  rows?: number,
  helperText?: string,
  description?: string,
}

const Textarea = (props: TextareaProps) => {

  const {
    label, name, required,
    classes = '',
    type = 'text',
    classNameLabel = '',
    placeholder = '',
    helperText = '', description = '',
    register, errors,
    rows = 3,
    ...others
  } = props;

  return (
    <div className={`form-textarea-input ${classes}`}>
      {label && <label>{label} {required && <span>*</span>}</label>}
      {description && <p className='text-red-500 text-sm mt-2'>{helperText}</p>}
      <div className={'input group'}>
        <textarea
          {...others} placeholder={placeholder} rows={rows}
          {...register(name)}
        />
      </div>
      {helperText && <p className='text-red-500 text-sm mt-2'>{helperText}</p>}
    </div>
  );
}

export default Textarea;
