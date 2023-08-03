import React, { useEffect, useState } from 'react';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import dayjs from 'dayjs';

import { useOrders } from "services/account";
import { Table, Text } from 'core/components';
import DetailOrderDialog from "components/dialog/DetailOrderDialog";
import { formatDollarUSFromStripe } from "core/helpers";
import { EyeIcon } from '@heroicons/react/outline';
import { CheckIcon } from "@heroicons/react/solid";

const rowsPerPage = [5, 15, 25]
dayjs.extend(localizedFormat)

export default function OrderList() {
  const [state, setState] = useState({
    showDialog: false,
    chargeData: {},
    paginatedList: [],
    chargeId: '',
  })
  const [params, setParams] = useState({
    page: '',
    limit: rowsPerPage[0]
  })

  const { orders, total, isLoading, paginatedOrderList } = useOrders(params)

  useEffect(() => {
    if (paginatedOrderList && paginatedOrderList.length > 0) {
      setState({ ...state, paginatedList: paginatedOrderList })
    }
  }, [paginatedOrderList])

  if (orders && orders.length === 0) {
    return <Text>You haven&apos;t placed any orders yet</Text>
  }

  const columns = [
    { id: 'id', title: 'Order' },
    {
      id: 'created', title: 'Date',
      render: (row) => dayjs(row.created * 1000).format('LL')
    },
    {
      id: 'status', title: 'Status', align: 'center',

      render: (row) => <div className={'bg-[#ddf6c7] text-[#2c671d] px-3 rounded-lg inline-flex items-center gap-2'}>
        {row.status}
        <CheckIcon className={'w-4 h-4'} aria-hidden='true'/>
      </div>
    },
    { id: 'amount', title: 'Total', render: (row) => formatDollarUSFromStripe(row.amount) },
    {
      id: 'actions', title: 'Actions', align: 'center',
      render: (row) => (
        <EyeIcon
          className={'h-5 w-5'}
          onClick={() => setState({ ...state, showDialog: true, chargeData: row })}
        />
      )
    },
  ];

  const handleOnChangeTable = (values) => {
    const indexPaginated = values.skip / rowsPerPage[0]
    let page = ''
    if (indexPaginated) {
      page = state.paginatedList[indexPaginated - 1]
    }
    setParams({ ...params, page })
  }

  return (
    <>
      {
        state.showDialog &&
        <DetailOrderDialog
          showDialog={state.showDialog}
          closeDialog={() => setState({ ...state, showDialog: false })}
          order={state.chargeData}
        />
      }

      <Table
        onClickRow={(row) => setState({ ...state, showDialog: true, chargeData: row })}
        hidePagination={total < params.limit}
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
