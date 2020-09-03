import React from 'react';
import BaseComponent from '../BaseComponent/BaseComponent';
import styles from './Filters.module.sass';
import InputNumber from '../InputNumber';
import InputDiscount from '../InputDiscount/inputDiscount';

class Filters extends BaseComponent {
  state = {
    minProductPrice: this.props.minProductPrice,
    maxProductPrice: this.props.maxProductPrice,
    discount: 0
  };

  handleChangeValue = (name, value) => {
    const { filterProducts } = this.props;
    this.setState({ [name]: value }, () => {
      const { minProductPrice, maxProductPrice, discount } = this.state;
      filterProducts(minProductPrice, maxProductPrice, discount);
    });
  };

  render() {
    const { minProductPrice, maxProductPrice } = this.props;
    return (
      <article className={styles.Filters}>
        <form>
          <fieldset className={styles.FiltersFieldset}>
            <legend className={styles.FiltersHeader}>Цена</legend>
            <div className={styles.FiltersPrice}>
              <InputNumber
                id="minProductPrice"
                name="от"
                defaultValue={minProductPrice}
                placeholder={0}
                onChangeInputValue={this.handleChangeValue}
              />
              <InputNumber
                id="maxProductPrice"
                name="до"
                defaultValue={maxProductPrice}
                placeholder={3000}
                onChangeInputValue={this.handleChangeValue}
              />
            </div>
            <InputDiscount
              title="Скидка"
              id="discount"
              value={this.state.discount}
              onChangeInputValue={this.handleChangeValue}
            />
          </fieldset>
        </form>
      </article>
    );
  }
}

export default Filters;
