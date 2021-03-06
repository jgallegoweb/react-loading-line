import React, { Component } from 'react';
import LoadingLine from './LoadingLine.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      isFinish: false
    }
    this.lanzaFin = this.lanzaFin.bind(this);
    this.lanzaError = this.lanzaError.bind(this);
    this.reiniciar = this.reiniciar.bind(this);
  }

  lanzaFin () {
    this.setState({
      isFinish: true
    })
  }

  lanzaError () {
    this.setState({
      isError: true
    })
  }

  reiniciar () {
    this.setState({
      isError: false,
      isFinish: false
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>React Loading Line</h2>
        </div>
        <LoadingLine
          finish={this.state.isFinish}
          error={this.state.isError}
        />
        <p className="App-intro">
          Pulsar para finalizar <button onClick={this.lanzaFin}>Fin</button>
        </p>
        <p className="App-intro">
          Pulsar para finalizar con error <button onClick={this.lanzaError}>Error</button>
        </p>
        <p className="App-intro">
          Pulsar para iniciar o reiniciar <button onClick={this.reiniciar}>Inicia</button>
        </p>
      </div>
    );
  }
}

export default App;
