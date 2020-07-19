import React, {Component} from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import PageContent from './Components/PageContent';

class App extends Component {
  constructor(props){
    super(props);
    //this.props.graphDimension = {};
    this.state = {};
  }

  componentDidMount(){
    let graphContainer = document.getElementsByClassName('graph');
    let graphWidth = graphContainer.clientWidth;
    let graphHeight = graphContainer.clientHeight;
    this.setState({
      width: graphWidth,
      height: graphHeight
    })
  }

  render() {
    return (
      <div className="App">
        <Navbar/>
        <PageContent graphDimension={this.state}/>
        <Footer/>
      </div>
    );
  }
} 

export default App;
