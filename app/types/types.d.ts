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
