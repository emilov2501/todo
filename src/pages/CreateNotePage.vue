<template lang="html">
  <div class="center">
    <h1>Создать новую заметку</h1>
    <div class="create-note-page">
      <app-create-note :value.sync="value" />
      <button class="ml-2" @click="create">Опубликовать</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import AppCreateNote from "../components/note/AppCreateNote.vue";
import { mapActions } from "vuex";
import { mixins } from "vue-class-component";
import NoteMixin from "../mixins/note.mixin";

@Component({
  components: {
    AppCreateNote
  },
  methods: {
    ...mapActions({
      _create: "_createNote"
    })
  }
})
export default class CreateNotePage extends mixins(NoteMixin) {
  value = "";
}
</script>
