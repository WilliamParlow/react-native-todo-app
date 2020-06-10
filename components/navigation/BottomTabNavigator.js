import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Labels from '../../constants/Labels';
import DoneList from '../pages/Todo/DoneList/DoneList';
import TodoList from '../pages/Todo/TodoList/TodoList';
import TabBarIcon from '../TabBarIcon';
import Colors from '../../constants/Colors';


const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Todo';

export default function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME} tabBarOptions={
      {
        activeTintColor: Colors.noticeBackground,
        headerStyle: { backgroundColor: Colors.noticeBackground },
        headerTitleStyle: { color: '#FFF' }
      }
    }>
      <BottomTab.Screen
        name='Todo'
        component={TodoList}
        options={{
          title: 'Todo',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-bookmarks" />,
        }}
      />
      <BottomTab.Screen
        name='Done'
        component={DoneList}
        options={{
          title: 'Done',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-done-all" />
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Todo':
      return Labels.tabs.todo;
    case 'Done':
      return Labels.tabs.done;
  }
}
