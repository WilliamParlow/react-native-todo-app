import * as firebase from 'firebase';
import { FirebaseConfig } from './FirebaseConfig';

firebase.initializeApp(FirebaseConfig);

export default class FirebaseService {
    static getOnce = (path, callback) => {
        return firebase.database().ref(path).once('value', snapshot => callback(snapshot));
    }

    static getOnRealTime = (path, callback) => {
        return firebase.database().ref(path).on('value', snapshot => callback(snapshot));
    }

    static set = (path, data) => {
        return firebase.database().ref(path).set(data);
    }

    static push = (path, data) => {
        const pushRef = firebase.database().ref(path).push();
        return pushRef.set(data);
    }

    static remove = (path) => {
        return firebase.database().ref(path).remove();
    }

    static signInWithEmailAndPassword = (email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    static signOut = () => {
        return firebase.auth().signOut();
    }
}