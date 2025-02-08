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
