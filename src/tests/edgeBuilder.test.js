import { buildEdgeList, buildNodeList } from "../helpers";

describe("edgeBuilder", () => {
  const gameListWithGraphInfoTest = [
    { id: 1, topFiveTags: { Shooter: 100, FPS: 200 }, label: "Halo" },
    { id: 2, topFiveTags: { Tactical: 100, FPS: 200 }, label: "Valorant" },
  ];

  it("base case: one node maps to no edges", () => {
    expect(buildEdgeList(gameListWithGraphInfoTest[0])).toEqual([]);
  });

  it("two nodes maps to one edge", () => {
    expect(buildEdgeList(gameListWithGraphInfoTest)).toEqual([
      { from: 1, to: 2 },
    ]);
  });
});
