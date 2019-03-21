import React, { Component } from 'react';
import Header from './components/header/header';
import Heatmap from './components/heatmap/heatmap';
import Sensor from './components/sensor/sensor';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Container } from 'react-bootstrap';
import * as utils from './utils/utils';
import store from './store/store';


const history = syncHistoryWithStore(browserHistory, store);

class App extends Component {

  componentWillMount() {
    utils.getSensors(utils.sensorsLink);
  }

  render() {
    return (
      <Container>
        <Header />
        <Router history={history}>
          <Route exact path="/" component={Heatmap} />
          <Route exact path="/sensor/:serialID" component={Sensor} />
        </Router>
      </Container>
    )
  }
}

export default App;
