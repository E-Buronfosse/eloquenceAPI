const userModel = require("../models/userModel").userModel;

exports.add = async (req, res, next) => {
  const { email, password, confirmePassword } = req.body;

  let user = await userModel.findOne({ email: email });

  try {
    if (!email || !password) {
      return res.status(400).json("email and password should not be empty");
    }

    if (user) {
      return res.status(409).json("user aready exists");
    }
    if (confirmePassword !== password) {
      return res.status(409).json("confirme password is not identical");
    }

    await userModel.create({
      email,
      password,
      confirmePassword,
    });
    user = await userModel.findOne({ email: email });
    console.log(user);
    return res.status(201).json({ email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(501).json(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  const user = await userModel.find();
  console.log("toto");
  try {
    if (!user) {
      return res.status(404).json("users_not_found");
    }
    console.log("yooo");
    return res.status(200).json({ email: user.email });
  } catch (error) {
    return res.status(501).json(error);
  }
};

exports.getById = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const user = await userModel.findOne({ id: id });
  console.log(user);

  try {
    if (!user) {
      return res.status(404).json("user_not_found");
    }
    return res.status(200).json({ email: user.email });
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
    return res.status(200).json({ email: user.email });
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
    return res.status(200).json("user deleted");
  } catch (error) {
    res.status(501).json(error);
  }
};
