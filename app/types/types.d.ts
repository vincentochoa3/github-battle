export type CardTypes = {
  header: string;
  subheader?: string;
  avatar: string;
  href: string;
  name: string;
  children: ReactNode;
};

export type Languages =
  | "All"
  | "Javascript"
  | "Ruby"
  | "Java"
  | "CSS"
  | "Python";

export type RepoTypes = {
  name: string;
  owner: User;
  html_url: string;
  forks: number;
  open_issues: number;
  stargazers_count: number;
};

export type UserTypes = {
  id: string;
  followers: number;
  following: number;
  login: string;
  avatar_url: string;
  name: string;
  location?: string;
  company?: string;
  html_url: string;
};

export type PlayerTypes = {
  profile: UserTypes;
  score: number;
};
