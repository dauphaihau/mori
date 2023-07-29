import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Dialog, Button, Text, Checkbox, Input, Select, Box, Grid, Row } from 'core/components';
import { countriesData } from "assets/data/Country";
import { accountService } from "services/account";
import { addressSchema } from "lib/validation/address";
import CheckboxTest from "core/components/Input/CheckboxTest";
import { toast } from "react-hot-toast";
import { omitFieldNullish } from "core/helpers";

type FormData = Yup.InferType<typeof addressSchema>

const countriesOptions = countriesData.list.map(item => ({
  label: item.country,
  value: item.numberCode
}))

const UpdateAddressDialog = ({
  showUpdateAddressDialog, setShowUpdateAddressDialog, mutateAddressList, initialValues
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [states, setStates] = useState([])
  const [countryCode, setCountryCode] = useState('')

  const formOptions = {
    defaultValues: initialValues,
    resolver: yupResolver(addressSchema),
    shouldUnregister: false
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    getValues,
    clearErrors,
    setError,
    formState: { errors }
  } = useForm<FormData>(formOptions);

  useEffect(() => {
    if (showUpdateAddressDialog) {
      const fields = ['name', 'address1', 'address2', 'city', 'zipCode', 'postalCode', 'countryCode', 'province', 'state', 'phone', 'isPrimary',]
      fields.forEach(key => setValue(key as never, initialValues[key] as never))

      const currentCountryCode = initialValues.countryCode
      console.log('dauphaihau debug: current-country-code', currentCountryCode)

      if (currentCountryCode) {
        const country = countriesData.list.find(item => item.numberCode === currentCountryCode)
        if (country.states.length > 0) {
          const statesOptions = country.states.map(nameState => ({
            label: nameState,
            value: nameState
          }))
          setStates(statesOptions)
        }
      }
    }

    // return () => reset()
    return () => clearErrors()
  }, [showUpdateAddressDialog, initialValues])

  useEffect(() => {
    const countryCodeSelected = countryCode
    const previousValues = getValues()
    if (countryCodeSelected) {
      const country = countriesData.list.find(item => item.numberCode === countryCodeSelected)
      if (country.states.length > 0) {
        const statesOptions = country.states.map(nameState => ({
          label: nameState,
          value: nameState
        }))
        setStates([{ label: '', value: '' }, ...statesOptions])
        previousValues.countryCode = countryCodeSelected
        previousValues.state = ''
        reset(previousValues)
      }
    }
  }, [countryCode])

  useEffect(() => {
    console.log('dauphaihau debug: errors', errors)

    // const previousValues = getValues()
    // previousValues.countryCode = countryCode
    // previousValues.state = ''
    // reset(previousValues)
    // console.log('dauphaihau debug: previous-values', previousValues)
    // reset(previousValues)
    // setError('state', 'is empty')

  // },[errors])
  },[errors?.state?.message])

  async function onSubmit(values: FormData) {
    console.log('dauphaihau debug: values', values)

    // setIsLoading(true)
    const { address2, ...required } = values;
    const omitted = omitFieldNullish(required);
    console.log('dauphaihau debug: omitted', omitted)
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
                helperText={errors?.name?.message}
              />
              <Input
                label='Phone/Mobile *'
                name='phone'
                register={register}
                helperText={errors?.phone?.message}
              />
            </Grid>
            <Input
              label='Address 1 *'
              name='address1'
              register={register}
              helperText={errors?.address1?.message}
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
                // @ts-ignore
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
                    // @ts-ignore
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
              // @ts-ignore
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
                variant='text'
                type='button'
                light
                onClick={(e) => {
                  e.preventDefault()
                  setShowUpdateAddressDialog(false)
                }}
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

export default UpdateAddressDialog;
