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
      mediaListOptions: {
        scoreFormat: {
          type: String,
          enum: [
            "POINT_100",
            "POINT_10_DECIMAL",
            "POINT_10",
            "POINT_5",
            "POINT_3",
          ],
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
