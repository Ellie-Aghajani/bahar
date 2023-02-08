import './App.css';
import React, { Component} from "react";
import Plants from'./components/plants';
import Counters from './components/counters';
import Navbar from "./components/navbar"

class App extends Component {
  render(){
    return (
      <React.Fragment>
        <Navbar />
        <main className='container'>
          <Counters />
          <Plants />
        </main>
      </React.Fragment>
    );
  }
}



export default App;