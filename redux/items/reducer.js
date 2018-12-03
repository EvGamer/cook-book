import { createReducer } from '../utils';

const initialState = {
  list: [
    { id: 1, name: 'Wire' },
    { id: 2, name: 'Board' },
    { id: 3, name: 'Circuit' },
    { id: 4, name: 'Plastic' },
    { id: 5, name: 'Copper plate' },
    { id: 6, name: 'Copper ore' },
  ],
};

export default createReducer(initialState, {});
