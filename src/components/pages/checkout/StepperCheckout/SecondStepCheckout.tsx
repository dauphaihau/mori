import { useState } from 'react';
import { useAuth } from 'context/authContext';
import { useUIController } from 'context/UIControllerContext';
import { Text, Button, Box, Col, Grid, Row } from 'core/components';
import { formatDollarUS } from 'core/helpers';
import AddressDialog from 'components/dialog/AddressDialog';
import { uiControllerActionsType } from 'context/reducers/uiControllerReducer';

const SecondStepCheckout = (props) => {
  const { setStep, total } = props;
  const { dispatch } = useUIController()
  const { user, setUser } = useAuth();
  // const [showAddressDialog, setShowAddressDialog] = useState()

  function setSteps(step) {
    if (step === 3) {
      setUser({ ...user, delivery: 'slowDelivery', payment: 'card' })
    }
    setStep(step)
  }

  return (
    <>
      {/*<AddressDialog*/}
      {/*  showAddressDialog={showAddressDialog}*/}
      {/*  setShowAddressDialog={setShowAddressDialog}*/}
      {/*/>*/}
      <Grid lg={6} gapx={8}>
        <Box classes='col-span-2 ipad:col-span-4'>
          <Col>
            {
              user?.address &&
              <Box classes='p-6 shadow-md border border-gray-100 rounded-xl mb-6 w-full '>
                <Box classes='mb-2'>
                  <Col
                    justify='between'
                    gap={2}
                    classes='ipad:gap-0 ipad:flex-row'
                  >
                    <Text
                      span
                      classes='laptop:text-base text-gray-800'
                      weight='bold'
                    >{user.address.name}</Text>
                    {
                      user.address &&
                      <Box>
                        <Text
                          as='button'
                          i
                          classes='fa-solid fa-pen'
                          onClick={() => dispatch({ type: 'OPEN_ADDRESS_MODAL' })}
                        />
                        {/*<Text as='button' i classes='fa-solid fa-trash-can ml-4' onClick={() => setUser({...user, address: null})}/>*/}
                      </Box>
                    }
                  </Col>
                </Box>
                <Text classes='mb-2'>{user.address.addressDetail}</Text>
                <Col
                  justify='between'
                  gap={2}
                  classes='ipad:gap-0 ipad:flex-row'
                >
                  <Text classes='text-gray-500'>{user.address.phone}</Text>
                  <Button
                    size='sm'
                    onClick={() => setSteps(3)}
                  >Deliver to this Address</Button>
                </Col>
              </Box>
            }
          </Col>

          <Row justify='between' classes='mt-6'>
            <Button
              light
              classes='font-bold px-0'
              onClick={() => setSteps(1)}
            >
              <Text i classes='fa-solid fa-angle-left mr-4'/>Back
            </Button>
            {
              !user.address &&
              <Button
                light
                classes='font-bold px-0'
                // onClick={() => setShowAddressDialog(true)}
                onClick={() => dispatch({ type: uiControllerActionsType.OPEN_ADDRESS_MODAL })}
                text='+ Add new address'
              />
            }
          </Row>
        </Box>

        <Box classes='col-span-2'>
          <Box classes='border border-gray-100 shadow-md p-6 rounded-xl w-full font-light'>
            <Text weight='bold' classes='mb-3'>Order Summary</Text>
            <Row justify='between' classes='py-2'>
              <Text>Sub Total</Text>
              <Text>{formatDollarUS(user.priceTotal)}</Text>
            </Row>
            <Row justify='between' classes='py-2'>
              <Text>Discount</Text>
              <Text>{user.priceTotal !== total ? '-11%' : '-'}</Text>
            </Row>
            <Row justify='between' classes='py-2'>
              <Text>Shipping</Text>
              <Text>Free</Text>
            </Row>
            <Row justify='between' classes='py-4 border-t'>
              <Text weight='bold'>Total</Text>
              <Box classes='text-right font-light'>
                <Text weight='bold'>{formatDollarUS(user.priceTotal)}</Text>
                <Text classes='text-sm'>(VAT included if applicable)</Text>
              </Box>
            </Row>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default SecondStepCheckout
