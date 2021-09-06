import HomeScreen from './screens/home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LoginScreen from './screens/login';
import {createStore} from 'redux';
import allReducers from './reducers'
import { Provider } from 'react-redux';
import PostScreen from './screens/post';
import ProfileScreen from './screens/profile';
import { CookiesProvider } from 'react-cookie';

const store = createStore(allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


function App() {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <div className="app">
          <Router>
            <Switch>
              <Route path='/post/:postId'>
                <PostScreen />
              </Route>
              <Route path="/profile/:profileId">
                <ProfileScreen />
              </Route>
              <Route path="/login">
                <LoginScreen />
              </Route>
              <Route path="/trending">
                <HomeScreen isTrending={true} />
              </Route>
              <Route path="/">
                <HomeScreen />
              </Route>

            </Switch>
          </Router>
        </div>
      </CookiesProvider>
    </Provider>
  );
}

export default App;
