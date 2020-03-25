import { combineReducers } from 'redux';
import user from './user/user_reducer';

const rootReducer = combineReducers({
    user
});

export default rootReducer;
