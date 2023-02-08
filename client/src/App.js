import './App.css';
import React, { Component} from "react";
import Plants from'./components/plants';
import Counter from './components/Counter';

class App extends Component {
  render(){
    return (
      <main className='container'>
        <Plants />
      </main>
    );
  }
}



export default App;