import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import FirebaseService from '../../../../services/FirebaseService';
import TodoItem from '../TodoItem/TodoItem';


class ConnectedDoneList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doneList: []
    }
  }

  componentDidMount = () => {
    FirebaseService.getOnRealTime(`done/${this.props.user.uid}`, snap => this.setState({ ...this.state, doneList: snap.val() || [] }))
  }

  moveToDoneList = (item) => {
    FirebaseService.push(`todo/${this.props.user.uid}`, item).then(() => {
      FirebaseService.remove(`done/${this.props.user.uid}/${item.key}`).then(() => {
        showMessage({
          message: "Tarefa enviada para lista de afazeres.",
          type: "success"
        });
      }).catch(err => {
        console.log(err);
        showMessage({
          message: "Erro ao remover tarefa da lista de itens realizados.",
          type: "danger"
        });
      });
    }).catch(err => {
      console.log(err);
      showMessage({
        message: "Erro ao enviar tarefa à lista de afazeres.",
        type: "danger"
      });
    });
  }

  render = () => {
    const keys = Object.keys(this.state.doneList);
    return (
      <View ref="DoneRef" style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            {
              keys.map(key => <TodoItem key={key} item={this.state.doneList[key]} onPress={() => this.moveToDoneList({ ...this.state.doneList[key], key: key })} />)
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

const DoneList = connect(mapStateToProps)(ConnectedDoneList);

export default DoneList;