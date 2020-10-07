import { SET_CATEGORIES, RESET_FILTERS, SET_FILTER_VALUE } from 'redux/actionsTypes';

export const setFilterValue = payload => ({ type: SET_FILTER_VALUE, payload });
export const setCategories = payload => ({ type: SET_CATEGORIES, payload });
export const resetFilters = () => ({ type: RESET_FILTERS });
