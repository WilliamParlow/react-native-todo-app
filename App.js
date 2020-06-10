import * as React from 'react';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import Main from './components/pages/Main/Main';
import store from './redux/store/store';

const App = () => (
  <Provider store={store}>
    <Main />
    <FlashMessage position="top" />
  </Provider>
)

export default App;