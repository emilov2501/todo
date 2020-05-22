// note.mixin.ts
import { Component, Vue } from "vue-property-decorator";
import LocalStorage from "@/utils/LocalStorage";
import { BACKUP_NOTE_LIST } from "../controllers/types";
import { Dictionary } from "vue-router/types/router";

@Component
export default class NoteMixin extends Vue {
  _remove!: any; // Remove Note
  _restore!: any; // Restore old note
  _create!: any; // Create Note
  noteId!: number; // Note ID
  value!: string; // Name of Note

  create() {
    if (!this.value) return alert("Не валидные данные");

    this._create(this.value);
    this.$nextTick(() => {
      this.value = "";
      this.$router.push({
        name: "HomePage"
      });
    });
  }

  remove(noteId): void {
    const OK = confirm(`Вы точно хотите #${noteId}`);
    if (OK) {
      this._remove(noteId);
      if (this.$route.path !== "/") {
        this.$router.push({
          name: "HomePage"
        });
      }
    }
  }

  undo() {
    const backup = LocalStorage.getItem(BACKUP_NOTE_LIST, []);

    if (backup.length <= 0) {
      return alert("Backup is empty");
    }

    this._restore();
  }

  change(noteId: string) {
    const q: Dictionary<string> = {
      change: "true"
    };

    const p: Dictionary<string> = {
      noteId: noteId
    };

    this.$router.push({
      name: "ModifyNotePage",
      params: p,
      query: q
    });
  }
}
