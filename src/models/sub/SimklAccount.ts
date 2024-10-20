import mongoose from "mongoose";

const SimklAccountSubSchema = new mongoose.Schema(
  {
    account_details: {
      id: {
        type: String,
      },
      name: {
        type: String,
      },
      joined_at: {
        type: String,
      },
      avatar: {
        type: String,
      },
      bio: {
        type: String,
      },
      loc: {
        type: String,
      },
      age: {
        type: String,
      },
      timezone: {
        type: String,
      },
      type: {
        type: String,
      },
    },
    auth_details: {
      access_token: {
        type: String,
      },
    },
  },
  { _id: false },
);

export default SimklAccountSubSchema;
