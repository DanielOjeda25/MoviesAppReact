import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../Themes/colors';

//este componente funcionara para darle play a una pelicula que se desee ver
class PlayButton extends React.PureComponent {
  render() {
    const {handlePress} = this.props;
    return (
      //Le pasamos al boton el atributo y creamos una funcion
      <Pressable onPress={() => handlePress()} style={styles.button}>
        <Icon name={'play'} size={30} color={Colors.white}/>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignContent: 'center',
    borderRadius: 50,
    width: 50,
    padding: 10,
    backgroundColor: Colors.primary
  }
})
export default PlayButton;
