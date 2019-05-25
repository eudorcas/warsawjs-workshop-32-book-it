import { RSAA } from 'redux-api-middleware';
import { normalize, schema } from 'normalizr';
import produce from 'immer';
import { ONLINE_URL } from '../utils/const';

const initState = {
  error: null,
  order: [],
  entities: {},
  inProgress: false,
};

const ratings = (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const getHotelForRating = () => ({});

export const rateHotel = (id, rating) => ({
  type: 'RATE_HOTEL',
  payload: { id, rating },
});

export default ratings;

function getNewRating(state, action) {
  const hotel = state.entities[action.payload.id];
  const user = action.payload.rating;
  const reviews = +hotel.rating.reviews + 1;
  const average =
    (+hotel.rating.reviews * +hotel.rating.average + user) / reviews;
  const rating = {
    average: average.toFixed(1),
    reviews,
    user,
  };
  return rating;
}
