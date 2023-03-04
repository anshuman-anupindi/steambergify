import { fetchOwnedGamesWithTagsWithSteamID } from "./fetchTopGames";
const _ = require("underscore");

const getSteamIDFetchURL = (steamID) =>
  `http://localhost:8080/http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=1A8C168C801CF84A91105EA9C49B36E2&steamid=${steamID}&include_appinfo=true&include_played_free_games=true&format=json`;

const getSteamSpyFetchURL = (gameID) =>
  `http://localhost:8080/http://steamspy.com/api.php?request=appdetails&appid=${gameID}`;

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
      commonTags.forEach((commonTag) =>
        edgeList.push({ from: game.id, to: otherGame.id })
      );
    }
  }
  return edgeList;
}

function buildNodeList(gameListWithGraphInfo) {
  return gameListWithGraphInfo.map((game) => {
    return { id: game.id, title: game.label, label: game.label };
  });
}

// both of the above functions need to be called upon entering a new steam ID - ie, tied to the core function called on the event

export {
  getSteamIDFetchURL,
  getSteamSpyFetchURL,
  buildGameListWithGraphInfo,
  buildEdgeList,
  buildNodeList,
};
