import { useState } from 'react';
import { toast } from "react-hot-toast";

import { Text, Grid, Button, Box, Link, Loading, Icons, Row } from 'core/components';
import { PATH } from "config/const";
import { AddressAccountPageDialog } from 'components/dialog';
import AccountLayout from 'components/layout/AccountLayout';
import { accountService, useAddress } from "services/account";
import UpdateAddressDialog from "components/dialog/UpdateAddressDialog";
import SubTitle from "components/pages/account/SubTitle";

export default function AddressPage() {
  const [showUpdateAddressDialog, setShowUpdateAddressDialog] = useState<boolean>(false)
  const [showAddAddressDialog, setShowAddAddressDialog] = useState<boolean>(false)
  const [addressEdit, setAddressEdit] = useState({})
  const { isLoading, addresses, mutate } = useAddress()

  const handleDelete = async (id) => {
    const { status, message } = await accountService.deleteAddress(id)

    switch (status) {
      case 200:
        toast.success('Delete success!')
        mutate()
        break
      // case 401:
      // toast.error(message)
      // break
      default:
        toast.error(message ?? 'Delete failed!')
    }
  }

  function AddressList() {
    if (isLoading) return <Loading classes='fill-black'/>

    return addresses?.map((address, index) => (
      <Box classes='' key={index}>
        {
          address.isPrimary ? <SubTitle>Default Address</SubTitle>
            : <SubTitle>Address {index + 1}</SubTitle>
        }
        <Text>{address.name}</Text>
        <Text>{address.address1}</Text>
        <Icons.pencil
          onClick={() => {
            setShowUpdateAddressDialog(true)
            setAddressEdit(address)
          }} className='btn-icon'
        />
        <Icons.trash onClick={() => handleDelete(address._id)} className='btn-icon'/>
      </Box>
    ))
  }

  return (
    <>
      <AddressAccountPageDialog
        showAddAddressDialog={showAddAddressDialog}
        setShowAddAddressDialog={setShowAddAddressDialog}
        mutateAddressList={mutate}
      />
      <UpdateAddressDialog
        initialValues={addressEdit}
        showUpdateAddressDialog={showUpdateAddressDialog}
        setShowUpdateAddressDialog={setShowUpdateAddressDialog}
        mutateAddressList={mutate}
      />

      <AccountLayout>
        <Box classes='mb-12'>
          <Link href={PATH.ACCOUNT._}>
            <Row align='center' classes='mb-6 hover:text-black group'>
              <Icons.chevronLeft
                height={18}
                width={18}
                className='text-primary-gray pb-0.5 mr-2.5 group-hover:text-primary-black'
              />
              <Text
                transforms='uppercase'
                classes='text-[11px] tracking-widest text-primary-gray group-hover:text-primary-black'
              >Back to account</Text>
            </Row>
          </Link>
          <Text h1 classes='text-3xl font-bold mb-4'>My addresses</Text>
          {addresses && addresses.length === 0 && <Text classes='mb-4'>No addresses are currently saved</Text>}
          <Button onClick={() => setShowAddAddressDialog(true)}>
            Add a new address
          </Button>
        </Box>

        <Grid md={2} lg={3} classes='gap-16'>
          <AddressList/>
        </Grid>
      </AccountLayout>
    </>
  );
}
