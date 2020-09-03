import React from 'react';
import Goods from '../Goods';
import Header from '../Header';
import GoodsList from '../GoodsList';
import Filters from '../Filters';
import BaseComponent from '../BaseComponent/BaseComponent';
import styles from './App.module.sass';

const getMinPrice = products => Math.min(...products.map(({ price }) => price));
const getMaxPrice = products => Math.max(...products.map(({ price }) => price));

class App extends BaseComponent {
  state = {
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
      }
    }
  };

  filterProducts = (minPrice, maxPrice, discountValue) => {
    const { products } = this.state;

    return products
      .filter(({ discount }) => discount >= discountValue)
      .filter(({ price }) => price >= minPrice && price <= maxPrice);
  };

  handleChangeFilterInput = (filterName, value) => {
    const productsFilter = this.state.productsFilter;
    const changedFilter = { ...productsFilter[filterName] };
    changedFilter.value = value;
    const newProductsFilter = {
      ...productsFilter,
      [filterName]: changedFilter
    };

    this.setState({
      productsFilter: {
        ...newProductsFilter
      }
    });
  };

  render() {
    const { productsFilter } = this.state;
    const { minProductPrice, maxProductPrice, discount } = productsFilter;

    const filteredProducts = this.filterProducts(
      minProductPrice.value,
      maxProductPrice.value,
      discount.value
    );

    return (
      <div className={styles.App}>
        <Filters
          filters={productsFilter}
          handleChangeFilterInput={this.handleChangeFilterInput}
        />
        <Goods>
          <Header>Список товаров</Header>
          <GoodsList goods={filteredProducts} />
        </Goods>
      </div>
    );
  }
}

export default App;
