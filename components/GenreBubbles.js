import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GenreBubbles = ({ genres }) => {
  return (
    <View style={styles.container}>
      {genres.map((genre, index) => (
        <View key={index} style={styles.bubble}>
          <Text style={styles.text}>{genre}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  bubble: {
    backgroundColor: '#1DB954',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 14,
  },
});

export default GenreBubbles;
