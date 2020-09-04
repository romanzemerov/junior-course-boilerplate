import React, { PureComponent } from 'react';

const REGEXP = /\d/g;

const withInputNumber = WrappedComponent => {
  return class extends PureComponent {
    static displayName = 'withInputNumber';

    state = { value: this.props.defaultValue };

    isValid = inputValue => REGEXP.test(inputValue);

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
      const { defaultValue, ...rest } = this.props;

      return (
        <WrappedComponent
          onChange={this.handleInputChange}
          value={value}
          {...rest}
        />
      );
    }
  };
};

export default withInputNumber;
