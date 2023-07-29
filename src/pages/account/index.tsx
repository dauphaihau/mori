import { useState } from 'react';
import { useRouter } from "next/router";

import {  Text, Box, Button, Grid, Loading } from 'core/components';
import { useAuth } from 'components/context/authContext';
import ChangePasswordDialog from 'components/dialog/ChangePasswordDialog';
import { PATH } from 'config/const';
import AccountLayout from 'components/layout/AccountLayout';
import { usePrimaryAddress } from "services/account";
import SubTitle from "components/pages/account/SubTitle";
import OrderList from "components/pages/account/OrderList";

export default function AccountPage() {
  const { logout, customer } = useAuth();
  const [showDialog, setShowDialog] = useState(false)
  const { isLoading, address } = usePrimaryAddress()
  const router = useRouter();

  const InfoAddress = () => {
    if (isLoading) return <Loading classes='fill-black'/>
    if (address === null) {
      return <Text classes='mb-4'>No addresses are currently saved</Text>
    }
    return (
      <>
        <Text>{address?.name}</Text>
        <Text classes='mb-4'>{address?.address1}</Text>
      </>
    )
  }

  return (
    <>
      <ChangePasswordDialog
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />

      <AccountLayout>
        <Box classes='mb-12'>
          <Text
            as='button'
            transforms='uppercase'
            classes='text-[11px] tracking-widest text-primary-gray hover:text-primary-black mb-6'
            onClick={() => {
              logout()
              router.push(PATH.HOME);
            }}
          >Logout</Text>
          <Text h2 classes='mb-4'>My account</Text>
          <Text classes='mb-4'>Welcome back, {customer?.name}!</Text>
          <Button onClick={() => setShowDialog(true)}>
            Change Pass
          </Button>
        </Box>

        <Grid
          // xl={6}
          gapx={12}
          classes='gap-16 grid-flow-row-dense 2xl:grid-cols-6'
        >
          <Box classes='laptop:col-span-4'>
            <SubTitle>My orders</SubTitle>
            <OrderList/>
          </Box>
          <Box classes='laptop:col-span-2 w-fit laptop:w-auto'>
            <SubTitle>Primary address</SubTitle>
            <Box>
              <InfoAddress/>
              <Button classes={'font-medium'} onClick={() => router.push(PATH.ACCOUNT.ADDRESS)}>
                View Address
              </Button>
            </Box>
          </Box>
        </Grid>
      </AccountLayout>
    </>
  );
}
