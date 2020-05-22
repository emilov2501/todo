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
      <button @click="change(note.id)">Изменить</button>
      <button class="danger ml-1" @click="remove(note.id)">Удалить</button>
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
import { mixins } from "vue-class-component";
import NoteMixin from "../../mixins/note.mixin";

@Component({
  components: {
    AppNote,
    AppTodoList
  },
  methods: {
    ...mapActions({
      _remove: "_remove"
    })
  }
})
export default class NoteList extends mixins(NoteMixin) {
  @Prop({ type: Array, default: [] }) notes!: INote[];
}
</script>
