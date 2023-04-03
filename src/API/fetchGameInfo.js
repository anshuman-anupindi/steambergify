import { getSteamIDFetchURL, getSteamSpyFetchURL } from "./URLBuilders";

async function fetchOwnedGamesWithTagsWithSteamID(steamID) {
  console.log(`Fetching data...`);
  let totalGameList = await fetch(getSteamIDFetchURL(steamID))
    .then((res) => res.json())
    .then((data) => {
      return data.response.games;
    })
    .catch((err) => {
      console.log(err.message);
    });

  if (totalGameList === undefined) return [];

  const totalGameListWithTags = await addGameTagsToOwnedGames(totalGameList);
  return totalGameListWithTags;
}

const getTopFiveTags = (gameTags) =>
  Object.fromEntries(Object.entries(gameTags).slice(0, 5));

async function addGameTagsToOwnedGames(totalGameList) {
  await Promise.all(
    totalGameList.map((game, idx) => {
      let gameID = game.appid;
      return fetch(getSteamSpyFetchURL(gameID))
        .then((res) => res.json())
        .then((data) => {
          totalGameList[idx].topFiveGameTags = getTopFiveTags(data.tags);
          console.log(game);
        })
        .catch((err) => {
          console.log(err.message);
        });
    })
  );
  return totalGameList;
}

export { fetchOwnedGamesWithTagsWithSteamID };
