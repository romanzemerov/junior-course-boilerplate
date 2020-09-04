import React, { PureComponent } from 'react';
import styles from './Button.module.sass';

class Button extends PureComponent {
  render() {
    let { children } = this.props;
    return <button className={styles.Button}>{children}</button>;
  }
}

export default Button;
