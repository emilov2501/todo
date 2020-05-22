import { ITodo } from "../interfaces/ITodo";
import { ITodoEntity } from "../interfaces/ITodoEntity";

export class TodoController implements ITodoEntity {
  private todo: ITodo[];

  constructor() {
    this.todo = [];
  }

  add(): void {}
  remove(): void {}
  edit(): void {}
  check(): void {}
}
