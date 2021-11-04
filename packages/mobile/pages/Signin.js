import React, { useCallback } from 'react';
import { StyleSheet, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Events from 'react-native-simple-events';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useSigninForm from 'shared/hooks/useSigninForm';
import makeStyles from '../hooks/makeStyles';

const Signin = ({ navigation }) => {
  const styles = useStyles();
  const theme = useTheme();
  const form = useSigninForm({
    afterSubmit: async (data) => {
      await AsyncStorage.setItem('token', data.login);
      Events.trigger('login');

      Alert.alert(
        'Aguante Boca',
        `Te logueé con el token: ${data.login} chabón`,
        [{ text: 'Sabelo', style: 'cancel' }],
      );
      // navigation.navigate();
    },
  });

  const goToSignup = useCallback(() => {
    navigation.navigate('Signup');
  }, [navigation]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.self}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="always">
      <Input
        containerStyle={styles.textInput}
        label="Email"
        placeholder="johndoe@mailinator.com"
        autoCapitalize="none"
        keyboardType="email-address"
        value={form.values.email}
        onChangeText={form.handleChange('email')}
        renderErrorMessage={!!form.errors.email}
        errorMessage={form.errors.email}
        leftIcon={
          <Icon
            style={styles.leftIcon}
            name="envelope"
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
        onChangeText={form.handleChange('password')}
        renderErrorMessage={!!form.errors.password}
        errorMessage={form.errors.password}
        leftIcon={
          <Icon
            style={styles.leftIcon}
            name="unlock-alt"
            size={24}
            color={theme.colors.text}
          />
        }
        secureTextEntry
      />

      <Button
        title="SIGN IN"
        type="outline"
        containerStyle={styles.button}
        onPress={form.submitForm}
      />
      <Button
        title="Don't have account? Sign up here"
        type="clear"
        containerStyle={styles.button}
        onPress={goToSignup}
      />
    </KeyboardAwareScrollView>
  );
};

Signin.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
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

export default Signin;
