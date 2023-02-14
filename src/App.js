import "./App.css";
import TopGames from "./TopGames";
import { useEffect, useState } from "react";

function App() {
  let [topTenGames, setTopTenGames] = useState([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);

  return (
    <div className="App">
      <TopGames
        topTenGames={topTenGames}
        setTopTenGames={setTopTenGames}
      ></TopGames>
      <div>
        {`${topTenGames.map((topTenGame) => [
          topTenGame.name,
          topTenGame.playtime_forever,
        ])}`}
      </div>
    </div>
  );
}

export default App;
//
