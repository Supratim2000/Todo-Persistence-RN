import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  heading: string,
  message: string
}

const FlatListEmptyContent = ({ heading, message } : Props): React.JSX.Element => {
  return (
    <View style={styles.listEmptyContainer}>
      <Text style={styles.listEmptyHeading}>{ heading }</Text>
      <Text style={styles.listEmptyMessage}>{ message }</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  listEmptyContainer: {
    flex: 1,
    backgroundColor: '#272727ff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  listEmptyHeading: {
    color: '#8f8f8fff',
    fontSize: 38,
    fontWeight: 'bold'
  },
  listEmptyMessage: {
    color: '#727272ff',
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default FlatListEmptyContent;
