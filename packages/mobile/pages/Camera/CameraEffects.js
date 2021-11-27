import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Camera } from 'expo-camera';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import { useTheme, useFocusEffect } from '@react-navigation/native';
import makeStyles from '../../hooks/makeStyles';
import useImageUpload from '../../hooks/useImageUpload';

const CameraEffects = ({ navigation }) => {
  const styles = useStyles();
  const theme = useTheme();
  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(null);
  const [currentCamera, setCurrentCamera] = useState(
    Camera.Constants.Type.back,
  );

  const [uploadImage, { uploading, publicId }] = useImageUpload();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    if (publicId) {
      navigation.navigate('FiltersPreview', { image: publicId });
    }
  }, [navigation, publicId]);

  useFocusEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.resumePreview();
    }
  });

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
      await uploadImage(data.uri);
    } else {
      Alert.alert('Error', "We don't have permission to access your camera");
    }
  }, [cameraRef, uploadImage]);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.self}>
      <Camera style={styles.camera} type={currentCamera} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={toggleCamera}
            disabled={uploading}>
            <Icon name="cached" size={60} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={takePicture}
            disabled={uploading}>
            {uploading ? (
              <ActivityIndicator size="large" />
            ) : (
              <Icon name="camera" size={60} color={theme.colors.text} />
            )}
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

CameraEffects.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    self: {
      flex: 1,
    },
    camera: {
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

export default CameraEffects;
