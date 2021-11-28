import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { Camera } from 'expo-camera';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import makeStyles from '../../hooks/makeStyles';

const CameraViewModal = ({
  visible,
  uploading,
  onPictureTaken,
  onRequestClose,
}) => {
  const styles = useStyles();
  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(null);
  const [currentCamera, setCurrentCamera] = useState(
    Camera.Constants.Type.back,
  );

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const toggleCamera = useCallback(() => {
    setCurrentCamera(
      currentCamera === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    );
  }, [currentCamera]);

  const takePicture = useCallback(async () => {
    if (cameraRef.current) {
      const data = await cameraRef.current.takePictureAsync(null);
      cameraRef.current.pausePreview();
      await onPictureTaken(data.uri);
    } else {
      Alert.alert('Error', "We don't have permission to access your camera");
    }
  }, [onPictureTaken]);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onRequestClose}>
      <View style={styles.self}>
        <Camera style={styles.camera} type={currentCamera} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={onRequestClose}
              disabled={uploading}>
              <Icon name="close" size={60} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCamera}
              disabled={uploading}>
              <Icon name="cached" size={60} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={takePicture}
              disabled={uploading}>
              {uploading ? (
                <ActivityIndicator size="large" />
              ) : (
                <Icon name="camera" size={60} color="#FFF" />
              )}
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    </Modal>
  );
};

CameraViewModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  uploading: PropTypes.bool.isRequired,
  onPictureTaken: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme, safeAreaInsets) =>
  StyleSheet.create({
    self: {
      flex: 1,
    },
    camera: {
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

export default CameraViewModal;
