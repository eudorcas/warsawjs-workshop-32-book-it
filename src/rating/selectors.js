import { createSelector } from 'reselect';

export const isLoading = state => state;

export const getRatingsOrder = state => state;
export const getRatingsEntities = state => state;
export const getHotelToRating = state => state;

export const getRatedHotels = state => state;

export const getRatedHotelsNumber = state => state;

export const getRatedHotelsAverage = state => state;

function getAverageUserRating(ratedHotels) {
  return ratedHotels
    .reduce((total, hotel) => {
      return total + hotel.rating.user / ratedHotels.length;
    }, 0)
    .toFixed(2);
}
