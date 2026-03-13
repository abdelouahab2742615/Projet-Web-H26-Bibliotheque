const { Role } = require("../models");

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des rôles.", error });
  }
};

exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);

    if (!role) {
      return res.status(404).json({ message: "Rôle non trouvé." });
    }

    res.json(role);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du rôle.", error });
  }
};

exports.createRole = async (req, res) => {
  try {
    console.log("BODY =", req.body);
    console.log("Role table =", Role.getTableName());

    const { nomRole } = req.body;
    const newRole = await Role.create({ nomRole });

    res.status(201).json(newRole);
  } catch (error) {
    console.error("ERREUR CREATE ROLE =", error);
    res.status(500).json({ message: "Erreur lors de la création du rôle.", error });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const { nomRole } = req.body;
    const role = await Role.findByPk(req.params.id);

    if (!role) {
      return res.status(404).json({ message: "Rôle non trouvé." });
    }

    await role.update({ nomRole });
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du rôle.", error });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);

    if (!role) {
      return res.status(404).json({ message: "Rôle non trouvé." });
    }

    await role.destroy();
    res.json({ message: "Rôle supprimé avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du rôle.", error });
  }
};