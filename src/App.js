import React from 'react';
import NavBar from './components/NavBar'
import MainContainer from './containers/MainContainer'
import TabbedBar from './components/TabbedBar'
import SandboxContainer from './containers/SandboxContainer' // storing everything here until App is cleaned up

export default class App extends React.Component {
  render() {
    return (
      <div className="row">
        <NavBar />
        <MainContainer />
        <SandboxContainer />
        <TabbedBar />
      </div>
    );
  }
}
