import axios from "axios";

const MyAnimeListClient = () => {
  return axios.create({ baseURL: "https://api.myanimelist.net/v2/" });
};

export default MyAnimeListClient;
