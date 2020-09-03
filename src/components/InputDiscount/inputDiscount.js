import React from 'react';
import BaseComponent from '../BaseComponent/BaseComponent';
import Discount from 'csssr-school-input-discount';
import withInputNumber from '../HOCs/withInputNumber';

class InputDiscount extends BaseComponent {
  render() {
    const { id: name } = this.props;

    return <Discount name={name} {...this.props} />;
  }
}

export default withInputNumber(InputDiscount);
