import './style.css';
import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import './style.css';
import { Redirect } from 'react-router-dom'
import { buttonReset} from '../actions/uiActions';
import { logout } from '../actions/authActions';
import Popup from 'reactjs-popup';

import {
  Button,
  Card,
  Collapse,
 CardTitle,
  CardSubtitle,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner
} from "reactstrap";
import {CCard,
  CCollapse,
  CButton,
  CRow,
  CCol,
  CCardFooter,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCardText,} from '@coreui/react';
import { CiUser } from "react-icons/ci";

class ViewProfile extends Component {

	// Constructor
	constructor(props) {
		super(props);
    const propTypes = {
      button: PropTypes.bool,
      authState: PropTypes.object.isRequired,
      buttonReset: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired,
      userId: PropTypes.object.isRequired,
    };
		this.state = {
			item: {},
			DataisLoaded: false
		};

  }
 componentDidMount() {
    fetch(
    `http://localhost:3000/api/profile/getProfileByUserId/${this.props.userId}`)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          item: json,
          DataisLoaded: true
        });
      })
  }
	render() {
    if(!this.props.authState.isAuthenticated) {
      return <Redirect to="/login" />
    }
    const {visible}  = this.state;
    const onButtonClick = () => {
      const flag = visible;
      this.setState({
        visible : !flag
      })
    }
	  const { DataisLoaded, item } = this.state;
		if (!DataisLoaded) return <div>
			<h1> Pleease wait some time.... </h1> </div> ;
    return (
      <>
      {
          <ol key = { item._id } >
          <Popup trigger=
          {<h5  color="dark">{ item.firstName } {item.lastName}<CiUser/></h5>}
                position="center">
          <CCard color= {`${item.status}` === 'ACCEPT' ? 'light' : 'light'} textColor= {`${item.status}` === 'ACCEPT' ? 'primary' : 'secondary'} >
          <CCardHeader> <h5>{ item.firstName } {item.lastName}</h5></CCardHeader>
          <CCardBody>
          <CCardTitle>{ item.email }</CCardTitle>
          <CCardText>
          Contact Number: { item.contactNo }<br></br>
          Description: { item.description }<br></br>
          ContactNo: { item.contactNo }<br></br>
          Address: { item.address }<br></br> 
          </CCardText>
          </CCardBody>
          </CCard>
          </Popup>
          </ol>
        }
      </>
  )
}
}

const mapStateToProps = (state) => ({ //Maps state to redux store as props
  button: state.ui.button,
  authState: state.auth,
});

export default connect(mapStateToProps, { logout, buttonReset })(ViewProfile);