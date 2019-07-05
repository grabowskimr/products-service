import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';

import {store} from './store';
import Login from './components/Login';
import Panel from './components/Panel';

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/panel"  component={Panel} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
