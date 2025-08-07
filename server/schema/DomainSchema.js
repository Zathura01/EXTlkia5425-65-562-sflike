const mongoose = require("mongoose");

const DomainSchema = new mongoose.Schema({
  domain: String,
  email: String
});

const Domain = mongoose.model("Domain", DomainSchema);

module.exports = Domain;
