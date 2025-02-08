import { RepoTypes, UserTypes } from "../types/types";

const id = "YOUR_CLIENT_ID";
const sec = "YOUR_SECRET_ID";
const params = `?client_id=${id}&client_secret=${sec}`;

function getErrorMsg(message: string, username: string) {
  if (message === "Not Found") {
    return `${username} doesn't exist`;
  }

  return message;
}

function getProfile(username: string): Promise<UserTypes> {
  return fetch(`https://api.github.com/users/${username}${params}`)
    .then((res) => res.json())
    .then((profile) => {
      if (profile.message) {
        throw new Error(getErrorMsg(profile.message, username));
      }

      return profile;
    });
}

function getRepos(username: string): Promise<RepoTypes[]> {
  return fetch(
    `https://api.github.com/users/${username}/repos${params}&per_page=100`
  )
    .then((res) => res.json())
    .then((repos) => {
      if (repos.message) {
        throw new Error(getErrorMsg(repos.message, username));
      }

      return repos;
    });
}

function getStarCount(repos: RepoTypes[]) {
  return repos.reduce(
    (count, { stargazers_count }) => count + stargazers_count,
    0
  );
}

function calculateScore(followers: number, repos: RepoTypes[]) {
  return followers * 3 + getStarCount(repos);
}

function getUserData(player: string): Promise<Player> {
  return Promise.all([getProfile(player), getRepos(player)]).then(
    ([profile, repos]) => ({
      profile,
      score: calculateScore(profile.followers, repos),
    })
  );
}

export interface Player {
  profile: UserTypes;
  score: number;
}

function sortPlayers(players: Player[]) {
  return players.sort((a, b) => b.score - a.score);
}

export function battle(players: [string, string]) {
  return Promise.all([getUserData(players[0]), getUserData(players[1])]).then(
    (results) => sortPlayers(results)
  );
}

export function fetchPopularRepos(language: string) {
  const endpoint = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );

  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      if (!data.items) {
        throw new Error(data.message);
      }
      return data.items as RepoTypes[];
    });
}
