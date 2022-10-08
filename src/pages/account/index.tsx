import { useState } from 'react';
import { useRouter } from 'next/router';

import { Link, Text, Box, Button, Grid } from 'core/components';
import { useAuth } from 'context/authContext';
import AccountLayout from 'components/pages/profile/AccountLayout';
import ChangePasswordDialog from 'components/dialog/ChangePasswordDialog';
import config from 'config/config.json';
import Enums from 'config/enums';

const AccountPage = () => {
  const { handleLogout, setUser, user } = useAuth();
  const [showDialog, setShowDialog] = useState(false)
  const router = useRouter();

  // const logout = () => {
  //   handleRemoveCookie(config.cookies.profile)
  //   handleRemoveCookie(config.cookies.auth)
  //   setUser({ numberAllOfItemsInCart: user.numberAllOfItemsInCart })
  //   router.push(Enums.PATH.DEFAULT);
  //   setIsAuthorize(false);
  // }

  return (
    <>
      <ChangePasswordDialog
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
      <AccountLayout>
        <Box classes='mb-12'>
          <Text
            h1
            classes='text-3xl font-bold mb-6'
          >My account</Text>
          <Text classes='mb-4'>Welcome back, {user?.name}!</Text>
          <Button
            classes='pl-0'
            light
            onClick={() => {
              router.push(Enums.PATH.DEFAULT);
              handleLogout()
            }}
            // onClick={() => logout()}
            text='Log out'
          />
          <Button onClick={() => setShowDialog(true)}>
            Change Pass
          </Button>
        </Box>
        <Grid
          md={2}
          lg={6}
          gapx={12}
          classes='gap-16'
        >
          <Box classes='laptop:col-span-4'>
            <Text h1 classes='text-2xl font-bold mb-6'>My orders</Text>
            <Text>You haven&apos;t placed any orders yet</Text>
          </Box>
          <Box classes='laptop:col-span-2'>
            <Text h1 classes='text-2xl font-bold mb-6'>Primary address</Text>
            <Box>
              <Text>Hau Tran</Text>
              <Text classes='mb-4'>United States</Text>
              <Link href={Enums.PATH.ACCOUNT.ADDRESS}>
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

export default AccountPage;
