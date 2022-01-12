import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const propTypes = {
  errorText: PropTypes.string,
  errorText2: PropTypes.string,
};
const defaultProps = {
  errorText: "Oops, algo esta yendo mal",
  errorText2: "Asegurate de esta conectado a internet y reiniciar la Aplicacion"
};

class Error extends React.PureComponent {
  render() {
    const { errorText, errorText2 } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{errorText}</Text>
        <Text style={styles.text}>{errorText2}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    fontWeight: 'bold'
  }
});

Error.prototype = propTypes;
Error.defaultProps = defaultProps;
export default Error;
