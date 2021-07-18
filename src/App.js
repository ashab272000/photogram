import HomeScreen from './screens/home';
import {BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom';
import LoginScreen from './screens/login';
import {createStore} from 'redux';
import allReducers from './reducers'
import { Provider } from 'react-redux';

const store = createStore(allReducers);


function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <Router>
          <Switch>
            <Route path="/login">
              <LoginScreen />
            </Route>
            <Route path="/">
              <HomeScreen />
            </Route>

          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
