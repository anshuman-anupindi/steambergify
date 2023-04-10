# Steambergify - a Steam user data visualiser that highlights games most similar to other games you've played

'Steam Wrapped'

## Core

We use the official Steam API as well as the unofficial SteamSpy API for user and game data through a CORS Anywhere server deployed through the command line.

## Concept

The essential concept is to take a Steam user's Steam ID and return a graph whose nodes are games, and whose edges are 'tags' identifying traits of those games. If two nodes have a tag in common, a single edge is drawn between them.

These nodes are then ranked by number of connections to other nodes, and organised in concentric rings representing the degree of commonality to the rest of a user's game library. A game with many connections to other games will be closer to the centre, while games with few connections will be further from it.

## Categorisation of games with Mathematics

We find the mean number of connections for a node as well as the standard deviation. We then sort nodes into 7 buckets on a normal distribution, each representing a Z-Score band, or a multiple of standard deviation away from the mean. These buckets are then mapped to radii from a centre point, and the games in that bucket are evenly distributed along the concentric circle with that radius, using coordinate transformations.

## Technologies

React.JS, CORS Anywhere, Vis.JS, Steam API, & SteamSpy API


