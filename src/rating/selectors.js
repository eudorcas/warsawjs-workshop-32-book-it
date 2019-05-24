import { createSelector } from 'reselect';

export const isLoading = state => state.ratings.inProgress;

export const getRatingsOrder = state => state.ratings.order;
export const getRatingsEntities = state => state.ratings.entities;
export const getHotelToRating = (state, id) => state.ratings.entities[id];

export const getRatings = createSelector(
  getRatingsOrder,
  getRatingsEntities,
  (order, entities) => order.map(id => entities[id])
);
