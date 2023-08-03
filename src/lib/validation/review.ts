import * as Yup from "yup";

export const addressSchema = Yup.object().shape({
    description: Yup.string().required('Review is required'),
    phone: Yup.string().required('Phone number is required'),
});

