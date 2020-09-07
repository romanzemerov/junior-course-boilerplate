import React, { PureComponent } from 'react';
import InputNumber from '../InputNumber';
import InputDiscount from '../InputDiscount/inputDiscount';
import CategoriesList from '../CategoriesList';
import Button from '../Button';
import { AppContext } from './../App/App';
import styles from './Filters.module.sass';

class Filters extends PureComponent {
  render() {
    return (
      <AppContext.Consumer>
        {({
          filters,
          handleChangeFilterInput,
          handleChangeCategories,
          handleResetFilters
        }) => (
          <article className={styles.Filters}>
            <form>
              <fieldset className={styles.FiltersFieldset}>
                <legend className={styles.FiltersHeader}>Цена</legend>
                <div className={styles.FiltersPrice}>
                  <InputNumber
                    id={filters.minProductPrice.id}
                    name={filters.minProductPrice.name}
                    defaultValue={filters.minProductPrice.value}
                    placeholder={0}
                    onChangeInputValue={handleChangeFilterInput}
                  />
                  <InputNumber
                    id={filters.maxProductPrice.id}
                    name={filters.maxProductPrice.name}
                    defaultValue={filters.maxProductPrice.value}
                    placeholder={3000}
                    onChangeInputValue={handleChangeFilterInput}
                  />
                </div>
              </fieldset>
              <fieldset className={styles.FiltersCustomFieldset}>
                <InputDiscount
                  title="Скидка"
                  id={filters.discount.id}
                  defaultValue={filters.discount.value}
                  value={filters.discount.value}
                  onChangeInputValue={handleChangeFilterInput}
                />
              </fieldset>
              <fieldset className={styles.FiltersFieldset}>
                <legend className={styles.FiltersHeader}>Категории</legend>
                <CategoriesList
                  items={filters.categories}
                  onClickCategoriesButton={handleChangeCategories}
                />
              </fieldset>

              <Button type={'secondary'} onClick={handleResetFilters}>
                Сбросить фильтры
              </Button>
            </form>
          </article>
        )}
      </AppContext.Consumer>
    );
  }
}

export default Filters;
