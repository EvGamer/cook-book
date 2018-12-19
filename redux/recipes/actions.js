export const ADD_RECIPE = 'ADD_RECIPE';

export function addRecipe(payload) {
  return {
    type: ADD_RECIPE,
    payload,
  };
}

export const SET_RECIPE = 'SET_RECIPE';

export function setRecipe(payload) {
  return {
    type: SET_RECIPE,
    payload,
  };
}

export const REMOVE_RECIPE = 'REMOVE_RECIPE';

export function removeRecipe(id) {
  return {
    type: REMOVE_RECIPE,
    id,
  };
}