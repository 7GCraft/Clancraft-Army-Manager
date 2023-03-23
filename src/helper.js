export function calculateUpkeep  (base,modifier) {
    return base * (1+modifier)
}

export function findBaseUpkeep(unitType,upkeepReferenceObject){
  return upkeepReferenceObject[unitType]
}

export function findRecruitmentCost(unitTier,recruitmentReferenceObject){
  return recruitmentReferenceObject[unitTier]
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

export function calculateUnitSize(tier){
  if(tier.includes('Infantry')){
    return 160
  }else if(tier.includes('Cavalry')){
    return 80
  }else{
    return 40
  }
}

export function generateOrdinalIndicator(number) {
    if (number % 100 >= 11 && number % 100 <= 13) {
      return "th";
    }
    switch (number % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
}