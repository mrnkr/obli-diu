import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Events from 'react-native-simple-events';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useSignupForm from 'shared/hooks/useSignupForm';
import makeStyles from '../hooks/makeStyles';

const Signup = ({ navigation }) => {
  const styles = useStyles();
  const theme = useTheme();

  const form = useSignupForm({
    afterSubmit: async (data) => {
      await AsyncStorage.setItem('token', data.createUser);
      Events.trigger('login');
      navigation.replace('Chat');
    },
  });

  const goToSignin = useCallback(() => {
    navigation.goBack();
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
        onChangeText={form.handleChange('displayName')}
        renderErrorMessage={!!form.errors.displayName}
        errorMessage={form.errors.displayName}
        leftIcon={
          <Icon
            name="person"
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
        renderErrorMessage={!!form.errors.email}
        errorMessage={form.errors.email}
        leftIcon={
          <Icon
            name="email"
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
        onChangeText={form.handleChange('password')}
        renderErrorMessage={!!form.errors.password}
        errorMessage={form.errors.password}
        leftIcon={
          <Icon
            name="lock"
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
        renderErrorMessage={!!form.errors.confirmPassword}
        errorMessage={form.errors.confirmPassword}
        leftIcon={
          <Icon
            name="lock"
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
        loading={form.isSubmitting}
        disabled={form.isSubmitting}
      />
      <Button
        title="Already a user? Sign in here"
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
    replace: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
