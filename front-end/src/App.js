import React, { Component } from 'react';
import Header from './components/header/header';
import Heatmap from './components/heatmap/heatmap';
import Sensor from './components/sensor/sensor';
import Login from './components/login/login';
import Toolbar from './components/toolbar/toolbar';
// import { Router, Route, browserHistory } from 'react-router';
// import { syncHistoryWithStore } from 'react-router-redux';
import {createBrowserHistory} from 'history';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { withRouter } from "react-router";
import { Container } from 'react-bootstrap';
import { Provider } from 'react-redux';
import * as utils from './utils/utils';
import history from './history/history';
import store from './store/store';

class App extends Component {

  render() {
    return (
      <Container>
        <Header />
        <Router history={history}>
          <Toolbar />
          <Switch>
            <Route exact path="/" component={Heatmap} />
            <Route exact path="/sensor/:serialID" component={Sensor} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Router>
      </Container>
    )
  }
}

export default App;
