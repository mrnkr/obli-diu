import React, { useState } from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Surface } from 'gl-react-expo';
import ImageFilters from 'react-native-gl-image-filters';
import Filter from './Filter';

const FiltersPreview = ({ route, navigation }) => {
  //const { image } = route.params;
  const width = Dimensions.get('window').width - 40;
  const [filters, setFilters] = useState({});
  const [image, setImage] = useState(null);

  const settings = [
    {
      name: 'hue',
      minValue: 0,
      maxValue: 6.3,
    },
    {
      name: 'blur',
      minValue: 0,
      maxValue: 30,
    },
    {
      name: 'sepia',
      minValue: -5,
      maxValue: 5,
    },
    {
      name: 'sharpen',
      minValue: 0,
      maxValue: 15,
    },
    {
      name: 'negative',
      minValue: -2.0,
      maxValue: 2.0,
    },
    {
      name: 'contrast',
      minValue: -10.0,
      maxValue: 10.0,
    },
    {
      name: 'saturation',
      minValue: 0.0,
      maxValue: 2,
    },
    {
      name: 'brightness',
      minValue: 0,
      maxValue: 5,
    },
    {
      name: 'temperature',
      minValue: 0.0,
      maxValue: 40000.0,
    },
    {
      name: 'exposure',
      step: 0.05,
      minValue: -1.0,
      maxValue: 1.0,
    },
  ];

  return (
    <View style={styles.self}>
      <Surface style={{ width, height: width }} ref={(ref) => setImage(ref)}>
        <ImageFilters {...filters} width={width} height={width}>
          {{ uri: 'https://i.imgur.com/5EOyTDQ.jpg' }}
        </ImageFilters>
      </Surface>
      {settings.map((filter) => (
        <Filter
          key={filter.name}
          name={filter.name}
          minimum={filter.minValue}
          maximum={filter.maxValue}
          onChange={(value) => {
            setFilters((prevFilters) => ({
              ...prevFilters,
              [filter.name]: value,
            }));
          }}
        />
      ))}
    </View>
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
  }).isRequired,
};

export default FiltersPreview;

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
});
