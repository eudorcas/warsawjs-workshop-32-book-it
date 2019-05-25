import { RSAA } from 'redux-api-middleware';
import { normalize, schema } from 'normalizr';
import produce from 'immer';
import { ONLINE_URL } from '../utils/const';
const ratingEntity = new schema.Entity('ratings', {}, { idAttribute: 'id' });
const ratingsSchema = new schema.Array(ratingEntity);

const initState = {
  error: null,
  order: [],
  entities: {},
  inProgress: false,
};

const ratings = (state = initState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case 'RATING_REQUEST':
        draft.inProgress = true;
        return draft;
      case 'RATING_SUCCESS':
        const slice = state.order.length;
        const { result, entities } = normalize(
          action.payload.list.slice(slice, slice + 10),
          ratingsSchema
        );
        draft.order = [...new Set([...draft.order, ...result])];
        draft.entities = { ...state.entities, ...entities.ratings };
        draft.error = null;
        draft.inProgress = false;
        return draft;
      case 'RATE_HOTEL':
        const rating = getNewRating(state, action);
        draft.entities[action.payload.id].rating = rating;
        return draft;
      default:
        return state;
    }
  });

export const getHotelForRating = () => ({
  [RSAA]: {
    endpoint: ONLINE_URL,
    method: 'GET',
    types: ['RATING_REQUEST', 'RATING_SUCCESS', 'RATING_ERROR'],
  },
});

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
