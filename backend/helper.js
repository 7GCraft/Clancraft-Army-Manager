function replenishUnit(tier, locationStatus, currentSize) {
  let size = 160;
  let locationModifier = 0.4;

  if (tier.includes('Cavalry')) {
    size = 60;
  } else if (tier.includes('Siege')) {
    size = 40;
  }

  if (locationStatus === 'A') {
    locationModifier = 0.3;
  } else if (locationStatus === 'E') {
    locationModifier = 0;
  }
  let result = +currentSize + locationModifier * size;

  if (result > size) {
    result = size;
  }
  return result;
}

module.exports = {
  replenishUnit,
};
