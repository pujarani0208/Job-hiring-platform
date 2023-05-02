import React , { Component } from 'react';
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
import { Route, Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import JobForm from './pages/JobForm';
import JobDetails from './pages/JobDetails';
import ApplyJobForm from './pages/ApplyJobForm';
import ListAppliedJob from './pages/ListAppliedJob';
import ListUsersJob from './pages/ListUsersJob';
import About from './pages/About';
import ProfileForm from './pages/ProfileForm';
import ViewProfile from './pages/ViewProfile';

class App extends Component {

  render () {
    return (
      <Provider store={store}>
            <Switch>
            <Route exact path ="/" component={About}/>
              <Route exact path ="/profile" component={Profile}/>
              <Route exact path ="/profileForm" component={ProfileForm}/>
              <Route exact path ="/viewProfile" component={ViewProfile}/>
              <Route exact path ="/about" component={About}/>
              <Route exact path ="/register" component={Register}/>
              <Route exact path ="/login" component={Login}/>
              <Route exact path ="/postJob" component={JobForm}/>
              <Route exact path ="/applyJobForm" component={ApplyJobForm}/>
              <Route exact path ="/getAllPostedJobs" component={JobDetails}/>
              <Route exact path ="/getAllAppliedJobs" component={ListAppliedJob}/>
              <Route exact path ="/getListUserJobs" component={ListUsersJob}/>
            </Switch>
        < HomePage/>
      </Provider>
    );
}
}
export default App;
