//App.js is equivelent to Index.js in HTML, this is where the Main Component functions.
import React from 'react';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';0

// Exercise: Persist Redux Store-Week 3
import { PersistGate } from 'redux-persist/es/integration/react';
import Loading from './components/LoadingComponent';
// Exercise: Persist Redux Store-Week 3 added persistor
const { persistor, store } = ConfigureStore();

// Exercise: Persist Redux Store-Week 3 Wrapped Main Component in the Persist Gate Component, also added loading. 
export default function App() {
  return (
      <Provider store={store}>
          <PersistGate
              loading={<Loading />}
              persistor={persistor}>
              <Main />
          </PersistGate>
      </Provider>
  );
}
