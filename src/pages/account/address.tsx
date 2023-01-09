import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ChevronLeftIcon, PencilIcon, TrashIcon } from "@heroicons/react/outline";

import { useAuth } from 'components/context/authContext';
import { Text, Grid, Button, Box, Link } from 'core/components';
import { PATH } from "config/const";
import { AddressAccountPageDialog } from 'components/dialog';
import AccountLayout from 'components/layout/AccountLayout';

export default function AddressPage() {
  const { user } = useAuth();
  const [showAddressDialog, setShowAddressDialog] = useState<boolean>(false)

  const { register, handleSubmit, reset, formState, setError } = useForm({
    defaultValues: {
      id: user?.id,
    }
  });

  return (
    <>
      <AddressAccountPageDialog
        showAddressDialog={showAddressDialog}
        setShowAddressDialog={setShowAddressDialog}
      />
      <AccountLayout>
        <Box classes='mb-12'>
          <Text h1 classes='text-3xl font-bold mb-6'>My addresses</Text>
          <Link href={PATH.ACCOUNT._}>
            <Button
              classes='pl-0'
              light
              // icon={<ChevronLeftIcon className='btn-icon'/>}
            >
              Back
            </Button>
          </Link>
          <Button
            // disabled
            onClick={() => setShowAddressDialog(true)}
          >
            Add a new address
          </Button>
        </Box>
        <Grid md={2} lg={3} classes='gap-16'>
          <Box classes=''>
            <Text h1 classes='text-xl mb-6'>Default Address</Text>
            <Text>Hau Tran</Text>
            <Text>United States</Text>
            <PencilIcon className='btn-icon'/>
            <TrashIcon className='btn-icon'/>
          </Box>

          <Box classes=''>
            <Text
              h1
              classes='text-xl mb-6'
            >Address 2</Text>
            <Text>
              Hau Tran
            </Text>
            <Text>
              111 George Street, Sydney, Australia
            </Text>
            <PencilIcon className='btn-icon'/>
            <TrashIcon className='btn-icon'/>
          </Box>

          <Box classes=''>
            <Text
              h1
              classes='text-xl mb-6'
            >Address 3</Text>
            <Text>
              Hau Tran
            </Text>
            <Text>
              111 George Street, Sydney, Australia
            </Text>
            <PencilIcon className='btn-icon'/>
            <TrashIcon className='btn-icon'/>
          </Box>

          <Box classes=''>
            <Text
              h1
              classes='text-xl mb-6'
            >Address 4</Text>
            <Text>
              Hau Tran
            </Text>
            <Text>
              111 George Street, Sydney, Australia
            </Text>
            <PencilIcon className='btn-icon'/>
            <TrashIcon className='btn-icon'/>
          </Box>
        </Grid>
      </AccountLayout>
    </>
  );
}
