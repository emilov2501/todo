<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./src/assets/styles/root.scss";

html,
body {
  background-color: rgb(49, 173, 223);
}

#app {
  font-family: $font;
}
</style>
