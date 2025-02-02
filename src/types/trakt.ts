export type TTraktAuthResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  created_at: number;
};

export type TTraktUserDetailsResponse = {
  user: {
    username: string;
    name: string;
    ids: {
      slug: string;
      uuid: string;
    };
    joined_at: string;
    location: string;
    about: string;
    gender: string;
    age: string;
    images: {
      avatar: {
        full: string;
      };
    };
  };
  account: {
    timezone: string;
    date_format: string;
    time_24hr: boolean;
    cover_image: string;
  };
  connections: {
    facebook: boolean;
    twitter: boolean;
    mastodon: boolean;
    google: boolean;
    tumblr: boolean;
    medium: boolean;
    slack: boolean;
    apple: boolean;
    dropbox: boolean;
    microsoft: boolean;
  };
};
