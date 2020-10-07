import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getActiveCategories } from 'helpers';
import _ from 'lodash';
import queryString from 'query-string';
import { resetFilters, setCategories, setFilterValue } from 'redux/actions';
import Filters from 'components/Filters/Filters';

class FiltersContainer extends PureComponent {
  handleChangeFilterInput = (name, value) => {
    this.props.setFilterValue({ name, value });
  };

  handleChangeCategories = changedCategory => {
    const currentActiveCategories = getActiveCategories(window.location);
    const newActiveCategories = _.xor(currentActiveCategories, [changedCategory]);

    const newUrl = queryString.stringifyUrl(
      {
        url: window.location.origin,
        query: { categories: newActiveCategories },
      },
      { arrayFormat: 'comma' }
    );

    window.history.pushState({ url: newUrl }, '', newUrl);
    this.props.setCategories(newActiveCategories);
  };

  handleResetFilters = () => {
    const url = window.location.origin;
    window.history.pushState({ url }, 'category', '/');
    this.props.resetFilters();
  };

  render() {
    const { minProductPrice, maxProductPrice, discount, categories } = this.props;
    return (
      <Filters
        minProductPrice={minProductPrice}
        maxProductPrice={maxProductPrice}
        discount={discount}
        categories={categories}
        onChangeFilterInput={this.handleChangeFilterInput}
        onChangeCategories={this.handleChangeCategories}
        onResetFilters={this.handleResetFilters}
      />
    );
  }
}

const mapStateToProps = state => ({
  minProductPrice: state.productsFilter.minProductPrice,
  maxProductPrice: state.productsFilter.maxProductPrice,
  discount: state.productsFilter.discount,
  categories: state.productsFilter.categories,
});

const mapDispatchToProps = {
  resetFilters,
  setCategories,
  setFilterValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(FiltersContainer);
