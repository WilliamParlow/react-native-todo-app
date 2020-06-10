import * as React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import Main from './components/pages/Main/Main';

const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
)

export default App;