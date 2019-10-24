import { createStore, combineReducers, applyMiddleware } from 'redux';
import { connectRouter } from 'connected-react-router';
// import { browserHistory } from "react-router";
// import { routerMiddleware, syncHistoryWithStore, routerReducer } from 'react-router-redux';
// import { createBrowserHistory as createHistory } from 'history';
import { createBrowserHistory } from 'history';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

// eslint-disable-next-line no-unused-vars
import { INITIAL_STATE, LOCALSTORAGE } from './constants';
import rootReducer from './reducers';

const middlewares = [];
middlewares.push(thunkMiddleware)

if (process.env.NODE_ENV !== 'production') {
  const loggerMiddleware = createLogger();

  middlewares.push(loggerMiddleware);
}

const localStorageMiddleware = ({getState}) => {
  return (next) => (action) => {
    const result = next(action);
    /*
    if (getState().rootReducer.module.boolean) {
      localStorage.setItem(LOCALSTORAGE.ITEM, JSON.stringify(
          getState().rootReducer.module.field,
      ));
    }
    */
    return result;
  };
};
middlewares.push(localStorageMiddleware);

const reHydrateStore = (state) => {
  /*
  if (localStorage.getItem(LOCALSTORAGE.ITEM) !== null) {
    const localData = JSON.parse(localStorage.getItem(LOCALSTORAGE.ITEM) || '{}');
    const _state = Object.assign({}, state, {
      rootReducer: {
        ...state.rootReducer,
        user: {
          ...state.rootReducer.module,
          field: localData,
        },
      },
    });
    return _state;
  }
  */
  return state;
};

// to v3
// export const history = syncHistoryWithStore(browserHistory, store);

export const history = createBrowserHistory();

// to v4
function configureStore(state) {
  return createStore(
    combineReducers({
      rootReducer,
      // routing: routerReducer(history),
      router: connectRouter(history), // to Connected Router
    }),
    reHydrateStore(state),
    applyMiddleware(...middlewares),
  );
}

const store = configureStore(INITIAL_STATE);

// console.log('Store: ', store.getState());

export default store;
