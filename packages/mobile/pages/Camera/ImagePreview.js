import React, { useCallback } from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';

const ImagePreview = ({ route, navigation }) => {
  const { image } = route.params;
  const goToCamera = useCallback(() => {
    navigation.navigate('CameraEffects');
  }, [navigation]);

  return (
    <View style={styles.self}>
      <ImageBackground source={{ uri: image }} style={styles.image}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Icon
              name="clear"
              onPress={goToCamera}
              style={styles.text}
              size={60}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Icon
              name="arrow-forward"
              style={styles.text}
              size={60}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

ImagePreview.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      image: PropTypes.string,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default ImagePreview;

const styles = StyleSheet.create({
  self: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  button: {
    flex: 0.5,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
});
