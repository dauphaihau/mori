import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/outline";
import { Select } from "../Input";
import { cn, isFalsy } from "core/helpers";
import { usePagination } from 'core/hooks';

interface Props {
  quantityRows: number,
  rowsPerPage: number,
  onPageChange: (page: number) => void,
  setRowsPerPage?: (value: number) => void | {},
  currentPage: number,
  rowsChecked: number,
  checkboxSelection?: boolean,
  rowsPerPageFromProps: number,
  rowsPerPageOptions?: number[],
  showOnlyButton?: boolean
}

const Pagination = (props: Props) => {

  const {
    quantityRows,
    rowsPerPage,
    rowsPerPageOptions,
    onPageChange,
    setRowsPerPage,
    rowsPerPageFromProps,
    checkboxSelection,
    rowsChecked,
    currentPage,
    showOnlyButton
  } = props;

  const siblingCount = 1

  let options = [];
  if (!isFalsy(rowsPerPageOptions)) {
    options = rowsPerPageOptions.map((options) => ({
      label: options,
      value: options
    }))
    // setRowsPerPage(rowsPerPageOptions[0])
  }

  const pageNumbers = usePagination({
    currentPage,
    quantityRows,
    siblingCount,
    rowsPerPage
  });

  const ButtonsNavPage = () => (
    <div className="pagination__buttons">
      <button
        disabled={currentPage === 1}
        className={currentPage === 1 ? 'disabled' : ''}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeftIcon height={15} width={15}/>
      </button>
      {pageNumbers?.map((pageNumber, idx) => {
        // {
        //   pageNumber === DOTS && <button key={pageNumber}>{pageNumber}</button>
        // }
        return (
          <button
            key={idx}
            // key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={` ${currentPage === pageNumber ? 'selected' : ''}`}
          >
            {pageNumber}
          </button>
        )
      })}
      <button
        disabled={currentPage === pageNumbers?.length || pageNumbers === undefined}
        className={currentPage === pageNumbers?.length || pageNumbers === undefined ? 'disabled' : ''}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRightIcon height={15} width={15}/>
      </button>
    </div>
  )

  if (showOnlyButton) return <ButtonsNavPage/>

  return (
    <div className="pagination">
      <div className={cn('pagination__left', showOnlyButton && 'hidden')}>
        {checkboxSelection && <p>{rowsChecked} selected</p>}
        <p>
          {currentPage === 1 ? 1 : (currentPage - 1) * rowsPerPage}
          –
          {rowsPerPage * currentPage > quantityRows ? quantityRows : rowsPerPage * currentPage} of {quantityRows}
        </p>
      </div>

      <div className='pagination__right'>
        {/*<div className='pagination__entries'>*/}
        {/*  <p>Rows per page:</p>*/}
        {/*  {options.length !== 0 ?*/}
        {/*    <Select*/}
        {/*      // classesOptions='laptop:pr-0'*/}
        {/*      hideIconOptions*/}
        {/*      classesSpace='mb-0'*/}
        {/*      classesBtn='pr-8'*/}
        {/*      borderLight*/}
        {/*      size='medium'*/}
        {/*      options={options}*/}
        {/*      // @ts-ignore*/}
        {/*      onChange={(e) => setRowsPerPage(e.value)}*/}
        {/*    />*/}
        {/*    :*/}
        {/*    <p className='ml-3'>{rowsPerPageFromProps}</p>*/}
        {/*  }*/}
        {/*</div>*/}

        <p className={cn('pagination__entries', showOnlyButton && 'hidden')}>Rows per page:
          <span className='ml-3'>{quantityRows}</span>
        </p>
        <ButtonsNavPage/>
      </div>
    </div>
  )
}

export default Pagination;
