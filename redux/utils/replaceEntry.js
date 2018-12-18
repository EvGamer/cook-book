const replaceEntry = (list, newEntry) => list.map(entry => (
  newEntry.id === entry.id
    ? newEntry
    : entry
));

export default replaceEntry;
