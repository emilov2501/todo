// note.mixin.ts
import { Component, Vue } from "vue-property-decorator";
import { BACKUP_NOTE_LIST } from "../controllers/types";
import { NoteService } from "../controllers/NoteController";
import { INote } from "../interfaces/INote";

@Component
export default class TodoMixin extends Vue {
  note!: INote; // note
  noteId!: number; // Note ID
  getNotes!: object; // Get notes
  todoDescription!: string; // Toto value description
  $saveTo!: any; // snapshot plugin

  addTodo() {
    if (!this.todoDescription) return alert("Введите название TODO");

    const oldNote = this.getNotes[this.noteId]; // Detect old note

    /**
     * Make snapshot and save to Backup store
     */
    this.$saveTo("backupSnapshots", {
      storageKey: BACKUP_NOTE_LIST,
      data: oldNote
    });

    /**
     * Pushed actually note
     */
    this.note.todos.push({
      id: NoteService.generateId(),
      isDone: false,
      description: this.todoDescription
    });

    this.todoDescription = "";
  }

  removeTodo(todoId: number): void {
    this.note.todos = this.note.todos.filter(todo => todo.id !== todoId);
  }
}
