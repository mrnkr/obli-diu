import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const ComposerActions = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.self} onPress={onPress}>
      <Icon name="camera-alt" color="#000" size={32} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  self: {
    padding: 8,
  },
});

ComposerActions.propTypes = {
  onPress: PropTypes.func,
};

export default ComposerActions;
