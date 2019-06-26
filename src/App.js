import React from 'react';
import NavBar from './components/NavBar'
import MainContainer from './containers/MainContainer'
import TabbedBar from './components/TabbedBar'
// import Error from './components/Error'

import SandboxContainer from './containers/SandboxContainer' // storing everything here until App is cleaned up

import { Route, Switch } from 'react-router-dom'

export default class App extends React.Component {
  render() {
    return (

        <div className="row">
          <NavBar />
          <div className="m-4">
            <Switch>
                <Route exact path="/" component={MainContainer} />
                <Route path="/sandbox" component={SandboxContainer} />
            </Switch>
          </div>
          <TabbedBar />
        </div>

    );
  }
}
