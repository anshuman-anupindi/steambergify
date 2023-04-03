import {
  getGamesWithNumOfCommonTags,
  rankingDataToCategoryByAscendingZScore,
  nThCategoryToCartesianCoordinates,
} from "./sortGamesOnCircle";
const _ = require("underscore");

function buildGameListWithGraphInfo(allOwnedGamesWithTags) {
  return allOwnedGamesWithTags.map((game, idx) => {
    return {
      id: idx + 1,
      topFiveTags: game.topFiveGameTags,
      label: game?.name,
    };
  });
}

function buildNodeList(gameListWithGraphInfo) {
  let gamesWithNumberOfCommonTags = getGamesWithNumOfCommonTags(
    gameListWithGraphInfo
  );
  let ZScoreCategories = rankingDataToCategoryByAscendingZScore(
    gamesWithNumberOfCommonTags
  );
  let gamesWithCoordinates = ZScoreCategories.map((nThCategory, N) => {
    return nThCategoryToCartesianCoordinates(
      N,
      gamesWithNumberOfCommonTags
    ).map(([game, coordinates]) => {
      let gameID = gameListWithGraphInfo.filter((gameObject) => {
        return gameObject.label == game;
      })[0].id;
      return {
        id: gameID,
        title: game,
        label: game,
        x: coordinates[0],
        y: coordinates[1],
      };
    });
  });

  return gamesWithCoordinates.flat();
}

function buildEdgeList(gameListWithGraphInfo) {
  let edgeList = [];
  for (let i = 0; i < gameListWithGraphInfo.length; i++) {
    const game = gameListWithGraphInfo[i];
    const gameTagList = Object.keys(game.topFiveTags);
    for (let j = i + 1; j < gameListWithGraphInfo.length; j++) {
      const otherGame = gameListWithGraphInfo[j];
      const otherGameTagList = Object.keys(otherGame.topFiveTags);
      const commonTags = _.intersection(gameTagList, otherGameTagList);
      commonTags.forEach((_commonTag) =>
        edgeList.push({ from: game.id, to: otherGame.id })
      );
    }
  }
  return edgeList;
}

export { buildGameListWithGraphInfo, buildEdgeList, buildNodeList };
