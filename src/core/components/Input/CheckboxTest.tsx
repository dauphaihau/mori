import { forwardRef, InputHTMLAttributes, useEffect, useState } from "react";
import is from "@sindresorhus/is";
import Button from "../Button/Button";

// interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
interface CheckboxProps {
  name?: string
  label?: string
  classes?: string
  classesForm?: string
  register?: (name: string) => void
  checked?: boolean
  value: string
  ref?: any
  onChange?: (isChecked: boolean) => void
  defaultChecked?: boolean
}

const CheckboxTest = forwardRef((props: CheckboxProps, ref) => {
    const {
      value = '',
      checked,
      classes = '',
      classesForm = '',
      defaultChecked,
      name ,
      label = '',
      onChange,
      ...others
    } = props;

    const [isChecked, setIsChecked] = useState(defaultChecked)

    useEffect(() => {
      // setIsChecked(defaultChecked)
      if (onChange) {
        onChange(isChecked)
      }
    }, [isChecked])

    return (
      <div
        onClick={() => setIsChecked(!isChecked)}
        className={`form-checkbox-input ${classesForm}`}
      >
        <input
          type="checkbox"
          name={name}
          id={value}
          ref={ref}
          value={value}
          checked={isChecked}
          className={classes}
          onChange={e => {
            setIsChecked(e.target.checked);
          }}
          {...others}
        />
        <label htmlFor={value.toString()}>{label}</label>
      </div>
    );
  }
)

CheckboxTest.defaultProps = {
  defaultChecked: false
}

Button.displayName = 'Checkbox';
export default CheckboxTest;
