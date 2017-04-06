import React, {Component, PropTypes} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  LayoutAnimation,
  TouchableOpacity,
  TextInput,
} from "react-native";

import Icons from "./Icons";
import CCInput from "./CCInput";
import {InjectedProps} from "./connectToState";


const s = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: 'flex-start',
    overflow: "hidden",
    height: 115
  },
  icon: {
    width: 48,
    height: 40,
    resizeMode: "contain",
  },
  expiryInput: {
    width: 80,
  },
  cvcInput: {
    width: 80,
  },
  input: {
    height: 40,
    color: "black",
  },
  formWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.15)',
    flex: 1,
    marginBottom: 10
  },
  formRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
  },
  formColumn: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: 'center',
  }
});

/* eslint react/prop-types: 0 */ // https://github.com/yannickcr/eslint-plugin-react/issues/106
export default class CreditCardForm extends Component {
  static propTypes = {
    ...InjectedProps,

    placeholders: PropTypes.object,

    inputStyle: Text.propTypes.style,

    validColor: PropTypes.string,
    invalidColor: PropTypes.string,
    placeholderColor: PropTypes.string,

    additionalInputsProps: PropTypes.objectOf(PropTypes.shape(TextInput.propTypes)),
  };

  static defaultProps = {
    placeholders: {
      number: "card number",
      expiry: "MM/YY",
      cvc: "CVC",
    },
    validColor: "",
    invalidColor: "red",
    placeholderColor: "gray",
    additionalInputsProps: {},
  };

  componentDidMount = () => this._focus(this.props.focused);

  componentWillReceiveProps = newProps => {
    if (this.props.focused !== newProps.focused) this._focus(newProps.focused);
  };

  _focus = field => {
    if (!field) return;
    this.refs[field].focus();
  }

  _inputProps = field => {
    const {
      inputStyle, validColor, invalidColor, placeholderColor,
      placeholders, values, status,
      onFocus, onChange, onBecomeEmpty, onBecomeValid,
      additionalInputsProps,
    } = this.props;

    return {
      inputStyle: [s.input, inputStyle],
      validColor, invalidColor, placeholderColor,
      ref: field, field,

      placeholder: placeholders[field],
      value: values[field],
      status: status[field],

      onFocus, onChange, onBecomeEmpty, onBecomeValid,
      additionalInputProps: additionalInputsProps[field],
    };
  };

  _iconToShow = () => {
    const {values: {type}} = this.props;
    if (type) return type;
    return "placeholder";
  }

  _cvcIconToShow = () => {
    const {focused, values: {type}} = this.props;
    if (focused === "cvc" && type === "american-express") return "cvc_amex";
    return "cvc";
  }

  render() {
    const {focused, values: {number}, inputStyle, status: {number: numberStatus}, inputWrapper, containerStyle, width} = this.props;
    return (
      <View style={[s.container, containerStyle, {width}]}>
        <View style={[{width}, s.formColumn]}>
          <View style={[s.formRow]}>
            <View style={s.formWrapper}>
              <CCInput {...this._inputProps("number")}
                       containerStyle={[inputWrapper, {width: width - 70, paddingHorizontal: 5}]}/>
              <Image style={s.icon}
                     source={Icons[this._iconToShow()]}/>
            </View>
          </View>
        </View>
        <View style={[{width}, s.formColumn]}>
          <View style={[s.formRow]}>
            <View style={[s.formWrapper, {marginRight: 5}]}>
              <CCInput {...this._inputProps("expiry")}
                       containerStyle={[s.expiryInput, {paddingHorizontal: 5}]}/>
            </View>
            <View style={[s.formWrapper, {marginLeft: 5}]}>
              <CCInput {...this._inputProps("cvc")}
                       containerStyle={[s.cvcInput, {paddingHorizontal: 5}]}/>
              {
                focused === "cvc" &&
                <Image style={s.icon}
                       source={Icons[this._cvcIconToShow()]}/>
              }
            </View>
          </View>
        </View>
      </View>
    );
  }
}
