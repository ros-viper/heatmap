import React from 'react';
import Header from './components/header/header';
import Heatmap from './components/heatmap/heatmap';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';


const App = ({history}) => {
  return (
    <div>
        <Header />
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/" component={Heatmap} />
          </Switch>
        </ConnectedRouter>
    </div>
  )
};

export default App;
