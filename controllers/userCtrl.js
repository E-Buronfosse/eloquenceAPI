const userModel = require("../models/userModel").userModel;

exports.add = async (req, res, next) => {
  const { email, password } = req.body;
  console.log({ email, password });

  try {
    const user = await userModel.create({ email, password });
    console.log("usser", user);

    return res.status(201).json(user);
  } catch (error) {
    console.log("error", error);
    return res.status(501).json(error);
  }
};

exports.getById = async (req, res, next) => {
  const { email } = req.params;

  try {
    const user = await userModel.findById(email);

    if (user) {
      return res.status(200).json(user);
    }

    return res.status(404).json("user_not_found");
  } catch (error) {
    return res.status(501).json(error);
  }
};
