import React, { Component } from 'react';
import {StyleRoot} from 'radium';
import AppContent from './AppContent.js';


class App extends Component {
  render(){
    return(
  <StyleRoot>
        <AppContent />
  </StyleRoot>
    )
  }
}

export default App;
