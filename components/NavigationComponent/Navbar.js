import React from 'react';
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import Colors from '../../Themes/colors';

const propTypes = {
  main: PropTypes.bool,
};
const defaultProps = {
  main: false,
};
class Navbar extends React.PureComponent {
  render() {
    const { navigation, main } = this.props;
    return (
      <SafeAreaView>
        {main ? (
          <View style={styles.mainNav}>
            <Image
              source={require('../../assets/images/letter-d.png')}
              style={styles.logo}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Search');
              }}>
              <Icon name={'search-outline'} size={30} color={Colors.white} />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon name={'chevron-back'} size={40} color={Colors.lightGray}  />
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;
const styles = StyleSheet.create({
  logo: {
    width: 40,
    height: 40,
  },
  mainNav: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
});
export default Navbar;
