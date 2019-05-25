import { createSelector } from 'reselect';

export const isLoading = state => state.ratings.inProgress;

export const getRatingsOrder = state => state.ratings.order;
export const getRatingsEntities = state => state.ratings.entities;
export const getHotelToRating = (state, id) => state.ratings.entities[id];

export const getRatedHotels = createSelector(
  getRatingsOrder,
  getRatingsEntities,
  (order, entities) =>
    order.map(id => entities[id]).filter(hotel => !!hotel.rating.user)
);

export const getRatedHotelsNumber = createSelector(
  getRatedHotels,
  entities => entities.length
);

export const getRatedHotelsAverage = createSelector(
  getRatedHotels,
  entities => getAverageUserRating(entities)
);

function getAverageUserRating(ratedHotels) {
  return ratedHotels
    .reduce((total, hotel) => {
      return total + hotel.rating.user / ratedHotels.length;
    }, 0)
    .toFixed(2);
}
