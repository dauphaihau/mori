import { useState } from 'react';

import { Link, Text, Box, Button, Grid, Loading } from 'core/components';
import { useAuth } from 'components/context/authContext';
import ChangePasswordDialog from 'components/dialog/ChangePasswordDialog';
import { PATH } from 'config/const';
import AccountLayout from 'components/layout/AccountLayout';
import { getPackageProfile } from "lib/cookie";
import { useOrder, usePrimaryAddress } from "services/account";
import SubTitle from "components/pages/account/SubTitle";
import OrderList from "components/pages/account/OrderList";

export default function AccountPage() {
  const { handleLogout } = useAuth();
  const profile = getPackageProfile()
  const [showDialog, setShowDialog] = useState(false)
  const { isLoading, address } = usePrimaryAddress()

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

  const InfoOrders = () => {

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
            onClick={() => handleLogout()}
          >Logout</Text>
          <Text h2 classes='mb-4'>My account</Text>
          <Text classes='mb-4'>Welcome back, {profile?.name}!</Text>
          <Button onClick={() => setShowDialog(true)}>
            Change Pass
          </Button>
        </Box>

        <Grid
          // lg={6}
          gapx={12}
          classes='gap-16 grid-flow-row-dense'
        >
          <Box classes='laptop:col-span-4'>
            <SubTitle>My orders</SubTitle>
            <OrderList/>
          </Box>
          <Box classes='laptop:col-span-2 w-fit laptop:w-auto'>
            <SubTitle>Primary address</SubTitle>
            <Box>
              <InfoAddress/>
              <Link href={PATH.ACCOUNT.ADDRESS}>
                <Button>
                  View Address
                </Button>
              </Link>
            </Box>
          </Box>
        </Grid>
      </AccountLayout>
    </>
  );
}
