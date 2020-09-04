import React, { PureComponent } from 'react';
import styles from './Header.module.sass';

class Header extends PureComponent {
  render() {
    const { children } = this.props;
    return <h2 className={styles.Header}>{children}</h2>;
  }
}

export default Header;
