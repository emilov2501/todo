<template lang="html">
  <div class="app-create-note">
    <input
      type="text"
      :value="value"
      @input="$emit('update:value', $event.target.value)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class AppCreateNote extends Vue {
  @Prop({ type: String, default: "" }) value!: string;
}
</script>
