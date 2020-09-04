import React, { PureComponent } from 'react';
import { formatMoney } from 'csssr-school-utils';
import cx from 'classnames';
import styles from './Price.module.sass';

const DECIMAL_COUNT = 0;

class Price extends PureComponent {
  render() {
    let { value, isOriginalPrice } = this.props;

    return (
      <span
        className={cx([styles.Price], {
          [styles['Price--secondary']]: isOriginalPrice === false
        })}
      >
        {formatMoney(value, DECIMAL_COUNT)}
      </span>
    );
  }
}

Price.defaultProps = { isOriginalPrice: true };

export default Price;
