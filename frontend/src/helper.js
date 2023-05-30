export function calculateUpkeep(base, modifier) {
  return +base + +modifier;
}

export function findBaseUpkeep(unitType, upkeepReferenceObject) {
  return upkeepReferenceObject[unitType];
}

export function findRecruitmentCost(unitTier, recruitmentReferenceObject) {
  return recruitmentReferenceObject[unitTier];
}

export function groupBy(data, key) {
  return data.reduce(function (storage, item) {
    const group = item[key];
    storage[group] = storage[group] || [];
    storage[group].push(item);
    return storage;
  }, {});
}

export function calculateUnitSize(tier) {
  if (tier.includes('Infantry')) {
    return 160;
  } else if (tier.includes('Cavalry')) {
    return 60;
  } else if(tier.includes('Siege')) {
    return 40;
  }else{
    return 1
  }
}

export function generateOrdinalIndicator(number) {
  if (number % 100 >= 11 && number % 100 <= 13) {
    return 'th';
  }
  switch (number % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

export function sortObjectKeys(obj) {
  return Object.keys(obj)
    .sort()
    .reduce((result, key) => {
      result[key] = obj[key];
      return result;
    }, {});
}
export function compareUnits(a,b){
  if ( a.Number < b.Number ){
return -1;
}
if ( a.Number > b.Number ){
return 1;
}
return 0;
}