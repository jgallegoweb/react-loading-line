import React, { Component } from 'react';
import './LoadingLine.css';

class LoadingLine extends Component {

  constructor(props) {
    super(props);

    this.calculate = this.calculate.bind(this);
    this.run = this.run.bind(this);
    this.finalize = this.finalize.bind(this);

    this.state = {
      porcentage: 0,
      finish: false,
      error: false
    }
  }

  componentDidMount() {
    this.setState({
      runner: setInterval(this.run, 500)
    })
  }

  componentDidUpdate() {
    if (this.props.finish === true && this.state.finish !== true) {
      this.finalize();
      clearInterval(this.state.runner);
    }
    if (this.props.error === true && this.state.error !== true) {
      this.error();
      clearInterval(this.state.runner);
    }
  }

  run() {
    //TODO: Function coefficient calc.
    let coefficient = 30;
    if (this.state.porcentage > 80) {
      coefficient = 0.1;
    } else if (this.state.porcentage > 70) {
      coefficient = 1;
    } else if (this.state.porcentage > 55) {
      coefficient = 5;
    } else if (this.state.porcentage > 30) {
      coefficient = 10;
    }

    let increment = Math.random() * coefficient;
    let nextPer = this.state.porcentage + increment;

    this.setState({
      porcentage: nextPer >= 100 ? 100 : nextPer
    })

  }

  calculate() {
    if (this.state.porcentage === 100) {
      clearInterval(this.state.runner);
    }
    return {width:`${this.state.porcentage}%`};
  }

  finalize() {
    this.setState({
      porcentage: 100,
      finish: true
    });
  }

  error() {
    this.setState({
      error: true
    });
  }

  render() {
    let claseFin = this.state.porcentage >= 100 ? "ll-hide" : "";
    let claseError = this.props.error ? "ll-error ll-hide" : "";
    return (
      <div className="ll-container">
        <div className={`ll-line ${claseFin} ${claseError}`} style={this.calculate()}>
        </div>
      </div>
    );
  }
}

export default LoadingLine;
