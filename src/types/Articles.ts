export interface Todo {
  title: string;
  content: string;
}

export type Status = "TODO" | "COMPLETED" | "DELETED";

export interface Article {
  id: number | string;
  mode: "VIEW" | "EDIT";
  header: string;
  main: Todo;
  footer: string;
}
