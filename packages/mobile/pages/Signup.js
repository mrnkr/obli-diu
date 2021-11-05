import React, { useCallback } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import useSignupForm from 'shared/hooks/useSignupForm';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import makeStyles from '../hooks/makeStyles';

const Signup = ({ navigation }) => {
  const styles = useStyles();
  const theme = useTheme();

  const form = useSignupForm({
    afterSubmit: async (data) => {
      // localStorage.setItem('token', data.createUser);
      // document.dispatchEvent(new Event('login'));
      // await router.push('/home');
      Alert.alert('Aguante Boca', 'Chabón', [
        { text: 'Sabelo', style: 'cancel' },
      ]);
    },
  });

  const goToSignin = useCallback(() => {
    navigation.navigate('Signin');
  }, [navigation]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.self}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="always">
      <Input
        containerStyle={styles.textInput}
        label="User Name"
        placeholder="johndoe"
        value={form.values.displayName}
        autoCapitalize="none"
        onChangeText={form.handleChange('displayName')}
        errorMessage={!!form.errors.displayName}
        leftIcon={
          <Icon
            name="user"
            style={styles.leftIcon}
            size={24}
            color={theme.colors.text}
          />
        }
      />

      <Input
        containerStyle={styles.textInput}
        label="Email"
        placeholder="johndoe@mailinator.com"
        autoCapitalize="none"
        keyboardType="email-address"
        value={form.values.email}
        onChangeText={form.handleChange('email')}
        errorMessage={!!form.errors.email}
        leftIcon={
          <Icon
            name="envelope"
            style={styles.leftIcon}
            size={24}
            color={theme.colors.text}
          />
        }
      />

      <Input
        containerStyle={styles.textInput}
        label="Password"
        placeholder="************"
        value={form.values.password}
        autoCapitalize="none"
        onChangeText={form.handleChange('password')}
        errorMessage={!!form.errors.password}
        leftIcon={
          <Icon
            name="unlock-alt"
            style={styles.leftIcon}
            size={24}
            color={theme.colors.text}
          />
        }
        secureTextEntry
      />

      <Input
        containerStyle={styles.textInput}
        label="Confirm Password"
        placeholder="************"
        value={form.values.confirmPassword}
        autoCapitalize="none"
        onChangeText={form.handleChange('confirmPassword')}
        errorMessage={!!form.errors.confirmPassword}
        leftIcon={
          <Icon
            name="unlock-alt"
            style={styles.leftIcon}
            size={24}
            color={theme.colors.text}
          />
        }
        secureTextEntry
      />

      <Button
        title="SIGN UP"
        type="outline"
        containerStyle={styles.button}
        onPress={form.submitForm}
      />
      <Button
        title="Already user? Sign in here"
        type="clear"
        containerStyle={styles.button}
        onPress={goToSignin}
      />
    </KeyboardAwareScrollView>
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
      marginTop: safeAreaInsets.top,
      paddingHorizontal: 16,
    },
    textInput: {
      marginVertical: 16,
    },
    leftIcon: {
      marginRight: 8,
      textAlign: 'center',
      width: 24,
    },
    button: {
      alignSelf: 'stretch',
      marginBottom: 8,
    },
  }),
);

export default Signup;

Signup.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
