import mongoose, { InferSchemaType } from "mongoose";
import AnilistAccountSubSchema from "./sub/AnilistAccount";
import MyAnimeListAccountSubSchema from "./sub/MyAnimeListAccount";
import SimklAccountSubSchema from "./sub/SimklAccount";
import TraktAccountSubSchema from "./sub/TraktAccount";

const UserSchema = new mongoose.Schema(
  {
    _id: String,
    anilist: AnilistAccountSubSchema,
    myanimelist: MyAnimeListAccountSubSchema,
    simkl: SimklAccountSubSchema,
    trakt: TraktAccountSubSchema,
  },
  { timestamps: true, versionKey: false },
);
const User = () => mongoose.model("User", UserSchema);

export type TUserSchema = InferSchemaType<typeof UserSchema>;
export default (mongoose.models["User"] || User()) as ReturnType<typeof User>;
