import React, { useCallback } from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import makeStyles from '../hooks/makeStyles';
import useImageEffects from '../hooks/useImageEffects';

const ImagePreview = ({ route, navigation }) => {
  const { image } = route.params;
  const theme = useTheme();
  const styles = useStyles();
  const [imgWithEffect, { nextEffect }] = useImageEffects(image);

  const goBack = useCallback(() => {
    navigation.replace('CameraView');
  }, [navigation]);

  const sendPicture = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <TouchableOpacity style={styles.self} onPress={nextEffect}>
      <ImageBackground source={{ uri: imgWithEffect }} style={styles.image}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Icon
              name="clear"
              onPress={goBack}
              size={60}
              color={theme.colors.text}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={sendPicture}>
            <Icon name="send" size={60} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableOpacity>
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
    goBack: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

const useStyles = makeStyles((theme, safeAreaInsets) =>
  StyleSheet.create({
    self: {
      flex: 1,
    },
    image: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'stretch',
    },
    button: {
      padding: 8,
    },
    // eslint-disable-next-line react-native/no-color-literals
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingTop: 16,
      paddingBottom: safeAreaInsets.bottom,
      backgroundColor: 'rgba(0,0,0,0.6)',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },
  }),
);

export default ImagePreview;
