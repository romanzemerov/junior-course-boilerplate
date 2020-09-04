import React, { PureComponent } from 'react';
import withInputNumber from '../HOCs/withInputNumber';
import styles from './InputNumber.module.sass';

class InputNumber extends PureComponent {
  render() {
    const { id, name, value, placeholder, onChange } = this.props;

    return (
      <div className={styles.InputNumber}>
        <label className={styles.InputNumberLabel} htmlFor={id}>
          {name}
        </label>
        <input
          className={styles.InputNumberInput}
          type="number"
          name={id}
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    );
  }
}

export default withInputNumber(InputNumber);
