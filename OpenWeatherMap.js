var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// React
var e = React.createElement;

var Button = function Button(_ref) {
    var prop = _objectWithoutProperties(_ref, []);

    var label = prop.label;


    return React.createElement(
        'button',
        { onClick: function onClick() {
                return alert('button works');
            } },
        label
    );
};

var OpenWetaherMap = function (_React$Component) {
    _inherits(OpenWetaherMap, _React$Component);

    function OpenWetaherMap(props) {
        _classCallCheck(this, OpenWetaherMap);

        var _this = _possibleConstructorReturn(this, (OpenWetaherMap.__proto__ || Object.getPrototypeOf(OpenWetaherMap)).call(this, props));

        _this.state = { working: true };
        return _this;
    }

    _createClass(OpenWetaherMap, [{
        key: 'render',
        value: function render() {
            if (this.state.working) return React.createElement(Button, { label: 'My New Button' });
        }
    }]);

    return OpenWetaherMap;
}(React.Component);

var domContainer = document.querySelector('#react-app');
ReactDOM.render(e(OpenWetaherMap), domContainer);