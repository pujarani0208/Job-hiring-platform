import React , { Component } from 'react';
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
import { Route, Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import JobForm from './pages/JobForm';
import JobDetails from './pages/JobDetails';
import ApplyJobForm from './pages/ApplyJobForm';
import ListAppliedJob from './pages/ListAppliedJob';


class App extends Component {

  render () {
    return (
      <Provider store={store}>
            <Switch>
              <Route exact path ="/profile" component={Profile}/>
              <Route exact path ="/postJob" component={JobForm}/>
              <Route exact path ="/applyJobForm" component={ApplyJobForm}/>
              <Route exact path ="/getAllPostedJobs" component={JobDetails}/>
              <Route exact path ="/getAllAppliedJobs" component={ListAppliedJob}/>
            </Switch>
        < HomePage/>
      </Provider>
    );
}
}

export default App;
