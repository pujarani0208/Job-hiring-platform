import React , { Component } from 'react';
import HomePage from './components/HomePage';
import Profile from './components/Profile';
import { Route, Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import JobForm from './components/JobForm';
import JobDetails from './components/JobDetails';
import ApplyJobForm from './components/ApplyJobForm';
import ListAppliedJob from './components/ListAppliedJob';


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
