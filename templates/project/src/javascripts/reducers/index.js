import { combineReducers } from 'redux';
import todos from './Todos';

const rootReducer = combineReducers({
  todos,
});

export default rootReducer;
