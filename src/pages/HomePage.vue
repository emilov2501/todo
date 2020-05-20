<template lang="html">
  <div class="page-wrapper home-page">
    <!-- Notes -->
    <button class="btn success" @click="toCreate">Создать заметку</button>

    <h1>Заметки</h1>
    <hr />
    <div v-if="getNotes.length > 0">
      <note-list :notes="getNotes" />
    </div>

    <div v-else>0 заметок</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NoteList from "../components/note/AppNoteList.vue";
import { Dictionary } from "vue-router/types/router";
import { mapGetters } from "vuex";

@Component({
  components: {
    NoteList
  },
  computed: {
    ...mapGetters(["getNotes"])
  }
})
export default class HomePage extends Vue {
  toCreate() {
    const otherQuery: Dictionary<string> = {
      create: "true"
    };
    this.$router.push({
      name: "ModifyNotePage",
      query: otherQuery
    });
  }
}
</script>
