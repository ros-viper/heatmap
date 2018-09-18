import React, { Component } from 'react';
import Header from './components/header/header';
import Heatmap from './components/heatmap/heatmap';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Grid } from 'react-bootstrap';
import store from './store/store';


const history = syncHistoryWithStore(browserHistory, store);

class App extends Component {

  render() {
    return (
      <Grid>
        <Header />
        <Router history={history}>
          <Route exact path="/" component={Heatmap} />
        </Router>
      </Grid>
    )
  }
}

export default App;
