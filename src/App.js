import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import "react-datepicker/dist/react-datepicker.css";

import {store} from './store';
import Login from './components/Login';
import Panel from './components/Panel';

function App() {
  return (
    <CookiesProvider>
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
    </CookiesProvider>
  );
}

export default App;
