import mongoose from "mongoose";

const TraktAccountSubSchema = new mongoose.Schema(
  {
    account_details: {
      id: {
        type: String,
      },
      slug: {
        type: String,
      },
      username: {
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
      about: {
        type: String,
      },
      location: {
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
      refresh_token: {
        type: String,
      },
      expires_in: {
        type: String,
      },
      created_at: {
        type: String,
      },
    },
  },
  { _id: false },
);

export default TraktAccountSubSchema;
