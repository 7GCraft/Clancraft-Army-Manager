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