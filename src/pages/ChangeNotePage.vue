<template lang="html">
  <div class="page-change__note" v-if="note">
    <div class="note__title">
      <h1>
        #{{ note.id }}: <span v-if="!isEdit">{{ note.title }}</span>
        <input
          class="input__title"
          type="text"
          v-if="isEdit"
          :value="note.title"
          @change="input"
        />
      </h1>
      <small class="event ml-1" @click="isEdit = !isEdit"
        >[{{
          !isEdit ? "Изменить заголовок" : "Закончить редактирование"
        }}]</small
      >
    </div>
    <hr />
    <app-todo-list :todos="note.todos" />
    <hr />
    <br />
    <div class="options">
      <button @click="toBack">Отменить</button>
      <button :disabled="!isEdit" class="ml-1 success" @click="saveChange">
        Сохранить изменении
      </button>
      <button class="ml-1 danger" @click="removeNote">Удалить</button>
      <button class="ml-1 danger" @click="_restoreNote">Вернуть</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { INote } from "../interfaces/INote";
import AppTodoList from "../components/todo/AppTodoList.vue";

@Component({
  components: {
    AppTodoList
  },
  computed: {
    ...mapGetters({
      getNoteById: "getNoteById"
    })
  },
  methods: {
    ...mapActions({
      _saveChange: "_saveChange",
      _removeNote: "_removeNote"
    }),
    ...mapMutations({
      _restoreNote: "_restoreNote"
    })
  }
})
export default class ChangeNotePage extends Vue {
  @Prop({ type: Number }) noteId!: number;

  _restoreNote!: any;
  _saveChange!: any;
  _removeNote!: any;
  getNoteById!: any;

  isEdit = false;
  title = "";
  todos = [];

  input(e: any) {
    this.title = e.target.value;
  }

  get note(): INote {
    return this.getNoteById(this.noteId);
  }

  saveChange(): void {
    if (this.isEdit === false) return;
    this._saveChange({
      id: this.noteId,
      title: this.title,
      todos: this.todos
    });

    this.isEdit = false;
  }

  restoreNote(): void {
    this._restoreNote();
  }

  removeNote(): void {
    const OK = confirm(`Вы точно хотите #${this.noteId}`);
    if (OK) {
      this._removeNote(this.noteId);
      this.$router.go(-1);
    }
  }

  toBack(): void {
    const OK = confirm("Отменить изменение?");
    if (OK) {
      this.$router.go(-1);
    }
  }
}
</script>
