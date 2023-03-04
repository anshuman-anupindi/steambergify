import { getSteamIDFetchURL, getSteamSpyFetchURL } from "./helpers";

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
  // awaits an array of Promises to be Fulfilled - this is an array of Game objects fetched from SteamSpyAPI
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
  // once the array of Promises is fulfilled, return the total game list.
  return totalGameList;
}

export { fetchOwnedGamesWithTagsWithSteamID };
