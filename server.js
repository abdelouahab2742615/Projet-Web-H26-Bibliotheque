const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { sequelize } = require("./models");
const roleRoutes = require("./routes/roleRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Bibliothèque fonctionne !");
});

// Routes
app.use("/roles", roleRoutes);
app.use("/users", userRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connexion à MySQL réussie.");
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erreur connexion DB:", err);
  });