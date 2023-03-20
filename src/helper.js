export function calculateUpkeep  (type,referenceObject) {
    return referenceObject[type]
}

export function groupBy (data, key)
{
	return data.reduce(function(storage, item) {
        const group = item[key];
        storage[group] = storage[group] || [];
        storage[group].push(item);
        return storage; 
      }, {});
}