import mongoose from "mongoose";

const MyAnimeListAccountSubSchema = new mongoose.Schema(
  {
    access_token: { type: String, required: true },
    expiration: { type: Date, required: true },
    account_details: { type: mongoose.Schema.Types.Mixed },
  },
  { _id: false },
);

export default MyAnimeListAccountSubSchema;
