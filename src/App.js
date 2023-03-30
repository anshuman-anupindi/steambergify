import "./App.css";
import { useState } from "react";
import React, { useMemo } from "react";
import Graph from "react-graph-vis";

import { fetchOwnedGamesWithTagsWithSteamID } from "./API/fetchGameInfo";
import {
  buildEdgeList,
  buildGameListWithGraphInfo,
  buildNodeList,
} from "./GraphBuilder/graphBuilders";
import { options } from "./GraphBuilder/graphConfig";

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

    await Promise.all([newOwnedGames, gameListWithGraphInfo]).then((values) => {
      console.error("Setting graph");
      setGraph(
        {
          nodes: buildNodeList(values[1]),
          edges: buildEdgeList(values[1]),
          options: options,
        } || undefined
      );
    });
  }

  console.log(`graph: `, graph);

  const GameGraph = useMemo(() => {
    return () => (
      <Graph graph={graph} options={options} style={{ height: "600px" }} />
    );
  }, [graph]);

  return (
    <div className="App">
      <input
        onChange={async (e) => await updateGameInfoStates(e)}
        type="text"
      ></input>
      <div> {steamID} </div>
      {ownedGames.map((ownedGame, idx) => (
        <div key={idx}>
          <div>
            {`${ownedGame?.name},  ${String(
              Math.round(Number(ownedGame?.playtime_forever) / 60)
            )} hours, Tags:${Object.keys(ownedGame?.topFiveGameTags)}`}
          </div>
        </div>
      ))}
      <div>
        <GameGraph />
      </div>
    </div>
  );
}

export default App;
