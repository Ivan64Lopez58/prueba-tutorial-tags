const express = require("express");

const router = express.Router();

const {
    getTutorials,
    createTutorial,
    updateTutorial,
    deleteTutorial
} = require("../controllers/tutorial.controller");

router.get("/", getTutorials);
router.post("/", createTutorial);
router.put("/:id", updateTutorial);
router.delete("/:id", deleteTutorial);

module.exports = router;