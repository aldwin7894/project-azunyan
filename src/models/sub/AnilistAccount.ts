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
  },
  { _id: false },
);

export default AnilistAccountSubSchema;
