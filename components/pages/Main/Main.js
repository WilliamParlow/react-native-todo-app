import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import BottomTabNavigator from '../../../components/navigation/BottomTabNavigator';
import LinkingConfiguration from '../../../components/navigation/LinkingConfiguration';
import Login from '../../../components/pages/Login/Login';
import useCachedResources from '../../../hooks/useCachedResources';

const Stack = createStackNavigator();

const ConnectedMain = ({ user }) => {

  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    if (user) {
      return (
        <View style={styles.container}>
          <NavigationContainer linking={LinkingConfiguration}>
            <Stack.Navigator screenOptions={
              {
                headerStyle: { backgroundColor: '#841584' },
                headerTitleStyle: { color: '#FFF' }
              }
            }>
              <Stack.Screen name="Root" component={BottomTabNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      );
    } else {
      return (
        <Login />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});

const mapStateToProps = state => ({
  user: state.user
});

const Main = connect(mapStateToProps)(ConnectedMain);

export default Main;