const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const auth = require("../middleware/auth");

const User = require("../models/User");
const Store = require("../models/Store");
const Rating = require("../models/Rating");

// Dashboard API
router.get("/dashboard", auth, async (req, res) => {
    try {
        if (req.user.role !== "ADMIN") {
            return res.status(403).json({
                message: "Access Denied"
            });
        }

        const totalUsers = await User.count();
        const totalStores = await Store.count();
        const totalRatings = await Rating.count();

        res.json({
            totalUsers,
            totalStores,
            totalRatings
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: error.message
        });
    }
});

// Add User API
router.post("/add-user", auth, async (req, res) => {
    try {
        if (req.user.role !== "ADMIN") {
            return res.status(403).json({
                message: "Access Denied"
            });
        }

        const {
            name,
            email,
            password,
            address,
            role
        } = req.body;

        const existingUser = await User.findOne({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            address,
            role
        });

        res.status(201).json({
            message: "User added successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                address: user.address,
                role: user.role
            }
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: error.message
        });
    }
});

// Add Store API
router.post("/add-store", auth, async (req, res) => {
    try {
        if (req.user.role !== "ADMIN") {
            return res.status(403).json({
                message: "Access Denied"
            });
        }

        const {
            name,
            email,
            address,
            ownerId
        } = req.body;

        const owner = await User.findOne({
            where: {
                id: ownerId,
                role: "OWNER"
            }
        });

        if (!owner) {
            return res.status(404).json({
                message: "Store Owner not found"
            });
        }

        const store = await Store.create({
            name,
            email,
            address,
            ownerId
        });

        res.status(201).json({
            message: "Store added successfully",
            store
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;

// View All Users API
router.get("/users", auth, async (req, res) => {
    try {

        if (req.user.role !== "ADMIN") {
            return res.status(403).json({
                message: "Access Denied"
            });
        }

        const users = await User.findAll({
            attributes: [
                "id",
                "name",
                "email",
                "address",
                "role"
            ]
        });

        res.json(users);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: error.message
        });
    }
});


router.get("/stores", auth, async (req, res) => {
    try {

        if (req.user.role !== "ADMIN") {
            return res.status(403).json({
                message: "Access Denied"
            });
        }

        const stores = await Store.findAll({
            attributes: [
                "id",
                "name",
                "email",
                "address",
                "ownerId"
            ]
        });

        res.json(stores);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: error.message
        });
    }
});