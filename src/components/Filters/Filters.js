import React, { PureComponent } from 'react';
import InputNumber from '../InputNumber';
import InputDiscount from '../InputDiscount/inputDiscount';
import CategoriesList from '../CategoriesList';
import Button from '../Button';
import styles from './Filters.module.sass';
import { connect } from 'react-redux';
import { getActiveCategories } from 'helpers';
import _ from 'lodash';
import queryString from 'query-string';
import { resetFilters, setCategories, setFilterValue } from 'redux/actions';

class Filters extends PureComponent {
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
      <article className={styles.Filters}>
        <form>
          <fieldset className={styles.FiltersFieldset}>
            <legend className={styles.FiltersHeader}>Цена</legend>
            <div className={styles.FiltersPrice}>
              <InputNumber
                id={minProductPrice.id}
                name={minProductPrice.name}
                value={minProductPrice.value}
                placeholder={0}
                onChangeInputValue={this.handleChangeFilterInput}
              />
              <InputNumber
                id={maxProductPrice.id}
                name={maxProductPrice.name}
                value={maxProductPrice.value}
                placeholder={3000}
                onChangeInputValue={this.handleChangeFilterInput}
              />
            </div>
          </fieldset>
          <fieldset className={styles.FiltersCustomFieldset}>
            <InputDiscount
              title="Скидка"
              id={discount.id}
              value={discount.value}
              onChangeInputValue={this.handleChangeFilterInput}
            />
          </fieldset>
          <fieldset className={styles.FiltersFieldset}>
            <legend className={styles.FiltersHeader}>Категории</legend>
            <CategoriesList
              activeCategories={categories}
              onClickCategoriesButton={this.handleChangeCategories}
            />
          </fieldset>

          <Button type={'secondary'} onClick={this.handleResetFilters}>
            Сбросить фильтры
          </Button>
        </form>
      </article>
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

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
