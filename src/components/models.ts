export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Organization {
  id?: number;
  name: string;
  title: string;
  email: string;
}
