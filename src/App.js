import "./App.css";
import { useState } from "react";
import React from "react";
import Graph from "react-graph-vis";

import { fetchOwnedGamesWithTagsWithSteamID } from "./fetchTopGames";
import {
  buildEdgeList,
  buildGameListWithGraphInfo,
  buildNodeList,
} from "./helpers";

const options = {
  layout: {
    hierarchical: true,
  },
  edges: {
    color: "#000000",
  },
  height: "500px",
};

function App() {
  const [steamID, setSteamID] = useState("");
  const [graph, setGraph] = useState({ nodes: [], edges: [] });
  const [ownedGames, setOwnedGames] = useState([]);

  async function updateGameInfoStates(e) {
    const newSteamID = e.target.value;
    setSteamID(newSteamID);
    const newOwnedGames = await fetchOwnedGamesWithTagsWithSteamID(newSteamID);

    setOwnedGames(newOwnedGames || []);
    const gameListWithGraphInfo = buildGameListWithGraphInfo(newOwnedGames);

    console.log(`gameList: `, gameListWithGraphInfo);
    await Promise.all([newOwnedGames, gameListWithGraphInfo]).then(
      ([newOwnedGames, gameListWithGraphInfo]) =>
        setGraph(
          {
            nodes: buildNodeList(newOwnedGames),
            edges: buildEdgeList(newOwnedGames),
            options: options,
          } || undefined
        )
    );
  }
  console.log(graph);

  return (
    <div className="App">
      <input
        onChange={async (e) => await updateGameInfoStates(e)}
        type="text"
      ></input>
      <div> {steamID} </div>
      {ownedGames.map((ownedGame, idx) => (
        <div key={idx}>
          <div>{`${ownedGame?.name},  ${String(
            Math.round(Number(ownedGame?.playtime_forever) / 60)
          )} hours, Tags:${Object.keys(ownedGame?.topFiveGameTags)}`}</div>
        </div>
      ))}
      <div>
        <Graph graph={graph}></Graph>
      </div>
    </div>
  );
}

export default App;
