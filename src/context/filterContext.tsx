import { FC, Reducer, useEffect, useReducer, useState } from 'react';
import reducer, { FilterActions, FilterState, filterType } from './reducers/filterReducer';
import { fetchInventory } from 'assets/data/InventoryData/provider/inventoryProvider';
import { IProduct } from "types/product";
import Enums from "../config/enums";
import useSafeContext from "../core/hooks/useSafeContext";
import { type } from "os";

const initialState: FilterState = {
  showFiltersDrawer: false,
  filtered_products: [],
  all_products: [],
  gridView: true,
  sort: Enums.SORT_PRODUCT.PRICE_LOWEST,
  filters: {
    text: '',
    brand: 'all',
    category: 'all',
    color: 'all',
    minPrice: 0,
    maxPrice: 0,
    price: 0,
    shipping: false,
    lastPiece: false
  },
  clearFilters: () => {},
  updateFilters: () => {},
  updateSort: () => {},
  setGridView: () => {},
};

export const [useFilterContext, Provider] = useSafeContext<FilterState>({})

export const FilterProvider: FC = ({ children }) => {
  const [products, setProducts] = useState<IProduct | any>()
  const [state, dispatch] = useReducer<Reducer<FilterState, FilterActions>>(reducer, initialState);

  // useEffect(() => {
  //   const loadInit = async () => {
  //     const products = await fetchInventory();
  //     if (products) {
  //       dispatch({ type: filterType.LOAD_PRODUCTS, payload: products })
  //       setProducts(products)

  //     }
  //   }
  // }, [])
  //   loadInit()

  useEffect(() => {
    dispatch({ type: filterType.FILTER_PRODUCTS });
    dispatch({ type: filterType.SORT_PRODUCTS });
  }, [products, state.filters, state.sort])

  const setGridView = (payload) => dispatch({ type: filterType.SET_GRIDVIEW, payload });
  const setShowFiltersDrawer = (payload) => dispatch({ type: filterType.SET_SHOW_FILTER_DRAWER, payload });
  const updateSort = (value) => dispatch({ type: filterType.UPDATE_SORT, payload: value });

  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === 'category') {
      value = value || e.target.textContent.toLowerCase();
    }
    if (name === 'color') {
      value = e.target.dataset.color;
    }
    if (name === 'brand') {
      value = e.target.textContent;
    }
    if (name === 'price') {
      value = Number(value);
    }
    dispatch({ type: filterType.UPDATE_FILTERS, payload: { name, value } })
  }
  const clearFilters = () => dispatch({ type: filterType.CLEAR_FILTERS })

  const providerValues: FilterState = {
    ...(state as object),
    updateFilters,
    setProducts,
    setShowFiltersDrawer,
    clearFilters,
    updateSort,
    setGridView,
    dispatch,
  };
  return <Provider value={providerValues}>{children}</Provider>;
}

export default FilterProvider;
