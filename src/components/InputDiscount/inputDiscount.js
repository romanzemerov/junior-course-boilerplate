import React, { PureComponent } from 'react';
import Discount from 'csssr-school-input-discount';
import withInputNumber from '../HOCs/withInputNumber';

class InputDiscount extends PureComponent {
  render() {
    const { id: name } = this.props;

    return <Discount {...this.props} name={name}  />;
  }
}

export default withInputNumber(InputDiscount);
