export const ADD_ITEM = 'ADD_ITEM';

export function addItem(payload) {
  return {
    type: ADD_ITEM,
    payload,
  };
}

export const SET_ITEM = 'SET_ITEM';

export function setItem(payload) {
  return {
    type: SET_ITEM,
    payload,
  };
}

