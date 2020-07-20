import React, {Component} from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import PageContent from './Components/PageContent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        <PageContent/>
        <Footer/>
      </div>
    );
  }
} 

export default App;
