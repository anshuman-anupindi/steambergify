import "./App.css";
import TopGames from "./TopGames";
import { useEffect, useState } from "react";

function App() {
  let [topTenGames, setTopTenGames] = useState([]);

  let topTenGameDivs = topTenGames.map((topTenGame) => (
    <div>{`${topTenGame.name},  ${String(
      Math.round(Number(topTenGame.playtime_forever) / 60)
    )} hours`}</div>
  ));

  return (
    <div className="App">
      <TopGames
        topTenGames={topTenGames}
        setTopTenGames={setTopTenGames}
      ></TopGames>
      {topTenGameDivs}
    </div>
  );
}

export default App;
//
