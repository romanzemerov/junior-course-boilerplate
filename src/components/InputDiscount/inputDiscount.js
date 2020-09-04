import React, { PureComponent } from 'react';
import Discount from 'csssr-school-input-discount';
import withInputNumber from '../HOCs/withInputNumber';

class InputDiscount extends PureComponent {
  render() {
    const { id: name } = this.props;

    return <Discount name={name} {...this.props} />;
  }
}

export default withInputNumber(InputDiscount);