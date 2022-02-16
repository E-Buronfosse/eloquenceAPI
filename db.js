const { MongoClient } = require("mongodb");

module.exports = {
  connection: async function () {
    const client = new MongoClient(uriDatabase);

    try {
      // Connect to the MongoDB cluster
      await client.connect();
      // Make the appropriate DB calls
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  },
};
