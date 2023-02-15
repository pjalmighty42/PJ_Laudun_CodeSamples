const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  appId: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "Application",
  },
  name: {
    type: String,
  },
  url: {
    type: String,
  },
});

const ClientSchema = new mongoose.Schema({
  companyName: {
    type: String,
  },
  dateApplied: {
    type: String,
  },
  role: {
    type: RoleSchema,
  },
  status: {
    type: String,
    enum: ["Active", "On Hold", "Rejected"],
  },
  submittedResume: {
    type: Boolean,
  },
  resumeViewed: {
    type: Boolean,
  },
  contacted1stCall: {
    type: Boolean,
  },
  techInterview: {
    type: Boolean,
  },
  interview3: {
    type: Boolean,
  },
  interview4: {
    type: Boolean,
  },
  jobOffered: {
    type: Boolean,
  },
});

module.exports = mongoose.model("ClientSchema", ClientSchema);
