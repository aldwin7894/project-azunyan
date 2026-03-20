export type TMALAuthResponse = {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
};

export type TMALSearchResponse = {
  data: {
    node: TMALAnimeEntry;
  }[];
  paging: {
    previous: string;
    next: string;
  };
};

export type TMALAnimeEntry = {
  id: number;
  title: string;
  main_picture: {
    large: string;
    medium: string;
  };
  alternative_titles?: {
    synonyms?: string[];
    en?: string;
    ja?: string;
  };
  start_date?: string;
  end_date?: string;
  synopsis?: string;
  mean?: number;
  rank?: number;
  popularity?: number;
  num_list_users?: number;
  num_scoring_users?: number;
  nsfw?: string;
  genres?: {
    id: number;
    name: string;
  }[];
  media_type?: string;
  status?: string;
  studios?: {
    name: string;
  }[];
};
