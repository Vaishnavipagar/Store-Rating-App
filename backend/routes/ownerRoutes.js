const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const Store = require("../models/Store");
const Rating = require("../models/Rating");
const User = require("../models/User");

router.get("/dashboard", auth, async (req, res) => {
    try {

        if (req.user.role !== "OWNER") {
            return res.status(403).json({
                message: "Access Denied"
            });
        }

        const store = await Store.findOne({
            where: {
                ownerId: req.user.id
            }
        });

        const ratings = await Rating.findAll({
            where: {
                storeId: store.id
            }
        });

        const averageRating =
            ratings.length === 0
                ? 0
                : ratings.reduce((sum, r) => sum + r.rating, 0) /
                  ratings.length;

        const usersWhoRated = [];

        for (const rating of ratings) {
            const user = await User.findByPk(rating.userId);

            usersWhoRated.push({
                name: user.name,
                email: user.email,
                rating: rating.rating
            });
        }

        res.json({
            averageRating,
            usersWhoRated
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;