import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainContainer from './containers/MainContainer/MainContainer';

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Header />
        <MainContainer />
        <Footer />
      </div>
    );
  }
}

export default App;
