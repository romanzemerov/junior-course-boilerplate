import React from 'react';
import queryString from 'query-string';
import products from 'products.json';

const getMinPrice = products => Math.min(...products.map(({ price }) => price));

const getMaxPrice = products => Math.max(...products.map(({ price }) => price));

export const getActiveCategories = location => {
  const activeCategories = queryString.parse(location.search, {
    arrayFormat: 'comma'
  }).categories;

  return activeCategories === undefined
    ? []
    : typeof activeCategories === 'string'
    ? [activeCategories]
    : activeCategories;
};

export const getInitialState = location => {
  return {
    url: location.toString(),
    products,
    productsFilter: {
      minProductPrice: {
        id: 'minProductPrice',
        name: 'от',
        value: getMinPrice(products)
      },
      maxProductPrice: {
        id: 'maxProductPrice',
        name: 'до',
        value: getMaxPrice(products)
      },
      discount: {
        id: 'discount',
        value: 0
      },
      categories: getActiveCategories(location)
    }
  };
};

export const AppContext = React.createContext({ getInitialState });
