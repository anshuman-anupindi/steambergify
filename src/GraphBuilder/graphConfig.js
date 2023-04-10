const RGBComponent = () =>
  Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, "0");
const randomColor = () =>
  `#${RGBComponent()}${RGBComponent()}${RGBComponent()}`;

const getGameNode = (gameID, game, [x, y]) => {
  return {
    id: gameID,
    title: game,
    label: game,
    shape: "circle",
    color: randomColor(),
    x: x,
    y: y,
    fixed: {
      x: false,
      y: false,
    },
  };
};

const getGameEdge = (game, otherGame) => {
  return {
    from: game.id,
    to: otherGame.id,
    color: randomColor(),
    selectionWidth: function (width) {
      return width * 20;
    },
  };
};

const options = {
  layout: {
    hierarchical: false,
  },
  autoResize: true,
  edges: {
    arrows: {
      to: { enabled: false },
    },
    scaling: {
      max: 1000,
    },
  },
  height: "1000px",
  physics: {
    enabled: true,
    barnesHut: {
      avoidOverlap: 1,
      gravitationalConstant: 10,
      damping: 2,
      springConstant: 1,
      centralGravity: -0.00001,
    },
    maxVelocity: 0.005,
  },
};

export { options, randomColor, getGameEdge, getGameNode };
