import mongoose from "mongoose";

const XRefMappingsSubSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  started_at: {
    type: String,
  },
  completed_at: {
    type: String,
  },
  myanimelist: {
    id: String,
  },
  simkl: {
    id: String,
  },
  trakt: {
    id: String,
    season: Number,
    episode_offset: Number,
  },
});

export default XRefMappingsSubSchema;
