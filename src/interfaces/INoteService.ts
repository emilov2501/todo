import { INote } from "./INote";
import { BackupController } from "../controllers/BackupController";
export interface INoteService<T> {
  createOrReplace: (note: INote) => void;
  save: (note: INote) => T;
  remove: (noteId: number) => void;
  restore: () => void;
}
