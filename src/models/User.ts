import mongoose from "mongoose";
import AnilistAccountSubSchema from "./sub/AnilistAccount";
import MyAnimeListAccountSubSchema from "./sub/MyAnimeListAccount";

const UserSchema = new mongoose.Schema(
  {
    anilist: AnilistAccountSubSchema,
    myanimelist: MyAnimeListAccountSubSchema,
  },
  { timestamps: true, versionKey: false },
);

export default mongoose.models["User"] || mongoose.model("User", UserSchema);
