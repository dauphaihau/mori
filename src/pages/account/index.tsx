import { useState } from 'react';

import { Link, Text, Box, Button, Grid } from 'core/components';
import { useAuth } from 'components/context/authContext';
import ChangePasswordDialog from 'components/dialog/ChangePasswordDialog';
import { PATH } from 'config/const';
import AccountLayout from 'components/layout/AccountLayout';
import { getPackageProfile, handleSetCookie } from "lib/cookie";

export default function AccountPage() {
  const { handleLogout } = useAuth();
  const profile = getPackageProfile()
  const [showDialog, setShowDialog] = useState(false)

  return (
    <>
      <ChangePasswordDialog
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
      <AccountLayout>
        <Box classes='mb-12'>
          <Text h2 classes='mb-6'>My account</Text>
          <Text classes='mb-4'>Welcome back, {profile?.name}!</Text>
          <Button
            light
            classes='pl-0'
            data-testid='logoutBtn'
            onClick={() => handleLogout()}
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
            <Text h3 classes='mb-6'>My orders</Text>
            <Text>You haven&apos;t placed any orders yet</Text>
          </Box>
          <Box classes='laptop:col-span-2'>
            <Text h3 classes='mb-6'>Primary address</Text>
            <Box>
              <Text>Hau Tran</Text>
              <Text classes='mb-4'>111 George Street, Sydney, Australia</Text>
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
