import React, { Component } from 'react'

import Box from '../containers/Box';
import Input from '../containers/Input';

class ReportError extends Component {
  render() {
    console.log(this.props.match.params.id);
    return (
      <Box title="Zgłoś usterkę">
        <Input type="text" />
      </Box>
    )
  }
}

export default ReportError;