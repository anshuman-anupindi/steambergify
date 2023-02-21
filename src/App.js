import "./App.css";
import { useEffect, useState } from "react";
import fetchTopGamesWithSteamID from "./fetchTopGames";

function App() {
  const [topTenGames, setTopTenGames] = useState([]);
  const [steamID, setSteamID] = useState("");

  async function updateTopTenGames(e) {
    const newSteamID = e.target.value;
    setSteamID(newSteamID);

    const newTopTenGames = await fetchTopGamesWithSteamID(newSteamID);
    setTopTenGames(newTopTenGames || []);
  }

  return (
    <div className="App">
      <input onChange={updateTopTenGames} type="text"></input>
      <div> {steamID} </div>
      {topTenGames.map((topTenGame, idx) => (
        <div key={idx}>
          <div>{JSON.stringify(topTenGame)}</div>
          <div>{`${topTenGame.name},  ${String(
            Math.round(Number(topTenGame.playtime_forever) / 60)
          )} hours, Tags:${topTenGame.topFiveGameTags}`}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
