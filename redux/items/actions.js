export const ADD_ITEM = 'ADD_ITEM';

export function addItem(payload) {
  return {
    type: ADD_ITEM,
    payload,
  };
}

