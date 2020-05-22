import Vue from "vue";
import Vuex from "vuex";
import notes from "./modules/notes.module";
import { BackupController } from "@/controllers/BackupController";
Vue.use(Vuex);

export default new Vuex.Store({
  actions: {
    backupSnapshots<T>(
      ctx,
      { storageKey, data }: { storageKey: string; data: any }
    ) {
      new BackupController<T>(data, storageKey);
    }
  },
  modules: {
    notes
  }
});
