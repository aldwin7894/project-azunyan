import mongoose from "mongoose";

const MyAnimeListAccountSubSchema = new mongoose.Schema(
  {
    account_details: {
      id: {
        type: String,
      },
      name: {
        type: String,
      },
      gender: {
        type: String,
      },
      birthday: {
        type: String,
      },
      location: {
        type: String,
      },
      joined_at: {
        type: String,
      },
      picture: {
        type: String,
      },
    },
  },
  { _id: false },
);

export default MyAnimeListAccountSubSchema;
