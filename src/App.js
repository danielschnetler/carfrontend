import React from 'react';
import './App.css';
//import Carlist from './Components/Carlist';
import Login from './Components/Login';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'

class App extends React.Component {
   render() { 
    return (
      <div className="App">
      <AppBar position="static" color="default">
        <Toolbar>Carlist</Toolbar>
      </AppBar>
      <Login />
        
      </div>
      
    );
  }
}
export default App;
