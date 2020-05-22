import { INote } from "./INote";
export interface INoteEntity {
  createOrReplace: (note: INote) => void;
  save: (note: INote) => void;
  removeById: (noteId: number) => void;
  restore: () => void;
}
