import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { debounce } from 'core/helpers';
import { Box, Portal } from 'core/components';
import SearchInput from './SearchInput';
import ResultSearch from './ResultSearch';
import { useSearchProducts } from "services/product";
import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable'

const SearchBarProduct = ({ showSearchProductDialog, setShowSearchProductDialog }) => {
  const router = useRouter();
  // const [products, setProducts] = useState([])
  const [searchValue, setSearchValue] = useState<string>('');

  // const fetcher = async (url) => await axios.get(url, {
  // params: {searchValue, limit: 6}
  // }).then((res) => res.data.products);
  // }).then((res) => console.log({ res }));

  // const { data } = useSWR("/api/product/search", fetcher)
  // const res = useSWRImmutable([searchValue], fetcher("/api/product/search"))

  useEffect(() => {
    setShowSearchProductDialog(false)
    setSearchValue('')
  }, [router.asPath])

  // useEffect(() => {
  //   setProducts([])
  // }, [showSearchProductDialog])

  const debounceSearch = useCallback(
    debounce((value) => {
      setSearchValue(value);
    }, 300),
    []
  );

  const { products } = useSearchProducts({ search: searchValue, limit: 6 })
  // setProducts(data?.products ?? [])
  // console.log('dauphaihau debug: products', products)

  // useEffect(() => {
  //   if (!searchValue) return;
  //
  //   async function handleSearch() {
  //     const data = await productService.getProductByName({ search: searchValue, limit: 6 })
  //     // const data = await productService.getProductByName({ search: searchValue, limit: 6 })
  //     if (data) {
  //       setProducts(data.products)
  //     }
  //   }
  //
  //   handleSearch()
  // }, [searchValue])

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
          !showSearchProductDialog ? 'opacity-0 z-20' : 'opacity-100 z-40'
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
