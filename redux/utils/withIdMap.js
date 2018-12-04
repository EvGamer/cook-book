function mapByID(aMap, item) {
  aMap[item.id] = item;
  return aMap;
}

export default function withIdMap(state) {
  return { ...state, map: state.list.reduce(mapByID, {}) };
}