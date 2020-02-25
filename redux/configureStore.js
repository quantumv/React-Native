import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { campsites } from './campsites';
import { comments } from './comments';
import { promotions } from './promotions';
import { partners } from './partners';
import { favorites } from './favorites';
// Exercise:Persist Redux Store-Week 3 These functions support the reducers to automatically update the state to Presistant Storage whenever there is a change to the state.
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';

//Exercise:Persist Redux Store step 1: set-up an object tha contains some configuration values. NOTE: Two properties that are required are key, and storage.
// NOTE: Two properties that are required are key, and storage. Persist allows data to be recorded and reviewed again
const config = {
    key: 'root',
    storage,
    debug: true
}

export const ConfigureStore = () => {
    const store = createStore(
        //step:2 combinedReducers (replaced for persist) => config
        persistCombineReducers(config, {
            campsites,
            comments,
            partners,
            promotions,
            favorites
        }),
        applyMiddleware(thunk, logger)
    );
    
    //step:3 This is the PersistStore Variable, this allows the store to be persisted.
    const persistor = persistStore(store);
    
    //step:4 Now to return an object that gives pesist store as well as store. This allow for both to be accessed.
    return /*{ store }*/ { persistor, store };
}; 
