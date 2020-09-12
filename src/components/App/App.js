import React, { Component } from 'react';
import Goods from '../Goods';
import Header from '../Header';
import GoodsList from '../GoodsList';
import Filters from '../Filters';
import {
  AppContext,
  getInitialState,
  getActiveCategories
} from 'contexts/AppContext';
import _ from 'lodash';
import queryString from 'query-string';
import styles from './App.module.sass';

class App extends Component {
  constructor(props) {
    super(props);
    const location = window.location;
    const url = location.toString();
    window.history.replaceState({ url }, '', url);
    this.state = getInitialState(location);
  }

  filterProducts = () => {
    const { products, productsFilter } = this.state;
    const {
      minProductPrice,
      maxProductPrice,
      discount,
      categories
    } = productsFilter;
    const { value: minPrice } = minProductPrice;
    const { value: maxPrice } = maxProductPrice;
    const { value: discountValue } = discount;

    const filtered = categories.length
      ? products.filter(({ category }) => categories.includes(category))
      : products;

    return filtered
      .filter(({ discount }) => discount >= discountValue)
      .filter(({ price }) => price >= minPrice && price <= maxPrice);
  };

  handleChangeFilterInput = (filterName, value) => {
    this.setState(({ productsFilter }) => {
      const newProductsFilter = { ...productsFilter };
      newProductsFilter[filterName].value = value;

      return {
        productsFilter: newProductsFilter
      };
    });
  };

  handleChangeCategories = changedCategory => {
    this.setState(({ productsFilter }) => {
      const currentActiveCategories = getActiveCategories(window.location);
      const newActiveCategories = _.xor(currentActiveCategories, [
        changedCategory
      ]);

      const newUrl = queryString.stringifyUrl(
        {
          url: window.location.origin,
          query: { categories: newActiveCategories }
        },
        { arrayFormat: 'comma' }
      );

      window.history.pushState({ url: newUrl }, '', newUrl);

      return {
        url: newUrl,
        productsFilter: {
          ...productsFilter,
          categories: newActiveCategories
        }
      };
    });
  };

  handleResetFilters = () => {
    const url = window.location.origin;
    window.history.pushState({ url }, 'category', '/');
    this.setState({ ...getInitialState(url) });
  };

  handlePopstate = e => {
    this.setState(({ productsFilter }) => {
      return {
        url: e.state['url'],
        productsFilter: {
          ...productsFilter,
          categories: getActiveCategories(window.location)
        }
      };
    });
  };

  componentDidMount() {
    window.addEventListener('popstate', this.handlePopstate);
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.handlePopstate);
  }

  render() {
    const { productsFilter } = this.state;

    const filteredProducts = this.filterProducts();

    const appContextValue = {
      filters: productsFilter,
      handleChangeFilterInput: this.handleChangeFilterInput,
      handleChangeCategories: this.handleChangeCategories,
      handleResetFilters: this.handleResetFilters
    };

    return (
      <AppContext.Provider value={appContextValue}>
        <div className={styles.App}>
          <Filters />
          <Goods>
            <Header>Список товаров</Header>
            <GoodsList goods={filteredProducts} />
          </Goods>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
