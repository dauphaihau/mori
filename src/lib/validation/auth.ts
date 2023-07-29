import * as Yup from "yup";

export const userAuthSchema = Yup.object({
  // name: Yup.string()
  // .required('Full Name is required')
  // .min(6, 'Full Name must be at least 6 characters')
  // .max(32, 'Full Name is too long (maximum is 32 characters)'),
  email: Yup.string()
  .email('Email is invalid')
  .required('Email is required'),
  password: Yup.string()
  .required('Password is required')
  .min(6, 'Password must be at least 6 characters'),
});

