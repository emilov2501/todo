<template lang="html">
  <div class="app-todo-list">
    <div class="todo-wrapper" v-if="todos.length > 0">
      <div class="todo-item" v-for="todo in todos" :key="todo.id">
        <app-todo :todo="todo" @remove-todo="$emit('remove-todo', $event)" />
      </div>
    </div>
    <h4 v-else>Задач пока нет</h4>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import AppTodo from "./AppTodo.vue";
import { ITodo } from "../../interfaces/ITodo";

@Component({
  components: {
    AppTodo
  }
})
export default class AppTodoList extends Vue {
  @Prop({ type: Array, default: [] }) todos!: ITodo[];
}
</script>
