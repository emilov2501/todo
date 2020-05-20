import { NoteService } from "@/controllers/NoteController";
import { ActionContext } from "vuex";
import { RootState, State } from "vuex/types";
import { INote } from "../../interfaces/INote";

const state = () => ({
  data: new NoteService()
});

const getters = {
  getNotes: (state: State) => Object.values(state.data.notes),
  getNoteById: (state: State) => (noteId: number) => state.data.notes[noteId]
};

const mutations = {
  setNote(state: State, payload: INote) {
    state.data.createOrReplace(payload);
  },

  setRemoveNoteById(state: State, payload: number) {
    state.data.remove(payload);
  },

  setChange(state: State, payload: INote) {
    state.data.save(payload);
  },

  _restoreNote(state: State) {
    state.data.restore();
  }
};

const actions = {
  _createNote({ commit }: ActionContext<State, RootState>, title: string) {
    const note: INote = {
      id: NoteService.getRandomId(),
      title,
      todos: []
    };
    commit("setNote", note);
  },

  _saveChange(
    { commit }: ActionContext<State, RootState>,
    { id, title, todos }: INote
  ) {
    const data: INote = {
      id,
      title: title,
      todos
    };

    commit("setChange", data);
  },

  _removeNote({ commit }: ActionContext<State, RootState>, noteId: number) {
    commit("setRemoveNoteById", noteId);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
