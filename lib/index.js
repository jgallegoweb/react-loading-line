'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./assets/css/LoadingLine.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoadingLine = function (_Component) {
  _inherits(LoadingLine, _Component);

  function LoadingLine(props) {
    _classCallCheck(this, LoadingLine);

    var _this = _possibleConstructorReturn(this, (LoadingLine.__proto__ || Object.getPrototypeOf(LoadingLine)).call(this, props));

    _this.calculate = _this.calculate.bind(_this);
    _this.run = _this.run.bind(_this);
    _this.finalize = _this.finalize.bind(_this);
    init();
    return _this;
  }

  _createClass(LoadingLine, [{
    key: 'init',
    value: function init() {
      this.setState = {
        porcentage: 0,
        finish: false,
        error: false
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({
        runner: setInterval(this.run, 500)
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.finish && !this.state.finish) {
        this.finalize();
        clearInterval(this.state.runner);
      }
      if (this.props.error && !this.state.error) {
        this.error();
        clearInterval(this.state.runner);
      }
      if (!this.props.error && !this.props.error) {
        this.init();
      }
    }
  }, {
    key: 'run',
    value: function run() {
      //TODO: Function coefficient calc.
      var coefficient = 30;
      if (this.state.porcentage > 80) {
        coefficient = 0.1;
      } else if (this.state.porcentage > 70) {
        coefficient = 1;
      } else if (this.state.porcentage > 55) {
        coefficient = 5;
      } else if (this.state.porcentage > 30) {
        coefficient = 10;
      }

      var increment = Math.random() * coefficient;
      var nextPer = this.state.porcentage + increment;

      this.setState({
        porcentage: nextPer >= 100 ? 100 : nextPer
      });
    }
  }, {
    key: 'calculate',
    value: function calculate() {
      if (this.state.porcentage === 100) {
        clearInterval(this.state.runner);
      }
      return { width: this.state.porcentage + '%' };
    }
  }, {
    key: 'finalize',
    value: function finalize() {
      this.setState({
        porcentage: 100,
        finish: true
      });
    }
  }, {
    key: 'error',
    value: function error() {
      this.setState({
        error: true
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var claseFin = this.state.porcentage >= 100 ? "ll-hide" : "";
      var claseError = this.props.error ? "ll-error ll-hide" : "";
      return _react2.default.createElement(
        'div',
        { className: 'll-container' },
        _react2.default.createElement('div', { className: 'll-line ' + claseFin + ' ' + claseError, style: this.calculate() })
      );
    }
  }]);

  return LoadingLine;
}(_react.Component);

exports.default = LoadingLine;
