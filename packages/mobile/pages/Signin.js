import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import makeStyles from '../hooks/makeStyles';

const Signin = ({ navigation }) => {
  const styles = useStyles();
  return (
    <View style={styles.self}>
      <Input
        label="Email"
        placeholder="johndoe@mailinator.com"
        leftIcon={<Icon name="envelope" size={24} color="black" />}
      />

      <Input
        label="Password"
        placeholder="************"
        secureTextEntry={true}
        leftIcon={<Icon name="unlock-alt" size={24} color="black" />}
      />

      <Button title="SIGN IN" type="outline" containerStyle={styles.button} />
      <Button
        title="Don't have account? Sign up here"
        type="clear"
        containerStyle={styles.button}
        onPress={() => navigation.navigate('Signup')}
      />
    </View>
  );
};

const useStyles = makeStyles((theme, safeAreaInsets) =>
  StyleSheet.create({
    self: {
      backgroundColor: theme.colors.background,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      marginBottom: safeAreaInsets.bottom,
      marginTop: safeAreaInsets.bottom,
    },
    button: {
      marginBottom: 8,
      width: '90%',
    },
    text: {
      textAlign: 'center',
      marginBottom: safeAreaInsets.bottom,
    },
  }),
);

export default Signin;

Signin.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
