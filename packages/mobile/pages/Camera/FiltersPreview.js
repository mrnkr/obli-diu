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
import makeStyles from '../../hooks/makeStyles';
import useImageEffects from '../../hooks/useImageEffects';

const FiltersPreview = ({ route, navigation }) => {
  const { image } = route.params;
  const theme = useTheme();
  const styles = useStyles();
  const [imgWithEffect, { loading, nextEffect }] = useImageEffects(image);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <TouchableOpacity
      style={styles.self}
      onPress={nextEffect}
      disabled={loading}>
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
          <TouchableOpacity style={styles.button}>
            <Icon name="arrow-forward" size={60} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

FiltersPreview.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      image: PropTypes.string,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

const useStyles = makeStyles(() =>
  StyleSheet.create({
    self: {
      flex: 1,
    },
    image: {
      flex: 1,
    },
    button: {
      padding: 8,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
      paddingBottom: 16,
    },
  }),
);

export default FiltersPreview;
