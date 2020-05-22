import { ITodo } from "./ITodo";

export interface ITodoEntity {
  add: (todo: ITodo) => void;
  remove: (todo: ITodo) => void;
  edit: (text: string) => void;
  check: (todoId: number) => void;
}
