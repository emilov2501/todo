import { INoteService } from "../interfaces/INoteService";
import { INote } from "../interfaces/INote";
import LocalStorage from "@/utils/LocalStorage";
import { BACKUP_NOTE_LIST, NOTE_LIST } from "./note-types";
import { BackupController } from "./BackupController";
import Vue from "vue";
import { last, initial } from "lodash";

export class NoteService implements INoteService<BackupController<INote>> {
  static getRandomId(): number {
    return Number((Math.random() * 12345).toFixed(0));
  }

  private notes: {};

  constructor() {
    this.notes = LocalStorage.getItem<Record<string, INote>>(NOTE_LIST, {});
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
  public save(note: INote): BackupController<INote> {
    const oldNote = this.notes[note.id];

    this.createOrReplace(note);
    return new BackupController<INote>(oldNote, BACKUP_NOTE_LIST);
  }

  /**
   * remove
   */
  public remove(noteId: number): void {
    const note: INote = this.notes[noteId];
    if (note) {
      Vue.delete(this.notes, note.id);
    }
  }

  /**
   * repeat
   */
  public restore(): void {
    const backup = LocalStorage.getItem<[]>(BACKUP_NOTE_LIST, []);
    const lastNote = last(backup);
    this.createOrReplace(lastNote);
    LocalStorage.setItem(BACKUP_NOTE_LIST, initial(backup));
  }
}
