<template lang="html">
  <div class="note" v-if="note">
    <h2>{{ note.title }}</h2>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class AppNote extends Vue {
  @Prop({ type: Object, default: () => ({}) }) note!: {};
}
</script>
