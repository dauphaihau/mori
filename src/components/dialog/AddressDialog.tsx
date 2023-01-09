import { Fragment, useEffect, useState } from "react";
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useUIController } from "components/context/UIControllerContext";
// import countryOpts from 'assets/data/country.json';
import { useAuth } from 'components/context/authContext';
import { Dialog, Button, Text, Checkbox, Input, Select, Box, Grid, Row } from 'core/components';
// import { countriesOptions } from "assets/data/options";
import { statesData } from "assets/data/State";
import { countriesData } from "assets/data/Country";
import { IAddress } from "../../types/address";
import { accountService } from "../../services/account";

const validationSchema = Yup.object().shape({
  // name: Yup.string().required('Name is required'),
  // address: Yup.string().required('Address is required'),
  // phone: Yup.string().required('Phone number is required'),
  // email: Yup.string().email('Email is invalid')
});

const countriesOptions = countriesData.list.map(item => ({
  label: item.country,
  value: item.numberCode
}))

const AddressDialog = ({ showAddressDialog, setShowAddressDialog }) => {
  const { user, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [address, setAddress] = useState({
    name: '',
    address1: '',
    address2: '',
    city: '',
    zipCode: '',
    postalCode: '',
    province: '',
    countryCode: '',
    state: '',
    phone: '',
  })
  const [states, setStates] = useState([])
  const [countryCode, setCountryCode] = useState('')

  useEffect(() => {

    // console.log('dauphaihau debug: address', address)
    if (countryCode) {
      // if (address.countryCode) {
      const country = countriesData.list.find(item => item.numberCode === countryCode)
      // const country = countriesData.list.find(item => item.numberCode === address.countryCode)
      setStates([])
      if (country.states.length > 0) {
        const statesOptions = country.states.map(item => ({
          label: item,
          value: item
        }))
        setStates(statesOptions)
      } else {
        setStates([])
      }
    }

  }, [countryCode])

  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register,
    handleSubmit,
    reset,
    formState,
    setError,
    control,
    getValues,
    getFieldState
  } = useForm(formOptions);
  const { errors } = formState;

  const handleOnchange = (name, value) => {
    // const handleOnchange = (e) => {
    //   const name = e.target.name
    //   const value = e.target.value
    setAddress({ ...address, [name]: value })
  }

  async function onSubmit(values: FormData) {
    console.log('dauphaihau debug: values', values)
    setIsLoading(true)
    const res = await accountService.createAddress(values)

    setIsLoading(false)
  }

  return (
    <Dialog
      isOpen={showAddressDialog}
      closeDialog={setShowAddressDialog}
      classes='absolute top-[40%] left-1/2 -translate-x-2/4 -translate-y-2/4'
    >
      <Dialog.Content closeDialog={setShowAddressDialog}>
        <Box>
          <Text
            h1
            weight='bold'
            classes='text-xl mb-8'
          >Shipping Address</Text>

          <Box
            form
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid md={2} lg={2} gapx={4}>
              <Input
                label='Full Name *'
                name='name'
                onChange={handleOnchange}
                register={register}
                defaultValue={address?.name}
                // errors={errors}
              />
              <Input
                label='Phone/Mobile *'
                name='phone'
                onChange={handleOnchange}
                register={register}
                // errors={errors}
                defaultValue={address?.phone}
              />
            </Grid>
            <Input
              label='Address 1 *'
              name='address1'
              onChange={handleOnchange}
              register={register}
              // errors={errors}
              defaultValue={address?.address1}
            />
            <Input
              label='Address 2'
              // label='Apt, Suite, Building'
              name='address2'
              onChange={handleOnchange}
              register={register}
              // errors={errors}
              defaultValue={address?.address2}
            />
            <Grid md={1} lg={2} gapx={4}>
              <Input
                label='City/Town *'
                name='city'
                onChange={handleOnchange}
                register={register}
                // errors={errors}
                defaultValue={address?.city}
              />
              <Input
                label='Zip/Postcode *'
                name='zipCode'
                onChange={handleOnchange}
                register={register}
                // errors={errors}
                defaultValue={address?.zipCode}
              />
            </Grid>
            <Grid md={1} lg={2} gapx={4}>

              <Controller
                control={control}
                name='countryCode'
                render={({ field: { onChange, value } }) => (
                  <Select
                    name='countryCode'
                    label='Country *'
                    size='medium'
                    options={countriesOptions}
                    value={value}
                    // onChange={(option) => onChange(option.value)}
                    onChange={(option) => {
                      onChange(option.value)
                      setCountryCode(option.value)
                    }}
                    // onChange={onChange}
                    // onChange={(e) => handleOnchange('countryCode', e.value)}
                  />
                )}
              />
              {
                states.length > 0 ?
                  <Controller
                    control={control}
                    name='state'
                    render={({ field: { onChange, value } }) => (
                      <Select
                        name='state'
                        label='State / Province *'
                        size='medium'
                        options={states}
                        value={value}
                        // onChange={(e) => console.log(e.value)}
                        // onChange={(e) => handleOnchange('country', e.value)}
                        onChange={(option) => onChange(option.value)}
                      />
                    )}
                  />
                  :
                  <Input
                    label='Province *'
                    name='province'
                    onChange={handleOnchange}
                    register={register}
                    // errors={errors}
                    defaultValue={address?.province}
                  />
              }
            </Grid>
            <Controller
              control={control}
              name='state'
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  label='Use this address as default.'
                  classesForm='mb-4'
                  // register={register}
                  // defaultChecked={true}
                  value={value}
                  name='primary'
                  onChange={onChange}
                  // value={address?.primary}
                />
              )}
            />
            <Row
              justify='end'
              classes='mt-2'
            >
              <Button
                type='button'
                light
                onClick={() => setShowAddressDialog(false)}
                text='Cancel'
              />
              <Button
                classes='w-fit '
                // onClick={() => {
                //   setUser({ ...user, address, numberAllOfItemsInCart: 0 });
                //   setShowAddressDialog(false)
                // }}

                isLoading={isLoading}
                type='submit'
                text='Save'
              />
            </Row>
          </Box>
        </Box>
      </Dialog.Content>
    </Dialog>
  );
}

export default AddressDialog;
