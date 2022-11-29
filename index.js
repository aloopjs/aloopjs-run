const path = require('path');
const basename = path.dirname(require.main.filename);

module.exports = {
  rq(str){
    // Check if have #
    if (str.charAt(0) === '#') {
      return require([basename, 'src', str.replace(/^#/, '') , 'index'].join(path.sep));
    }

    return require(str);
  },

  async run(appInfo, rootConfig) {
    let args = {...appInfo, rootConfig};

    // Before hook
    config.modules.forEach((el) => {
      const module = this.rq(el);
      module.register && module.register(args);
    });

    // Boot hook
    config.modules.forEach((el) => {
      const module = this.rq(el);
      module.boot && module.boot(args);
    });
  }
};