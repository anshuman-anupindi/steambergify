import { buildNodeList } from "../GraphBuilder/graphBuilders";

describe("buildNodeList tests", () => {
  const gameListWithGraphInfoTest2 = [
    { id: 1, topFiveTags: { Shooter: 100, FPS: 200 }, label: "Halo" },
    { id: 2, topFiveTags: { Tactical: 100, FPS: 200 }, label: "Valorant" },
    { id: 3, topFiveTags: { Fun: 100, Strategy: 100 }, label: "Factorio" },
    { id: 4, topFiveTags: { Fun: 100, Strategy: 100 }, label: "Civilization" },
  ];
  it("buildNodeList returns an array", () => {
    expect(Array.isArray(buildNodeList(gameListWithGraphInfoTest2))).toEqual(
      true
    );
  });

  it("buildNodeList returns an array of node objects", () => {
    expect(buildNodeList(gameListWithGraphInfoTest2)).toEqual([]);
  });
});
