import React from 'react';
import BaseComponent from '../BaseComponent/BaseComponent';
import styles from './Filters.module.sass';
import InputNumber from '../InputNumber';
import Discount from 'csssr-school-input-discount';

class Filters extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      minProductPrice: this.props.minProductPrice,
      maxProductPrice: this.props.maxProductPrice
    };
  }

  handleChangePrice = (name, price) => {
    const { filterProducts } = this.props;

    this.setState({ [name]: price }, () => {
      const { minProductPrice, maxProductPrice } = this.state;
      filterProducts(minProductPrice, maxProductPrice);
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
                onChangeInputValue={this.handleChangePrice}
              />
              <InputNumber
                id="maxProductPrice"
                name="до"
                defaultValue={maxProductPrice}
                placeholder={3000}
                onChangeInputValue={this.handleChangePrice}
              />
            </div>
            <Discount
              title="Скидка"
              name="sale"
              value={1}
              onChange={() => {}}
            />
          </fieldset>
        </form>
      </article>
    );
  }
}

export default Filters;
