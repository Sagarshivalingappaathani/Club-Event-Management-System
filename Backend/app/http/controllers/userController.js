
const User = require('../../models/user');

function userController() {
  return {
    async getUsers(req, res) {
      try {
        const users = await User.find({}, 'name');
        return res.status(200).json(users);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    },

    async getOrganizer(req, res) {
      try {
        const organizerId = req.params.organizerId;
        const organizer = await User.findById(organizerId, 'name');

        if (!organizer) {
          return res.status(404).json({ message: "Organizer not found" });
        }
        return res.status(200).json(organizer);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    },
  };
}

module.exports = userController;
