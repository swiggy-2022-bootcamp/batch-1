const router = require("express").Router();

router.post("/", (_, res) => {
    res.status(201).json({
        message: "post question",
    });
});

router.get("/:id/");

router.post("/:id/answer");

router.put("/:id/answer");

module.exports = router;
