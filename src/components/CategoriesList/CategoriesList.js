import React, { PureComponent } from 'react';
import cx from 'classnames';
import styles from './CategoriesList.module.sass';

class CategoriesList extends PureComponent {
  handleClick = ({ target }) => {
    const { onClickCategoriesButton } = this.props;
    onClickCategoriesButton(target.dataset.id);
  };

  render() {
    const { items } = this.props;

    return (
      <ul className={styles.List}>
        {items.map(({ id, name, isActive }) => (
          <li className={styles.Item} key={id}>
            <button
              className={cx(styles.Button, {
                [styles['Button--active']]: isActive
              })}
              type={'button'}
              data-id={id}
              onClick={this.handleClick}
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

export default CategoriesList;
