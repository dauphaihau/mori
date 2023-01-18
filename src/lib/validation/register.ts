import * as Yup from "yup";

export const userRegisterSchema = Yup.object({
  name: Yup.string().min(6, 'Name must be at least 6 characters').max(32, 'Name is too long (maximum is 32 characters)'),
  email: Yup.string()
  .email('Email is invalid')
  .required('Email is required'),
  password: Yup.string()
  .required('Password is required')
  .min(6, 'Password must be at least 6 characters'),
});
