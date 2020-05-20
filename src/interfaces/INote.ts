import { ITodo } from "./ITodo";
export interface INote {
  id: number;
  title: string;
  todos: ITodo[];
}
