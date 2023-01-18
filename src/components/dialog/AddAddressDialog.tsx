import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// import countryOpts from 'assets/data/country.json';
import { Dialog, Button, Text, Checkbox, Input, Select, Box, Grid, Row } from 'core/components';
import { countriesData } from "assets/data/Country";
import { accountService } from "services/account";
import { addressSchema } from "lib/validation/address";
import CheckboxTest from "core/components/Input/CheckboxTest";
import { toast } from "react-hot-toast";

type FormData = Yup.InferType<typeof addressSchema>

const countriesOptions = countriesData.list.map(item => ({
  label: item.country,
  value: item.numberCode
}))

const AddAddressDialog = ({ showAddAddressDialog, setShowAddAddressDialog, mutateAddressList }) => {
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

  const {
    register,
    handleSubmit,
    reset, control,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(addressSchema) });

  useEffect(() => {
    reset()
  }, [showAddAddressDialog])

  async function onSubmit(values: FormData) {
    setIsLoading(true)
    console.log('dauphaihau debug: values', values)
    const { status, message } = await accountService.createAddress(values)
    setIsLoading(false)

    switch (status) {
      case 200:
        toast.success('Create address success!')
        mutateAddressList()
        setShowAddAddressDialog(false)
        break
      // case 401:
      // toast.error(message)
      // break
      default:
        toast.error(message ?? 'Create failed!')
    }

  }

  return (
    <Dialog
      isOpen={showAddAddressDialog}
      closeDialog={setShowAddAddressDialog}
      classes='absolute top-[40%] left-1/2 -translate-x-2/4 -translate-y-2/4'
      noPadding
    >
      <Dialog.Content
        classes='px-6 py-4 lg:p-8'
        closeDialog={setShowAddAddressDialog}
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
            />
            <Grid md={1} lg={2} gapx={4}>
              <Input
                label='City/Town *'
                name='city'
                register={register}
                helperText={errors?.city?.message}
              />
              <Input
                label='Zip/Postcode *'
                name='zipCode'
                register={register}
                helperText={errors?.zipCode?.message}
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
                    helperText={errors?.countryCode?.message}
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
                        label='State *'
                        // label='State / Province *'
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
                    // errors={errors}
                    helperText={errors?.province?.message}
                  />
              }
            </Grid>
            <Controller
              control={control}
              // name='isPrimary'
              // as={<CheckboxTest value={initialValues?.isPrimary} label="Use this address as default." name={}/>}
              name='isPrimary'
              render={({ field: { onChange, value } }) => (
                <CheckboxTest
                  label='Use this address as default.'
                  classesForm='mb-4'
                  // register={register}
                  value={value}
                  // name='isPrimary'
                  onChange={onChange}
                />
              )}
            />
            <Row
              justify='end'
              classes='mt-2'
            >
              <Button
                onClick={() => setShowAddAddressDialog(false)}
                light
                type='button'
                text='Cancel'
                as='text'
              />
              <Button
                classes='w-fit '
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

export default AddAddressDialog;
