import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';

import Input from '../containers/Input';
import Box from '../containers/Box';
import List from '../containers/List';
import Search from '../containers/Search';

import { addRecord, getRecords } from '../actions/apiCalls';

class AddRecords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      private: '',
      public: '',
      records: [],
      titles: [
        {name: 'Numer firmowy', flex: 1},
        {name: 'Numer seryjny urządzenia', flex: 1}
      ],
    }
  }

  getRecords = () => {
    this.props.getRecords().then(data => {
      this.setState({
        records: data
      })
    });
  }

  componentDidMount() {
    if((this.props.cookies.get('login').profile !== 'adder') && (this.props.cookies.get('login').profile !== 'admin')) {
      this.props.history.push(`/panel/${this.props.cookies.get('login').id}/home`);
    }
    this.getRecords();
  }

  submit = (e) => {
    e.preventDefault();
    let confirmValue = window.confirm('Dodać produkt?');
    if(confirmValue) {
      this.props.addRecord({
        private: this.state.private,
        public: this.state.public
      }).then((data) => {
        this.setState({
          private: '',
          public: ''
        });
        this.getRecords();
      });
    }
  }
  
  changeFormData = (e) => {
    let name = e.target.name;
    this.setState({
      [name]: e.target.value
    })
  }

  search = (e) => {
    let records = this.state.records;
    let searchText = e.target.value.toUpperCase();
    records.map((record) => {
      var show = record.private.toUpperCase().includes(searchText) || record.public.toUpperCase().includes(searchText);
      if(show) {
        record.hide = false;
      } else {
        record.hide = true;
      }
      return record;
    })
    this.setState({
      records: records
    });
  }

  render() {
    return (
      <>
        <Box title="Dodaj produkt">
          <form onSubmit={this.submit}>
            <Input type="text" placeholder="Numer firmowy" label="Numer firmowy" name="private" value={this.state.private} onChange={this.changeFormData} required/>
            <Input type="text" placeholder="Numer seryjny urządzenia" label="Numer seryjny urządzenia" name="public" value={this.state.public} onChange={this.changeFormData} required/>
            <div className="form-buttons-container">
              <button type="submit">Dodaj</button>
            </div>
          </form>
        </Box>
        <Search filterMethod={this.search} placeholder="Szukaj" />
        <Box title="Lista rekordów" list size={100}>
          {this.state.records.length ?
            <List titles={this.state.titles} >
              {this.state.records.map(record => (
                 <li key={record.id} className={`product-item-list ${record.hide ? 'hide' : ''}`}>
                    <div className="product-item">
                      <span>{record.private}</span>
                      <span>{record.public}</span>
                   </div>
                </li>
              ))}
            </List> : 
            <h3>Brak produktów</h3>}
        </Box>
      </>
      
    )
  }
}

export default connect(null , {addRecord, getRecords})(withCookies(AddRecords));