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
        setTopTenGames(getTopTenGames(totalGameList));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return <input onChange={steamIDToTopTenGames} type="text"></input>;
}
