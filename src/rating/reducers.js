import { RSAA } from 'redux-api-middleware';
import { normalize, schema } from 'normalizr';

const ratingEntity = new schema.Entity('ratings', {}, { idAttribute: 'id' });
const ratingsSchema = new schema.Array(ratingEntity);

const initState = {
  error: null,
  order: [],
  entities: {},
  inProgress: false,
};

function ratings(state = initState, action) {
  switch (action.type) {
    case 'RATING_REQUEST':
      return {
        ...state,
        inProgress: true,
      };
    case 'RATING_SUCCESS': {
      const { result, entities } = normalize(
        action.payload.list,
        ratingsSchema
      );
      return {
        ...state,
        order: result,
        entities: entities.ratings,
        error: null,
        inProgress: false,
      };
    }
    case 'RATING_ERROR':
      return {
        ...state,
      };
    case 'RATE_HOTEL': {
      const entity = state.entities[action.payload.id];
      const user = action.payload.rating;
      const reviews = +entity.rating.reviews + 1;
      const average =
        (+entity.rating.reviews * +entity.rating.average + user) / reviews;

      return {
        ...state,
        entities: {
          ...state.entities,
          [action.payload.id]: {
            ...entity,
            rating: {
              average: average.toFixed(1),
              reviews,
              user,
            },
          },
        },
      };
    }
    default:
      return state;
  }
}

export const getHotelForRating = () => ({
  [RSAA]: {
    endpoint: process.env.PUBLIC_URL + '/data.json',
    method: 'GET',
    types: ['RATING_REQUEST', 'RATING_SUCCESS', 'RATING_ERROR'],
  },
});

export const rateHotel = (id, rating) => ({
  type: 'RATE_HOTEL',
  payload: { id, rating },
});

export default ratings;
