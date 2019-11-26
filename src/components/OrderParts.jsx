import React, {Component} from 'react';
import Box from "../containers/Box";
import Input from "../containers/Input";
import {connect} from "react-redux";

import { setStatus, checkIfOrderExist } from '../actions/apiCalls';
import {withCookies} from "react-cookie";

class OrderParts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Części',
      description: '',
      file: '',
      userId: this.props.cookies.get('login').id,
      productId: this.props.match.params.productId,
      type: 'parts',
      email: this.props.email,
      method: 'setPartsOrder'
    };
  }

  componentDidMount() {
    this.props.checkIfOrderExist(this.state).then(data => {
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
    let confirmValue = window.confirm('Zamówić części?');
    if(confirmValue) {
      this.props.setStatus(this.state).then(() => {
        this.props.history.push(`/panel/${this.state.userId}/home`);
      });
    }
  }

  render() {
    return (
      <Box title="Zamów częsci">
        <form onSubmit={this.submit}>
          <Input type="textarea" label="Podaj nazwy części(nazwa lub index)" name="description" value={this.state.description}  onChange={this.onChange} required/>
          <Input type="file" label="Zdjecie" name="file" onChange={this.onChangeFile} />
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

export default connect(mapStateToProps, {checkIfOrderExist, setStatus})(withCookies(OrderParts));