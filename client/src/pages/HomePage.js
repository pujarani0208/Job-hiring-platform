import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import './style.css';
import store from '../store';
import { isAuth } from '../actions/authActions'
import {Redirect} from 'react-router-dom'
import Navbar from './Navbar';
import { Route, Switch} from 'react-router-dom'
import About from './About';


export class HomePage extends Component {

  componentDidMount() {
    // Check if session cookie is present
    store.dispatch(isAuth());
  }

  static propTypes = {
    button: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
  };

  render() {

    if(this.props.isAuthenticated) {
      return <Redirect to="/profile" />
    }
    return (
      <>
      <div className="navbarMain">
        <Navbar></Navbar>
        </div>
        <Switch>
              <Route exact path ="/about" component={About}/>
        </Switch>
    </>
    )
  }
}
const mapStateToProps = (state) => ({ //Maps state to redux store as props
  button: state.ui.button,
  isAuthenticated: state.auth.isAuthenticated

});

export default connect(mapStateToProps)(HomePage);
