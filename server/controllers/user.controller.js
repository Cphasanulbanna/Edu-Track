import User from "../models/user.model.js";

export const fetchUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select("-__v -password")
      .populate("role", "-__v")
      .populate("profile", "-__v");
    if (!users) {
      return res.status(404).json({ message: "No data found" });
    }

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
