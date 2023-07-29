import dayjs from "dayjs";

import { Dialog, Button, Text, Box, Grid, Row } from 'core/components';
import { useDetailOrder } from "services/account";
import { formatDollarUSFromStripe, titleIfy } from 'core/helpers';
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat)

export default function DetailOrderDialog({ showDialog, setShowDialog, chargeId }) {
  const { purchasedProducts, isLoading, customer } = useDetailOrder(chargeId)

  // useEffect(() => {
  //   if (showDialog) {
  //     mutate()
  //   }
  // }, [showDialog])

  // console.log('dauphaihau debug: purchased-products', purchasedProducts)

  return (
    <Dialog
      isOpen={showDialog}
      closeDialog={setShowDialog}
      classes='w-auto max-w-[800px] absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4'
      noPadding
    >
      <Dialog.Content
        closeDialog={setShowDialog}
        classes='px-6 pb-4 pt-4 lg:p-8'
      >
        <Box classes=''>
          <Text h3 classes='mb-6'>Order detail</Text>

          {/*<Grid sx={4} classes='mb-10 gap-y-4 gap-4'>*/}
          <Row wrap='wrap' classes='mb-10 gap-y-4 gap-8'>
            <Box classes='border-dotted border-r-2 pr-4'>
              <Text transforms='uppercase' classes='text-xs font-medium text-gray-700'>
                order number:
              </Text>
              <Text b>-</Text>
              {/*<Text b>285</Text>*/}
            </Box>
            <Box classes='border-dotted border-r-2 pr-4'>
              <Text transforms='uppercase' classes='text-xs font-medium text-gray-700'>
                date:
              </Text>
              <Text b>{customer?.createdAt ? dayjs(customer.createdAt).format('LL') : '-'}</Text>
              {/*<Text b>February 23, 2022</Text>*/}
            </Box>
            <Box classes='border-dotted border-r-2 pr-4'>
              <Text transforms='uppercase' classes='text-xs font-medium text-gray-700'>
                email:
              </Text>
              <Text b>{customer?.email}</Text>
              {/*<Text b>dauphaihau@gmail.com</Text>*/}
            </Box>
            <Box classes='border-dotted pr-4'>
              <Text transforms='uppercase' classes='text-xs font-medium text-gray-700'>
                total:
              </Text>
              <Text b>{formatDollarUSFromStripe(purchasedProducts?.amountTotal)}</Text>
            </Box>
            <Box classes='border-dotted pr-4'>
              <Text transforms='uppercase' classes='text-xs font-medium text-gray-700'>
                payment method:
              </Text>
              <Text b>{titleIfy(customer?.paymentMethod)}</Text>
            </Box>
          </Row>

          <Box classes='mb-10'>
            <Text h4>Product purchased</Text>
            <Box classes='relative overflow-x-auto shadow-md sm:rounded-lg'>
              <table className='w-full text-sm text-left text-gray-500'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                   <tr>
                      <th scope='col' className='px-6 py-3'>
                        Product name
                      </th>
                      <th scope='col' className='px-6 py-3 text-center'>
                        Quantity
                      </th>
                      <th scope='col' className='px-6 py-3'>
                      Unit Price
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Amount
                      </th>
                     {/*<th scope='col' className='px-6 py-3'>*/}
                     {/*  <span className='sr-only'>Edit</span>*/}
                     {/*</th>*/}
                   </tr>
                </thead>
                <tbody>
                  {
                    purchasedProducts && purchasedProducts.list.length > 0 ? (
                        <>
                          {
                            purchasedProducts.list.map((prod, index) => (
                              <tr
                                key={index}
                                className='bg-white border-b hover:bg-gray-50'
                              >
                                <th
                                  scope='row'
                                  className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'
                                >
                                  {prod.description}
                                </th>
                                <td className='px-6 py-4 text-center'>
                                  {prod.quantity}
                                </td>
                                <td className='px-6 py-4'>
                                  {formatDollarUSFromStripe(prod.price.unit_amount)}
                                </td>
                                <td className='px-6 py-4'>
                                  {formatDollarUSFromStripe(prod.amount_total)}
                                </td>
                              </tr>
                            ))
                          }
                          <tr className='bg-white hover:bg-gray-50'>
                              <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                              </th>
                              <td className='px-6 py-4'>
                              </td>
                              <td className='px-6 py-4 text-black'>
                                Total
                              </td>
                              <td className='px-6 py-4'>
                                {formatDollarUSFromStripe(purchasedProducts?.amountTotal)}
                              </td>
                           </tr>
                        </>
                      ) :
                      <tr className='bg-white border-b hover:bg-gray-50'>
                          <th
                            colSpan={4}
                            scope='row'
                            className='text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap'
                          >
                             Product not found or data not existing
                          </th>
                      </tr>
                  }
                </tbody>
              </table>
            </Box>
          </Box>

          <Box classes='mb-6'>
            <Text h4>Billing address</Text>
            <Box classes='p-4 border rounded'>
              <Text>Jimmy Tran</Text>
              <Text>Public Republic</Text>
              <Text>101 High Street</Text>
              <Text>London</Text>
              <Text>SW1 AAA</Text>
              <Text>078282123818</Text>
              <Text>dauphaihau@gmail.com</Text>
            </Box>
          </Box>

        </Box>
      </Dialog.Content>
    </Dialog>
  );
}
