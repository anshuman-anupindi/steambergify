const options = {
  layout: {
    hierarchical: false,
  },
  autoResize: true,
  edges: {
    color: "#000000",
    arrows: {
      to: { enabled: false },
    },
    scaling: {
      max: 1000,
    },
  },
  height: "900px",
  physics: {
    enabled: false,
    barnesHut: {
      avoidOverlap: 1,
      gravitationalConstant: -10000,
      damping: 1,
      springConstant: 0,
      centralGravity: 0.6,
    },
    maxVelocity: 1,
  },
};

// use edges: {hidden: false} for non graph version

export { options };
