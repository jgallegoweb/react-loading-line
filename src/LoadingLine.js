import React, { Component } from 'react';
import '../assets/css/LoadingLine.css';

class LoadingLine extends Component {

  constructor(props) {
    super(props);

    this.calculate = this.calculate.bind(this);
    this.run = this.run.bind(this);
    this.finalize = this.finalize.bind(this);
    this.init = this.init.bind(this);
    this.state = {
      porcentage: 0,
      init: true
    }
  }

  componentDidMount() {
    this.init()
  }

  init() {
    this.setState({
      porcentage: 0,
      init: true,
      runner: setInterval(this.run, 500)
    })
  }

  componentDidUpdate() {
    if (this.props.finish && !this.props.error && this.state.init) {
      this.finalize();
      clearInterval(this.state.runner);
    }
    if (this.props.error && !this.props.finish && this.state.init) {
      this.error();
      clearInterval(this.state.runner);
    }
    if (!this.props.error && !this.props.finish && !this.state.init) {
      this.init()
    }
  }

  run() {
    //TODO: Function coefficient calc.
    let coefficient = 30;
    if (this.state.porcentage > 90) {
      coefficient = 0;
    } else if (this.state.porcentage > 80) {
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
      init: false
    });
  }

  error() {
    this.setState({
      init: false
    });
  }

  render() {
    //afinar el inicio
    let claseFin = this.props.finish ? "ll-hide" : "";
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
