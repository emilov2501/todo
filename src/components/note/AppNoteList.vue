<template lang="html">
  <div class="note-list">
    <div
      class="item-wrapper d-flex align-items-center justify-content-between"
      v-for="note in notes"
      :key="note.id"
    >
      <div class="todo-item">
        <app-note :note="note" />
        <app-todo-list :todos="note.todos" />
      </div>
      <button @click="changeNote(note.id)">Изменить</button>
      <button class="danger ml-1" @click="removeNote(note.id)">Удалить</button>
      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import AppNote from "./AppNote.vue";
import AppTodoList from "../todo/AppTodoList.vue";
import { INote } from "@/interfaces/INote";
import { mapActions } from "vuex";
import { Dictionary } from "vue-router/types/router";

@Component({
  components: {
    AppNote,
    AppTodoList
  },
  methods: {
    ...mapActions({
      _removeNote: "_removeNote"
    })
  }
})
export default class NoteList extends Vue {
  @Prop({ type: Array, default: [] }) notes!: INote[];
  _removeNote!: any;

  removeNote(noteId: number) {
    const OK = confirm(`Вы точно хотите #${noteId}`);
    if (OK) {
      this._removeNote(noteId);
    }
  }

  changeNote(noteId: string) {
    const otherQuery: Dictionary<string> = {
      change: "true"
    };

    const otherParams: Dictionary<string> = {
      noteId: noteId
    };

    this.$router.push({
      name: "ModifyNotePage",
      params: otherParams,
      query: otherQuery
    });
  }
}
</script>
