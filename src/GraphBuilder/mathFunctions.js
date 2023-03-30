const getRadiiForGamesInNthCategory = (scalingFactor) => {
  return {
    0: scalingFactor * 200,
    1: scalingFactor * 170,
    2: scalingFactor * 120,
    3: scalingFactor * 90,
    4: scalingFactor * 50,
    5: scalingFactor * 20,
    6: 0,
  };
};

const degreesToRadians = (degrees) => degrees * (Math.PI / 180);

const polarCoordinatesToCartesian = (radius, angle) => [
  radius * Math.cos(angle),
  radius * Math.sin(angle),
];
const getZScoreFromTagCountAndMeanTagCount = (
  tagCount,
  meanTagCount,
  stdDeviation
) => {
  let tagCountVariance = Number(tagCount) - meanTagCount;
  return Math.floor(tagCountVariance / stdDeviation);
};

export {
  degreesToRadians,
  polarCoordinatesToCartesian,
  getZScoreFromTagCountAndMeanTagCount,
  getRadiiForGamesInNthCategory,
};
