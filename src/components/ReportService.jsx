import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';

import Box from '../containers/Box';
import Input from '../containers/Input';
import { setStatusService, checkIfReportExist } from '../actions/apiCalls';

class ReportService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      file: '',
      userId: this.props.cookies.get('login').id,
      productId: this.props.match.params.productId,
      type: 'service',
    };
  }

  componentDidMount() {
    this.props.checkIfReportExist(this.state).then(data => {
      if(!data.status) {
        this.props.history.push(`/panel/${this.state.userId}/home`);
      }
    })
  }

  onChange = (e) => {
    let name = e.target.name;
    this.setState({
      [name]: e.target.value
    })
  }

  onChangeFile = (e) => {
    let image = e.target.files[0];
    this.setState({
      file: image
    })
  }

  submit = (e) => {
    e.preventDefault();
    let confirmValue = window.confirm('Zgłosić serwis?');
    if(confirmValue) {
      this.props.setStatusService({
        id: this.state.productId,
        userId: this.state.userId,
        type: 'service',
        description: this.state.description,
        status: 1
      }).then(() => {
        this.props.history.push(`/panel/${this.state.userId}/home`);
      });
    }
  }

  render() {
    return (
      <Box title="Zgłoś serwis">
        <form onSubmit={this.submit}>
          <Input type="textarea" label="Opis(Podaj opis oraz miejsce postoju urządzenia)" name="description" value={this.state.description} onChange={this.onChange}/>
          <button type="submit">Wyślij</button>
        </form>
      </Box>
    )
  }
}

function mapStateToProps(state) {
  return {
    email: state.mainReducer.email
  }
}

export default connect(mapStateToProps, {setStatusService, checkIfReportExist})(withCookies(ReportService));