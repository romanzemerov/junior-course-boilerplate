import React from 'react';
import BaseComponent from '../BaseComponent/BaseComponent';
import styles from './InputNumber.module.sass';

const REGEXP = /\d/g;

class InputNumber extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = { value: this.props.defaultValue };
  }

  isValid = inputValue => inputValue && REGEXP.test(inputValue);

  handleInputChange = e => {
    const { id, onChangeInputValue } = this.props;
    const value = +e.target.value;

    if (this.isValid(value)) {
      this.setState({ value });
      onChangeInputValue(id, value);
    }
  };

  render() {
    const { value } = this.state;
    const { id, name, placeholder } = this.props;

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
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}

export default InputNumber;
