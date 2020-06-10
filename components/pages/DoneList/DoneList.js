import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class DoneList extends React.Component {
  render = () => {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text>DONE LIST</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  }
});
