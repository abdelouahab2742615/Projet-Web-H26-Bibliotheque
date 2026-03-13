const { User, Role } = require("../models");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: {
        model: Role,
        attributes: ["id", "nomRole"],
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs.", error });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: {
        model: Role,
        attributes: ["id", "nomRole"],
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur.", error });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { nom, prenom, email, password, roleId } = req.body;

    const newUser = await User.create({
      nom,
      prenom,
      email,
      password,
      roleId,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de l'utilisateur.", error });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { nom, prenom, email, password, roleId } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    await user.update({
      nom,
      prenom,
      email,
      password,
      roleId,
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur.", error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    await user.destroy();
    res.json({ message: "Utilisateur supprimé avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur.", error });
  }
};