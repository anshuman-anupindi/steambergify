import { getGameEdge, getGameNode } from "./graphConfig";
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

const getGameIDFromGraphInfo = (gameListWithGraphInfo, game) =>
  gameListWithGraphInfo.filter((gameObject) => gameObject.label === game)[0].id;

function buildNodeList(gameListWithGraphInfo) {
  let gamesWithNumberOfCommonTags = getGamesWithNumOfCommonTags(
    gameListWithGraphInfo
  );
  let ZScoreCategories = rankingDataToCategoryByAscendingZScore(
    gamesWithNumberOfCommonTags
  );
  let nodeListWithCoordinates = ZScoreCategories.map((_nThCategory, N) => {
    return nThCategoryToCartesianCoordinates(
      N,
      gamesWithNumberOfCommonTags
    ).map(([game, coordinates]) => {
      let gameID = getGameIDFromGraphInfo(gameListWithGraphInfo, game);
      return getGameNode(gameID, game, coordinates);
    });
  }).flat();

  return nodeListWithCoordinates;
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
        edgeList.push(getGameEdge(game, otherGame))
      );
    }
  }
  return edgeList;
}

export { buildGameListWithGraphInfo, buildEdgeList, buildNodeList };
