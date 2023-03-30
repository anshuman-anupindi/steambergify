import {
  degreesToRadians,
  polarCoordinatesToCartesian,
  getZScoreFromTagCountAndMeanTagCount,
  getRadiiForGamesInNthCategory,
} from "./mathFunctions";
const _ = require("underscore");
const math = require("mathjs");

const gamesWithNumberOfCommonTagsIncrementer = (
  game,
  gamesWithNumberOfCommonTags,
  commonTags
) => {
  let gameName = game.label;
  if (gameName in gamesWithNumberOfCommonTags) {
    gamesWithNumberOfCommonTags[gameName] =
      Number(gamesWithNumberOfCommonTags[gameName]) + commonTags.length;
  } else {
    gamesWithNumberOfCommonTags[gameName] = commonTags.length;
  }
};

const getGamesWithNumOfCommonTags = (gameListWithGraphInfo) => {
  let gamesWithNumberOfCommonTags = {};
  for (let i = 0; i < gameListWithGraphInfo.length; i++) {
    const game = gameListWithGraphInfo[i];
    const gameTagList = Object.keys(game.topFiveTags);
    for (let j = i + 1; j < gameListWithGraphInfo.length; j++) {
      const otherGame = gameListWithGraphInfo[j];
      const otherGameTagList = Object.keys(otherGame.topFiveTags);
      const commonTags = _.intersection(gameTagList, otherGameTagList);
      gamesWithNumberOfCommonTagsIncrementer(
        game,
        gamesWithNumberOfCommonTags,
        commonTags
      );
      gamesWithNumberOfCommonTagsIncrementer(
        otherGame,
        gamesWithNumberOfCommonTags,
        commonTags
      );
    }
  }
  return gamesWithNumberOfCommonTags;
};

const rankingDataToCategoryByAscendingZScore = (
  gamesWithNumberOfCommonTags
) => {
  let numberOfCommonTags = Object.values(gamesWithNumberOfCommonTags);
  let stdDeviation = math.std(
    numberOfCommonTags.map((tagCount) => Number(tagCount))
  );
  let meanTagCount = math.mean(
    numberOfCommonTags.map((tagCount) => Number(tagCount))
  );
  let iterableGamesWithNumberOfCommonTags = Object.entries(
    gamesWithNumberOfCommonTags
  );
  let categories = [[], [], [], [], [], [], []];
  iterableGamesWithNumberOfCommonTags.forEach(([game, tagCount]) => {
    let gameZScore = getZScoreFromTagCountAndMeanTagCount(
      tagCount,
      meanTagCount,
      stdDeviation
    );
    categories[gameZScore + 3].push(game);
  });
  return categories;
};

const nThCategoryToPolarCoordinates = (N, gamesWithNumberOfCommonTags) => {
  let NthZScoreCategory = rankingDataToCategoryByAscendingZScore(
    gamesWithNumberOfCommonTags
  )[N];
  let separationAngle = 360 / NthZScoreCategory.length;
  let angle = 0;
  let radius = getRadiiForGamesInNthCategory(10)[N];
  let nThCategoryPolarCoordinates = [];
  NthZScoreCategory.forEach((game) => {
    angle += separationAngle;
    nThCategoryPolarCoordinates.push([game, [radius, degreesToRadians(angle)]]);
  });
  return nThCategoryPolarCoordinates;
};

const nThCategoryToCartesianCoordinates = (N, gamesWithNumberOfCommonTags) => {
  let gamesInNthCategoryInPolar = nThCategoryToPolarCoordinates(
    N,
    gamesWithNumberOfCommonTags
  );
  return gamesInNthCategoryInPolar.map(([game, gameCoordinates]) => [
    game,
    polarCoordinatesToCartesian(gameCoordinates[0], gameCoordinates[1]),
  ]);
};

export {
  getGamesWithNumOfCommonTags,
  rankingDataToCategoryByAscendingZScore,
  nThCategoryToCartesianCoordinates,
  nThCategoryToPolarCoordinates,
  gamesWithNumberOfCommonTagsIncrementer,
};
