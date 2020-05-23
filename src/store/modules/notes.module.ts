import { NoteService } from "@/controllers/NoteController";
import { ActionContext } from "vuex";
import { INote } from "@/interfaces/INote";
import { IRootState } from "../types";

interface INoteState {
  data: NoteService;
}

const state = () => ({
  data: new NoteService()
});

const getters = {
  getNotes: (state: INoteState) => state.data.getNotes,
  getNoteById: (state: INoteState) => (noteId: number) =>
    state.data.getNotes[noteId]
};

const mutations = {
  setNote(state: INoteState, payload: INote) {
    state.data.createOrReplace(payload);
  },

  setRemoveById(state: INoteState, payload: number) {
    state.data.removeById(payload);
  },

  /**
   * Every change to set old state into backup
   * @param state State
   * @param payload INote
   */
  setChange(state: INoteState, payload: INote) {
    state.data.save(payload);
  },

  setRestore(state: INoteState, noteId: number) {
    state.data.restore(noteId);
  }
};

const actions = {
  _createNote(
    { commit }: ActionContext<INoteState, IRootState>,
    title: string
  ) {
    const note: INote = {
      id: NoteService.generateId(),
      title,
      todos: []
    };
    commit("setNote", note);
  },

  _saveChange(
    { commit }: ActionContext<INoteState, IRootState>,
    { id, title, todos }: INote
  ) {
    const data: INote = {
      id,
      title,
      todos
    };

    commit("setChange", data);
  },

  _remove(
    { getters, commit }: ActionContext<INoteState, IRootState>,
    noteId: number
  ) {
    if (getters.getNotes[noteId]) {
      commit("setRemoveById", noteId);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
