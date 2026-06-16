require("dotenv").config();

const express = require("express");
const cors = require("cors");

const sequelize = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/admin", require("./routes/adminRoutes"));
app.use("/user", require("./routes/userRoutes"));
app.use("/owner", require("./routes/ownerRoutes"));

const PORT = process.env.PORT || 5000;

sequelize.sync()
    .then(() => {
        console.log("Database connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("Database Error:", err);
    });