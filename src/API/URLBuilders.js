const getSteamIDFetchURL = (steamID) =>
  `http://localhost:8080/http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=1A8C168C801CF84A91105EA9C49B36E2&steamid=${steamID}&include_appinfo=true&include_played_free_games=true&format=json`;

const getSteamSpyFetchURL = (gameID) =>
  `http://localhost:8080/http://steamspy.com/api.php?request=appdetails&appid=${gameID}`;

const steamIDTrimmer = (steamIDFromURL) => steamIDFromURL.trim().slice(1);

export { getSteamIDFetchURL, getSteamSpyFetchURL, steamIDTrimmer };
