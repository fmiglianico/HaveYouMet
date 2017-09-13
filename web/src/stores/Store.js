import { createStore } from 'redux';

import rootReducer from '../reducer/RootReducer';

let store = createStore(rootReducer);

window.store = store;

store.subscribe(() => console.info('new state', store.getState()));

export default store;