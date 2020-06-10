import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';
import { connect } from 'react-redux';
import BottomTabNavigator from '../../../components/navigation/BottomTabNavigator';
import LinkingConfiguration from '../../../components/navigation/LinkingConfiguration';
import Login from '../../../components/pages/Login/Login';
import Colors from '../../../constants/Colors';
import FirebaseService from '../../../services/FirebaseService';
import { setUser } from '../../../redux/actions/userActions';

const Stack = createStackNavigator();

class ConnectedMain extends React.Component {
  constructor(props) {
    super(props);

    this.signOut = this.signOut.bind(this);
  }

  signOut = () => {
    FirebaseService.signOut().then(() => {
      this.props.setUser(undefined);
      showMessage({
        message: "Desconectado!",
        type: "success"
      });
    }).catch((err) => {
      console.log(err);
      showMessage({
        message: "Ocorreu um erro ao desconectar.",
        type: "danger"
      });
    });
  }

  render = () => {
    if (this.props.user) {
      return (
        <View style={styles.container}>
          <NavigationContainer linking={LinkingConfiguration}>
            <Stack.Navigator screenOptions={
              {
                headerStyle: { backgroundColor: '#841584' },
                headerTitleStyle: { color: '#FFF' }
              }
            }>
              <Stack.Screen name="Root" component={BottomTabNavigator} options={{
                headerRight: () => (
                  <Button
                    onPress={this.signOut}
                    icon={<Ionicons name="ios-log-out" size={30} color={Colors.noticeText} />}
                    type="clear"
                    buttonStyle={{
                      paddingHorizontal: 20,
                      height: '100%'
                    }}
                  />
                ),
              }} />
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

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch(setUser(user))
  }
};

const Main = connect(mapStateToProps, mapDispatchToProps)(ConnectedMain);

export default Main;