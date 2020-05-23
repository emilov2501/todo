<template lang="html">
  <div v-if="todo">
    <div :class="isCheck" class="app-todo">
      <input
        :disabled="!$route.query.change"
        type="checkbox"
        v-model="todo.isDone"
        class="mr-1 checkbox"
      />
      <div class="options d-flex align-items-center">
        <span class="desc" v-if="!isEdit">{{ todo.description }}</span>
        <input
          type="text"
          class="todo-edit"
          v-if="isEdit"
          v-model="todo.description"
        />
        <div class="btns" v-if="$route.query.change">
          <span class="btn" @click="isEdit = !isEdit">Редактировать</span>
          <span class="btn" @click="$emit('remove-todo', todo.id)"
            >Удалить</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ITodo } from "@/interfaces/ITodo";

@Component
export default class AppTodo extends Vue {
  @Prop({ type: Object, default: () => ({}) }) todo!: ITodo;
  isEdit = false;

  get isCheck() {
    return {
      done: this.todo.isDone
    };
  }
}
</script>

<style lang="sass">

.done
  color: green
  .desc
    text-decoration: line-through
.checkbox
  width: 20px
.app-todo
  display: flex;
  align-items: center
  .options .btn
    font-size: 13px
    margin-left: 1rem
    cursor: pointer
    color: blue
    text-align: right
  .todo-edit
    padding: 0px
    height: 25px
    width: 150px
</style>
