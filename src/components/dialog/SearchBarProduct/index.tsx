import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { fetchInventory } from 'assets/data/InventoryData/provider/inventoryProvider';
import { clns, debounce } from 'core/helpers';
import { Box, Portal } from 'core/components';
import SearchInput from './SearchInput';
import ResultSearch from './ResultSearch';

const SearchBarProduct = ({ showSearchProductDialog, setShowSearchProductDialog }) => {
  const router = useRouter();
  const [inventory, setInventory] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const loadInit = async () => {
      const inventory = await fetchInventory()
      setInventory(inventory)
    }
    loadInit();
  }, []);

  useEffect(() => {
    setShowSearchProductDialog(false)
    setSearchValue('')
  }, [router.asPath])

  useEffect(() => {
    setFilteredResults([])
  }, [showSearchProductDialog])

  const debounceSearch = useCallback(
    debounce((value) => {
      setSearchValue(value);
    }, 300),
    []
  );

  useEffect(() => {
    if (searchValue !== '') {
      const filteredData = inventory.filter((item) => {
        return Object.values(item.name)
        .join('')
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(inventory);
    }
  },[searchValue])

  const handleSearch = (searchValue) => {
    debounceSearch(searchValue);
  };

  // if (!showSearchProductDialog) return null;

  return (
    <Portal>
      <Box
        onClick={() => setShowSearchProductDialog(false)}
        classes={clns('backdrop overflow-y-auto overflow-y-hidden',
          !showSearchProductDialog && 'hidden'
        )}
      />
      <Box
        classes={clns('fixed inset-0 z-30 mx-auto h-12 bg-white laptop:w-1/2 laptop:mt-6 laptop:rounded-lg',
          // !showSearchProductDialog && 'hidden'
          'transition duration-200 ease-out',
          !showSearchProductDialog ? 'opacity-0': 'opacity-100',
        )}
      >
        {/*<div className={clns(*/}
        {/*  'transition duration-500 ease-out',*/}
        {/*  showSearchProductDialog ? 'opacity-0': 'opacity-100',*/}
        {/*)}>*/}
        <SearchInput
          setShowSearchProductDialog={setShowSearchProductDialog}
          showSearchProductDialog={showSearchProductDialog}
          onChange={e => handleSearch(e.target.value)}
        />
        <ResultSearch
          searchValue={searchValue}
          filteredResults={filteredResults}
        />
      </Box>
    </Portal>
  );
}

export default SearchBarProduct;
