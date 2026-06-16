const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const Store = require("../models/Store");
const Rating = require("../models/Rating");

// View Stores
router.get("/stores", auth, async (req, res) => {
    try {
        const stores = await Store.findAll();
        res.json(stores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Submit Rating
router.post("/rate", auth, async (req, res) => {
    try {

        if (req.user.role !== "USER") {
            return res.status(403).json({
                message: "Only normal users can rate stores"
            });
        }

        const { storeId, rating } = req.body;

        const existingRating = await Rating.findOne({
            where: {
                userId: req.user.id,
                storeId
            }
        });

        if (existingRating) {
            return res.status(400).json({
                message: "You have already rated this store"
            });
        }

        const newRating = await Rating.create({
            userId: req.user.id,
            storeId,
            rating
        });

        res.status(201).json({
            message: "Rating submitted successfully",
            rating: newRating
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Update Rating
router.put("/rate/:storeId", auth, async (req, res) => {
    try {

        const { rating } = req.body;
        const storeId = req.params.storeId;

        const existingRating = await Rating.findOne({
            where: {
                userId: req.user.id,
                storeId
            }
        });

        if (!existingRating) {
            return res.status(404).json({
                message: "Rating not found"
            });
        }

        existingRating.rating = rating;

        await existingRating.save();

        res.json({
            message: "Rating updated successfully",
            rating: existingRating
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;