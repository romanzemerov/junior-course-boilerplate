import React, { PureComponent } from 'react';
import InputNumber from '../InputNumber';
import InputDiscount from '../InputDiscount/inputDiscount';
import styles from './Filters.module.sass';
import CategoriesList from '../CategoriesList';
import Button from '../Button';

class Filters extends PureComponent {
  render() {
    const {
      filters: { minProductPrice, maxProductPrice, discount, categories },
      handleChangeFilterInput,
      handleChangeCategories,
      handleResetFilters
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
                defaultValue={minProductPrice.value}
                placeholder={0}
                onChangeInputValue={handleChangeFilterInput}
              />
              <InputNumber
                id={maxProductPrice.id}
                name={maxProductPrice.name}
                defaultValue={maxProductPrice.value}
                placeholder={3000}
                onChangeInputValue={handleChangeFilterInput}
              />
            </div>
          </fieldset>
          <fieldset className={styles.FiltersCustomFieldset}>
            <InputDiscount
              title="Скидка"
              id={discount.id}
              defaultValue={discount.value}
              value={discount.value}
              onChangeInputValue={handleChangeFilterInput}
            />
          </fieldset>
          <fieldset className={styles.FiltersFieldset}>
            <legend className={styles.FiltersHeader}>Категории</legend>
            <CategoriesList
              items={categories}
              onClickCategoriesButton={handleChangeCategories}
            />
          </fieldset>

          <Button type={'secondary'} onClick={handleResetFilters}>
            Сбросить фильтры
          </Button>
        </form>
      </article>
    );
  }
}

export default Filters;
