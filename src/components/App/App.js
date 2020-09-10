import React, { Component } from 'react';
import Goods from '../Goods';
import Header from '../Header';
import GoodsList from '../GoodsList';
import Filters from '../Filters';
import styles from './App.module.sass';

export const AppContext = React.createContext();

const defaultCategoriesState = [
  {
    id: 'clothes',
    name: 'Clothes',
    isActive: false
  },
  {
    id: 'books',
    name: 'Books',
    isActive: false
  }
];

const getCategoriesState = (currentState, activeCategories) => {
  return currentState.map(category =>
    activeCategories.includes(category.id)
      ? { ...category, isActive: true }
      : { ...category, isActive: false }
  );
};

const getMinPrice = products => Math.min(...products.map(({ price }) => price));
const getMaxPrice = products => Math.max(...products.map(({ price }) => price));

class App extends Component {
  constructor(props) {
    super(props);
    const url = window.location.toString();
    window.history.replaceState({ url }, '', url);

    const activeCategories = new URL(url).searchParams.get('categories');
    const arrayOfActiveCategories = activeCategories
      ? activeCategories.split(',')
      : [];

    this.state = {
      url,
      products: this.props.products,
      productsFilter: {
        minProductPrice: {
          id: 'minProductPrice',
          name: 'от',
          value: getMinPrice(this.props.products)
        },
        maxProductPrice: {
          id: 'maxProductPrice',
          name: 'до',
          value: getMaxPrice(this.props.products)
        },
        discount: {
          id: 'discount',
          value: 0
        },
        categories: getCategoriesState(
          defaultCategoriesState,
          arrayOfActiveCategories
        )
      }
    };
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

    const activeFilters = categories
      .filter(({ isActive }) => isActive)
      .map(({ id }) => id);
    const isCategoriesFilterActive = activeFilters.length !== 0;

    const filtered = isCategoriesFilterActive
      ? products.filter(({ category }) => activeFilters.includes(category))
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

  handleChangeCategories = categoryID => {
    this.setState(({ productsFilter }) => {
      const { categories } = productsFilter;

      const index = categories.findIndex(({ id }) => id === categoryID);
      const category = categories[index];

      const newCategory = {
        ...category,
        isActive: !category.isActive
      };
      const newCategories = [
        ...categories.slice(0, index),
        newCategory,
        ...categories.slice(index + 1)
      ];

      return {
        productsFilter: {
          ...productsFilter,
          categories: newCategories
        }
      };
    });

    this.setState(({ url, productsFilter }) => {
      const { categories } = productsFilter;
      const activeCategories = categories
        .filter(({ isActive }) => isActive === true)
        .map(({ id }) => id)
        .join(',');

      const newUrl = new URL(new URL(url).origin);

      if (activeCategories) {
        newUrl.searchParams.set('categories', activeCategories);
      }

      window.history.pushState(
        { url: newUrl.toString() },
        '',
        newUrl.toString()
      );

      return { url: newUrl };
    });
  };

  handleResetFilters = () => {
    this.setState(({ url, productsFilter }) => {
      const {
        minProductPrice,
        maxProductPrice,
        discount,
        categories
      } = productsFilter;

      const newUrl = new URL(new URL(url).origin);

      window.history.pushState(
        { url: newUrl.toString() },
        '',
        newUrl.toString()
      );

      return {
        url: newUrl,
        productsFilter: {
          minProductPrice: {
            ...minProductPrice,
            value: getMinPrice(this.props.products)
          },
          maxProductPrice: {
            ...maxProductPrice,
            value: getMaxPrice(this.props.products)
          },
          discount: { ...discount, value: 0 },
          categories: [...categories].map(category => {
            category.isActive = false;
            return category;
          })
        }
      };
    });
  };

  handlePopstate = e => {
    const newUrl = new URL(e.state['url']);

    this.setState(({ productsFilter }) => {
      const { categories } = productsFilter;
      const activeCategories = newUrl.searchParams.get('categories');
      const arrayOfActiveCategories = activeCategories
        ? activeCategories.split(',')
        : [];

      const newCategories = getCategoriesState(
        categories,
        arrayOfActiveCategories
      );

      return {
        url: newUrl,
        productsFilter: { ...productsFilter, categories: newCategories }
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
