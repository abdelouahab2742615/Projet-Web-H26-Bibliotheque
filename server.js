const express = require("express");
const app = express();

const publisherRoutes = require("./itinéraires/publisherRoutes");
const reservationRoutes = require("./itinéraires/reservationRoutes");

app.use(express.json());

app.use("/publishers", publisherRoutes);
app.use("/reservations", reservationRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
