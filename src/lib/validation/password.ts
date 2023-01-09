import * as Yup from "yup";

export const updatePasswordSchema = Yup.object().shape({
  password: Yup.string()
  .min(6, 'Password must be at least 6 characters')
  .required('Password is required'),
  newPassword: Yup.string().when(['password'], (password, schema) => {
    return schema.notOneOf([password], "password must be differ from old password")
  }),
  confirmPassword: Yup.string()
  .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
  .required('Confirm Password is required'),
});

export const resetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
  .min(6, 'Password must be at least 6 characters')
  .required('Password is required'),
  confirmPassword: Yup.string()
  .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
  .required('Confirm Password is required'),
});
