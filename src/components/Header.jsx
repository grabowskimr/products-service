import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {testFunc} from '../actions/actions';

class Header extends Component {

    runTest = (data) => {
        this.props.testFunc(data);
    }

    render() {
        return (
            <div>
              <Link to="/">Home</Link>   
              <Link to="/service">Service</Link>
              <button onClick={() => {this.runTest('cos innego')}}>test</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        test: state.mainReducer.test
    }
}

export default connect(mapStateToProps, {testFunc})(Header);