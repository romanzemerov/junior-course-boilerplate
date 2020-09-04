import React, { Component } from 'react';
import ProductItem from 'school-product-card';
import Rating from '../Rating';
import Price from '../Price/Price';
import styles from './GoodsList.module.sass';

class GoodsList extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const { goods } = this.props;
    const { goods: nextGoods } = nextProps;

    return goods.length === nextGoods.length
      ? goods.every(({ id }, i) => id !== nextGoods[i].id)
      : true;
  }

  render() {
    let { goods } = this.props;
    return (
      <ul className={styles.GoodsList}>
        {goods.map(good => {
          const { id, price, subPriceContent, ...restProps } = good;
          const subPriceNode = subPriceContent ? (
            <Price value={subPriceContent} isOriginalPrice={false} />
          ) : (
            ''
          );

          return (
            <ProductItem
              {...restProps}
              price={<Price value={price} />}
              subPriceContent={subPriceNode}
              ratingComponent={Rating}
              key={id}
            />
          );
        })}
      </ul>
    );
  }
}

export default GoodsList;
