<template lang="html">
  <div class="center">
    <h1>Создать новую заметку</h1>
    <div class="create-note-page">
      <app-create-note :value.sync="value" />
      <button class="ml-2" @click="createNote">Опубликовать</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AppCreateNote from "../components/note/AppCreateNote.vue";
import { mapActions } from "vuex";

@Component({
  components: {
    AppCreateNote
  },
  methods: {
    ...mapActions({
      _createNote: "_createNote"
    })
  }
})
export default class CreateNotePage extends Vue {
  _createNote!: any;
  value = "";

  createNote() {
    if (!this.value) return alert("Не валидные данные");

    this._createNote(this.value);
    this.$nextTick(() => {
      this.value = "";
      this.$router.push({
        name: "HomePage"
      });
    });
  }
}
</script>
