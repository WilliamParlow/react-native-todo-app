import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import FirebaseService from '../../../../services/FirebaseService';
import TodoItem from '../TodoItem/TodoItem';


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

  moveToDoneList = (item) => {
    FirebaseService.push(`done/${this.props.user.uid}`, item).then(() => {
      FirebaseService.remove(`todo/${this.props.user.uid}/${item.key}`).then(() => {
        showMessage({
          message: "Tarefa enviada para lista de itens realizados.",
          type: "success"
        });
      }).catch(err => {
        console.log(err);
        showMessage({
          message: "Erro ao remover tarefa da lista de afazeres.",
          type: "danger"
        });
      });
    }).catch(err => {
      console.log(err);
      showMessage({
        message: "Erro ao enviar tarefa à lista de itens realizados.",
        type: "danger"
      });
    });
  }

  render = () => {
    const keys = Object.keys(this.state.todoList);
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            {
              keys.map(key => <TodoItem key={key} item={this.state.todoList[key]} onPress={() => this.moveToDoneList({ ...this.state.todoList[key], key: key })} />)
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