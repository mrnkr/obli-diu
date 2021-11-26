import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Slider } from 'react-native-elements';
import PropTypes from 'prop-types';

const Filter = ({ name, minimum, maximum, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      <Slider
        style={styles.slider}
        minimumValue={minimum}
        maximumValue={maximum}
        onValueChange={onChange}
      />
    </View>
  );
};

Filter.propTypes = {
  name: PropTypes.string.isRequired,
  minimum: PropTypes.number.isRequired,
  maximum: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 300,
    paddingLeft: 20,
  },
  text: { textAlign: 'center' },
  slider: { width: 150 },
});
