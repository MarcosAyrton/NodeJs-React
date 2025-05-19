const express = require("express");
const cors = require("cors");

const app = express();

const port = 3000;

const userRoutes = require("./routes/users.routes");
const productoRoutes = require("./routes/productos.routes");

app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", productoRoutes);

// Port
app.listen(port, () => {
  console.log(`Servidor corriendo en localhost:${port}`);
});
