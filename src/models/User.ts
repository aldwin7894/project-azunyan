import mongoose, { InferSchemaType } from "mongoose";
import AnilistAccountSubSchema from "./sub/AnilistAccount";
import MyAnimeListAccountSubSchema from "./sub/MyAnimeListAccount";
import SimklAccountSubSchema from "./sub/SimklAccount";

const UserSchema = new mongoose.Schema(
  {
    _id: String,
    anilist: AnilistAccountSubSchema,
    myanimelist: MyAnimeListAccountSubSchema,
    simkl: SimklAccountSubSchema,
  },
  { timestamps: true, versionKey: false },
);

export type TUserSchema = InferSchemaType<typeof UserSchema>;
export default mongoose.models["User"] || mongoose.model("User", UserSchema);
