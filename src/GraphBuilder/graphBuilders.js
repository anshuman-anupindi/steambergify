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

function buildNodeList(gameListWithGraphInfo) {
  return gameListWithGraphInfo.map((game) => {
    return {
      id: game.id,
      title: game.label,
      label: game.label,
    };
  });
}

export { buildGameListWithGraphInfo, buildEdgeList, buildNodeList };
