export interface Todo {
  title: string;
  content: string;
}
  
export interface Article {
  id: number | string;
  header: string;
  main: Todo
  footer: string;
}

export type Status = 'TODO' | 'COMPLETED' | 'DELETED';