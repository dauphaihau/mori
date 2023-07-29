import React, { useEffect, useState } from 'react';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import dayjs from 'dayjs';

import { useOrders } from "services/account";
import { Table, Button, Text } from 'core/components';
import DetailOrderDialog from "components/dialog/DetailOrderDialog";
import { formatDollarUS, formatDollarUSFromStripe } from "core/helpers";

const rowsPerPage = [5, 15, 25]
dayjs.extend(localizedFormat)

export default function OrderList() {
  const [showDialog, setShowDialog] = useState(false)
  const [paginatedList, setPaginatedList] = useState([])
  const [params, setParams] = useState({
    page: '',
    limit: rowsPerPage[0]
  })
  const [chargeId, setChargeId] = useState('')
  const [chargeData, setChargeData] = useState({})

  const { orders, total, isLoading, paginatedOrderList } = useOrders(params)
  console.log('dauphaihau debug: orders', orders)
  // console.log('dauphaihau debug: charge-page-list', paginatedOrderList)

  useEffect(() => {
    if (paginatedOrderList && paginatedOrderList.length > 0) {
      // console.log('dauphaihau debug: run pagin')
      setPaginatedList(paginatedOrderList)
    }
  }, [paginatedOrderList])

  // if (isLoading) {
  //   return <p>loading...</p>
  // }

  if (orders && orders.length === 0) {
    return <Text>You haven&apos;t placed any orders yet</Text>
  }

  const columns = [
    { id: 'id', title: 'Order' },
    {
      id: 'created', title: 'Date',
      render: (row) => {
        if (!row.metadata?.order_created_at || !row.metadata.order_created_at) {
          return '-'
        }
        return dayjs(Number(row.metadata.order_created_at)).format('LL')
      }
    },
    { id: 'status', title: 'Status', align: 'center', },
    { id: 'amount', title: 'Total', render: (row) => formatDollarUSFromStripe(row.amount) },
    {
      id: 'actions', title: 'Actions', align: 'center',
      render: (row) => (
        <Button
          onClick={() => {
            setShowDialog(true)
            setChargeId(row.id)
            setChargeData(row)
          }}
        >View</Button>
      )
    },
  ];

  const handleOnChangeTable = (values) => {
    const indexPaginated = values.skip / rowsPerPage[0]
    let page = ''
    if (indexPaginated) {
      page = paginatedList[indexPaginated - 1]
    }
    console.log('dauphaihau debug: page', page)
    setParams({ ...params, page })
    // setParams({ ...params, page: 1 })
  }

  return (
    <>
      <DetailOrderDialog
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        chargeId={chargeId}
        initialValues={chargeData}
      />

      <Table
        loading={isLoading}
        columns={columns}
        onChange={handleOnChangeTable}
        rowsPerPageOptions={rowsPerPage}
        totalRows={total}
        rows={orders}
      />
    </>
  )
}
