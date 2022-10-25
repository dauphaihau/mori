import { ProductProps } from 'types/product';
import Enums from "config/enums";

export enum filterType {
  LOAD_PRODUCTS = 'LOAD_PRODUCTS',
  UPDATE_FILTERS = 'UPDATE_FILTERS',
  FILTER_PRODUCTS = 'FILTER_PRODUCTS',
  CLEAR_FILTERS = 'CLEAR_FILTERS',
  UPDATE_SORT = 'UPDATE_SORT',
  SORT_PRODUCTS = 'SORT_PRODUCTS',
  SET_GRIDVIEW = 'SET_GRIDVIEW',
  SET_SHOW_FILTER_DRAWER = 'SET_SHOW_FILTER_DRAWER',
}

export interface FilterActions {
  type: filterType;
  payload?: any,
}

export interface FilterState {
  filtered_products: ProductProps[]
  all_products: ProductProps[]
  gridView: boolean,
  sort: string,
  filters: {
    text: string,
    brand: string,
    category: string,
    color: string,
    minPrice: number,
    maxPrice: number,
    price: number,
    shipping: boolean,
    lastPiece: boolean
  },
  clearFilters: () => void
  showFiltersDrawer: boolean,
  setGridView: (status) => void
  updateFilters: (event) => void,
  updateSort: (event) => void,
  dispatch?: (p: {type: string, payload: any}) => void
}

const filterReducer = (state: FilterState, action: FilterActions): FilterState => {
  const { type, payload } = action

  if (type === filterType.LOAD_PRODUCTS) {
    let maxPrice = payload?.map(p => p.price);
    maxPrice = Math.max(...maxPrice);

    return {
      ...state,
      all_products: [...payload],
      filtered_products: [...payload],
      filters: { ...state.filters, maxPrice, price: maxPrice }
    }
  }

  if (type === filterType.SET_GRIDVIEW) {
    return { ...state, gridView: payload };
  }

  if (type === filterType.SET_SHOW_FILTER_DRAWER) {
    return { ...state, showFiltersDrawer: payload };
  }

  if (type === filterType.UPDATE_SORT) {
    return { ...state, sort: payload }
  }

  if (type === filterType.SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products];

    if (sort === Enums.SORT_PRODUCT.BEST_SELLING) {
      tempProducts = tempProducts.sort((a, b) => Number(b.bestSelling) - Number(a.bestSelling));
    }
    if (sort === Enums.SORT_PRODUCT.DATE_NEW) {
      tempProducts = tempProducts.sort((a, b) => {
        return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
      });
    }
    if (sort === Enums.SORT_PRODUCT.PRICE_LOWEST) {
      tempProducts = tempProducts.sort((a, b) => Number(a.price) - Number(b.price));
    }
    if (sort === Enums.SORT_PRODUCT.PRICE_HIGHEST) {
      tempProducts = tempProducts.sort((a, b) => Number(b.price) - Number(a.price));
    }
    if (sort === Enums.SORT_PRODUCT.NAME_A) {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sort === Enums.SORT_PRODUCT.NAME_Z) {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    return { ...state, filtered_products: tempProducts };
  }

  if (type === filterType.UPDATE_FILTERS) {
    const { name, value } = payload;
    return { ...state, filters: { ...state.filters, [name]: value } }
  }

  if (type === filterType.FILTER_PRODUCTS) {
    const { all_products } = state;
    const { lastPiece, category, price, brand, color } = state.filters;

    let tempProducts = [...all_products];

    if (lastPiece) {
      tempProducts = tempProducts.filter((prod) => prod.quantity === 0)
    }
    if (category !== 'all') {
      tempProducts = tempProducts.filter((prod) => {
          return prod.categories.includes(category as never);
        }
      )
    }
    if (brand !== 'all') {
      tempProducts = tempProducts.filter(
        (prod) => prod.brand === brand
      )
    }
    if (color !== 'all') {
      tempProducts = tempProducts.filter((prod) => {
        return prod?.colors.find((c) => c === color);
      });
    }

    tempProducts = tempProducts.filter((product) => product.price <= price);

    return { ...state, filtered_products: tempProducts }
  }

  if (type === filterType.CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        brand: 'all',
        color: 'all',
        category: 'all',
        price: state.filters.maxPrice,
        shipping: false,
        lastPiece: false,
      },
    };
  }

  throw new Error(`No Matching '${type}' - action type`);
}

export default filterReducer
