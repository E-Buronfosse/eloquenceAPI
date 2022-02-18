const userModel = require("../models/userModel").userModel;

exports.add = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email: email });

  try {
    if (!email || !password) {
      return res.status(400).json("email and password should not be empty");
    }

    if (user) {
      return res.status(409).json("user aready exists");
    }
    await userModel.create({ email, password });
    console.log(user);
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(501).json(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  const user = await userModel.find();

  try {
    if (!user) {
      return res.status(404).json("user_not_found");
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(501).json(error);
  }
};

exports.getById = async (req, res, next) => {
  const { id } = req.params;

  const user = await userModel.findOne({ id: id });

  try {
    if (!user) {
      return res.status(404).json("user_not_found");
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(501).json(error);
  }
};

exports.update = async (req, res, next) => {
  const { id } = req.params;
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ id: id });

    if (!user) {
      return res.status(404).json("user not found");
    }
    await userModel.updateOne({ email, password });
    return res.status(201).json("user updated");
  } catch (error) {
    console.log("error", error);
    return res.status(501).json(error);
  }
};

exports.delete = async (req, res, next) => {
  const { id } = req.params;
  const user = await userModel.findOne({ id: id });
  try {
    if (!user) {
      return res.status(404).json("user not found");
    }
    await userModel.deleteOne(user);
    return res.status(201).json("user deleted");
  } catch (error) {
    res.status(501).json(error);
  }
};
