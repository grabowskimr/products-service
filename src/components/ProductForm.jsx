import React, { Component } from 'react'

import Input from '../containers/Input';
import Box from '../containers/Box';
import { host } from '../constants/config';

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: this.props.productData ? true : false,
      id: this.props.productData ? this.props.productData.id : '',
      name: this.props.productData ? this.props.productData.name : '',
      file: '',
      props: this.props.productData ? this.props.productData.props : {},
      image: this.props.productData ? this.props.productData.image : '',
      showAddBox: false,
      propName: '',
      propValue: ''
    };
  }

  changeFormData = (e) => {
    let name = e.target.name;
    this.setState({
      [name]: e.target.value
    })
  }

  onChangeFile = (e) => {
    let image = e.target.files[0];
    this.setState({
      file: image,
      image: ''
    })
  }

  showAddBox = () => {
    this.setState({
      showAddBox: true
    })
  }

  addProp = () => {
    let prop = {
      name: this.state.propName,
      value: this.state.propValue
    };
    let timestamp = new Date().getTime();
    let propname = 'prop'+timestamp;
    this.setState({
      props: {...this.state.props, [propname]: prop},
      propName: '',
      propValue: '',
      showAddBox: !this.state.showAddBox
    });
  }

  updateProp = (e) => {
    let prop = e.target.name;
    this.setState({
      props: {...this.state.props, [prop]: {name: this.state.props[prop].name, value: e.target.value}}
    });
  }

  removeProp = (e) => {
    e.stopPropagation();
    let propKey = e.target.dataset.prop;
    let newProps = this.state.props;
    delete newProps[propKey];
    this.setState({
      props: newProps
    })
  }

  render() {
    return (
      <Box title={this.props.title}>
        <form onSubmit={(e) => this.props.submit(e, {
          id: this.state.id,
          name: this.state.name,
          file: this.state.file,
          props: JSON.stringify(this.state.props),
          image: this.state.image
        })}>
          <Input type="text" placeholder="Produkt" label="Produkt" name="name" value={this.state.name} onChange={this.changeFormData} required/>
          <Input type="file" label="Zdjecie" name="file" onChange={this.onChangeFile} />
          {this.state.image && <div className="product-img"><img src={`${host}/${this.state.image}`} alt="product" /></div>}
          {Object.keys(this.state.props).map(key => (
            <div className="product-input-prop" key={key}>
              <Input type="text" placeholder={this.state.props[key].name} label={this.state.props[key].name} name={key} value={this.state.props[key].value} onChange={this.updateProp} required/>            
              <button type="button" className="delete" data-prop={key} onClick={this.removeProp}>-</button>
            </div>
          ))}
          {this.state.showAddBox && <div className='addField'>
            <Input type="text" placeholder="Nazwa" label="Nazwa" name="propName" value={this.state.propName} onChange={this.changeFormData} required/>
            <Input type="text" placeholder="Wartość" label="Wartość" name="propValue" value={this.state.propValue} onChange={this.changeFormData} required/>
            <button onClick={this.addProp}>Dodaj</button>
          </div>}
          <div className="form-buttons-container">
            {!this.state.showAddBox && <button onClick={this.showAddBox} className="add-prop">Dodaj właściwość</button>}
            <button type="submit">Zapisz</button>
          </div>
        </form>
      </Box>
    )
  }
}

export default ProductForm;