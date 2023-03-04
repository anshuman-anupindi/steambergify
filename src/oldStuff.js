// async function fetchTopGamesWithSteamID(steamID) {
//   let totalGameList = await fetch(getSteamIDFetchURL(steamID))
//     .then((res) => res.json())
//     .then((data) => {
//       return data.response.games;
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });

//   if (totalGameList === undefined) return [];

//   const totalGameListWithTags = await addGameTagsToOwnedGames(totalGameList);
//   return getTopTenGames(totalGameListWithTags);
// }

// const getTopTenGames = (totalGameList) => {
//   let gamesByPlaytime = totalGameList.sort(
//     (gameA, gameB) => gameA.playtime_forever - gameB.playtime_forever
//   );
//   return gamesByPlaytime.reverse().slice(0, 10);
// };

// {topTenGames.map((topTenGame, idx) => (
//   <div key={idx}>
//     <div>{JSON.stringify(topTenGame)}</div>
//     <div>{`${topTenGame.name},  ${String(
//       Math.round(Number(topTenGame.playtime_forever) / 60)
//     )} hours, Tags:${topTenGame.topFiveGameTags}`}</div>
//   </div>
// ))}

// App.js
// const [topTenGames, setTopTenGames] = useState([]);

// const newTopTenGames = await fetchTopGamesWithSteamID(newSteamID);
// setTopTenGames(newTopTenGames || []);
