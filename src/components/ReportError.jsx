import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';

import Box from '../containers/Box';
import Input from '../containers/Input';
import { sendErrorReport, checkIfReportExist } from '../actions/apiCalls';

class ReportError extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      file: '',
      userId: this.props.cookies.get('login').id,
      productId: this.props.match.params.id,
      type: 'report'
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
    this.props.sendErrorReport(this.state).then(() => {
      this.props.history.push(`/panel/${this.state.userId}/home`);
    });
  }

  render() {
    return (
      <Box title="Zgłoś usterkę">
        <form onSubmit={this.submit}>
          <Input type="text" label="Tytuł usterki" name="title" value={this.state.title} onChange={this.onChange} />
          <Input type="textarea" label="Opis" name="description" value={this.state.description}  onChange={this.onChange}/>
          <Input type="file" label="Zdjecie" name="file" onChange={this.onChangeFile} />
          <button type="submit">Wyślij</button>
        </form>
      </Box>
    )
  }
}

export default connect(null, {sendErrorReport, checkIfReportExist})(withCookies(ReportError));