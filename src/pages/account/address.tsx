import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ChevronLeftIcon, PencilIcon, TrashIcon } from "@heroicons/react/outline";

import { useAuth } from 'context/authContext';
import { Text, Grid, Button, Box, Link } from 'core/components';
import ProfileLayout from 'components/pages/profile/AccountLayout';
import Const from "../../config/const";
import { AddressAccountPageDialog } from 'components/dialog';

const AddressPage = () => {
  const { user } = useAuth();
  const [showAddressDialog, setShowAddressDialog] = useState<boolean>(false)

  const { register, handleSubmit, reset, formState, setError } = useForm({
    defaultValues: {
      id: user?.id,
    }
  });

  const { errors } = formState;

  const onSubmit = (values) => {
    console.log('values', values)
  }

  return (
    // <Box classes='bg-gray-custom-52a py-28 pb-32'>
    //   <Box classes='w-9/12 max-w-[1420px] mx-auto'>
    <>
      <AddressAccountPageDialog
        showAddressDialog={showAddressDialog}
        setShowAddressDialog={setShowAddressDialog}
      />
      <ProfileLayout>
        <Box classes='mb-12'>
          <Text
            h1
            classes='text-3xl font-bold mb-6'
          >My addresses</Text>
          <Link href={Const.PATH.ACCOUNT._}>
            <Button
              classes='pl-0'
              light
              // icon={<ChevronLeftIcon className='btn-icon'/>}
            >
              Back
            </Button>
          </Link>
          <Button onClick={() => setShowAddressDialog(true)}>
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
              United States
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
              United States
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
              United States
            </Text>
            <PencilIcon className='btn-icon'/>
            <TrashIcon className='btn-icon'/>
          </Box>

        </Grid>
      </ProfileLayout>
      {/*</Box>*/}
      {/*</Box>*/}
    </>
  );
}

export default AddressPage;
