import {combineReducers} from 'redux';

import { userReducer } from './auth.reducers';
import { productsReducer } from './products.reducer';

const reducers = combineReducers({
    UsersReducer: userReducer,
    ProductsReducer: productsReducer
})

export default reducers;