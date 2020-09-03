import React from 'react';
import BaseComponent from '../BaseComponent/BaseComponent';
import InputNumber from '../InputNumber';
import InputDiscount from '../InputDiscount/inputDiscount';
import styles from './Filters.module.sass';

class Filters extends BaseComponent {
  render() {
    const {
      filters: { minProductPrice, maxProductPrice, discount },
      handleChangeFilterInput
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
            <InputDiscount
              title="Скидка"
              id={discount.id}
              value={discount.value}
              onChangeInputValue={handleChangeFilterInput}
            />
          </fieldset>
        </form>
      </article>
    );
  }
}

export default Filters;
