<template lang="html">
  <div class="note" v-if="note">
    <h2>{{ noteTitle }}</h2>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { INote } from "../../interfaces/INote";

@Component
export default class AppNote extends Vue {
  @Prop({ type: Object, default: () => ({}) }) note!: INote;

  get noteTitle(): string {
    return !this.note.title ? "Безымянный" : this.note.title;
  }
}
</script>
