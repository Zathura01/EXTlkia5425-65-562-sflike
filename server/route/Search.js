const express = require("express");
const router = express.Router();
const Domain = require("../schema/DomainSchema");


router.post("/searchDB", async (req, res) => {
  const { domain } = req.body;
  console.log("Received domain for search:", domain);
  if (!domain) return res.status(400).json({ error: 'Domain is required' });

  const result = await Domain.findOne({ domain });

  if (result) {
    console.log("found")
    return res.json({ found: true, email: result.email });
  } else {
    console.log("not found")
    return res.json({ found: false });
  }
});

module.exports = router;