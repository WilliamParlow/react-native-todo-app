import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import FirebaseService from '../../../services/FirebaseService';
import TodoItem from './TodoItem/TodoItem';


class ConnectedTodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: []
    }
  }

  componentDidMount = () => {
    FirebaseService.getOnRealTime(`todo/${this.props.user.uid}`, snap => this.setState({ ...this.state, todoList: snap.val() || [] }))
  }

  render = () => {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            {
              this.state.todoList.map(t => <TodoItem item={t} />)
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

const mapStateToProps = state => ({
  user: state.user
});

const TodoList = connect(mapStateToProps)(ConnectedTodoList);

export default TodoList;