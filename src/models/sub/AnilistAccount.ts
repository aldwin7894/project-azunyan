import mongoose from "mongoose";

const AnilistAccountSubSchema = new mongoose.Schema(
  {
    account_details: {
      id: {
        type: String,
      },
      name: {
        type: String,
      },
      siteUrl: {
        type: String,
      },
      avatar: {
        medium: {
          type: String,
        },
      },
    },
    auth_details: {
      access_token: {
        type: String,
      },
      expires_in: {
        type: String,
      },
    },
  },
  { _id: false },
);

export default AnilistAccountSubSchema;
