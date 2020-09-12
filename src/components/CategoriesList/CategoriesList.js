import React, { PureComponent } from 'react';
import cx from 'classnames';
import styles from './CategoriesList.module.sass';

const CATEGORIES_LIST = [
  {
    id: 'clothes',
    label: 'Clothes'
  },
  {
    id: 'books',
    label: 'Books'
  }
];

class CategoriesList extends PureComponent {
  handleClick = e => {
    const { onClickCategoriesButton } = this.props;
    onClickCategoriesButton(e.target.dataset.id);
  };

  render() {
    const { activeCategories } = this.props;

    return (
      <ul className={styles.List}>
        {CATEGORIES_LIST.map(({ id, label }) => {
          const isActive = activeCategories.includes(id);
          return (
            <li className={styles.Item} key={id}>
              <button
                className={cx(styles.Button, {
                  [styles['Button--active']]: isActive
                })}
                type={'button'}
                data-id={id}
                onClick={this.handleClick}
              >
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default CategoriesList;
