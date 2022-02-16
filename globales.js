module.exports = {
  environmentVariables: function () {
    global.uriDatabase =
      "mongodb://root:root@127.0.0.1:27017/?retryWrites=true&w=majority";
  },
};
