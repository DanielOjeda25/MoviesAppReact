import React from 'react';
import { Text, View, Dimensions, StyleSheet, FlatList } from 'react-native';
import react from 'react';
import Card from '../CardComponent/Card';
import PropTypes from 'prop-types';


const propTypes= {
  title: PropTypes.string,
  content: PropTypes.array
}
//creamos una clase list, para tener los elementos
class List extends React.PureComponent {
  render() {
    const { navigation ,title, content } = this.props;
    return (
      <react.Fragment>
        <View style={styles.list}>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View>
          <FlatList data={content} horizontal={true}
            renderItem={({ item }) => <Card navigation={navigation} item={item} />}>
          </FlatList>
        </View>
      </react.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    marginTop: 30,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    padding: 10,
    paddingBottom: 15,
    
  },
});

List.propTypes = propTypes;
export default List;
