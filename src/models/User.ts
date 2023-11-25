import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    al_access_token: {
      type: String,
    },
    mal_access_token: {
      type: String,
    },
    al_user_details: {
      type: mongoose.Schema.Types.Mixed,
    },
    mal_user_details: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  { timestamps: true, versionKey: false },
);

export default mongoose.models["User"] || mongoose.model("User", UserSchema);
