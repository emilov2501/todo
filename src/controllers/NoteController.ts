import { INoteEntity } from "../interfaces/INoteEntity";
import { INote } from "../interfaces/INote";
import LocalStorage from "@/utils/LocalStorage";
import { BACKUP_NOTE_LIST, NOTE_LIST } from "./types";
import Vue from "vue";
import { last, initial, omit } from "lodash";
import { BackupController } from "./BackupController";

export class NoteService implements INoteEntity {
  static generateId(): number {
    return Number((Math.random() * 12345).toFixed(0));
  }

  private notes: {};

  constructor() {
    this.notes = LocalStorage.getItem<Record<string, INote>>(NOTE_LIST, {});
  }

  get getNotes(): {} {
    return this.notes;
  }

  /**
   * create
   */
  public createOrReplace(note: INote): void {
    LocalStorage.setItem(NOTE_LIST, { ...this.notes, [note.id]: note });
    Vue.set(this.notes, note.id, note);
  }

  /**
   * save
   */
  public save(note: INote): void {
    const oldNote: INote = this.notes[note.id];

    this.createOrReplace(note);
    new BackupController(oldNote, BACKUP_NOTE_LIST);
  }

  /**
   * remove
   */
  public removeById(noteId: number): void {
    const note: INote = this.notes[noteId];
    if (note) {
      LocalStorage.setItem(NOTE_LIST, omit(this.notes, [noteId]));
      Vue.delete(this.notes, note.id);
    }
  }

  /**
   * undo
   */
  public restore(noteId: number): void {
    const backup = LocalStorage.getItem(BACKUP_NOTE_LIST, {});
    const currentNotes: INote[] = backup[noteId]; // Detect current value in backup
    const lastItem: INote | any = last(currentNotes);

    this.createOrReplace(lastItem);

    LocalStorage.setItem(BACKUP_NOTE_LIST, {
      ...backup,
      [noteId]: initial(currentNotes)
    });
  }
}
