import React, { Component } from 'react';
import Grid from './component/grid/grid';
import HomePage from './component/homepage/homepage';
import Game from './component/game/Game';
import './App.scss';

class App extends Component {
  state = {
    currentPage: 'home'
  };

  onPageChange = page => {
    this.setState({
      currentPage: page
    });
  };

  renderPageContent() {
    switch (this.state.currentPage) {
      case 'home':
        return <HomePage onPageChange={this.onPageChange} />;
      case 'game':
        return <Grid />;
      default:
        break;
    }
  }

  render() {
    return (
      <div className="App">
        {this.renderPageContent()}
        <Game />
      </div>
    );
  }
}

export default App;
