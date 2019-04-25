import { FETCH_MOVIES } from '../actions/types';

export default function(state = 0, action) {
  switch (action.type) {
    case FETCH_MOVIES:
      const total_pages = action.payload.total_pages;
      return total_pages;
    default:
      return state;
  }
}
