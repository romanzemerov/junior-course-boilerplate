import React, { PureComponent } from 'react';
import cx from 'classnames';
import styles from './Button.module.sass';

class Button extends PureComponent {
  render() {
    const { children, type, onClick } = this.props;
    return (
      <button
        type={'button'}
        className={cx(styles.Button, {
          [styles['Button--secondary']]: type === 'secondary'
        })}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
}

export default Button;
