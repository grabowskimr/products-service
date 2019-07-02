import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import './App.css';
import Home from './components/Home';
import Service from './components/Service';

import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/service" component={Service} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
