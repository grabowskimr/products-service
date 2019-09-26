import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import "react-datepicker/dist/react-datepicker.css";

import {store} from './store';
import Login from './components/Login';
import Panel from './components/Panel';
import Loader from './containers/Loader';
import Notification from './containers/Notification';
import Reset from './components/Reset';

function App() {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <div className="app">
          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/reset" component={Reset} />
              <Route path="/panel/:userId"  component={Panel} />
            </Switch>
          </Router>
        </div>
        <Loader />
        <Notification />
        <div id="modal"></div>
      </Provider>
    </CookiesProvider>
  );
}

export default App;
