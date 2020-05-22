import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import makeSnapshot from "./plugins/make-snapshot";
import VueHotkey from "v-hotkey";

Vue.use(VueHotkey);
Vue.use(makeSnapshot, {
  store
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
