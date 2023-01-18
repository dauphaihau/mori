import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// import countryOpts from 'assets/data/country.json';
import { useAuth } from 'components/context/authContext';
import { Dialog, Button, Text, Checkbox, Input, Select, Box, Grid, Row } from 'core/components';
// import { countriesOptions } from "assets/data/options";
import { countriesData } from "assets/data/Country";
import { accountService } from "services/account";
import { addressSchema } from "lib/validation/address";
import CheckboxTest from "core/components/Input/CheckboxTest";
import { toast } from "react-hot-toast";
import { omitFieldNullish } from "../../core";
// import { countriesOptions } from "assets/data/options";

type FormData = Yup.InferType<typeof addressSchema>

const countriesOptions = countriesData.list.map(item => ({
  label: item.country,
  value: item.numberCode
}))

const AddressDialog = ({
  showUpdateAddressDialog, setShowUpdateAddressDialog, mutateAddressList, initialValues
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
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

  const formOptions = {
    // defaultValues: initialValues,
    resolver: yupResolver(addressSchema)
  };

  const { register, handleSubmit, reset, control, setValue, formState: { errors } } = useForm<FormData>(formOptions);

  useEffect(() => {
    if (showUpdateAddressDialog) {
      const fields = ['name', 'address1', 'address2', 'city', 'zipCode', 'postalCode', 'countryCode', 'province', 'state', 'phone', 'isPrimary',]
      // fields.forEach(key => setValue(key, initialValues[key]))
      fields.forEach(key => setValue(key as never, initialValues[key] as never))
    }
    return () => {
      reset()
    }
  }, [showUpdateAddressDialog])

  async function onSubmit(values: FormData) {
    setIsLoading(true)
    // console.log('dauphaihau debug: values', values)
    // console.log('dauphaihau debug: initial-values', initialValues)
    // console.log('dauphaihau debug: -values-id-initial-values-id-', { ...values, id: initialValues._id })

    const { address2, ...required } = values;
    const omitted = omitFieldNullish(required);
    omitted.address2 = address2
    omitted.id = initialValues._id

    const { status, message } = await accountService.updateAddress(omitted)
    setIsLoading(false)

    switch (status) {
      case 200:
        toast.success('Update address success!')
        mutateAddressList()
        setShowUpdateAddressDialog(false)
        break
      // case 401:
      // toast.error(message)
      // break
      default:
        toast.error(message ?? 'Update failed!')
    }
  }

  return (
    <Dialog
      isOpen={showUpdateAddressDialog}
      closeDialog={setShowUpdateAddressDialog}
      classes='absolute top-[40%] left-1/2 -translate-x-2/4 -translate-y-2/4'
      noPadding
    >
      <Dialog.Content
        classes='px-6 py-4 lg:p-8'
        closeDialog={setShowUpdateAddressDialog}
      >
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
                register={register}
                // defaultValue={initialValues?.name}
                helperText={errors?.name?.message}
              />
              <Input
                label='Phone/Mobile *'
                name='phone'
                register={register}
                // defaultValue={initialValues?.phone}
                helperText={errors?.phone?.message}
              />
            </Grid>
            <Input
              label='Address 1 *'
              name='address1'
              register={register}
              helperText={errors?.address1?.message}
              // defaultValue={initialValues?.address1}
            />
            <Input
              label='Address 2'
              // label='Apt, Suite, Building'
              name='address2'
              register={register}
              // defaultValue={initialValues?.address2}
            />
            <Grid md={1} lg={2} gapx={4}>
              <Input
                label='City/Town *'
                name='city'
                register={register}
                helperText={errors?.city?.message}
                // defaultValue={initialValues?.city}
              />
              <Input
                label='Zip/Postcode *'
                name='zipCode'
                register={register}
                helperText={errors?.zipCode?.message}
                // defaultValue={initialValues?.zipCode}
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
                    onChange={(option) => {
                      onChange(option.value)
                      setCountryCode(option.value)
                    }}
                    helperText={errors?.countryCode?.message}
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
                        helperText={errors?.state?.message}
                      />
                    )}
                  />
                  :
                  <Input
                    label='Province *'
                    name='province'
                    register={register}
                    helperText={errors?.province?.message}
                    // defaultValue={initialValues?.province}
                  />
              }
            </Grid>
            <Controller
              control={control}
              name='isPrimary'
              render={({ field: { onChange, value } }) => (
                <CheckboxTest
                  label='Use this address as default.'
                  classesForm='mb-4'
                  // register={register}
                  value={value}
                  // name='isPrimary'
                  onChange={onChange}
                  defaultChecked={initialValues?.isPrimary}
                />
              )}
            />
            <Row
              justify='end'
              classes='mt-2'
            >
              <Button
                as='text'
                type='button'
                light
                onClick={() => setShowUpdateAddressDialog(false)}
                text='Cancel'
              />
              <Button
                value='update'
                classes='w-fit '
                isLoading={isLoading}
                type='submit'
                text='Update'
              />
            </Row>
          </Box>
        </Box>
      </Dialog.Content>
    </Dialog>
  );
}

export default AddressDialog;
