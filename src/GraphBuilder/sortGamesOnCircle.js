const _ = require("underscore");
const radiusBoundsForNthRingFromCentre = {
  0: [0, 10],
  1: [10, 20],
  2: [20, 30],
  3: [30, 40],
  4: [40, 50],
  5: [50, 60],
};

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

const rankGamesByNumberOfCommonTags = (gameListWithGraphInfo) => {
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

export { rankGamesByNumberOfCommonTags };
