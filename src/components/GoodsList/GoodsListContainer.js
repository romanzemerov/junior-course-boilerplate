import React, { PureComponent } from 'react';
import GoodsList from 'components/GoodsList/GoodsList';
import { connect } from 'react-redux';

class GoodsListContainer extends PureComponent {
  filterProducts = () => {
    const { goods, minPrice, maxPrice, discountValue, categories } = this.props;

    const filtered = categories.length
      ? goods.filter(({ category }) => categories.includes(category))
      : goods;

    return filtered
      .filter(({ discount }) => discount >= discountValue)
      .filter(({ price }) => price >= minPrice && price <= maxPrice);
  };

  render() {
    const { goods } = this.props;
    const filtered = this.filterProducts(goods);

    return <GoodsList goods={filtered} />;
  }
}

const mapStateToProps = state => ({
  goods: state.products,
  minPrice: state.productsFilter.minProductPrice.value,
  maxPrice: state.productsFilter.maxProductPrice.value,
  discountValue: state.productsFilter.discount.value,
  categories: state.productsFilter.categories,
});

export default connect(mapStateToProps, null)(GoodsListContainer);
