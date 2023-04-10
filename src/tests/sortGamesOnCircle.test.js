import {
  getGamesWithNumOfCommonTags,
  nThCategoryToCartesianCoordinates,
  nThCategoryToPolarCoordinates,
  rankingDataToCategoryByAscendingZScore,
} from "../GraphBuilder/sortGamesOnCircle";
const math = require("mathjs");

describe("getGamesWithNumOfCommonTags", () => {
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

  const gamesWithNumberOfCommonTags1 = getGamesWithNumOfCommonTags(
    gameListWithGraphInfoTest
  );
  const gamesWithNumberOfCommonTags2 = getGamesWithNumOfCommonTags(
    gameListWithGraphInfoTest2
  );

  it("base case: one game maps to 0 common tags", () => {
    expect(getGamesWithNumOfCommonTags([gameListWithGraphInfoTest[0]])).toEqual(
      {}
    );
  });

  it("all three games map to 1 common tag for Halo and Valorant", () => {
    expect(getGamesWithNumOfCommonTags(gameListWithGraphInfoTest)).toEqual({
      Halo: 1,
      Valorant: 1,
      Factorio: 0,
    });
  });

  it("all four games map to 1 common tag for Halo and Valorant, 2 common tags for Factorio and Civ", () => {
    expect(getGamesWithNumOfCommonTags(gameListWithGraphInfoTest2)).toEqual({
      Halo: 1,
      Valorant: 1,
      Factorio: 2,
      Civilization: 2,
    });
  });

  it("mean works", () => {
    expect(math.mean([0, 1, 2])).toEqual(1);
  });

  it("standard deviation works", () => {
    expect(math.std([0, 1, 2])).toEqual(1);
  });

  it("rankingDataToCategoryByAscendingZScore for dummy gamesWithNumberOfCommonTags2", () => {
    expect(
      rankingDataToCategoryByAscendingZScore(gamesWithNumberOfCommonTags2)
    ).toEqual([
      [],
      [],
      ["Halo", "Valorant"],
      ["Factorio", "Civilization"],
      [],
      [],
      [],
    ]);
  });

  it("nThCategoryToPolar for 3rd bucket returns polar coordinates", () => {
    expect(
      nThCategoryToPolarCoordinates(3, gamesWithNumberOfCommonTags2)
    ).toEqual([
      ["Factorio", [40, Math.PI]],
      ["Civilization", [40, 2 * Math.PI]],
    ]);
  });

  it("nThCategoryToPolar for 2nd bucket returns polar coordinates", () => {
    expect(
      nThCategoryToPolarCoordinates(2, gamesWithNumberOfCommonTags2)
    ).toEqual([
      ["Halo", [50, 180]],
      ["Valorant", [50, 360]],
    ]);
  });

  it("nThCategoryToCartesian for 3rd bucket returns cartesian coordinates", () => {
    expect(
      nThCategoryToCartesianCoordinates(3, gamesWithNumberOfCommonTags2)
    ).toEqual([
      ["Factorio", [20, 20]],
      ["Civilization", [30, 30]],
    ]);
  });
});
