import React from 'react';
import { connect } from 'react-redux';

import { hideMessage } from '../actions/actions';

const Notification = (props) => {

  if(props.showMessage) {
    const timeout = setTimeout(() => {
      props.hideMessage();
      clearTimeout(timeout);
    }, 3500);
  }

  return (
    <div className={`notification ${props.message.status ? 'success' : 'error'} ${props.showMessage ? 'show' : 'hide'}`}>
      {props.message.message}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    showMessage: state.mainReducer.showMessage,
    message: state.mainReducer.message
  }
}

export default connect(mapStateToProps, {hideMessage})(Notification);