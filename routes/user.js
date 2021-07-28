const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.get("/", async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: "Cannot find User" });
        }
        res.json(user)
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

router.post("/", async (req, res) => {
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname
    });
    try {
        const newUser = await user.save();
        res.status(201).json({ newUser });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch("/:id", async (req, res) => {
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname
    };
    try {
        const updated = await User.findOneAndUpdate({ _id: req.params.id },
            { user },
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

});

router.delete("/:id", async (req, res) => {
    try {
        const deleted = await User.findOneAndDelete({ _id: req.params.id });
        res.json(deleted);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }

});

module.exports = router;