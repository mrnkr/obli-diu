import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';
import { ListItem, Button, Divider } from 'react-native-elements';
import ToggleSwitch from 'toggle-switch-react-native';
import makeStyles from '../hooks/makeStyles';

const Settings = () => {
  const styles = useStyles();
  const theme = useTheme();
  const [checked, setChecked] = useState(false);

  return (
    <>
      <Divider />
      <ListItem>
        <ListItem.Content>
          <Button
            icon={
              <Icon
                name="sign-out"
                style={styles.leftIcon}
                size={24}
                color={theme.colors.text}
              />
            }
            title="Exit"
            type="clear"
            containerStyle={styles.button}
          />
        </ListItem.Content>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItem.Content>
          <ToggleSwitch
            isOn={checked}
            onColor="blue"
            offColor="gray"
            label={checked ? 'Light Theme' : 'Dark Theme'}
            labelStyle={{ color: theme.colors.text, fontWeight: '900' }}
            size="medium"
            onToggle={(value) => setChecked(value)}
          />
        </ListItem.Content>
      </ListItem>
    </>
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
    title: {
      fontSize: 36,
      marginBottom: 16,
    },
    leftIcon: {
      marginRight: 8,
      width: 24,
    },
    button: {
      alignSelf: 'stretch',
    },
  }),
);

export default Settings;
