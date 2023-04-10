import "./App.css";
import { useState } from "react";
import React, { useMemo } from "react";
import Graph from "react-graph-vis";

import { fetchOwnedGamesWithTagsWithSteamID } from "./API/fetchGameInfo";
import { steamIDTrimmer } from "./API/URLBuilders";
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
  // 76561198009874769
  return (
    <div className="App">
      <div className="appTitle">Which game is most like your other games?</div>
      <div className="inp-border a1">
        <input
          className="input"
          type="text"
          name="name1"
          placeholder="Enter your Steam ID."
          defaultValue={steamIDTrimmer(window.location.pathname) || ""}
          onChange={async (e) => await updateGameInfoStates(e)}
        />
      </div>
      <div>
        <GameGraph />
      </div>
    </div>
  );
}

export default App;
