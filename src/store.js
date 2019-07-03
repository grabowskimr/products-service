import { createStore, applyMiddleware } from 'redux';
import thunk from 'react-thunk';

import reducers from './reducers/reducers';

export const store = createStore(reducers, applyMiddleware(thunk));
