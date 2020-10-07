import React, { PureComponent } from 'react';
import InputNumber from '../InputNumber';
import InputDiscount from '../InputDiscount/inputDiscount';
import CategoriesList from '../CategoriesList';
import Button from '../Button';
import styles from './Filters.module.sass';

class Filters extends PureComponent {
  render() {
    const {
      minProductPrice,
      maxProductPrice,
      discount,
      categories,
      onChangeFilterInput,
      onChangeCategories,
      onResetFilters,
    } = this.props;
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
                onChangeInputValue={onChangeFilterInput}
              />
              <InputNumber
                id={maxProductPrice.id}
                name={maxProductPrice.name}
                value={maxProductPrice.value}
                placeholder={3000}
                onChangeInputValue={onChangeFilterInput}
              />
            </div>
          </fieldset>
          <fieldset className={styles.FiltersCustomFieldset}>
            <InputDiscount
              title="Скидка"
              id={discount.id}
              value={discount.value}
              onChangeInputValue={onChangeFilterInput}
            />
          </fieldset>
          <fieldset className={styles.FiltersFieldset}>
            <legend className={styles.FiltersHeader}>Категории</legend>
            <CategoriesList activeCategories={categories} onClickCategoriesButton={onChangeCategories} />
          </fieldset>
          <Button type={'secondary'} onClick={onResetFilters}>
            Сбросить фильтры
          </Button>
        </form>
      </article>
    );
  }
}

export default Filters;
