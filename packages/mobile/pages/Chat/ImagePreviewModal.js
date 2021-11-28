import React, { useCallback } from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import PropTypes from 'prop-types';
import { Icon, Text } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import makeStyles from '../../hooks/makeStyles';
import useImageEffects from '../../hooks/useImageEffects';

const ImagePreviewModal = ({
  visible,
  image,
  onSendPicture,
  onRequestClose,
}) => {
  const theme = useTheme();
  const styles = useStyles();
  const [imgWithEffect, { nextEffect }] = useImageEffects(image);

  const onPressSend = useCallback(async () => {
    await onSendPicture(imgWithEffect);
  }, [imgWithEffect, onSendPicture]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onRequestClose}>
      <TouchableOpacity style={styles.self} onPress={nextEffect}>
        <ImageBackground source={{ uri: imgWithEffect }} style={styles.image}>
          <View style={styles.buttonContainer}>
            <Text style={styles.prompt}>
              Tap on the picture to try the next effect
            </Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.button}>
                <Icon
                  name="clear"
                  onPress={onRequestClose}
                  size={60}
                  color={theme.colors.text}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={onPressSend}>
                <Icon name="send" size={60} color={theme.colors.text} />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </Modal>
  );
};

ImagePreviewModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  image: PropTypes.string,
  onSendPicture: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
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
    prompt: {
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: 8,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    // eslint-disable-next-line react-native/no-color-literals
    buttonContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
      paddingTop: 16,
      paddingBottom: safeAreaInsets.bottom,
      backgroundColor: 'rgba(0,0,0,0.6)',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },
  }),
);

export default ImagePreviewModal;
