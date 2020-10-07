import { RESET_FILTERS, SET_CATEGORIES, SET_FILTER_VALUE } from 'redux/actionsTypes';
import products from 'products.json';

const getMinPrice = products => Math.min(...products.map(({ price }) => price));

const getMaxPrice = products => Math.max(...products.map(({ price }) => price));

const initialState = {
  products,
  productsFilter: {
    minProductPrice: {
      id: 'minProductPrice',
      name: 'от',
      value: getMinPrice(products),
    },
    maxProductPrice: {
      id: 'maxProductPrice',
      name: 'до',
      value: getMaxPrice(products),
    },
    discount: {
      id: 'discount',
      value: 0,
    },
    categories: [],
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER_VALUE:
      return {
        ...state,
        productsFilter: {
          ...state.productsFilter,
          [action.payload.name]: {
            ...state.productsFilter[action.payload.name],
            value: action.payload.value,
          },
        },
      };
    case SET_CATEGORIES:
      return {
        ...state,
        productsFilter: {
          ...state.productsFilter,
          categories: action.payload,
        },
      };
    case RESET_FILTERS:
      return initialState;
    default:
      return state;
  }
};
