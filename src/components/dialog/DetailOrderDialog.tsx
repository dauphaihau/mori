import dayjs from "dayjs";

import { Dialog, Text, Box, Row, Loading } from 'core/components';
import { formatDollarUSFromStripe, titleIfy } from 'core/helpers';
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useDetailOrder } from "services/account";
import Stripe from "stripe";

dayjs.extend(localizedFormat)

interface DetailOrderDialogProps {
  showDialog: boolean,
  closeDialog: () => void
  order: Stripe.Charge
}

export default function DetailOrderDialog({ showDialog, closeDialog, order }: DetailOrderDialogProps) {
  const { purchasedProducts, isLoading } = useDetailOrder(order.id)

  const BodyTable = () => {
    if (isLoading) {
      return (
        <tr>
          <td colSpan={4} className='text-center py-4'>
            <Loading classes='fill-black h-4 w-4 inline-flex'/>
          </td>
        </tr>
      )
    }

    if (purchasedProducts && purchasedProducts.list.length === 0) {
      return (
        <tr className='bg-white border-b hover:bg-gray-50'>
          <th
            colSpan={4}
            scope='row'
            className='text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap'
          >Product not found or data not existing
          </th>
        </tr>
      )
    }

    return (
      <tbody>
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

        <tr className='bg-white border-b hover:bg-gray-50'>
          <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'></th>
          <td className='px-6 py-4'></td>
          <td className='px-6 py-4 text-black'>Sub total</td>
          <td className='px-6 py-4'>{formatDollarUSFromStripe(purchasedProducts?.amountSubtotal)}
          </td>
        </tr>
        <tr className='bg-white border-b hover:bg-gray-50'>
          <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'></th>
          <td className='px-6 py-4'></td>
          <td className='px-6 py-4 text-black'>Shipping</td>
          <td className='px-6 py-4'>{formatDollarUSFromStripe(purchasedProducts?.totalDetails?.amount_shipping)}</td>
        </tr>
        <tr className='bg-white hover:bg-gray-50'>
          <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'></th>
          <td className='px-6 py-4'></td>
          <td className='px-6 py-4 text-black'>Total</td>
          <td className='px-6 py-4'>{formatDollarUSFromStripe(purchasedProducts?.amountTotal)}</td>
        </tr>
      </tbody>
    )
  }

  return (
    <Dialog
      isOpen={showDialog}
      closeDialog={closeDialog}
      classes='w-auto max-w-[800px] max-h-[80vh] overflow-scroll absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4'
      noPadding
    >
      <Dialog.Content
        closeDialog={closeDialog}
        classes='px-6 py-4 lg:p-8'
      >
        <Box classes='w-[600px]'>
          <Text h3 classes='mb-6'>Order detail</Text>

          {/*<Grid sx={4} classes='mb-10 gap-y-4 gap-4'>*/}
          <Row wrap='wrap' classes='billing-summary mb-10 gap-y-4 gap-8'>
            <Box classes='item border-r-2'>
              <Text transforms='uppercase' classes='title'>order number:</Text>
              <Text b>{order?.id}</Text>
            </Box>
            <Box classes='item border-r-2'>
              <Text transforms='uppercase' classes='title'>date:</Text>
              <Text b>{dayjs(order.created * 1000).format('LL')}</Text>
            </Box>
            <Box classes='item border-r-2'>
              <Text transforms='uppercase' classes='title'>email:</Text>
              <Text b>{order?.billing_details?.email}</Text>
            </Box>
            <Box classes='item border-r-2'>
              <Text transforms='uppercase' classes='title'>total:</Text>
              <Text b>{formatDollarUSFromStripe(order?.amount)}</Text>
            </Box>
            <Box classes='item'>
              <Text transforms='uppercase' classes='title'>payment method:</Text>
              <Text b>{titleIfy(order?.payment_method_details?.type)}</Text>
            </Box>
          </Row>

          <Box classes='mb-10'>
            <Text h4>Product purchased</Text>
            <Box classes='relative overflow-x-auto shadow-md sm:rounded-lg'>
              <table className='w-full text-sm text-left text-gray-500'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                  <tr>
                    <th scope='col' className='px-6 py-3'>Product name</th>
                    <th scope='col' className='px-6 py-3 text-center'>Quantity</th>
                    <th scope='col' className='px-6 py-3'>Unit Price</th>
                    <th scope='col' className='px-6 py-3'>Amount</th>
                    {/*<th scope='col' className='px-6 py-3'>*/}
                    {/*  <span className='sr-only'>Edit</span>*/}
                    {/*</th>*/}
                  </tr>
                </thead>
                <BodyTable/>
              </table>
            </Box>
          </Box>

          <Box classes='billing-address mb-6 '>
            <Text h4>Billing address</Text>
            <Box classes='mt-2'>
              <div className='item border-b rounded-t'>
                <p className='title'>Name:</p>
                <p className='value'>{order.billing_details?.name ?? '-'}</p>
              </div>
              <div className='item border-b'>
                <p className='title'>Country:</p>
                <p className='value'>{order.billing_details?.address.country ?? '-'}</p>
              </div>
              <div className='item border-b'>
                <p className='title'>Address 1:</p>
                <p className='value'>{order.billing_details?.address.line1 ?? '-'}</p>
              </div>
              <div className='item border-b'>
                <p className='title'>City:</p>
                <p className='value'>{order.billing_details?.address.city ?? '-'}</p>
              </div>
              <div className='item border-b'>
                <p className='title'>State - Postal code:</p>
                <p className='value'>{order.billing_details?.address.state} - {order.billing_details?.address.postal_code}</p>
              </div>
              <div className='item border-b'>
                <p className='title'>Phone:</p>
                <p className='value'>{order.billing_details?.phone ?? '-'}</p>
              </div>
              <div className='item rounded-b'>
                <p className='title'>Email:</p>
                <p className='value'>{order.billing_details?.email ?? '-'}</p>
              </div>
            </Box>
          </Box>
        </Box>
      </Dialog.Content>
    </Dialog>
  );
}
