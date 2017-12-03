import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

const Results = function ({percentage}) {
  let emoji, message
  if (percentage >= 80) {
    message = 'Well done! You did great!'
    emoji = '🎉'
  } else if (percentage >= 50) {
    message = 'Good work! You are doing well!'
    emoji = '👍'
  } else {
    message = 'You need to study more...'
    emoji = '😫'
  }

  return (
  <View style={styles.container}>
    <Text style={styles.message}>{message}</Text>
    <Text style={styles.emoji}>{emoji}</Text>
    <View style={styles.scoreContainer}>
      <Text style={{fontSize: 25}}>Here is your score is:</Text>
      <Text style={styles.score}>{percentage}%</Text>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 15
  },
  message: {
    color: 'gray',
    fontSize: 35,
    fontWeight: 'bold',
    paddingBottom: 30,
    textAlign: 'center'
  },
  emoji: {
    fontSize: 100,
    paddingBottom: 30
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  score: {
    fontWeight: 'bold',
    fontSize: 35,
    paddingLeft: 12
  }
});

Results.propTypes = {
  percentage: PropTypes.number.isRequired
};

export default Results;
