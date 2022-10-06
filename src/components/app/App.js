import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

class App extends Component {
  state = {
    selectedChar: null,
  }

  onCharSelect = (id) => {
    this.setState({
      selectedChar: id,
    });
  }

  render() {
    return (
      <div className="app">
        <AppHeader/>
        <main>
          <RandomChar/>
          <div className="char__content">
            <CharList onCharSelect={this.onCharSelect} />
            <ErrorBoundary>
              <CharInfo charId={this.state.selectedChar} />
            </ErrorBoundary>  
          </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </main>
      </div>
    );
  }
}

export default App;