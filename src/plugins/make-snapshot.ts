export default {
  install(Vue, { store }) {
    async function saveTo<T>(to: string, value: T): Promise<void> {
      await store.dispatch(to, value);
    }

    Vue.prototype.$saveTo = saveTo;
  }
};
