import React, { useEffect, useRef } from 'react';
import { XIcon, SearchIcon } from '@heroicons/react/outline';
import { Col, Row } from 'core/components';

const SearchInput = (props) => {
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = ''
      inputRef.current.focus();
    }
  }, [props.showSearchProductDialog]);

  return (
    <Col
      classes='w-full h-full px-3'
      align='center'
      justify='center'
    >
      <Row
        align='center'
        classes='w-full'
      >
        <SearchIcon
          className='stroke-1'
          width={35}
          height={25}
        />
        <input
          ref={inputRef}
          onChange={props.onChange}
          placeholder='Search'
          className='
            text-gray-900
            focus:outline-none
            w-full appearance-none
            transition duration-200 ease-in-out
            h-11 placeholder-gray-500
            bg-white
            h-full
            px-4
          '
        />
        <XIcon
          onClick={() => props.setShowSearchProductDialog(false)}
          className='stroke-1 cursor-pointer'
          width={35}
          height={25}
        />
      </Row>
    </Col>
  )
}

export default SearchInput;
