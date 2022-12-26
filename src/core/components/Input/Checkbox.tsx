import { forwardRef, InputHTMLAttributes, useEffect, useState } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string,
  label?: string,
  classes?: string,
  classesForm?: string,
  register?: (name: string) => void,
  checked?: boolean,
  value: string,
  ref?: any,
}

const Checkbox = forwardRef((props: CheckboxProps, ref) => {
    const {
      value = '',
      checked,
      classes = '',
      classesForm = '',
      defaultChecked,
      label = '',
      onChange,
      ...others
    } = props;

    const [isChecked, setIsChecked] = useState(defaultChecked)

    useEffect(() => {
      setIsChecked(defaultChecked)
    }, [defaultChecked])

    return (
      <div className={`form-checkbox-input ${classesForm}`}>
        <input
          type="checkbox"
          id={value}
          ref={ref}
          value={value}
          onChange={onChange}
          checked={isChecked}
          className={classes}
          {...others}
        />
        <label for={value}>{label}</label>
      </div>
    );
  }
)

Checkbox.defaultProps = {
  defaultChecked: false
}

export default Checkbox;
