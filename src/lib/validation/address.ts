import * as Yup from "yup";

export const addressSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    address1: Yup.string().required('Address 1 is required'),
    city: Yup.string().required('City is required'),
    zipCode: Yup.string().required('Zip code is required'),
    // postalCode: Yup.string().required('Postal code is required'),
    state: Yup.string().when('province', {
      is: (province) => !province,
      then: Yup.string().required('State is required'),
    }),
    province: Yup.string().when('state', {
      is: (state) => !state,
      then: Yup.string().required('Province is required'),
    }),
    countryCode: Yup.string().required('Country is required'),
    phone: Yup.string().required('Phone number is required'),
    isPrimary: Yup.boolean()
  },
  ['province', 'state']
);

