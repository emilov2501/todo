module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import url('https://fonts.googleapis.com/css2?family=Balsamiq+Sans:wght@400;700&display=swap');
          @import '@/assets/styles/vars.scss';
        `
      }
    }
  }
};
