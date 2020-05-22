<template lang="html">
  <div class="page-change__note" v-if="note">
    <div class="note__title">
      <h1>
        #{{ note.id }}:
        <span v-if="!isEdit">{{ noteTitle }}</span>
        <input
          class="input__title"
          type="text"
          v-if="isEdit"
          :value="note.title"
          @input="input"
        />
      </h1>
      <small class="event ml-1" @click="isEdit = !isEdit"
        >[{{
          !isEdit ? "Изменить заголовок" : "Закончить редактирование"
        }}]</small
      >
    </div>
    <hr />
    <app-todo-list :todos="note.todos" @remove-todo="removeTodo" />
    <div>
      <input type="text" class="mr-2" v-model="todoDescription" />
      <small class="event" @click="addTodo">[Добавить задачу]</small>
    </div>
    <hr />
    <br />
    <div class="options">
      <button @click="toBack">Отменить</button>
      <button class="ml-1 success" @click="saveChange">
        Сохранить изменении
      </button>

      <button class="ml-1 danger" @click="remove(noteId)">Удалить</button>
      <button v-hotkey="keymap" class="ml-1 danger" @click="undo">
        Вернуть
      </button>
    </div>
    <br />
    <span v-if="loading">{{ loader }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import AppTodoList from "@/components/todo/AppTodoList.vue";
import { INote } from "@/interfaces/INote";
import NoteMixin from "@/mixins/note.mixin";
import TodoMixin from "@/mixins/todo.mixin";
import { mapGetters, mapActions, mapMutations } from "vuex";

@Component({
  components: {
    AppTodoList
  },
  computed: {
    ...mapGetters({
      getNoteById: "getNoteById",
      getNotes: "getNotes"
    })
  },
  methods: {
    ...mapActions({
      _saveChange: "_saveChange",
      _remove: "_remove"
    }),
    ...mapMutations({
      _restore: "setRestore"
    })
  }
})
export default class ChangeNotePage extends mixins(NoteMixin, TodoMixin) {
  @Prop({ type: Number }) noteId!: number;

  // Store
  _saveChange!: any;
  getNoteById!: any;

  // Data properties
  isEdit = false;
  loading = false;
  loader = "";
  title = "";
  todoDescription = "";

  get noteTitle(): string {
    return !this.note.title ? "Безымянный" : this.note.title;
  }

  get note(): INote {
    return this.getNoteById(this.noteId);
  }

  get keymap() {
    return {
      "ctrl+z": this.undo,
      "meta+z": this.undo
    };
  }

  input(e: any): void {
    this.title = e.target.value;
  }

  saveChange(): void {
    this.loading = true;
    this.loader = "Идет сохранение...";

    setTimeout(() => {
      this._saveChange({
        id: this.noteId,
        title: this.title || this.noteTitle,
        todos: this.note.todos
      });

      this.loader = "Сохранено";
      this.isEdit = false;

      setTimeout(() => (this.loading = false), 500);
    }, 1000);
  }

  toBack(): void {
    const OK = confirm("Отменить изменение?");
    if (OK) {
      this.$router.go(-1);
    }
  }
}
</script>
