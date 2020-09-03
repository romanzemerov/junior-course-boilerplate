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
    showingProducts: this.props.products,
    minProductPrice: getMinPrice(this.props.products),
    maxProductPrice: getMaxPrice(this.props.products)
  };

  filterProducts = (minPrice, maxPrice, discountValue) => {
    const { products } = this.state;

    const showingProducts = products
      .filter(({ discount }) => discount >= discountValue)
      .filter(({ price }) => price >= minPrice && price <= maxPrice);

    this.setState({ showingProducts });
  };

  render() {
    const { minProductPrice, maxProductPrice, showingProducts } = this.state;
    return (
      <div className={styles.App}>
        <Filters
          minProductPrice={minProductPrice}
          maxProductPrice={maxProductPrice}
          filterProducts={this.filterProducts}
        />
        <Goods>
          <Header>Список товаров</Header>
          <GoodsList goods={showingProducts} />
        </Goods>
      </div>
    );
  }
}

export default App;
