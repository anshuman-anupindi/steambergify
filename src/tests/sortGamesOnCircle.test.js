import { rankGamesByNumberOfCommonTags } from "../GraphBuilder/sortGamesOnCircle";

describe("rankGamesByNumberOfCommonTags", () => {
  const gameListWithGraphInfoTest = [
    { id: 1, topFiveTags: { Shooter: 100, FPS: 200 }, label: "Halo" },
    { id: 2, topFiveTags: { Tactical: 100, FPS: 200 }, label: "Valorant" },
    { id: 3, topFiveTags: { Fun: 100, Strategy: 100 }, label: "Factorio" },
  ];

  const gameListWithGraphInfoTest2 = [
    { id: 1, topFiveTags: { Shooter: 100, FPS: 200 }, label: "Halo" },
    { id: 2, topFiveTags: { Tactical: 100, FPS: 200 }, label: "Valorant" },
    { id: 3, topFiveTags: { Fun: 100, Strategy: 100 }, label: "Factorio" },
    { id: 4, topFiveTags: { Fun: 100, Strategy: 100 }, label: "Civilization" },
  ];

  it("base case: one game maps to 0 common tags", () => {
    expect(
      rankGamesByNumberOfCommonTags([gameListWithGraphInfoTest[0]])
    ).toEqual({});
  });

  it("all three games map to 1 common tag for Halo and Valorant", () => {
    expect(rankGamesByNumberOfCommonTags(gameListWithGraphInfoTest)).toEqual({
      Halo: 1,
      Valorant: 1,
      Factorio: 0,
    });
  });

  it("all four games map to 1 common tag for Halo and Valorant, 2 common tags for Factorio and Civ", () => {
    expect(rankGamesByNumberOfCommonTags(gameListWithGraphInfoTest2)).toEqual({
      Halo: 1,
      Valorant: 1,
      Factorio: 2,
      Civilization: 2,
    });
  });
});
