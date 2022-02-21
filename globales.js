module.exports = {
  environmentVariables: function () {
    global.uriDatabase =
      "mongodb://root:root@127.0.0.1:27017/?retryWrites=true&w=majority";
    global.privateKey = '4E8CE938D1B11E5DCFC3717DC37FC';
  },
};
