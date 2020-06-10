import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import FlashMessage, { showMessage } from "react-native-flash-message";
import { connect } from 'react-redux';
import { setUser } from '../../../redux/actions/userActions';
import FirebaseService from '../../../services/FirebaseService';
import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';

const ConnectedLogin = props => {
    const [email, onChangeText] = React.useState('');
    const [password, onPasswordChange] = React.useState('');
    const [loading, onLoading] = React.useState(false);

    submit = () => {
        onLoading(true);
        FirebaseService.signInWithEmailAndPassword(email, password).then(user => {
            props.setUser(user.user);
        }).catch(error => {
            showMessage({
                message: "Erro ao efetuar o login Tente novamente :(",
                type: "danger"
            });
            console.log(error);
        }).finally(() => onLoading(false));
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.noticeBackground }}>
            <FlashMessage position="top" />
            <View style={{ marginBottom: 30 }}>
                <Text style={{ fontSize: 30, color: Colors.noticeText, fontWeight: 'bold' }}>Acesse o Todo App!</Text>
            </View>
            <View style={{ backgroundColor: Colors.noticeText, padding: 40, borderRadius: Layout.borderRadius }}>
                <View style={{ alignItems: 'center' }}>
                    <Text>EMAIL</Text>
                    <TextInput
                        autoCompleteType="email"
                        keyboardType="email-address"
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 200 }}
                        onChangeText={text => onChangeText(text)}
                        value={email}
                    />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text>SENHA</Text>
                    <TextInput
                        secureTextEntry={true}
                        autoCompleteType="password"
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 200 }}
                        onChangeText={text => onPasswordChange(text)}
                        value={password}
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Button
                        onPress={submit}
                        title="Entrar"
                        buttonStyle={{
                            minWidth: 100,
                            borderRadius: Layout.borderRadius
                        }}
                        loading={loading}
                    />
                </View>
            </View>
        </View>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        setUser: user => dispatch(setUser(user))
    }
};


const Login = connect(null, mapDispatchToProps)(ConnectedLogin);

export default Login;