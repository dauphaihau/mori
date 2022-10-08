import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useUIController } from "context/UIControllerContext";
import countryOpts from 'assets/data/country.json';
import { useAuth } from 'context/authContext';
import { Dialog,Button,Text, Checkbox, Input, Select, Box, Grid, Row } from 'core/components';

const AddressDialog = () => {
// const AddressDialog = ({ showAddressDialog, setShowAddressDialog }) => {
  const { user, setUser } = useAuth();
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    addressDetail: '',
    country: '',
    city: '',
    postcode: '',
    state: ''
  })
  const { openAddressModal, closeDrawerModal } = useUIController();

  useEffect(() => {
    // console.log('run effect')
    if (user?.address) {

      // console.log('run effect init value ')
      setAddress({
        name: user?.address.name,
        phone: user?.address.phone,
        addressDetail: user?.address.addressDetail,
        country: user?.address.country,
        city: user?.address.city,
        postcode: user?.address.postcode,
        state: user?.address.state
      })
    } else {
      // console.log('run effect restart')
      setAddress({
        name: '',
        phone: '',
        addressDetail: '',
        country: '',
        city: '',
        postcode: '',
        state: ''
      })
    }
  }, [])

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    address: Yup.string().required('Address is required'),
    phone: Yup.string().required('Phone number is required'),
    email: Yup.string().email('Email is invalid')
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState, setError } = useForm(formOptions);
  const { errors } = formState;

  const handleOnchange = (name, value) => {
    setAddress({ ...address, [name]: value })
    console.log('address', address)
  }

  // console.log('user', user)
  // console.log('address', address)
  // console.log('show-address-dialog', showAddressDialog)

  return (
    <Dialog
      isOpen={openAddressModal}
      closeDialog={closeDrawerModal}
      // isOpen={showAddressDialog}
      // closeDialog={() => setShowDialog(false)}
    >
      <Dialog.Content>
        <Box
          // className='px-6 pb-4 space-y-6 lg:px-8  py-8 xl:pb-8'
        >
          {/*<Grid md={2} gapx={12} classes='mt-12'>*/}
          <Box>
            <Text
              h1
              weight='bold'
              classes='text-xl mb-8'
            >Shipping Address</Text>
            <Grid md={2} lg={2} gapx={4}>
              <Input
                label='Full Name *'
                name='name'
                onChange={handleOnchange}
                register={register}
                defaultValue={address.name}
                errors={errors}
              />
              <Input
                label='Phone/Mobile *'
                name='phone'
                onChange={handleOnchange}
                register={register}
                errors={errors}
                defaultValue={address.phone}
              />
            </Grid>
            <Input
              label='Address *'
              name='addressDetail'
              onChange={handleOnchange}
              register={register}
              errors={errors}
              defaultValue={address.addressDetail}
            />
            <Grid md={1} lg={2} gapx={4}>
              {/*<Input
               label='Email '
               name='email'
               register={register}
               errors={errors}
               />*/}
            </Grid>
            <Select
              name='country'
              label='Country'
              size='medium'
              options={countryOpts}
              // onChange={(e) => console.log(e.value)}
              onChange={(e) => handleOnchange('country', e.value)}
            />
            <Grid md={1} lg={3} gapx={4}>
              <Input
                label='City/Town *'
                name='city'
                onChange={handleOnchange}
                register={register}
                errors={errors}
                defaultValue={address.city}
              />
              <Input
                label='Zip/Postcode *'
                name='postcode'
                onChange={handleOnchange}
                register={register}
                errors={errors}
                defaultValue={address.postcode}
              />
              <Input
                label='State *'
                name='state'
                onChange={handleOnchange}
                register={register}
                errors={errors}
                defaultValue={address.state}
              />
            </Grid>
            <Checkbox
              label='Use this address as default.'
              classesForm='mb-4'
            />
            {/*<Textarea*/}
            {/*  register={register} errors={errors}*/}
            {/*  label='Order Notes (Optional)'*/}
            {/*  name='note'*/}
            {/*  rows={5}*/}
            {/*  className='mb-6'*/}
            {/*  placeholder='Notes about your order, e.g. special notes for delivery'*/}
            {/*/>*/}
            <Row
              justify='end'
              classes='mt-2'
            >
              <Button
                type='button'
                light
                // onClick={() => setShowDialog(false)}
                onClick={closeDrawerModal}
                text='Cancel'
              />
              <Button
                classes='w-fit '
                onClick={() => {
                  // localStorage.removeItem('COFFIN_ECOMMERCE');
                  setUser({ ...user, address, numberAllOfItemsInCart: 0 });
                  closeDrawerModal();
                  // setUser({...user, numberAllOfItemsInCart: 0})
                }}
                text='Save'
                // text='Deliver to this Address'
              />
            </Row>
          </Box>
        </Box>
      </Dialog.Content>
    </Dialog>
  );
}

export default AddressDialog;
