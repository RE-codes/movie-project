import { combineReducers } from 'redux';
import MoviesReducer from './reducer-movies';
import TotalPagesReducer from './reducer-total-pages';

const rootReducer = combineReducers({
  movies: MoviesReducer,
  total_pages: TotalPagesReducer
});

export default rootReducer;
