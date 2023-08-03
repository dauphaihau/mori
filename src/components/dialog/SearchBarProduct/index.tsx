import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { debounce } from 'core/helpers';
import { Box, Portal } from 'core/components';
import SearchInput from './SearchInput';
import ResultSearch from './ResultSearch';
import { useSearchProducts } from "services/product";

const SearchBarProduct = ({ showSearchProductDialog, setShowSearchProductDialog }) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    setShowSearchProductDialog(false)
    setSearchValue('')
  }, [router.asPath])

  const debounceSearch = useCallback(
    debounce((value) => {
      setSearchValue(value);
    }, 300),
    []
  );

  const { products } = useSearchProducts({ search: searchValue, limit: 6 })

  const handleSearch = (searchValue) => {
    debounceSearch(searchValue);
  };

  return (
    <Portal>
      <Box
        hideIf={!showSearchProductDialog}
        onClick={() => setShowSearchProductDialog(false)}
        classes='backdrop overflow-y-auto overflow-y-hidden'
      />
      <Box
        classes={[
          'fixed inset-0',
          'mx-auto h-12 bg-white laptop:w-1/2 laptop:mt-6 laptop:rounded-lg',
          'transition duration-300 ease-out',
          !showSearchProductDialog ? 'opacity-0 z-[-10]' : 'opacity-100 z-40'
        ]}
      >
        <SearchInput
          setShowSearchProductDialog={setShowSearchProductDialog}
          showSearchProductDialog={showSearchProductDialog}
          onChange={e => handleSearch(e.target.value)}
        />
        {products && <ResultSearch products={products}/>}
      </Box>
    </Portal>
  );
}

export default SearchBarProduct;
