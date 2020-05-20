<template lang="html">
  <div class="page-wrapper">
    <component :noteId="noteId" :is="componentName" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import AppCreateNote from "../components/note/AppCreateNote.vue";

type ModuleType = typeof import("@/components/note/AppCreateNote.vue"); // import value does not mean

@Component({
  components: {
    AppCreateNote
  }
})
export default class ModifyNotePage extends Vue {
  @Prop({ type: Number }) noteId!: number;
  get componentName(): object | null {
    const route = this.$route;
    if (route.query.create) {
      return this.loadComponent("CreateNotePage.vue");
    } else if (route.query.change) {
      return this.loadComponent("ChangeNotePage.vue");
    }

    return null;
  }

  loadComponent(page: string) {
    return (): Promise<ModuleType> => import(`./${page}`);
  }
}
</script>
