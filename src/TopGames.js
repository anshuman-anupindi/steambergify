// fetch top 10 games from steam user ID
// 1A8C168C801CF84A91105EA9C49B36E2 - api key
// GetOwnedGames - arguments: include
// http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=1A8C168C801CF84A91105EA9C49B36E2&steamid=76561197960434622&include_appinfo=true&include_played_free_games=true&format=json
import { getSteamIDFetchURL } from "./helpers";

export default function TopGames(props) {
  let [topTenGames, setTopTenGames] = [props.topTenGames, props.setTopTenGames];

  function getTopTenGames(totalGameList) {
    let gamesByPlaytime = totalGameList.sort(
      (gameA, gameB) => gameA.playtime_forever - gameB.playtime_forever
    );
    return gamesByPlaytime.reverse().slice(0, 10);
  }

  function steamIDToTopTenGames(e) {
    let steamID = e.target.value;
    fetch(getSteamIDFetchURL(steamID))
      .then((res) => res.json())
      .then((data) => {
        let totalGameList = data.response.games;
        console.log(totalGameList);
        setTopTenGames(getTopTenGames(totalGameList));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return <input onChange={steamIDToTopTenGames} type="text"></input>;
}
