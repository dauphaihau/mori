import Pagination from './Pagination';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { clns, filterRows, sortRows } from '../../helpers';
import { Checkbox, Input } from '../Input';
import TableRow from './TableRow';

interface ITable {
  fitContent?: boolean,
  checkboxSelection?: boolean,
  onChangeCheckbox?: (selected) => object[],
  rowsPerPageOptions?: number[],
  searchInputSelection?: boolean,
  resetSelectCheckbox?: boolean,
  columns: Array<{
    render?: ReactNode,
    align?: string,
    key?: string | number
    id: string,
    title: string,
  }>,
  rows: [],
  onChange?: (params) => {},
  rowsPerPage?: number,
  totalRows?: number,
  loading?: ReactNode,
  align?: 'center' | 'left' | 'right',
  hidePagination?: boolean,
}

const isEmpty = (obj = {}) => {
  return Object.keys(obj).length === 0
}

const Table = (props: ITable) => {
  const {
    columns = [], rows = [],
    rowsPerPageOptions = [],
    totalRows,
    resetSelectCheckbox = false,
    rowsPerPage: rowsPerPageFromProps = 10,
    hidePagination,
    onChange = () => {
    },
    onChangeCheckbox = () => {
    },
    loading,
    searchInputSelection,
    checkboxSelection, ...res
  } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(!isEmpty(rowsPerPageOptions) ? rowsPerPageOptions[0] : rowsPerPageFromProps)
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState({ order: 'asc', orderBy: 'id' })
  const [rowsChecked, setRowsChecked] = useState([])
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    if (resetSelectCheckbox) setRowsChecked([])
  }, [resetSelectCheckbox])

  const filteredRows = useMemo(() => filterRows(rows ?? [], filters), [rows, filters])
  const sortedRows = useMemo(() => sortRows(filteredRows, sort), [filteredRows, sort])
  // const calculatedRows = paginateRows(sortedRows, currentPage, rowsPerPage)

  const handleChangePage = (newPage) => {
    let fromTemp = Math.ceil((newPage - 1) * rowsPerPage)
    setCurrentPage(newPage);
    // query.setFrom(fromTemp)
    onChange({ skip: fromTemp, limit: rowsPerPage })
  };

  const handleRowsPerPageChange = (limit) => {
    console.log('limit', limit)
    setRowsPerPage(limit);
    onChange({ skip: 0, limit })
    setCurrentPage(1);
  };

  const handleSearch = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
      const filteredData = sortedRows.filter((item) => {
        return Object.values(item.name)
        .join('')
        .toLowerCase()
        .includes(searchInput.toLowerCase());
      });
      setFilters(filteredData);
    } else setFilters(rows);
  }

  const handleSort = (id) => {
    setCurrentPage(1)
    setSort((prevSort) => ({
      order: prevSort.order === 'asc' && prevSort.orderBy === id ? 'desc' : 'asc',
      orderBy: id,
    }))
  }

  // const handleCheckAllBox = (values) => {
  //   const status = values.target.checked
  //   const currentIds = rows.map(o => o._id)
  //   if (!status) {
  //     const a = rowsChecked.filter(id1 => !rows.some(({ _id: id2 }) => id2 !== id1));
  //     setRowsChecked(a)
  //   } else setRowsChecked([...rowsChecked, ...currentIds])
  // }

  const TableColumn = () => {
    return (
      <thead>
            <tr>
              {checkboxSelection &&
                <th>
                  <Checkbox
                    classes='checked:bg-none'
                    name='idsRow'
                    defaultChecked={rowsChecked.length > 0}
                    // onChange={handleCheckAllBox}
                  />
                </th>
              }
              {columns.map((column) => {
                const sortIcon = () => {
                  if (column.id === sort.orderBy) {
                    if (sort.order === 'asc') {
                      return <i className='fa-solid fa-chevron-up'/>
                    }
                    return <i className='fa-solid fa-chevron-down'/>
                  }
                }
                return (
                  <th
                    key={column.id}
                    onClick={() => handleSort(column.id)}
                    className={`text-left text-${column.align}`}
                  >
                    {
                      column.id === 'actions' ?
                        rowsChecked.length > 0 ?
                          <i
                            className='fa-solid fa-trash-can text-xs'
                            onClick={() => onChangeCheckbox(rowsChecked)}
                          />
                          : ''
                        :
                        <span className='mr-2'>{column.title}</span>
                    }
                    {column.id !== 'actions' && <span>{sortIcon()}</span>}
                  </th>
                )
              })}
            </tr>
      </thead>
    )
  }

  return (
    <div className='table-container'>
      <div className={clns('table-wrapper', res.fitContent && 'w-fit')}>
        {searchInputSelection &&
          <div className='w-1/4'>
            <Input
              name=''
              placeholder='Search by name'
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        }
        <table className='table '>
          <TableColumn/>
          <TableRow
            loading={loading}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            quantityRows={rows.length}
            checkboxSelection={checkboxSelection}
            setRowsChecked={setRowsChecked}
            rowsChecked={rowsChecked}
            columns={columns}
            // rows={rows}
            rows={!isEmpty(filters) ? filters : rows}
          />
        </table>
      </div>
      {hidePagination || rows.length === 0
        ? ''
        : <Pagination
          checkboxSelection={checkboxSelection}
          rowsPerPageOptions={rowsPerPageOptions}
          setRowsPerPage={handleRowsPerPageChange}
          rowsPerPageFromProps={rowsPerPageFromProps}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          rowsChecked={rowsChecked.length}
          quantityRows={totalRows}
          // onPageChange={page => setCurrentPage(page)}
          onPageChange={handleChangePage}
        />
      }
    </div>
  );
};

export default Table;
