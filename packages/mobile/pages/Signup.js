import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import useSignupForm from 'shared/hooks/useSignupForm';
import makeStyles from '../hooks/makeStyles';

const Signup = ({ navigation }) => {
  const styles = useStyles();

  const form = useSignupForm({
    afterSubmit: async (data) => {
      localStorage.setItem('token', data.createUser);
      document.dispatchEvent(new Event('login'));
      await router.push('/home');
    },
  });

  return (
    <View style={styles.self}>
      <Input
        label="User Name"
        placeholder="johndoe"
        value={form.values.displayName}
        onChange={form.handleChange('displayName')}
        errorMessage={!!form.errors.displayName}
        leftIcon={<Icon name="user" size={24} color="black" />}
      />

      <Input
        label="Email"
        placeholder="johndoe@mailinator.com"
        value={form.values.email}
        onChange={form.handleChange('email')}
        errorMessage={!!form.errors.email}
        leftIcon={<Icon name="envelope" size={24} color="black" />}
      />

      <Input
        label="Password"
        placeholder="************"
        value={form.values.password}
        onChange={form.handleChange('password')}
        errorMessage={!!form.errors.password}
        secureTextEntry={true}
        leftIcon={<Icon name="unlock-alt" size={24} color="black" />}
      />

      <Input
        label="Confirm Password"
        placeholder="************"
        value={form.values.confirmPassword}
        onChange={form.handleChange('confirmPassword')}
        errorMessage={!!form.errors.confirmPassword}
        secureTextEntry={true}
        leftIcon={<Icon name="unlock-alt" size={24} color="black" />}
      />

      <Button
        title="SIGN UP"
        type="outline"
        containerStyle={styles.button}
        onPress={form.handleSubmit}
        loading={form.isSubmitting}
      />
      <Button
        title="Already user? Sign in here"
        type="clear"
        containerStyle={styles.button}
        onPress={() => navigation.navigate('Signin')}
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

export default Signup;

Signup.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
