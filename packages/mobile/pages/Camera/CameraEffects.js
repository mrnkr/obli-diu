import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { Surface } from 'gl-react-expo';
import PropTypes from 'prop-types';

import { Shaders, Node, GLSL, connectSize } from 'gl-react';

const shaders = Shaders.create({
  blur1D: {
    frag: GLSL`
          precision highp float;
          varying vec2 uv;
          uniform sampler2D t;
          uniform vec2 direction, resolution;
          vec4 blur9(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
            vec4 color = vec4(0.0);
            vec2 off1 = vec2(1.3846153846) * direction;
            vec2 off2 = vec2(3.2307692308) * direction;
            color += texture2D(image, uv) * 0.2270270270;
            color += texture2D(image, uv + (off1 / resolution)) * 0.3162162162;
            color += texture2D(image, uv - (off1 / resolution)) * 0.3162162162;
            color += texture2D(image, uv + (off2 / resolution)) * 0.0702702703;
            color += texture2D(image, uv - (off2 / resolution)) * 0.0702702703;
            return color;
          }
          void main() {
            gl_FragColor = blur9(t, uv, resolution, direction);
          }`,
  },
});

export const Blur1D = connectSize(
  ({ children: t, direction, width, height }) => (
    <Node
      shader={shaders.blur1D}
      uniforms={{ t, resolution: [width, height], direction }}
    />
  ),
);

export const BlurXY = connectSize(({ factor, children }) => (
  <Blur1D direction={[factor, 0]}>
    <Blur1D direction={[0, factor]}>{children}</Blur1D>
  </Blur1D>
));

const CameraEffects = ({ factor }) => {
  return (
    <Surface style={styles.self}>
      <BlurXY factor={factor}>https://i.imgur.com/iPKTONG.jpg</BlurXY>
    </Surface>
  );
};

export default CameraEffects;

CameraEffects.propTypes = {
  factor: PropTypes.number,
};

const styles = StyleSheet.create({
  self: {
    width: 400,
    height: 300,
  },
});

// const CameraEffects = () => {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [type, setType] = useState(Camera.Constants.Type.back);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   if (hasPermission === null) {
//     return <View />;
//   }

//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <Camera style={styles.camera} type={type}>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => {
//               setType(
//                 type === Camera.Constants.Type.back
//                   ? Camera.Constants.Type.front
//                   : Camera.Constants.Type.back,
//               );
//             }}>
//             <Text style={styles.text}> Flip </Text>
//           </TouchableOpacity>
//         </View>
//       </Camera>
//     </View>
//   );
// };

// export default CameraEffects;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   camera: {
//     flex: 1,
//   },
//   button: {
//     flex: 0.1,
//     alignSelf: 'flex-end',
//     alignItems: 'center',
//   },
//   buttonContainer: {
//     flex: 1,
//     backgroundColor: 'transparent',
//     flexDirection: 'row',
//     margin: 20,
//   },
//   text: {
//     fontSize: 18,
//     color: 'white',
//   },
// });
