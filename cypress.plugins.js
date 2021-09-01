module.exports = (on) => {
  on('task', {
    log(message) {
      console.log('\x1b[32m', message);
      console.log('\x1b[0m');

      return null;
    },
  });
};
