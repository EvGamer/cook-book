
export default function createReducer(initialState, actionHandlers) {
  return function reducer(state = initialState, action){
    return actionHandlers[action.type]
      ? actionHandlers[action.type](state, action)
      : state;
  };
}